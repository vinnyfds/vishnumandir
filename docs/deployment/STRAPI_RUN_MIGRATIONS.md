# Run Strapi Migrations to Register Content Types

**Last Updated:** 2026-01-26  
**Issue:** Content type API routes not registered - routes list shows no `/api/events`, `/api/puja-services`, etc.

## Root Cause

Strapi routes list shows NO content type routes registered. Only system routes exist (`/api/upload`, `/api/auth`, etc.). This means:
- Content type schemas exist in file system
- But database tables likely don't exist
- Strapi needs migrations to create tables and register routes

## Solution: Run Strapi Migrations

### Step 1: Check Migration Status

```bash
ssh -i /path/to/key.pem ubuntu@3.93.212.154
cd /home/ubuntu/vishnu-mandir-tampa/cms
npm run strapi migrations:status
```

### Step 2: Run Migrations

Strapi v5 uses automatic migrations. Run:

```bash
cd /home/ubuntu/vishnu-mandir-tampa/cms

# Option 1: Let Strapi auto-migrate on startup (recommended)
# Just restart Strapi - it will auto-migrate if needed
pm2 restart strapi-cms

# Option 2: Run migrations manually
npm run strapi migrate
# Or
npm run strapi migrations:run
```

### Step 3: Verify Routes Are Registered

After migrations, check routes:

```bash
npm run strapi routes:list | grep -E 'events|puja|priest|announcement|newsletter'
```

Should show routes like:
- `GET /api/events`
- `GET /api/puja-services`
- `GET /api/priests`
- etc.

### Step 4: Test API

After migrations and restart:

```bash
curl http://localhost:1337/api/events?populate=*
```

Should return `{"data":[...]}` or `{"data":[]}` instead of 404.

## Alternative: Check Strapi Admin

If migrations don't work:

1. Go to Strapi Admin: `https://cms.vishnumandirtampa.com/admin`
2. Check Content Manager - content types should appear
3. If content types don't appear, they may need to be created via Content-Type Builder
4. After creating/enabling, Strapi should auto-generate API routes

## Expected Outcome

After running migrations:
- Database tables created for all content types
- API routes registered (`/api/events`, `/api/puja-services`, etc.)
- API endpoints return data (or empty arrays)
- Frontend can fetch content
