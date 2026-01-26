# Strapi CMS Setup

This document describes how to set up and access the Strapi headless CMS used for Vishnu Mandir, Tampa content (events, puja services, pages, etc.).

## Prerequisites

- **Node.js 20–24** (Strapi does not support Node 25+). Use `nvm` or `fnm` if needed.
- **PostgreSQL** running (e.g. via `docker compose up -d db`). The main app uses `vishnu_mandir_tampa`; Strapi uses a separate DB `vishnu_mandir_cms`.

## Database

Strapi uses PostgreSQL with a **separate database** `vishnu_mandir_cms` to avoid table clashes with the main app.

1. **Create the CMS database** (if it does not exist):
   - **First-time Docker Postgres:** The init script in `docker/postgres-init/01-create-cms-db.sh` creates `vishnu_mandir_cms` when the Postgres volume is first initialized.
   - **Existing Postgres:** Run:
     ```bash
     createdb -U mandir_admin vishnu_mandir_cms
     ```
     (or `docker exec -it <db-container> createdb -U mandir_admin vishnu_mandir_cms` if using Docker.)

2. **Configure Strapi:** Copy `cms/.env.example` to `cms/.env` and set `DATABASE_*` to match your Postgres (user, password, host, etc.). Use `DATABASE_NAME=vishnu_mandir_cms`.

## Running Strapi

From the **project root**:

```bash
pnpm run dev:cms
```

Or from `cms/`:

```bash
cd cms && pnpm develop
```

- **Admin panel:** [http://localhost:1337/admin](http://localhost:1337/admin)
- **REST API base:** [http://localhost:1337/api](http://localhost:1337/api)

## First-Time Setup

1. **Start Strapi** (`pnpm run dev:cms`).
2. Open [http://localhost:1337/admin](http://localhost:1337/admin).
3. **Register the first admin user** (form on first load). This account is the initial administrator.
4. Use that account to log in whenever you access `/admin`.

## Roles & Permissions (RBAC)

Configure in **Settings → Users & Permissions → Roles**.

### Public role

Enable **find** and **findOne** for every content type the Next.js frontend reads:

- Event, Puja Service, Priest, Announcement, Newsletter, Page

This allows unauthenticated API access to published content (e.g. `GET /api/events`).

### Custom roles

Create and configure these roles per [Authorization & Access Control](../security/authorization-&-access-control.md):

| Role           | Permissions |
|----------------|-------------|
| **Editor**     | Pages, Announcements, Newsletter: C,R,U. Puja Services: R,U. Media: C,R,U,D. Events / Puja Schedule: Read-only. |
| **Event Manager** | Event Calendar, Puja Schedule: C,R,U,D. Media: C,R,U,D. Pages, Puja Services: Read-only. |
| **Finance**    | No CMS content editing. Financial data is managed via the custom backend API. |

**Admin** has full control by default.

Create users in **Settings → Users & Permissions → Users** and assign the appropriate role.

## API token (for Next.js)

1. In Strapi admin: **Settings → API Tokens → Create new API Token**.
2. Name it (e.g. “Next.js frontend”). Use **Read-only** if the frontend only fetches content.
3. Copy the token and set it in the **root** `.env` (or `.env.local`):
   ```bash
   CMS_API_TOKEN=<your-token>
   CMS_API_URL="http://localhost:1337/api"
   ```
4. The Next.js app uses these to call Strapi (e.g. `GET /api/events`, `GET /api/puja-services`).

## Content types

The following collection types exist in `cms/src/api/`:

- **Event** – Calendar events (title, slug, date, start/end time, category, description, image, location, registrationLink).
- **Puja Service** – Service catalog (name, slug, description, price, location, notes, image, relation to Priest).
- **Priest** – Priest profiles (name, title, bio, profileImage).
- **Announcement** – Site announcements (title, content, displayUntil, level).
- **Newsletter** – Newsletter PDFs (title, publicationDate, file).
- **Page** – Static pages (title, slug, content).

All use **Draft & Publish**. Only published entries are returned by the Public API.

## Docker note

If you run Strapi inside Docker but Postgres on the host, set `DATABASE_HOST=host.docker.internal` in `cms/.env` so Strapi can reach Postgres.
