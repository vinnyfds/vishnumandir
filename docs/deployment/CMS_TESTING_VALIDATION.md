# CMS Content Testing & Validation Guide

**Last Updated:** 2026-01-26  
**Purpose:** Complete guide to testing CMS-to-frontend content flow for all content types

## Quick Start: Test All Content Types

### Option 1: Run Test Script (Recommended)

```bash
cd /path/to/project
./scripts/test-cms-frontend-integration.sh
```

This will:
- Test API connectivity to each endpoint
- Verify response structures
- Count published items
- Report any permission issues
- Provide recommendations

### Option 2: Use Debug Endpoint

```bash
# Local development
curl http://localhost:3000/api/debug/cms

# Production
curl https://vishnumandirtampa.com/api/debug/cms
```

Returns JSON with:
- Environment variable status
- Test results for each content type
- Item counts
- Recommendations

## Manual Testing by Content Type

### 1. Event

**Content Type Location:** Strapi Admin → Content Manager → Event

**Frontend Pages:**
- `/` (home page - featured events)
- `/calendar/current-events` (all upcoming events)
- `/education/events` (educational category only)

**Required Fields:**
- ✓ Title
- ✓ Date (must be today or future)
- ✓ Start Time (must be in future, HH:mm:ss format)
- ✓ Category (Religious, Cultural, Educational, Festival)
- Description (optional, rich text)
- Image (optional)

**Test Steps:**

1. **Create Event in Strapi:**
   ```
   Title: Test Event - Future Time
   Category: Educational
   Date: 2026-01-28 (or tomorrow)
   Start Time: 19:00:00 (7:00 PM)
   End Time: 20:00:00 (8:00 PM)
   Description: This is a test educational event
   ```

2. **Publish the Event:**
   - Click "Save"
   - Click "Publish"
   - Verify status shows "Published"

3. **Test in Frontend:**
   - Wait 1 minute (ISR cache)
   - Go to `/education/events`
   - Should see "Test Event - Future Time" in the list

4. **Verify on Other Pages:**
   - `/` (home) - should show in "Upcoming Festivals & Events"
   - `/calendar/current-events` - should show in list

**Debug:**
- If not showing, check:
  - ✓ Is Published (not Draft)
  - ✓ Date is today or future
  - ✓ Time is in future
  - ✓ Category matches page filter (Educational)

---

### 2. Announcement

**Content Type Location:** Strapi Admin → Content Manager → Announcement

**Frontend Pages:**
- `/` (home page - "What's Happening Now" section)

**Required Fields:**
- ✓ Title
- ✓ Content (rich text)
- Level (Info or High-Priority - optional)
- Display Until (date - optional, hides after this date)

**Test Steps:**

1. **Create Announcement in Strapi:**
   ```
   Title: Temple Event Announcement
   Content: Important update about upcoming events and services
   Level: Info
   Display Until: 2026-02-26 (30 days from now)
   ```

2. **Publish:**
   - Click "Save"
   - Click "Publish"

3. **Test in Frontend:**
   - Wait 1 minute
   - Go to `/`
   - Should see in "What's Happening Now" section
   - High-Priority announcements appear first

**Debug:**
- If not showing:
  - ✓ Is Published
  - ✓ Display Until date is in future (or empty)
  - ✓ Check console for API errors

---

### 3. Newsletter

**Content Type Location:** Strapi Admin → Content Manager → Newsletter

**Frontend Pages:**
- `/calendar/newsletter` (newsletter archive)

**Required Fields:**
- ✓ Title
- ✓ Publication Date
- ✓ File (PDF upload)

**Test Steps:**

1. **Create Newsletter in Strapi:**
   ```
   Title: January 2026 Newsletter
   Publication Date: 2026-01-26
   File: [Upload a PDF file]
   ```

2. **Upload PDF:**
   - Click File field
   - Upload a test PDF
   - Should see filename after upload

3. **Publish:**
   - Click "Save"
   - Click "Publish"

4. **Test in Frontend:**
   - Wait 1 minute
   - Go to `/calendar/newsletter`
   - Should see newsletter in archive
   - Should have download link to PDF

**Debug:**
- If not showing:
  - ✓ Is Published
  - ✓ File is uploaded (not just filename)
  - ✓ File is PDF format

---

### 4. Priest

**Content Type Location:** Strapi Admin → Content Manager → Priest

**Frontend Pages:**
- `/religious/priests` (priest profiles)

**Required Fields:**
- ✓ Name
- Title (optional)
- Bio (optional, rich text)
- Profile Image (optional)

**Test Steps:**

1. **Create Priest in Strapi:**
   ```
   Name: Father Raj Kumar
   Title: Head Priest
   Bio: With 20+ years of experience in Hindu traditions
   Profile Image: [Upload image]
   ```

2. **Upload Image:**
   - Click Profile Image field
   - Upload a photo
   - Should see image preview

3. **Publish:**
   - Click "Save"
   - Click "Publish"

4. **Test in Frontend:**
   - Wait 1 minute
   - Go to `/religious/priests`
   - Should see priest card with name, title, image

**Debug:**
- If not showing:
  - ✓ Is Published
  - ✓ Name is filled (required)
  - ✓ Image is uploaded (if showing empty card)

---

### 5. Puja Service

**Content Type Location:** Strapi Admin → Content Manager → Puja Service

**Frontend Pages:**
- `/religious/puja-services` (puja services catalog)

**Required Fields:**
- ✓ Name
- ✓ Price (decimal number)
- ✓ Location (In Temple or Off-site)
- Description (optional, rich text)
- Notes (optional)
- Image (optional)

**Test Steps:**

1. **Create Puja Service in Strapi:**
   ```
   Name: Lakshmi Puja
   Description: Special puja for prosperity and wealth
   Price: 251.00
   Location: In Temple
   Notes: Includes flowers, incense, and prasad
   Image: [Upload image]
   ```

2. **Publish:**
   - Click "Save"
   - Click "Publish"

3. **Test in Frontend:**
   - Wait 1 minute
   - Go to `/religious/puja-services`
   - Should see service card with name, description, price

**Debug:**
- If not showing:
  - ✓ Is Published
  - ✓ Price is a number (not $251 or other format)
  - ✓ Location is selected (In Temple or Off-site)
  - ✓ Image is uploaded (if showing empty card)

---

## Comprehensive Test Checklist

### Setup

- [ ] Environment variables set in Amplify Console:
  - [ ] `CMS_API_URL` = `https://cms.vishnumandirtampa.com/api`
  - [ ] `CMS_API_TOKEN` = (valid token)
- [ ] Strapi API token has permissions:
  - [ ] Token type is "Full access" OR
  - [ ] Custom token has `find`/`findOne` for each content type
- [ ] Run test script: `./scripts/test-cms-frontend-integration.sh`
  - [ ] All endpoints return status "success"
  - [ ] No errors in output

### Content Creation

- [ ] Event created with future date/time
  - [ ] Published (not Draft)
  - [ ] Category: Educational (or other)
  - [ ] Appears on `/education/events`
  - [ ] Appears on `/calendar/current-events`

- [ ] Announcement created
  - [ ] Published
  - [ ] Display Until is future date
  - [ ] Appears on `/`

- [ ] Newsletter created with PDF
  - [ ] Published
  - [ ] File uploaded successfully
  - [ ] Appears on `/calendar/newsletter`

- [ ] Priest created with name
  - [ ] Published
  - [ ] Appears on `/religious/priests`

- [ ] Puja Service created with price
  - [ ] Published
  - [ ] Appears on `/religious/puja-services`

### Frontend Verification

- [ ] `/` (home page)
  - [ ] Shows announcements in "What's Happening Now"
  - [ ] Shows events in "Upcoming Festivals & Events"

- [ ] `/calendar/current-events`
  - [ ] Shows all future events

- [ ] `/education/events`
  - [ ] Shows only Educational category events

- [ ] `/religious/puja-services`
  - [ ] Shows all puja services

- [ ] `/religious/priests`
  - [ ] Shows all priests

- [ ] `/calendar/newsletter`
  - [ ] Shows newsletters with download links

### Debug Verification

- [ ] Test script passes:
  ```bash
  ./scripts/test-cms-frontend-integration.sh
  # Should show all "successful"
  ```

- [ ] Debug endpoint returns success:
  ```bash
  curl https://vishnumandirtampa.com/api/debug/cms
  # Should have "successful": 5 or more
  ```

- [ ] Browser console clear of API errors
  - Open DevTools (F12)
  - Check Console tab
  - No red error messages about CMS API

---

## Content Type Summary

| Type | Pages | Required Fields | Notes |
|------|-------|-----------------|-------|
| Event | 3 pages | Title, Date, Start Time, Category | Past dates/times hidden |
| Announcement | 1 page | Title, Content | Expiration supported |
| Newsletter | 1 page | Title, Date, File (PDF) | Must upload PDF |
| Priest | 1 page | Name | Title/Bio optional |
| Puja Service | 1 page | Name, Price, Location | Price as decimal |

---

## Troubleshooting Matrix

| Issue | Likely Cause | Solution |
|-------|--------------|----------|
| "No content" on all pages | Token permissions | Change to "Full access" type |
| 404 errors in console | CMS_API_URL wrong | Verify URL ends with `/api` |
| 403 Forbidden | Token invalid/expired | Create new token in Strapi |
| Content appears then disappears | Past date/time | Verify event date is future |
| Content not updating | ISR cache | Wait 5 minutes or redeploy |
| Test script fails | API unreachable | Check Strapi server is running |

---

## Next Steps After Testing

1. **All tests passing?**
   - ✅ Content is flowing from CMS to frontend
   - ✅ Users can see published content
   - ✅ System is working correctly

2. **Issues found?**
   - See troubleshooting section above
   - Run test script again after fixes
   - Check debug endpoint for status

3. **Ready for production?**
   - Ensure all environment variables set
   - Test on staging/production URLs
   - Monitor /api/debug/cms endpoint
   - Update CHANGELOG.md with fixes

---

## Related Documentation

- [STRAPI_PERMISSIONS_VERIFICATION.md](./STRAPI_PERMISSIONS_VERIFICATION.md)
- [AMPLIFY_ENV_VARS.md](./AMPLIFY_ENV_VARS.md)
- [FIX_CMS_CONTENT_DISPLAY.md](./FIX_CMS_CONTENT_DISPLAY.md)
