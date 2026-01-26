# Fix Strapi API 404 Errors - Configure Permissions

**Last Updated:** 2026-01-26  
**Status:** Action Required

## Problem

The Strapi API is returning `404 Not Found` errors when the frontend tries to fetch events:

```json
{
  "data": null,
  "error": {
    "status": 404,
    "name": "NotFoundError",
    "message": "Not Found"
  }
}
```

This happens even with a valid API token, indicating a permissions issue.

## Root Cause

In Strapi v5, content types require explicit permissions to be configured for API access. The API token or Public role must have `find` and `findOne` permissions enabled for each content type (Event, Puja Service, Priest, etc.).

## Solution

### Option 1: Configure API Token Permissions (Recommended)

If you're using an API token (which the frontend does), configure the token's permissions:

1. **Access Strapi Admin Panel:**
   - Go to `https://cms.vishnumandirtampa.com/admin`
   - Log in with admin credentials

2. **Navigate to API Tokens:**
   - Settings → API Tokens
   - Find the token that matches your `CMS_API_TOKEN` environment variable
   - Click the edit/pencil icon

3. **Enable Permissions:**
   - For each content type (Event, Puja Service, Priest, Newsletter, Announcement):
     - Enable `find` permission (to list items)
     - Enable `findOne` permission (to get single item)
   - Click **Save**

### Option 2: Configure Public Role Permissions

Alternatively, configure the Public role (for unauthenticated requests):

1. **Access Strapi Admin Panel:**
   - Go to `https://cms.vishnumandirtampa.com/admin`
   - Log in with admin credentials

2. **Navigate to Public Role:**
   - Settings → Users & Permissions Plugin → Roles → Public
   - Click the edit/pencil icon

3. **Enable Permissions:**
   - For each content type (Event, Puja Service, Priest, Newsletter, Announcement):
     - Enable `find` permission
     - Enable `findOne` permission
   - Click **Save**

## Content Types That Need Permissions

Configure permissions for all of these content types:

- ✅ **Event** - Required for `/education/events` and `/calendar/current-events`
- ✅ **Puja Service** - Required for `/religious/puja-services`
- ✅ **Priest** - Required for `/religious/priests`
- ✅ **Newsletter** - Required for `/calendar/newsletter`
- ✅ **Announcement** - Required for home page announcements
- ✅ **Page** - Required for dynamic page content (if used)

## Verification

After configuring permissions, test the API:

```bash
# Test with API token
curl -H "Authorization: Bearer <CMS_API_TOKEN>" \
  'https://cms.vishnumandirtampa.com/api/events?populate=*'

# Should return:
# {"data":[...]} instead of {"data":null,"error":{...}}
```

## Frontend Debug Logging

Debug logging has been added to help diagnose issues:

- `frontend/src/lib/strapi.ts` - Logs API responses and errors
- `frontend/src/app/(site)/education/events/page.tsx` - Logs fetched and filtered events

In development mode, check the console/terminal for:
- `[strapi] Fetched events:` - Shows API response details
- `[strapi] fetchEvents result:` - Shows filtered results
- `[education/events] Fetched events:` - Shows events before future filter
- `[education/events] Future events:` - Shows final count after filtering

## Additional Checks

After fixing permissions, also verify:

1. **Event Category:** Events must have `category: "Educational"` (exact match, case-sensitive) to appear on `/education/events`
2. **Event Date:** Events must have a future date/time to pass the `isFutureEvent()` filter
3. **Published Status:** Events must have `publishedAt` set (not null) to be included

## Related Documentation

- `docs/deployment/AMPLIFY_ENV_VARS.md` - Environment variable configuration
- `docs/deployment/CMS_SSL_SETUP.md` - CMS SSL and access configuration
