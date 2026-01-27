# Amplify Environment Variables Setup Guide

## Overview
For form submissions to work in production, the following environment variables must be configured in AWS Amplify Console.

## How to Set Environment Variables in Amplify

1. Go to **AWS Amplify Console** → Your App
2. Click **App Settings** → **Environment Variables**
3. Add each variable by clicking "Manage Variables"
4. Enter the variable name and value
5. Click "Save"
6. The app will automatically redeploy with the new variables

## Required Environment Variables for Form Submissions

### Database
```
DATABASE_URL = postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
```
**Note:** Must include `?sslmode=require` for AWS RDS PostgreSQL

### Email Service (Resend)
```
RESEND_API_KEY = re_XXXXXXXXXXXXXXXXXXXXX
SENDER_EMAIL_ADDRESS = Vishnu Mandir <noreply@vishnumandirtampa.com>
ADMIN_EMAIL_ADDRESS = admin@vishnumandirtampa.com
```

### Strapi CMS
```
CMS_API_URL = https://cms.vishnumandirtampa.com/api
CMS_API_TOKEN = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## Optional but Recommended Variables

### Client-Side URLs
```
NEXT_PUBLIC_URL = https://vishnumandirtampa.com
NEXT_PUBLIC_API_URL = https://api.vishnumandirtampa.com
```

### Other Services (if used)
```
STRIPE_SECRET_KEY = (Get from Stripe Dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = (Get from Stripe Dashboard)
COGNITO_USER_POOL_ID = us-east-1_XXXXXXXXX
COGNITO_CLIENT_ID = XXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_COGNITO_REGION = us-east-1
```

## Verification Steps

After setting environment variables in Amplify Console:

1. **Trigger a New Build**
   - Click "Deployments" in Amplify Console
   - Click the latest deployment
   - Verify "Environment variables" section shows all variables are set
   - Trigger a new build: click "Redeploy this version"

2. **Test Form Submission**
   - Navigate to form page: `https://your-domain.com/forms/puja-sponsorships`
   - Fill in form fields
   - Submit form
   - Verify success message appears with transaction ID

3. **Check Logs**
   - Look for Resend email delivery logs
   - Check CloudWatch logs for Lambda errors
   - Verify data appears in PostgreSQL database
   - Verify data syncs to Strapi CMS

## Common Issues

### Issue: Forms submit but no email received
**Possible causes:**
- `RESEND_API_KEY` not set or invalid
- `SENDER_EMAIL_ADDRESS` not set
- `ADMIN_EMAIL_ADDRESS` not set

**Fix:** Verify all three variables are set in Amplify Console and rebuild.

### Issue: Database connection error in form submission
**Possible causes:**
- `DATABASE_URL` not set
- `DATABASE_URL` missing `?sslmode=require`
- Database connection timeout

**Fix:** Verify `DATABASE_URL` includes SSL parameter and rebuild.

### Issue: CMS data not syncing
**Possible causes:**
- `CMS_API_URL` not set correctly
- `CMS_API_TOKEN` invalid or expired
- CMS server unreachable

**Fix:** Verify CMS credentials and check Strapi API is accessible.

## Testing Environment Variables

To verify variables are accessible in your API routes:

1. Add debug logging to API route
2. Deploy and check CloudWatch logs
3. Verify variable values appear in logs

**Example:**
```typescript
console.log('DATABASE_URL is set:', !!process.env.DATABASE_URL);
console.log('RESEND_API_KEY is set:', !!process.env.RESEND_API_KEY);
```

## Security Notes

- Never commit `.env` files to Git
- Use AWS Secrets Manager for sensitive values
- Rotate API keys regularly
- Use restricted Strapi API tokens with minimum required permissions
- Database password should be strong and rotated periodically

## Deployment Workflow

1. Set environment variables in Amplify Console
2. Trigger build/redeploy
3. Wait for build to complete
4. Test form submissions
5. Monitor CloudWatch logs for errors
6. Verify data in database and CMS

## Related Documentation

- [Amplify Build Configuration](./AMPLIFY_BUILD_FIX.md)
- [Deployment Troubleshooting](./TROUBLESHOOTING.md)
- [Environment Variables Reference](./../.cursorrules) - See Section 20
