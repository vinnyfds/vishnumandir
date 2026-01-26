# Strapi v5 API Routes Not Registered - 404 Errors

**Last Updated:** 2026-01-26  
**Issue:** Content types return 404 even on localhost, indicating routes aren't registered

## Critical Finding

Even `localhost:1337/api/events` returns 404, which means:
- Content types exist in file system (`src/api/event/`, etc.)
- Schemas are valid JSON
- Strapi is running successfully
- But REST API routes are NOT being registered

## Root Cause

In Strapi v5, content types should automatically generate REST API routes, but they may not be registered if:
1. Content types aren't properly loaded/registered on startup
2. Database tables don't exist (migrations not run)
3. Content types need to be "published" or enabled for API access
4. Strapi configuration prevents automatic route generation

## Diagnostic Steps Completed

- ✅ Content type schemas exist and are valid JSON
- ✅ Strapi admin panel builds successfully
- ✅ Strapi starts without errors
- ❌ API routes return 404 even on localhost
- ❌ Database tables check (psql not available on server)

## Solution: Check Database Tables and Run Migrations

The most likely issue is that database tables don't exist. Strapi needs database tables to register API routes.

### Step 1: Verify Database Connection

Check if Strapi can connect to database:

```bash
ssh -i /path/to/key.pem ubuntu@3.93.212.154
cd /home/ubuntu/vishnu-mandir-tampa/cms
# Check .env has correct database credentials
cat .env | grep DATABASE
```

### Step 2: Run Strapi Migrations

Strapi may need to create database tables:

```bash
cd /home/ubuntu/vishnu-mandir-tampa/cms
npm run strapi migrations:run
# Or
npm run strapi migrate
```

### Step 3: Check if Tables Exist

If you have database access, verify tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('events', 'puja_services', 'priests', 'announcements', 'newsletters');
```

### Step 4: Restart Strapi After Migrations

```bash
pm2 restart strapi-cms
pm2 logs strapi-cms --lines 50
```

## Alternative: Check Content Type API Settings

In Strapi Admin Panel:

1. Go to Content Manager
2. Click on a content type (e.g., Event)
3. Look for settings/configuration
4. Verify "REST API" or "API" is enabled
5. Some Strapi versions require explicit API enablement

## Expected Outcome

After running migrations and restarting:
- Database tables exist for all content types
- Strapi registers API routes on startup
- `localhost:1337/api/events` returns data (or empty array)
- Public API endpoints work

## Related Documentation

- Strapi v5 Routes Documentation: https://docs.strapi.io/cms/backend-customization/routes
- Strapi REST API Reference: https://docs.strapi.io/dev-docs/api/rest
