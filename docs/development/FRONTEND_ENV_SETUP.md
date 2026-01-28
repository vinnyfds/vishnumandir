# Frontend Environment Variables Setup

**Last Updated:** 2026-01-28  
**Audience:** Developers working on form submission or CMS content flows

## Overview

The frontend (Next.js app) requires **four environment variables** for two independent flows:

| Flow | Variables | Purpose |
|------|-----------|---------|
| **Form Submission** | `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_API_KEY` | Proxy form data to Express backend |
| **CMS Content** | `CMS_API_URL`, `CMS_API_TOKEN` | Fetch announcements, events, etc. from Strapi |

Both flows run in the **same** Next.js app. If you're missing one pair, that flow breaks while the other might work, making it seem like they conflict (they don't—it's an env configuration issue).

## Local Development Setup

### Step 1: Create `frontend/.env.local`

This file ensures your local Next.js process can access all required env vars.

**Do NOT commit** `frontend/.env.local` to Git—add it to `.gitignore` (already done).

```bash
# From the project root
cp frontend/.env.local.example frontend/.env.local   # If template exists
# OR manually create and populate with values below
```

**Content of `frontend/.env.local`:**

```bash
# Form Submission Flow
NEXT_PUBLIC_API_URL="http://localhost:4000"
NEXT_PUBLIC_API_KEY="UUll+hHh86ZGHuMOAFuL9SrDw/RSWAY/QrSRQ6i0FVs="

# CMS Content Flow
CMS_API_URL="http://localhost:1337/api"
CMS_API_TOKEN="2abbbec06f6d64146f8b9a77953d381aea3a70b27a3fe950814954738b1c3f11c60a96605fc85fc615d82bdb1844c79a980f1a7bdf5e81e02e1020531cc3443ba1319f05490f88bce2500467955f93fec18d9e41839538ab36a19b5ed11e509aea54b004466ba3492c91102f8a476ccd1c68ce4421166a553ed58a66d007bd87"

# Application URL
NEXT_PUBLIC_URL="http://localhost:3000"
```

**Why `frontend/.env.local`?**

When you run `pnpm run dev:frontend` (or `cd frontend && pnpm dev`), the Next.js process starts with cwd = frontend. Next.js loads .env from the current directory, so it looks for:
- `frontend/.env`
- `frontend/.env.local`
- `frontend/.env.development` (if dev)

It does **not** automatically load the **root** `.env`. So you must have at least one .env file in the frontend directory.

### Step 2: Populate with Correct Values

**For Local Development:**

- `NEXT_PUBLIC_API_URL`: `http://localhost:4000` (your local backend)
- `NEXT_PUBLIC_API_KEY`: Copy from root `.env` or ask a teammate
- `CMS_API_URL`: `http://localhost:1337/api` (local Strapi)
- `CMS_API_TOKEN`: Copy from root `.env` or Strapi Admin Panel
- `NEXT_PUBLIC_URL`: `http://localhost:3000`

**For Production (Amplify):**

Use AWS Amplify Console (set via UI, not in code). See [docs/deployment/AMPLIFY_ENV_VARS.md](../deployment/AMPLIFY_ENV_VARS.md).

### Step 3: Run Frontend

```bash
# From project root or frontend directory
pnpm run dev:frontend
# OR
cd frontend && pnpm dev
```

**Verify both flows work:**

1. **Form Submission:**
   - Navigate to `/forms/puja-sponsorships`
   - Try submitting a test form
   - Should show success/error message (not "fetch failed")

2. **CMS Content:**
   - Navigate to home page `/`
   - Should see announcements and upcoming events
   - Check `/calendar/current-events` for events

### Step 4: Troubleshooting

**Forms fail with "fetch failed":**
- ❌ Check: `NEXT_PUBLIC_API_URL` missing or wrong
- ❌ Check: Backend not running (should be `pnpm run dev:backend`)
- ✅ Fix: Ensure `NEXT_PUBLIC_API_URL=http://localhost:4000` in `frontend/.env.local`

**CMS content not showing:**
- ❌ Check: `CMS_API_URL` missing or wrong
- ❌ Check: `CMS_API_TOKEN` missing or invalid
- ❌ Check: Strapi not running (should be `pnpm run dev:cms`)
- ✅ Fix: Ensure both CMS vars are set in `frontend/.env.local`

**I only see one issue but not the other:**
- ❌ Likely: `frontend/.env.local` only has one pair of vars
- ✅ Fix: Add both pairs (form + CMS) to the file

## Lazy Environment Variable Loading

As of 2026-01-28, the frontend Strapi integration uses lazy env loading:

**Files changed:**
- `frontend/src/lib/strapi.ts` → `getStrapiConfig()` function reads env at request time
- `frontend/src/lib/strapi-utils.ts` → Same lazy pattern

**Why?**
Ensures env vars are available even if modules are imported before env is injected (edge case, but prevents "empty token" bugs).

This matches the backend pattern in `backend/src/services/strapi.service.ts`.

## Common Issues

### Issue: Backend and Frontend .env sync

**Problem:** Root `.env` has all vars, but frontend doesn't see them.

**Solution:** Copy the required values to `frontend/.env.local`:

```bash
# From project root
grep "NEXT_PUBLIC_API_URL\|NEXT_PUBLIC_API_KEY\|CMS_API_URL\|CMS_API_TOKEN" .env >> frontend/.env.local
# Then manually verify the values are correct in frontend/.env.local
```

### Issue: Monorepo env confusion

**Problem:** Running `pnpm run dev:all` but one app (frontend vs backend) doesn't have env.

**Solution:**
- Root `.env` is for backend and CMS
- `frontend/.env.local` is for frontend
- Both must be populated for a successful `pnpm run dev:all`

### Issue: ISR cache hiding CMS changes

**Problem:** You updated Strapi but frontend still shows old content after 5 minutes.

**Solution:**
1. Wait 5 minutes (default ISR revalidation)
2. Or clear Next.js cache: `rm -rf frontend/.next`
3. Or redeploy: `pnpm run build:frontend`

## Verification Checklist

- [ ] `frontend/.env.local` exists
- [ ] All four variables set: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_API_KEY`, `CMS_API_URL`, `CMS_API_TOKEN`
- [ ] Backend running (`pnpm run dev:backend`)
- [ ] CMS running (`pnpm run dev:cms`)
- [ ] Frontend running (`pnpm run dev:frontend`)
- [ ] Forms can submit (navigate to `/forms/puja-sponsorships`, submit test form)
- [ ] CMS content visible (home page shows announcements/events)

## References

- [AMPLIFY_ENV_VARS.md](../deployment/AMPLIFY_ENV_VARS.md) – Production Amplify configuration
- [.cursorrules](../../.cursorrules) – Project rules (Section 20: Environment Variables)
- [CMS Setup](./cms-setup.md) – Strapi CMS configuration
