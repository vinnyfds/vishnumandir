# Quick Reference: Fix Form Submissions Not Appearing in CMS

## TL;DR - 3 Steps to Fix

### Step 1: Go to Strapi Admin
```
http://cms.vishnumandirtampa.com:1337/admin
```

### Step 2: Change API Token Permissions
1. Settings → API Tokens
2. Edit the backend API token
3. Change **Token type** from "Custom" to **"Full access"**
4. Save

### Step 3: Redeploy Backend
```bash
./scripts/deploy-backend.sh
```

## Done! ✅

Forms now sync to Strapi. Here's what's new:

- ✅ Better error logging to diagnose issues
- ✅ Comprehensive fix guide for future reference
- ✅ Backfill script to sync existing records
- ✅ Updated CHANGELOG with all changes

## Files Changed

- `backend/src/services/strapi.service.ts` - Enhanced error logging
- `docs/deployment/FIX_FORM_SYNC_TO_STRAPI.md` - Complete fix guide
- `docs/deployment/FORM_SYNC_FIX_COMPLETE.md` - Implementation summary
- `scripts/sync-forms-to-strapi.sh` - Backfill utility
- `CHANGELOG.md` - Version history update

## Testing

Submit a test form from the frontend:
- Go to `https://vishnumandirtampa.com/forms/puja-sponsorships`
- Fill and submit
- Check Strapi admin panel - should see the submission

## Questions?

See full documentation:
- `docs/deployment/FIX_FORM_SYNC_TO_STRAPI.md` - Step-by-step guide
- `docs/deployment/FORM_SYNC_FIX_COMPLETE.md` - Full implementation details
