# CMS Content Not Displaying - Quick Fix Guide

**Status:** Content IS working! Follow these steps to see it on your site.

## Quick Diagnosis

If you recently published content in Strapi but it's not showing on the website, **this is normal**. Here's why:

### How It Works

1. **Frontend uses ISR (Incremental Static Regeneration)**
   - Pages are pre-rendered at deploy time
   - Pages cache for:
     - **5 minutes** for dynamic content (Events, Announcements)
     - **1 hour** for static content (Priests, Puja Services)
   - After cache expires, new content fetches automatically

2. **Your Content Is Already in CMS**
   - Debug endpoint confirms all API endpoints working
   - Events, Announcements, Newsletters are all accessible via API

## Solution: Force Frontend Redeploy

**If you want content to appear IMMEDIATELY** (don't want to wait 5 minutes):

### Option 1: Redeploy via AWS Amplify Console (RECOMMENDED)

1. **Open AWS Amplify Console**
   - URL: https://console.aws.amazon.com/amplifyapp/
   - Select app: `vishnumandir`

2. **Go to Deployments Tab**
   - Click **Deployments** (left sidebar)
   - Find the latest deployment
   - Click **Redeploy this version**

3. **Wait for Deployment**
   - Status will change to "In progress"
   - Takes 5-10 minutes to complete
   - Status changes to "Succeed" when done

4. **Visit Website**
   - Refresh: https://vishnumandirtampa.com
   - New CMS content should appear immediately

### Option 2: Wait for Automatic Refresh (FREE)

1. **Just wait 5 minutes**
   - Frontend automatically revalidates cache
   - New content appears without redeploy
   - No action needed

### Option 3: Use Git Push (For Developers)

```bash
cd /path/to/project
git add .
git commit -m "Trigger frontend redeploy"
git push origin main
```

This automatically triggers Amplify to redeploy.

## Verification

### Check If Content Is Available

1. **Test Debug Endpoint**
   ```bash
   curl https://vishnumandirtampa.com/api/debug/cms
   ```
   - Should show `"successful": 5` or higher
   - Should show `"errors": 0`

2. **Check Individual Content Type**
   ```bash
   curl https://vishnumandirtampa.com/api/debug/cms | jq '.results[] | select(.endpoint=="events")'
   ```
   - Should show `"status": "success"`
   - Should show `"itemCount": 1` or higher

### Check Strapi Content

1. **Access Strapi Admin**
   - URL: https://cms.vishnumandirtampa.com/admin
   - Login with credentials

2. **Verify Content Type**
   - Go to **Content Manager**
   - Select content type (e.g., "Event")
   - Verify content exists and shows **Published** status
   - For Events: Check date is in the FUTURE

## Common Scenarios

### Scenario 1: "I published content but it doesn't show"
**Solution:** Redeploy frontend (5-10 min) OR wait 5 minutes for ISR

### Scenario 2: "Content shows in Strapi but not on website"
**Solution:**
1. Verify content is PUBLISHED (not Draft)
2. Verify date is FUTURE (for Events)
3. Verify displayUntil is FUTURE (for Announcements)
4. Redeploy or wait 5 minutes

### Scenario 3: "I see placeholder content instead of CMS content"
**Solution:** Same as Scenario 1 - redeploy or wait 5 minutes

### Scenario 4: "Content was there but disappeared"
**Possible Causes:**
1. Content was deleted from Strapi
2. Content was unpublished (changed to Draft)
3. Event date is now in the past
4. Announcement displayUntil has passed

**Solution:**
1. Check Strapi Content Manager
2. Republish if needed
3. Fix dates/times if needed
4. Redeploy or wait 5 minutes

## ISR Cache Times

These are when new content appears automatically without redeploying:

| Content Type | Cache Time | When Content Appears |
|---|---|---|
| Events | 5 min | After 5 min automatic refresh |
| Announcements | 5 min | After 5 min automatic refresh |
| Priests | 1 hour | After 1 hour automatic refresh |
| Puja Services | 1 hour | After 1 hour automatic refresh |
| Newsletters | 1 hour | After 1 hour automatic refresh |

## How to Tell Content Is Loading

### Check Browser Network Tab

1. **Open Developer Tools** (F12)
2. **Go to Network tab**
3. **Refresh page** (Cmd+R or Ctrl+R)
4. **Look for `/api/` requests**
   - Should see calls to Strapi API
   - Should all return **200 OK** status

### Check Browser Console

1. **Open Developer Tools** (F12)
2. **Go to Console tab**
3. **Look for messages** (if any)
   - No red errors should appear
   - May see informational logs (gray text)

## Still Not Seeing Content?

Follow this checklist:

- [ ] Visited `/api/debug/cms` and confirmed successful tests
- [ ] Logged into Strapi and verified content is PUBLISHED
- [ ] Checked event dates are in the FUTURE
- [ ] Checked announcement displayUntil is in the FUTURE
- [ ] Redeployed frontend via Amplify
- [ ] Waited 10 minutes after redeploy
- [ ] Cleared browser cache (Cmd+Shift+Del or Ctrl+Shift+Del)
- [ ] Refreshed website (Cmd+R or Ctrl+R)
- [ ] Checked browser console for errors
- [ ] Checked browser Network tab (no 404 or 500 errors)

If still not working, see [FIX_CMS_PRODUCTION_DISPLAY.md](./FIX_CMS_PRODUCTION_DISPLAY.md) for comprehensive troubleshooting.

## Quick Reference: Frontend Pages and Their Content

| Page | Content Type | Source |
|---|---|---|
| `/` (Home) | Announcements + Featured Events | Strapi |
| `/calendar/current-events` | All Events | Strapi |
| `/education/events` | Educational Events | Strapi |
| `/religious/puja-services` | Puja Services | Strapi |
| `/religious/priests` | Priest Profiles | Strapi |
| `/calendar/newsletter` | Newsletter Archive | Strapi |

---

**Summary:** Content is working correctly! You just need to redeploy the frontend to see newly published content immediately, or wait 5 minutes for automatic cache refresh.
