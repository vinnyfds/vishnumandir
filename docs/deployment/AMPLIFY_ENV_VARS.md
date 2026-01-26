# Amplify Environment Variables Configuration

**App ID:** `d1rp3bwb0j3dq8`  
**App Name:** `vishnumandir`  
**Last Updated:** 2026-01-26

## Required Environment Variables

Set these in AWS Amplify Console > App Settings > Environment Variables

### Database (Required for Prisma Generation)

- **`DATABASE_URL`** (Server-side only)
  - Format: `postgresql://mandir_admin:PASSWORD@ls-6dc3fd3a57dc9f6f7081de1473b92ae349ce8bb7.cgl4acs00ai2.us-east-1.rds.amazonaws.com:5432/vishnu_mandir_tampa?sslmode=require`
  - **Important:** Must include `?sslmode=require` for AWS RDS
  - Get password from AWS Lightsail Console > Databases > vishnu-mandir-postgres

### Backend API

- **`NEXT_PUBLIC_API_URL`** (Client-side)
  - Value: `http://34.206.184.139:4000/api`
  - Or use domain: `http://api.vishnumandirtampa.com/api` (if DNS configured)

### Payment Gateway (Stripe)

- **`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`** (Client-side)
  - Your Stripe publishable key (starts with `pk_`)

- **`STRIPE_SECRET_KEY`** (Server-side only)
  - Your Stripe secret key (starts with `sk_`)

- **`STRIPE_WEBHOOK_SECRET`** (Server-side only)
  - Your Stripe webhook secret (starts with `whsec_`)

- **`STRIPE_API_VERSION`** (Optional)
  - Value: `2024-11-20.acacia` (or latest valid version)

### Authentication (AWS Cognito)

- **`COGNITO_USER_POOL_ID`** (Server-side only)
  - Value: `us-east-1_N3Kxkj933`
  - User Pool: `vishnu-mandir-admin-pool`

- **`COGNITO_CLIENT_ID`** (Server-side only)
  - Value: `343pre3iphtlr0od4bkl1n78ar`
  - Client: `vishnu-mandir-frontend-client`

- **`NEXT_PUBLIC_COGNITO_REGION`** (Client-side)
  - Value: `us-east-1`

### Content Management System (Strapi)

- **`CMS_API_URL`** (Server-side only)
  - Value: `https://cms.vishnumandirtampa.com/api`
  - **Note:** SSL certificate is configured. Use HTTPS (no port number needed)

- **`CMS_API_TOKEN`** (Server-side only)
  - Generate from Strapi Admin Panel: Settings → API Tokens → Create new API Token

### Application

- **`NEXT_PUBLIC_URL`** (Client-side)
  - Will be set after first deployment: `https://main.d1rp3bwb0j3dq8.amplifyapp.com`
  - Or custom domain: `https://vishnumandirtampa.com` (after domain attachment)

- **`NEXT_PUBLIC_API_KEY`** (Client-side, optional)
  - If needed for public API endpoints (same as backend API_KEY)

## Setting Environment Variables

### Via AWS Console

1. Go to AWS Amplify Console
2. Select app: `vishnumandir` (d1rp3bwb0j3dq8)
3. Go to **App Settings** → **Environment Variables**
4. Click **Manage variables**
5. Add each variable with its value
6. Click **Save**

### Via AWS CLI

```bash
aws amplify update-branch \
  --app-id d1rp3bwb0j3dq8 \
  --branch-name main \
  --environment-variables \
    DATABASE_URL="postgresql://..." \
    NEXT_PUBLIC_API_URL="http://34.206.184.139:4000/api" \
    NEXT_PUBLIC_COGNITO_REGION="us-east-1" \
  --region us-east-1
```

## Critical Variables for Build

**Minimum required for build to succeed:**
- `DATABASE_URL` - Required for Prisma Client generation

**Recommended for first deployment:**
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_COGNITO_REGION`
- `CMS_API_URL`
- `NEXT_PUBLIC_URL` (can be updated after deployment)

## Notes

- Variables prefixed with `NEXT_PUBLIC_` are available in the browser
- Variables without `NEXT_PUBLIC_` prefix are server-side only (API routes)
- Never commit actual values to Git
- Update `NEXT_PUBLIC_URL` after domain is attached to Amplify app
