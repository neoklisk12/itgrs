"""Backend API tests for ITGreece FastAPI service.

Covers: health, contact (POST/GET + validation), newsletter (POST idempotency/GET),
quote (POST).
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # Fallback: read from frontend/.env which is the source of truth for public URL
    try:
        with open("/app/frontend/.env", "r", encoding="utf-8") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().strip('"').strip("'")
                    break
    except Exception:
        pass

assert BASE_URL, "REACT_APP_BACKEND_URL is required"
BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "coreon-secret-token-2025")


@pytest.fixture(scope="session")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def admin_headers():
    return {"Authorization": f"Bearer {ADMIN_TOKEN}"}


# ---------- Health ----------
class TestHealth:
    def test_health(self, client):
        r = client.get(f"{API}/health", timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("status") == "healthy"
        assert "timestamp" in data


# ---------- Contact ----------
class TestContact:
    def test_contact_create_valid(self, client, admin_headers):
        payload = {
            "name": "TEST_User",
            "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
            "phone": "+30 210 1234567",
            "company": "TEST_Co",
            "service": "web-design",
            "message": "Hello, TEST message for ITGreece.",
        }
        r = client.post(f"{API}/contact", json=payload, timeout=20)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["email"] == payload["email"]
        assert data["name"] == payload["name"]
        assert data["message"] == payload["message"]
        assert "id" in data and isinstance(data["id"], str)
        assert "_id" not in data

        # Verify persistence via GET
        lr = client.get(f"{API}/contact", headers=admin_headers, timeout=20)
        assert lr.status_code == 200
        items = lr.json()
        assert isinstance(items, list)
        assert any(i.get("email") == payload["email"] for i in items), "Posted contact not found in GET list"
        assert all("_id" not in i for i in items), "MongoDB _id leaked in response"

    def test_contact_invalid_email(self, client):
        payload = {"name": "TEST_User", "email": "not-an-email", "message": "Hello there"}
        r = client.post(f"{API}/contact", json=payload, timeout=20)
        assert r.status_code == 422, r.text

    def test_contact_missing_fields(self, client):
        r = client.post(f"{API}/contact", json={"email": "a@b.com"}, timeout=20)
        assert r.status_code == 422

    def test_contact_list_requires_admin(self, client):
        r = client.get(f"{API}/contact", timeout=20)
        assert r.status_code in (401, 403)


# ---------- Newsletter ----------
class TestNewsletter:
    def test_subscribe_and_idempotent(self, client):
        email = f"news_{uuid.uuid4().hex[:8]}@example.com"
        r1 = client.post(f"{API}/newsletter", json={"email": email, "locale": "el"}, timeout=20)
        assert r1.status_code == 201, r1.text
        d1 = r1.json()
        assert d1["email"] == email
        assert "_id" not in d1
        first_id = d1["id"]

        # Duplicate - should return existing subscription (idempotent)
        r2 = client.post(f"{API}/newsletter", json={"email": email}, timeout=20)
        assert r2.status_code in (200, 201), r2.text
        d2 = r2.json()
        assert d2["email"] == email
        assert d2["id"] == first_id, "Duplicate subscription should be idempotent (same id)"

    def test_list_newsletter(self, client, admin_headers):
        r = client.get(f"{API}/newsletter", headers=admin_headers, timeout=20)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert all("_id" not in i for i in items)

    def test_newsletter_invalid_email(self, client):
        r = client.post(f"{API}/newsletter", json={"email": "bad"}, timeout=20)
        assert r.status_code == 422

    def test_newsletter_list_requires_admin(self, client):
        r = client.get(f"{API}/newsletter", timeout=20)
        assert r.status_code in (401, 403)


# ---------- Quote ----------
class TestQuote:
    def test_create_quote(self, client):
        payload = {
            "name": "TEST_Quote",
            "email": f"quote_{uuid.uuid4().hex[:8]}@example.com",
            "plan": "Professional",
            "budget": "500-1000",
            "message": "TEST quote request",
        }
        r = client.post(f"{API}/quote", json=payload, timeout=20)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["plan"] == "Professional"
        assert data["email"] == payload["email"]
        assert "id" in data
        assert "_id" not in data

    def test_quote_list_requires_admin(self, client):
        r = client.get(f"{API}/quote", timeout=20)
        assert r.status_code in (401, 403)
