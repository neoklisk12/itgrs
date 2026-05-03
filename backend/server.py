from datetime import datetime, timezone
from html import escape
import logging
import os
from pathlib import Path
from typing import List, Optional
import uuid

import asyncpg
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Request
from fastapi.responses import FileResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, ConfigDict, EmailStr, Field
import resend
from starlette.middleware.cors import CORSMiddleware


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

DATABASE_URL = os.environ.get("DATABASE_URL", "")
db_pool: Optional[asyncpg.Pool] = None

resend.api_key = os.environ.get("RESEND_API_KEY", "")
NOTIFY_EMAIL = os.environ.get("NOTIFY_EMAIL", "contact@coreon.gr")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "coreon-admin-2025")
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "coreon-secret-token-2025")
CORS_ORIGINS = [origin.strip() for origin in os.environ.get("CORS_ORIGINS", "*").split(",") if origin.strip()]

app = FastAPI(title="Coreon IT API")
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

CREATE_TABLES = """
CREATE TABLE IF NOT EXISTS contact_messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS newsletter_subs (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    locale TEXT DEFAULT 'el',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quote_requests (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    plan TEXT NOT NULL,
    budget TEXT,
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
"""


@app.on_event("startup")
async def startup():
    global db_pool
    if not DATABASE_URL:
        logger.warning("DATABASE_URL is not set; database-backed endpoints will return 503.")
        return
    try:
        db_pool = await asyncpg.create_pool(DATABASE_URL)
        async with db_pool.acquire() as conn:
            await conn.execute(CREATE_TABLES)
        logger.info("PostgreSQL connected and tables ready.")
    except Exception as e:
        logger.error(f"DB startup error: {e}")


@app.on_event("shutdown")
async def shutdown():
    global db_pool
    if db_pool:
        await db_pool.close()


def get_pool() -> asyncpg.Pool:
    if not db_pool:
        raise HTTPException(status_code=503, detail="Database not ready")
    return db_pool


def safe_text(value: Optional[str], fallback: str = "-") -> str:
    if value is None or value == "":
        return fallback
    return escape(str(value), quote=True)


def safe_multiline(value: Optional[str], fallback: str = "-") -> str:
    return safe_text(value, fallback).replace("\n", "<br>")


def safe_subject(value: Optional[str], fallback: str = "") -> str:
    return str(value or fallback).replace("\r", " ").replace("\n", " ").strip()


def send_email_notification(subject: str, html: str):
    try:
        if not resend.api_key:
            return
        resend.Emails.send(
            {
                "from": "notifications@coreon.gr",
                "to": [NOTIFY_EMAIL],
                "subject": subject,
                "html": html,
            }
        )
    except Exception as e:
        logger.warning(f"Email send failed: {e}")


def verify_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials.credentials != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return True


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    service: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactMessageCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=120)
    company: Optional[str] = Field(None, max_length=120)
    service: Optional[str] = Field(None, max_length=200)
    message: str = Field(..., min_length=5, max_length=5000)


class NewsletterSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    locale: Optional[str] = "el"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class NewsletterCreate(BaseModel):
    email: EmailStr
    locale: Optional[str] = "el"


class QuoteRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    plan: str
    budget: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class QuoteRequestCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=40)
    plan: str = Field(..., min_length=2, max_length=80)
    budget: Optional[str] = Field(None, max_length=80)
    message: Optional[str] = Field(None, max_length=2000)


class AdminLogin(BaseModel):
    password: str


def row_to_dict(row):
    if row is None:
        return None
    data = dict(row)
    created_at = data.get("created_at")
    if isinstance(created_at, datetime) and created_at.tzinfo is None:
        data["created_at"] = created_at.replace(tzinfo=timezone.utc)
    return data


@api_router.get("/")
async def root():
    return {"message": "Coreon IT API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {
        "status": "healthy",
        "database": "ready" if db_pool else "not_ready",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@api_router.post("/contact", response_model=ContactMessage, status_code=201)
async def create_contact_message(request: Request, pool: asyncpg.Pool = Depends(get_pool)):
    payload = await request.json()
    try:
        body = ContactMessageCreate(**payload)
    except Exception as e:
        logger.exception(f"Contact validation failed: {e}")
        raise HTTPException(status_code=422, detail="Invalid contact submission")

    obj = ContactMessage(**body.model_dump())
    try:
        async with pool.acquire() as conn:
            await conn.execute(
                """INSERT INTO contact_messages (id, name, email, phone, company, service, message, created_at)
                   VALUES ($1,$2,$3,$4,$5,$6,$7,$8)""",
                obj.id,
                obj.name,
                obj.email,
                obj.phone,
                obj.company,
                obj.service,
                obj.message,
                obj.created_at,
            )
        send_email_notification(
            subject=f"New contact message from {safe_subject(obj.name)}",
            html=f"""
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> {safe_text(obj.name)}</p>
            <p><strong>Email:</strong> <a href="mailto:{safe_text(obj.email)}">{safe_text(obj.email)}</a></p>
            <p><strong>Phone:</strong> {safe_text(obj.phone)}</p>
            <p><strong>Company:</strong> {safe_text(obj.company)}</p>
            <p><strong>Service:</strong> {safe_text(obj.service)}</p>
            <p><strong>Message:</strong><br>{safe_multiline(obj.message)}</p>
            <p><strong>Date:</strong> {obj.created_at.strftime('%d/%m/%Y %H:%M')} UTC</p>
            """,
        )
        return obj
    except Exception as e:
        logger.exception(f"Contact submission failed: {e}")
        raise HTTPException(status_code=500, detail="Something went wrong")


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages(_: bool = Depends(verify_admin), pool: asyncpg.Pool = Depends(get_pool)):
    async with pool.acquire() as conn:
        rows = await conn.fetch("SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 500")
    return [row_to_dict(r) for r in rows]


@api_router.post("/newsletter", response_model=NewsletterSubscription, status_code=201)
async def subscribe_newsletter(payload: NewsletterCreate, pool: asyncpg.Pool = Depends(get_pool)):
    async with pool.acquire() as conn:
        existing = await conn.fetchrow("SELECT * FROM newsletter_subs WHERE email=$1", payload.email)
        if existing:
            return row_to_dict(existing)
        obj = NewsletterSubscription(**payload.model_dump())
        await conn.execute(
            "INSERT INTO newsletter_subs (id, email, locale, created_at) VALUES ($1,$2,$3,$4)",
            obj.id,
            obj.email,
            obj.locale,
            obj.created_at,
        )
    send_email_notification(
        subject=f"New newsletter signup: {safe_subject(obj.email)}",
        html=f"""
        <h2>New Newsletter Signup</h2>
        <p><strong>Email:</strong> <a href="mailto:{safe_text(obj.email)}">{safe_text(obj.email)}</a></p>
        <p><strong>Language:</strong> {safe_text(obj.locale)}</p>
        <p><strong>Date:</strong> {obj.created_at.strftime('%d/%m/%Y %H:%M')} UTC</p>
        """,
    )
    return obj


@api_router.get("/newsletter", response_model=List[NewsletterSubscription])
async def list_newsletter_subs(_: bool = Depends(verify_admin), pool: asyncpg.Pool = Depends(get_pool)):
    async with pool.acquire() as conn:
        rows = await conn.fetch("SELECT * FROM newsletter_subs ORDER BY created_at DESC LIMIT 500")
    return [row_to_dict(r) for r in rows]


@api_router.post("/quote", response_model=QuoteRequest, status_code=201)
async def create_quote(payload: QuoteRequestCreate, pool: asyncpg.Pool = Depends(get_pool)):
    obj = QuoteRequest(**payload.model_dump())
    async with pool.acquire() as conn:
        await conn.execute(
            """INSERT INTO quote_requests (id, name, email, phone, plan, budget, message, created_at)
               VALUES ($1,$2,$3,$4,$5,$6,$7,$8)""",
            obj.id,
            obj.name,
            obj.email,
            obj.phone,
            obj.plan,
            obj.budget,
            obj.message,
            obj.created_at,
        )
    send_email_notification(
        subject=f"New quote request from {safe_subject(obj.name)} ({safe_subject(obj.plan)})",
        html=f"""
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> {safe_text(obj.name)}</p>
        <p><strong>Email:</strong> <a href="mailto:{safe_text(obj.email)}">{safe_text(obj.email)}</a></p>
        <p><strong>Phone:</strong> {safe_text(obj.phone)}</p>
        <p><strong>Plan:</strong> {safe_text(obj.plan)}</p>
        <p><strong>Budget:</strong> {safe_text(obj.budget)}</p>
        <p><strong>Message:</strong><br>{safe_multiline(obj.message)}</p>
        <p><strong>Date:</strong> {obj.created_at.strftime('%d/%m/%Y %H:%M')} UTC</p>
        """,
    )
    return obj


@api_router.get("/quote", response_model=List[QuoteRequest])
async def list_quotes(_: bool = Depends(verify_admin), pool: asyncpg.Pool = Depends(get_pool)):
    async with pool.acquire() as conn:
        rows = await conn.fetch("SELECT * FROM quote_requests ORDER BY created_at DESC LIMIT 500")
    return [row_to_dict(r) for r in rows]


@api_router.post("/admin/login")
async def admin_login(payload: AdminLogin):
    if payload.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid password")
    return {"token": ADMIN_TOKEN}


@api_router.get("/admin/submissions")
async def admin_submissions(_: bool = Depends(verify_admin), pool: asyncpg.Pool = Depends(get_pool)):
    async with pool.acquire() as conn:
        contacts_raw = await conn.fetch("SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 1000")
        newsletter_raw = await conn.fetch("SELECT * FROM newsletter_subs ORDER BY created_at DESC LIMIT 1000")
        quotes_raw = await conn.fetch("SELECT * FROM quote_requests ORDER BY created_at DESC LIMIT 1000")
    return {
        "contacts": [row_to_dict(r) for r in contacts_raw],
        "newsletter": [row_to_dict(r) for r in newsletter_raw],
        "quotes": [row_to_dict(r) for r in quotes_raw],
    }


app.include_router(api_router)

FRONTEND_BUILD = ROOT_DIR.parent / "frontend" / "build"
if FRONTEND_BUILD.exists():
    app.mount("/static", StaticFiles(directory=str(FRONTEND_BUILD / "static")), name="static")

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        index = FRONTEND_BUILD / "index.html"
        return FileResponse(str(index))

app.add_middleware(
    CORSMiddleware,
    allow_credentials="*" not in CORS_ORIGINS,
    allow_origins=CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)
