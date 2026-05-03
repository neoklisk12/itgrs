# ITGreece — Managed IT Services Website (PRD)

## Original Problem Statement
Multi-page marketing website for a managed IT services company targeting SMBs in Greece.
Services: web design/dev, maintenance, hosting, .gr domain registration, cybersecurity, IT support.
Primary GR with EN toggle. Trust-focused, clean, modern, responsive.

## User Choices
- Brand: placeholder "ITGreece"
- Contact form / newsletter: MongoDB-only persistence
- Blog: static/hardcoded articles
- Language: GR + EN toggle
- Live chat: UI placeholder only

## Current Architecture
- Backend: FastAPI + PostgreSQL (asyncpg). Endpoints under /api:
  - GET /api/health, GET /api/
  - POST /api/contact, GET /api/contact (admin token required)
  - POST /api/newsletter, GET /api/newsletter (admin token required)
  - POST /api/quote, GET /api/quote (admin token required)
  - POST /api/admin/login, GET /api/admin/submissions
- Frontend: React + React Router + Framer Motion + lucide-react + sonner + shadcn Accordion
- Fonts: Archivo (display) + IBM Plex Sans (body) — both support Greek
- Colors: Aegean #0F4C81, CTA #0066FF, #F8F9FA alt bg

## Pages
Home · About · Services (+ /services/:slug) · Pricing · Portfolio · Blog · FAQ · Contact · Privacy/Terms/Cookies placeholder · 404

## Global Features
- Sticky glass header with Services mega-dropdown
- GR/EN language toggle (localStorage persistence)
- GDPR cookie consent banner
- Live chat placeholder (floating button + mock panel)
- Newsletter signup in footer
- data-testid on every interactive element

## Implemented (2025-12-02)
- Full i18n for all pages (GR + EN)
- 6 services with dedicated sub-pages (benefits + 4-step process + CTA)
- 3-tier pricing with monthly/yearly toggle
- Portfolio with category filter (6 mock projects)
- Blog listing with 4 static articles
- FAQ with 7 items using shadcn Accordion
- Contact form with service selector + Google Maps embed
- Backend persistence for contact / newsletter / quote in PostgreSQL
- Password-protected admin panel for submissions
- Email notification hook via Resend

## Prioritized Backlog (P1/P2)
- P1: Blog detail pages (currently listing only)
- P2: SEO meta/OG tags per route (react-helmet-async)
- P2: Sitemap.xml + robots.txt generation
- P2: Schema.org JSON-LD for LocalBusiness
- P2: Case-study detail pages for portfolio
- P2: Cookie preferences modal (granular consent)

## Next Action Items
- Run testing agent (backend + frontend)
- Decide if email integration needed before launch
