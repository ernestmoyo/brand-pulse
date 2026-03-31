# Brand Pulse

**Nestle Mauritius Brand Health Intelligence Platform** — Powered by Exotica Agency

> "Own your brand data. Own your insights."

## Quick Start

### Prerequisites
- Node.js >= 18
- pnpm >= 8
- Docker & Docker Compose (for PostgreSQL)

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Start database
docker compose up -d

# 3. Run database migrations
pnpm db:generate
pnpm db:migrate

# 4. Seed demo data
pnpm db:seed

# 5. Start development servers
pnpm dev:tracker   # Brand Pulse dashboard
pnpm dev:api       # API server
```

- **Tracker:** http://localhost:5173
- **API:** http://localhost:3001
- **Pitch Deck:** Open `deck/index.html` in browser

### Demo Access

No login required — auto-authenticates as admin.

## Project Structure

```
brand-pulse/
├── apps/
│   ├── tracker/      # Brand Pulse dashboard (React + Vite)
│   └── api/          # Express API + Prisma
├── packages/
│   └── shared/       # Shared TypeScript types
├── deck/             # HTML pitch deck (14 slides)
├── reference/        # Reference materials
└── docker-compose.yml
```

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Recharts, D3.js
- **Backend:** Express, Prisma, PostgreSQL
- **Charts:** Recharts + D3.js (radar, choropleth map)
- **Reports:** PptxGenJS (PowerPoint export)

## Demo Data

- **Client:** Nestle Mauritius
- **Category:** Coffee & Hot Beverages
- **Brand:** Nescafe (vs Jacobs, Douwe Egberts, Local/Unbranded, Bru Coffee)
- **Waves:** Q1-2023 through Q2-2024 (6 quarterly waves, n=900 each)
- **Segments:** Sex, Age, SEC, Zone, District (all 12 Mauritius districts)

---

*Exotica Agency Co Ltd — Port Louis, Mauritius*
