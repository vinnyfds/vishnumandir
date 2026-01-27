# Form Submission Testing Guide

## Overview

This document provides a comprehensive testing guide for the new Next.js API route handlers for form submissions. All forms now submit to Next.js API routes (`/api/v1/forms/*`) instead of an external Express backend.

## Architecture Changes

### Before
- Forms called `${NEXT_PUBLIC_API_URL}/api/v1/forms/*` (external backend)
- Production: Backend URL might be unavailable or incorrect

### After
- Forms call `/api/v1/forms/*` (Next.js API routes)
- No external backend dependency
- All logic runs on the Next.js server (or Lambda in production)

## New Files Created

### API Route Handlers
- `frontend/src/app/api/v1/forms/sponsorship/route.ts` - Puja sponsorship submissions
- `frontend/src/app/api/v1/forms/facility-request/route.ts` - Facility requests
- `frontend/src/app/api/v1/forms/email-subscription/route.ts` - Email subscriptions
- `frontend/src/app/api/v1/forms/donation-statement/route.ts` - Donation statements
- `frontend/src/app/api/v1/forms/change-of-address/route.ts` - Address changes

### Shared Services
- `frontend/src/lib/prisma.ts` - Prisma client singleton
- `frontend/src/lib/email.ts` - Email service wrapper
- `frontend/src/lib/strapi-sync.ts` - Strapi CMS sync service
- `frontend/src/lib/api-responses.ts` - API response utilities
- `frontend/src/lib/schemas/forms.ts` - Validation schemas
- `frontend/src/lib/schemas/optional-forms.ts` - Optional form schemas

### Updated Files
- `frontend/src/lib/api.ts` - Changed to use Next.js API routes by default

## Testing Checklist

### 1. Puja Sponsorship Form
**URL:** `/forms/puja-sponsorships`

- [ ] Form displays correctly
- [ ] Fill all required fields:
  - Name: "John Doe"
  - Email: "john@example.com" (validates email format)
  - Phone: "(813) 555-1234" (validates required)
  - Puja: "Daily Aarti"
  - Date: Future date
  - Location: "temple" or "offsite"
- [ ] Optional fields can be left blank
- [ ] Submit form
- [ ] Success message displays with transaction ID
- [ ] Check database:
  ```sql
  SELECT * FROM "PujaSponsorship" WHERE "sponsorEmail" = 'john@example.com' ORDER BY "createdAt" DESC LIMIT 1;
  ```
- [ ] Check Strapi (http://localhost:1337/admin):
  - Navigate to Content Manager → Puja Sponsorships
  - Verify entry exists with matching data
- [ ] Check email (confirm email sent to admin and submitter)

### 2. Facility Request Form
**URL:** `/forms/request-facility`

- [ ] Form displays correctly
- [ ] Fill all required fields:
  - Name: "Jane Smith"
  - Email: "jane@example.com" (validates email)
  - Phone: "(813) 555-5678" (validates required)
  - Event Type: "religious"
  - Date: Future date
  - Number of Guests: 50 (validates min 1)
- [ ] Optional time fields can be left blank
- [ ] Submit form
- [ ] Success message displays with transaction ID
- [ ] Check database:
  ```sql
  SELECT * FROM "FacilityRequest" WHERE "requesterEmail" = 'jane@example.com' ORDER BY "createdAt" DESC LIMIT 1;
  ```
- [ ] Check Strapi:
  - Content Manager → Facility Requests
  - Verify entry exists
- [ ] Confirm emails sent

### 3. Email Subscription Form
**URL:** `/forms/email-subscription`

- [ ] Form displays correctly
- [ ] Fill fields:
  - Name: "Robert Johnson"
  - Email: "robert@example.com"
- [ ] Submit form
- [ ] Success message displays
- [ ] Check database:
  ```sql
  SELECT * FROM "FormSubmission" WHERE "formType" = 'EMAIL_SUBSCRIPTION' AND "email" = 'robert@example.com' ORDER BY "createdAt" DESC LIMIT 1;
  ```
- [ ] Check Strapi:
  - Content Manager → Form Submissions
  - Verify entry exists with type "EMAIL_SUBSCRIPTION"
- [ ] Confirm emails sent

### 4. Change of Address Form
**URL:** `/forms/change-of-address`

- [ ] Form displays correctly
- [ ] Fill fields:
  - Name: "Patricia Miller"
  - Email: "patricia@example.com"
  - New Address: "123 New Street, Tampa, FL 33602"
- [ ] Submit form
- [ ] Success message displays
- [ ] Check database:
  ```sql
  SELECT * FROM "FormSubmission" WHERE "formType" = 'CHANGE_OF_ADDRESS' AND "email" = 'patricia@example.com' ORDER BY "createdAt" DESC LIMIT 1;
  ```
- [ ] Confirm emails sent

### 5. Donation Statement Form
**URL:** `/forms/donation-statement`

- [ ] Form displays correctly
- [ ] Fill fields:
  - Name: "Michael Brown"
  - Email: "michael@example.com"
  - Period: "current-year"
  - Delivery: "email"
- [ ] If "custom" period selected:
  - [ ] Start Date and End Date become required
  - [ ] Validation shows error if missing
- [ ] If "mail" delivery selected:
  - [ ] Address field becomes required
  - [ ] Validation shows error if missing
- [ ] Submit form
- [ ] Success message displays
- [ ] Check database:
  ```sql
  SELECT * FROM "FormSubmission" WHERE "formType" = 'DONATION_STATEMENT' AND "email" = 'michael@example.com' ORDER BY "createdAt" DESC LIMIT 1;
  ```
- [ ] Confirm emails sent

## Validation Error Testing

### Test Invalid Email
1. Try to submit any form with:
   - Email: "invalid-email" (missing @domain)
   - Expected: Error message: "Invalid email address"

### Test Missing Required Fields
1. Try to submit Facility Request with:
   - Phone: "" (empty)
   - Expected: Error message: "Phone is required"

### Test Custom Date Validation
1. For Donation Statement with "custom" period:
   - Leave start/end dates empty
   - Expected: Error message about required dates

### Test Number Validation
1. For Facility Request:
   - Number of Guests: "0" or negative
   - Expected: Error message: "At least 1 guest required"

## API Response Validation

### Success Response (201)
```json
{
  "status": "success",
  "message": "Your puja sponsorship request has been submitted successfully.",
  "transactionId": "req_abc123xyz789"
}
```

### Error Response (400)
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "code": "INVALID_FORMAT",
      "message": "Invalid email address"
    }
  ]
}
```

## Debugging

### Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for form submission logs
4. Check Network tab:
   - Request to `/api/v1/forms/sponsorship` should be `POST`
   - Response status should be `201` on success or `400` on validation error

### Check Server Logs
1. In terminal running Next.js (`npm run dev`):
   - Look for `[api/v1/forms/sponsorship]` or similar
   - Check for Prisma logs (database queries)
   - Check for email service logs

### Database Queries

**Check all form submissions:**
```sql
SELECT * FROM "PujaSponsorship" ORDER BY "createdAt" DESC LIMIT 10;
SELECT * FROM "FacilityRequest" ORDER BY "createdAt" DESC LIMIT 10;
SELECT * FROM "FormSubmission" ORDER BY "createdAt" DESC LIMIT 10;
```

**Check transaction IDs:**
```sql
SELECT "transactionId", "email", "sponsorName", "createdAt" FROM "PujaSponsorship" WHERE "transactionId" LIKE 'req_%' ORDER BY "createdAt" DESC LIMIT 5;
```

### Email Testing

**Check if RESEND_API_KEY is configured:**
```bash
echo $RESEND_API_KEY
```

**Check Resend logs:**
- Visit: https://resend.com/emails
- Look for emails from noreply@vishnumandirtampa.com
- Verify all confirmations were sent

## Troubleshooting

### Issue: Forms submit but no success message
**Possible Cause:** API response format mismatch
**Fix:**
1. Check browser console for errors
2. Check Network tab response
3. Verify `frontend/src/lib/api.ts` is using `/api/v1` paths

### Issue: Data not appearing in database
**Possible Cause:** Prisma connection issue or database error
**Fix:**
1. Check if `DATABASE_URL` is set correctly
2. Verify database connection: `npm run db:check` (if script exists)
3. Check for Prisma migrations: `npx prisma migrate status`

### Issue: Data not syncing to Strapi
**Possible Cause:** Strapi API token invalid or endpoint unreachable
**Fix:**
1. Check `CMS_API_TOKEN` is set
2. Verify Strapi is running: `curl http://localhost:1337/api`
3. Check Strapi API permissions in admin panel

### Issue: Emails not sending
**Possible Cause:** Resend API key missing or invalid
**Fix:**
1. Verify `RESEND_API_KEY` is set in `.env`
2. Check `ADMIN_EMAIL_ADDRESS` is set
3. Check Resend dashboard for send failures

## Performance Expectations

- Form submission should complete in < 2 seconds
- Success/error message should display immediately
- Email sending is non-blocking (happens in background)
- Strapi sync is non-blocking (happens in background)

## Next Steps After Testing

1. **Update CHANGELOG.md** with all changes
2. **Deploy to production** via AWS Amplify
3. **Set environment variables** in Amplify Console
4. **Run production smoke tests** in live environment
5. **Monitor error logs** for any issues

## Support & Debugging

If forms aren't working:
1. Check browser console for JavaScript errors
2. Check browser Network tab for failed API calls
3. Check Next.js terminal for server-side errors
4. Check database connection
5. Check Strapi connectivity
6. Check email service configuration

For detailed logs, set `NODE_ENV=development` and check terminal output.
