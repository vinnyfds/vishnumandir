# CMS Production Display Fix - Implementation Checklist

**Status:** In Progress  
**Last Updated:** 2026-01-27  
**Goal:** Fix CMS content not displaying on production frontend at https://vishnumandirtampa.com

---

## Phase 1: Verify Setup ✅

- [x] Reviewed current codebase and deployment status
- [x] Enhanced debug endpoint with response time metrics
- [x] Built frontend with no TypeScript errors
- [x] Verified Strapi library integration is complete
- [x] Confirmed ISR caching is configured (5 minutes)

### Details
- Debug endpoint at `/api/debug/cms` enhanced with:
  - Response time measurements (responseTimeMs)
  - Better error detection (auth vs timeout vs connection)
  - Detailed recommendations based on errors
  - Performance metrics (average response time)
- Frontend builds successfully with all routes configured
- Strapi client properly handles v4/v5 response normalization
- All content pages use async Server Components with ISR

---

## Phase 2: Environment Variable Verification

### Task 2.1: AWS Amplify Configuration
- [ ] Access AWS Amplify Console (https://console.aws.amazon.com/amplifyapp/)
- [ ] Select app: `vishnumandir` (App ID: `d1rp3bwb0j3dq8`)
- [ ] Navigate to **App Settings** → **Environment variables**
- [ ] Verify `CMS_API_URL` = `https://cms.vishnumandirtampa.com/api`
- [ ] Verify `CMS_API_TOKEN` is set and not empty
- [ ] If missing, add variables and click **Save**
- [ ] If variables changed, trigger new deployment
- [ ] Wait for deployment to complete (5-10 minutes)

### Task 2.2: Test Debug Endpoint
- [ ] Visit https://vishnumandirtampa.com/api/debug/cms in browser
- [ ] Check response for:
  - `environment.cms_api_url_set: true`
  - `environment.cms_api_token_set: true`
  - `summary.errors: 0`
  - `summary.successful: 6` (all content types)
- [ ] If not passing, proceed to Phase 3

### Task 2.3: Local Testing (from your machine)
- [ ] Run: `curl https://vishnumandirtampa.com/api/debug/cms`
- [ ] Verify response shows all tests passing
- [ ] Check response times are < 1000ms
- [ ] If timeout, check CMS server is running

---

## Phase 3: CMS API Token Verification

### Task 3.1: Test Token Directly
- [ ] Get `CMS_API_TOKEN` value from Amplify Console
- [ ] Run test command:
  ```bash
  curl -H "Authorization: Bearer YOUR_TOKEN" \
    'https://cms.vishnumandirtampa.com/api/events?populate=*&pagination[limit]=1'
  ```
- [ ] Check response:
  - HTTP 200 with data = ✅ Token working
  - HTTP 401 = Token invalid, regenerate new one
  - HTTP 403 = Token lacks permissions, fix in Strapi

### Task 3.2: Fix Token if Needed
- [ ] Access Strapi Admin: https://cms.vishnumandirtampa.com/admin
- [ ] Login with admin credentials
- [ ] Go to **Settings** → **API Tokens**
- [ ] Find your token in the list
- [ ] Click token to edit
- [ ] Change "Token type" dropdown to **"Full access"**
- [ ] Click **Save**
- [ ] Test token again with curl (should now return 200)
- [ ] If regenerated, update `CMS_API_TOKEN` in Amplify
- [ ] Trigger new deployment

### Task 3.3: Verify Fix
- [ ] Visit `/api/debug/cms` endpoint again
- [ ] Verify `summary.errors: 0`
- [ ] All content types should show "success"

---

## Phase 4: Verify Content in Strapi

### Task 4.1: Check Events
- [ ] Login to Strapi Admin: https://cms.vishnumandirtampa.com/admin
- [ ] Go to **Content Manager** → **Event**
- [ ] Verify at least one event exists
- [ ] Click each event:
  - [ ] Check **Published** status (green checkmark)
  - [ ] Verify date is in the FUTURE (past events hidden)
  - [ ] If Draft, click **Publish** button
- [ ] Expected: At least 1 published event with future date

### Task 4.2: Check Announcements
- [ ] Go to **Content Manager** → **Announcement**
- [ ] Verify at least one announcement exists
- [ ] Click each announcement:
  - [ ] Check **Published** status
  - [ ] Verify `displayUntil` date is FUTURE
  - [ ] If past date, edit and set future date
- [ ] Expected: At least 1 published announcement

### Task 4.3: Check Other Content Types
- [ ] **Puja Services** → At least 1 published with title + description
- [ ] **Priests** → At least 1 published with name + profileImage
- [ ] **Newsletters** → At least 1 published with PDF file
- [ ] All should have green **Published** status

### Task 4.4: Content Verification Summary
- [ ] Events: ____ published (with future dates)
- [ ] Announcements: ____ published (with future displayUntil)
- [ ] Puja Services: ____ published
- [ ] Priests: ____ published
- [ ] Newsletters: ____ published
- [ ] All content has green "Published" status

---

## Phase 5: Clear Frontend Cache

### Task 5.1: Trigger ISR Revalidation
- [ ] For immediate effect, redeploy frontend:
  - [ ] Go to AWS Amplify Console
  - [ ] Click **Deployments** tab
  - [ ] Click **Redeploy this version** on latest deployment
  - [ ] Wait for deployment to complete (5-10 minutes)

### Task 5.2: Verify in Browser
- [ ] Open browser DevTools (F12)
- [ ] Go to Application → Clear Site Data (or Ctrl+Shift+Del)
- [ ] Visit https://vishnumandirtampa.com
- [ ] Verify content appears:
  - [ ] Home page shows announcements
  - [ ] Home page shows featured events
  - [ ] No "undefined" or empty sections

---

## Phase 6: Test All Frontend Pages

### Task 6.1: Test Page Content Display
- [ ] **Home (/)** 
  - [ ] Announcements section shows content
  - [ ] Featured events section shows cards
  - [ ] No console errors in DevTools

- [ ] **/calendar/current-events**
  - [ ] Event cards display
  - [ ] Shows event titles, dates, descriptions
  - [ ] All events have future dates

- [ ] **/education/events**
  - [ ] Educational category events display
  - [ ] Filtered correctly (only Educational events)
  - [ ] Shows event cards with details

- [ ] **/religious/puja-services**
  - [ ] Puja service cards display
  - [ ] Shows descriptions and other details
  - [ ] No missing images or text

- [ ] **/religious/priests**
  - [ ] Priest cards display
  - [ ] Shows profile images
  - [ ] Shows priest names and descriptions

- [ ] **/calendar/newsletter**
  - [ ] Newsletter archive displays
  - [ ] Shows PDF links/downloads
  - [ ] Lists by month and year

### Task 6.2: Console Check
For each page:
- [ ] Open DevTools Console (F12)
- [ ] Verify NO error messages
- [ ] Verify NO "[strapi] Error" messages
- [ ] Check Network tab:
  - [ ] `/api/debug/cms` call successful (200)
  - [ ] Strapi API calls successful (200)
  - [ ] No 401/403 auth errors

### Task 6.3: Performance Check
- [ ] Visit `/api/debug/cms`
- [ ] Check response times:
  - [ ] Average response time < 500ms (good)
  - [ ] No endpoints timing out (> 10000ms)
  - [ ] All endpoints responsive

---

## Phase 7: Final Verification & Documentation

### Task 7.1: Create Success Report
- [ ] Document what was fixed
- [ ] List changes made:
  - [ ] Enhanced debug endpoint
  - [ ] Updated environment variables
  - [ ] Fixed token permissions
  - [ ] Published content
- [ ] Note completion time and date
- [ ] Verify no regressions in other features

### Task 7.2: Update Documentation
- [ ] Update CHANGELOG.md with fix details
- [ ] Document any specific issues encountered
- [ ] Add troubleshooting notes for future reference
- [ ] Link to related documentation

### Task 7.3: Ongoing Monitoring
- [ ] Set up periodic checks of `/api/debug/cms`
- [ ] Monitor for token expiration or permission issues
- [ ] Watch for ISR cache issues
- [ ] Check CloudWatch logs for errors

---

## Success Criteria

✅ All criteria must be met:

1. **Debug Endpoint Passes**
   - [ ] Visits `/api/debug/cms` returns 200
   - [ ] All 6 content types show "success" status
   - [ ] `summary.errors: 0`
   - [ ] No authentication or connectivity errors

2. **Frontend Content Displays**
   - [ ] Home page shows announcements
   - [ ] Event pages show event cards
   - [ ] Priest pages show priest profiles
   - [ ] Puja service pages show services
   - [ ] Newsletter page shows archive

3. **No Errors**
   - [ ] Browser console shows no errors
   - [ ] CloudWatch logs show no errors
   - [ ] Response times reasonable (< 1000ms average)

4. **User Experience**
   - [ ] Site feels responsive
   - [ ] Images load correctly
   - [ ] Text displays properly
   - [ ] Links work as expected

---

## Troubleshooting

If any task fails, refer to [FIX_CMS_PRODUCTION_DISPLAY.md](./FIX_CMS_PRODUCTION_DISPLAY.md) for detailed solutions.

Common issues:
- **Environment variables not set** → Set in Amplify Console + redeploy
- **Token invalid (401)** → Regenerate new token in Strapi
- **Token lacks permissions (403)** → Set token type to "Full access"
- **No content** → Publish items in Strapi (check Published status)
- **Content not appearing** → Wait 5 minutes or redeploy frontend
- **Timeout errors** → Check CMS server is running and accessible

---

## Sign-Off

**Implementer:** _________________  
**Date Completed:** _________________  
**All Tests Passing:** [ ] Yes [ ] No  
**Notes:** ___________________________________

---

**Related Documents:**
- [FIX_CMS_PRODUCTION_DISPLAY.md](./FIX_CMS_PRODUCTION_DISPLAY.md) - Detailed step-by-step guide
- [AMPLIFY_ENV_VARS.md](./AMPLIFY_ENV_VARS.md) - Environment variable reference
- [STRAPI_PERMISSIONS_VERIFICATION.md](./STRAPI_PERMISSIONS_VERIFICATION.md) - Token permission setup
- [CMS_TESTING_VALIDATION.md](./CMS_TESTING_VALIDATION.md) - Complete testing guide
