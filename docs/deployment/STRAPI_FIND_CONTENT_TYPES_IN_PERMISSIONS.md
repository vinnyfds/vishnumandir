# How to Find Content Types in Strapi API Token Permissions

**Last Updated:** 2026-01-26  
**Purpose:** Step-by-step guide to locate and enable permissions for content types in Strapi v5 API Token settings

## Problem

Content types (Event, Puja Service, Priest, Announcement, Newsletter) are not visible in the API Token permissions list, making it impossible to enable `find` and `findOne` permissions.

## Step-by-Step Instructions

### Step 1: Access API Token Settings

1. Go to `https://cms.vishnumandirtampa.com/admin`
2. Log in with admin credentials
3. Navigate to: **Settings** → **API Tokens**
4. Find your token (the one matching `CMS_API_TOKEN` in your `.env` file)
5. Click the **edit/pencil icon** to edit the token

### Step 2: Navigate to Permissions Tab

1. You should see the token edit page with tabs: **Token**, **Permissions**
2. Click on the **Permissions** tab
3. You'll see a list of expandable sections

### Step 3: Locate Content Types

Content types appear as **expandable sections** in the permissions list. They may be:

#### Option A: Listed by Content Type Name

Look for sections named:
- **Event** (or `api::event.event`)
- **Puja Service** (or `api::puja-service.puja-service`)
- **Priest** (or `api::priest.priest`)
- **Announcement** (or `api::announcement.announcement`)
- **Newsletter** (or `api::newsletter.newsletter`)

#### Option B: Scroll Down

Content types may be **below the visible area**. Scroll down through the entire permissions list to find them.

#### Option C: Look for "Content API" Section

Some Strapi versions group content types under a "Content API" section. Expand that section to see individual content types.

### Step 4: Expand Content Type Sections

1. Click on each content type section to expand it
2. You should see sub-sections like:
   - **CONTENT-API** (or similar)
   - **PUBLISH** (optional)
   - Other actions

### Step 5: Enable Permissions

For each content type, under the **CONTENT-API** section:

1. ✅ Check **`find`** - This allows listing all items
2. ✅ Check **`findOne`** - This allows getting a single item
3. Leave other permissions unchecked unless needed

**Required Content Types:**
- ✅ Event
- ✅ Puja Service
- ✅ Priest
- ✅ Announcement
- ✅ Newsletter

### Step 6: Save Permissions

1. Scroll to the top of the page
2. Click the **Save** button (usually blue, in the top right)
3. Wait for confirmation that permissions are saved
4. **Important:** Refresh the page and verify permissions are still enabled

### Step 7: Verify Content Types Exist

If you still can't find content types in permissions, verify they exist:

1. Go to **Content Manager** in the left sidebar
2. Check **COLLECTION TYPES** section
3. You should see:
   - Event
   - Puja Service
   - Priest
   - Announcement
   - Newsletter

If these don't exist, they need to be created first.

## Alternative Solution: Full Access Token

If content types still don't appear in the permissions list:

1. In API Token settings, find **Token type** dropdown
2. Change from **"Custom"** to **"Full access"**
3. Click **Save**
4. This grants all permissions automatically (less secure but works for testing)

**Note:** You can switch back to "Custom" later once you've identified where content types appear.

## Visual Guide

The permissions list structure typically looks like:

```
Permissions
├── Content-type-builder [collapsed]
├── Email [collapsed]
├── Upload [expanded]
│   └── CONTENT-API
│       ├── find [checked]
│       ├── findOne [checked]
│       └── ...
├── i18n [collapsed]
├── Users-permissions [collapsed]
├── Event [expand this!] ← Look for this
│   └── CONTENT-API
│       ├── find [check this]
│       └── findOne [check this]
├── Puja Service [expand this!] ← Look for this
│   └── CONTENT-API
│       ├── find [check this]
│       └── findOne [check this]
└── ... (more content types below)
```

## Testing After Configuration

After enabling permissions, test with:

```bash
# Replace <TOKEN> with your CMS_API_TOKEN
curl -H "Authorization: Bearer <TOKEN>" \
  'https://cms.vishnumandirtampa.com/api/events?populate=*'
```

**Success:** Returns `{"data":[...]}` or `{"data":[]}`  
**Failure:** Returns `{"data":null,"error":{"status":404,...}}`

## Troubleshooting

### Content Types Not Visible

**Possible causes:**
- Content types not created in Strapi
- Permissions UI bug
- Need to scroll further down
- Strapi version difference

**Solutions:**
1. Verify content types exist in Content Manager
2. Try "Full access" token type
3. Scroll through entire permissions list
4. Check Strapi version (should be v5)

### Permissions Enabled But Still 404

**Possible causes:**
- Permissions not saved
- Wrong content type names
- Token value mismatch

**Solutions:**
1. Verify save was successful (refresh page)
2. Check token value matches `CMS_API_TOKEN` in `.env`
3. Test with curl to see exact error message

## Related Documentation

- `docs/deployment/STRAPI_API_PERMISSIONS_FIX.md` - General permissions fix guide
- `docs/deployment/STRAPI_API_TROUBLESHOOTING.md` - Comprehensive troubleshooting
