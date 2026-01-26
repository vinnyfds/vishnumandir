# Strapi API Token - Full Access Solution

**Last Updated:** 2026-01-26  
**Issue:** Individual content types (Event, Puja Service, etc.) not visible in API Token permissions

## Problem

When editing API Token permissions in Strapi, only the "Content-type-builder" section is visible. Individual content types (Event, Puja Service, Priest, Announcement, Newsletter) do not appear in the permissions list, making it impossible to enable `find` and `findOne` permissions for them.

## Root Cause

In Strapi v5, content types may not appear in the API Token permissions list if:
1. Content types are not properly configured for API access
2. Strapi version has a UI bug
3. Content types need to be "published" or made API-accessible first

## Solution: Use Full Access Token Type

Since individual content types are not visible, the quickest solution is to change the token type to "Full access":

### Step 1: Change Token Type

1. In Strapi Admin: Settings → API Tokens → Edit your token
2. Find the **Token type** dropdown (currently set to "Custom")
3. Change it to **"Full access"**
4. Click **Save** button at the top right

### Step 2: Verify Token Type Changed

1. After saving, verify the token type is now "Full access"
2. "Full access" grants all permissions automatically, including:
   - `find` and `findOne` for all content types
   - All other API operations
   - No need to configure individual permissions

### Step 3: Test API

After changing to "Full access", test the API:

```bash
# Test Events endpoint
curl -H "Authorization: Bearer <YOUR_TOKEN>" \
  'https://cms.vishnumandirtampa.com/api/events?populate=*'
```

**Expected:** Returns `{"data":[...]}` instead of `{"data":null,"error":{...}}`

## Security Note

**Full access tokens are less secure** than custom tokens with limited permissions. However, for a headless CMS where the frontend only needs read access, this is acceptable if:
- The token is kept secret (never exposed in client-side code)
- The token is only used server-side (in Next.js API routes or Server Components)
- The CMS is properly secured with SSL and authentication

## Alternative: Check Content Type API Settings

If you want to use "Custom" token type instead, you may need to:

1. **Verify content types exist:**
   - Go to Content Manager
   - Check that Event, Puja Service, Priest, Announcement, Newsletter exist

2. **Check content type settings:**
   - In Content Manager, click on a content type (e.g., Event)
   - Look for settings or configuration options
   - Ensure "API" or "REST API" is enabled for the content type

3. **Restart Strapi:**
   - Sometimes content types need a restart to appear in permissions
   - SSH into the CMS server and restart Strapi:
     ```bash
     pm2 restart vishnu-mandir-cms
     # Or if using systemd:
     sudo systemctl restart strapi
     ```

4. **Check Strapi version:**
   - Strapi v5 may have different permission UI
   - Verify you're using a stable version

## Testing After Full Access

Use the provided test script:

```bash
./scripts/test-strapi-api.sh
```

Or test manually:

```bash
# Test all endpoints
curl -H "Authorization: Bearer <TOKEN>" \
  'https://cms.vishnumandirtampa.com/api/events?populate=*'

curl -H "Authorization: Bearer <TOKEN>" \
  'https://cms.vishnumandirtampa.com/api/puja-services?populate=*'

curl -H "Authorization: Bearer <TOKEN>" \
  'https://cms.vishnumandirtampa.com/api/priests?populate=*'

curl -H "Authorization: Bearer <TOKEN>" \
  'https://cms.vishnumandirtampa.com/api/announcements?populate=*'

curl -H "Authorization: Bearer <TOKEN>" \
  'https://cms.vishnumandirtampa.com/api/newsletters?populate=*'
```

## Expected Outcome

After changing to "Full access":
- All API endpoints should return data (or empty arrays if no content)
- Frontend should be able to fetch content from Strapi
- No more 404 errors

## Related Documentation

- `docs/deployment/STRAPI_API_PERMISSIONS_FIX.md` - General permissions guide
- `docs/deployment/STRAPI_FIND_CONTENT_TYPES_IN_PERMISSIONS.md` - Finding content types guide
- `docs/deployment/STRAPI_API_TROUBLESHOOTING.md` - Comprehensive troubleshooting
