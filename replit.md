# Coreon IT - Project Overview

## Architecture

Fullstack web application for an IT services company (Coreon IT), targeting the Greek market:

- **Frontend**: React + CRACO, running on port 5000 (dev). Built static files served by FastAPI on port 8000 (prod/preview).
- **Backend**: FastAPI (Python) + Replit PostgreSQL via asyncpg, running on port 8000 (external port 80)

## Project Structure

```
frontend/        React app (CRACO, Tailwind, Radix UI, React Router)
  src/
    pages/       Route-level page components (Admin.jsx is password-protected)
    components/  Shared UI components (layout, home sections, ui/)
    context/     LanguageContext (Greek/English i18n)
    hooks/       use-toast.js
    data/        Static data files
    i18n/        translations.js — contact info: +30 695 847 2370, contact@coreon.gr
  public/        Static assets (coreon-icon.png, etc.)
  build/         Production build — served by FastAPI backend
  .env           REACT_APP_BACKEND_URL= (empty, API calls use relative /api path)
  craco.config.js  Dev server config (port 5000, allowedHosts: all)
  src/setupProxy.js  Dev proxy: /api/* → localhost:8000

backend/         FastAPI Python backend
  server.py      Main app — all endpoints + serves React build as static files
  requirements.txt  Includes asyncpg==0.31.0
  .env           Backend env vars (see below)
```

## Key Configuration

- **Port 8000** = external port 80 (main public port). Backend serves both API and built React frontend.
- **Port 5000** = frontend dev server (hot-reload for development only)
- Frontend API calls use relative `/api` path → proxied to port 8000 in dev via setupProxy.js
- Database: Replit built-in PostgreSQL (`DATABASE_URL` env var, auto-provisioned)

## Workflows

- **Start application** — `cd frontend && npm start` (port 5000, dev hot-reload)
- **Backend API** — `cd backend && uvicorn server:app --host 0.0.0.0 --port 8000 --reload`

## Environment Variables / Secrets

- `DATABASE_URL` — Replit PostgreSQL (auto-set by Replit)
- `ADMIN_PASSWORD` — `coreon-admin-2025`
- `ADMIN_TOKEN` — `coreon-secret-token-2025`
- `NOTIFY_EMAIL` — `contact@coreon.gr`
- `RESEND_API_KEY` — Resend API key (secret)
- `CORS_ORIGINS` — `*`

## Database Schema (PostgreSQL)

Tables auto-created on startup:
- `contact_messages` (id, name, email, phone, company, service, message, created_at)
- `newsletter_subs` (id, email, locale, created_at) — unique on email
- `quote_requests` (id, name, email, phone, plan, budget, message, created_at)

## Backend API Endpoints

All routes prefixed with `/api`:
- `GET /api/health`
- `POST /api/contact` — contact form submission
- `POST /api/newsletter` — newsletter subscribe (idempotent)
- `POST /api/quote` — quote request submission
- `GET /api/contact`, `/api/newsletter`, `/api/quote` — list endpoints for admins only (Bearer token required)
- `POST /api/admin/login` — returns token for admin dashboard
- `GET /api/admin/submissions` — returns all contacts/newsletter/quotes (Bearer token required)

## Admin Dashboard

- URL: `/admin`
- Password: `coreon-admin-2025`
- Shows contacts, quote requests, newsletter subs in tabbed view

## Frontend Features

- Bilingual (Greek/English) via LanguageContext
- Pages: Home, About, Services, Industries, Pricing, Portfolio, Blog, FAQ, Contact, LegalPage
- Contact info: phone +30 695 847 2370, email contact@coreon.gr (no physical address)
- Email notifications via Resend on form submissions (domain coreon.gr must be verified in Resend)

## Deployment

- Build: `cd frontend && npm run build --legacy-peer-deps`
- Run: `cd backend && uvicorn server:app --host 0.0.0.0 --port 8000`
- After any frontend code change: rebuild with above command, then restart Backend API workflow
