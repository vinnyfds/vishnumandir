# Update CMS_API_URL in AWS Amplify

## Action Required

The CMS subdomain now has SSL configured. You need to update the `CMS_API_URL` environment variable in AWS Amplify Console.

## Steps

1. Go to AWS Amplify Console
2. Select app: `vishnumandir` (App ID: `d1rp3bwb0j3dq8`)
3. Navigate to **App Settings** → **Environment Variables**
4. Find `CMS_API_URL` variable
5. Update the value from:
   ```
   http://cms.vishnumandirtampa.com:1337/api
   ```
   to:
   ```
   https://cms.vishnumandirtampa.com/api
   ```
6. Click **Save**
7. Amplify will automatically trigger a new deployment

## Verification

After deployment completes, verify:
- Frontend can fetch events from Strapi
- Events appear on `/education/events` page
- Events appear on `/calendar/current-events` page
- Announcements appear on home page
- Other Strapi content (puja services, priests, newsletters) displays correctly

## Current Status

- ✅ SSL certificate installed and active
- ✅ HTTPS accessible: `https://cms.vishnumandirtampa.com/admin`
- ✅ API accessible: `https://cms.vishnumandirtampa.com/api`
- ⏳ Frontend environment variable update pending (manual step in Amplify Console)
