# AWS Amplify Frontend Deployment Setup

## Current Status

✅ **Amplify App Created**: `d8s4hpdn0uxuc`  
✅ **Build Configuration**: Updated to use pnpm and monorepo structure  
✅ **Basic Environment Variables**: Configured  
⏳ **Repository Connection**: Needs to be done via console  
⏳ **Branch Creation**: Waiting for repository connection  
⏳ **Domain Attachment**: Waiting for branch creation  

## Step 1: Connect GitHub Repository (Console Required)

The repository connection requires OAuth authorization which must be done via the AWS Amplify Console.

### Steps:

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Select the app: **vishnu-mandir-frontend** (ID: `d8s4hpdn0uxuc`)
3. Click **"Connect branch"** or go to **App Settings > General**
4. Under **Repository**, click **"Edit"**
5. Select **GitHub** as the source
6. Authorize AWS Amplify to access your GitHub account (if not already done)
7. Select repository: `vinnyfds/vishnumandir`
8. Select branch: `main`
9. Click **"Save"**

**Alternative**: If you prefer to use a personal access token:
- Generate a GitHub Personal Access Token with `repo` scope
- Use it in the repository connection dialog

## Step 2: Complete Setup via Script

After the repository is connected, run the setup script:

```bash
./scripts/amplify-setup.sh
```

This script will:
- Create the `main` branch
- Attach the custom domain `vishnumandirtampa.com`
- Display DNS records for Route53 configuration

## Step 3: Update Route53 Records

After the domain is attached, update Route53 records:

1. Get DNS records from Amplify:
   ```bash
   aws amplify get-domain-association \
     --app-id d8s4hpdn0uxuc \
     --domain-name vishnumandirtampa.com \
     --region us-east-1 \
     --output json | jq '.domainAssociation.subDomains'
   ```

2. Update Route53 hosted zone (`Z10186528G387OP9KXEZ`):
   - Create/update A record for `vishnumandirtampa.com` (apex)
   - Create/update CNAME record for `www.vishnumandirtampa.com`
   - Use the DNS records provided by Amplify

## Step 4: Configure Remaining Environment Variables

Add the following environment variables via **Amplify Console > App Settings > Environment Variables**:

### Required Secrets:

**Database:**
```
DATABASE_URL=postgresql://mandir_admin:PASSWORD@ls-6dc3fd3a57dc9f6f7081de1473b92ae349ce8bb7.cgl4acs00ai2.us-east-1.rds.amazonaws.com:5432/vishnu_mandir_tampa?sslmode=require
```
*(Replace PASSWORD with actual database password from Lightsail Console)*

**API Keys:**
```
NEXT_PUBLIC_API_KEY=your-api-key-here
API_KEY=your-api-key-here
```

**Stripe:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**AWS Cognito:**
```
COGNITO_USER_POOL_ID=your-pool-id
COGNITO_CLIENT_ID=your-client-id
```

**CMS (Strapi):**
```
CMS_API_TOKEN=your-strapi-api-token
```

**Application:**
```
NEXTAUTH_SECRET=generate-random-secret-string
```

## Step 5: Trigger Initial Deployment

After all configuration is complete:

```bash
aws amplify start-job \
  --app-id d8s4hpdn0uxuc \
  --branch-name main \
  --job-type RELEASE \
  --region us-east-1
```

Or push to the `main` branch to trigger automatic deployment.

## Verification

1. **Check Build Status:**
   ```bash
   aws amplify get-job --app-id d8s4hpdn0uxuc --branch-name main --job-id <job-id> --region us-east-1
   ```

2. **Access Application:**
   - Amplify URL: `https://main.d8s4hpdn0uxuc.amplifyapp.com`
   - Custom Domain: `https://vishnumandirtampa.com` (after DNS propagation)

3. **Monitor Logs:**
   - View build logs in Amplify Console
   - Check for any errors in the build process

## Troubleshooting

### Build Fails with "Prisma Client not found"
- Ensure `DATABASE_URL` is set (even if not used, Prisma needs it for generation)
- Check that `npx prisma generate` runs in preBuild phase

### Build Fails with "pnpm not found"
- Verify `corepack enable` is in preBuild commands
- Check Node.js version (should be 20+)

### Domain Not Working
- Verify Route53 records are updated correctly
- Check domain association status: `aws amplify get-domain-association --app-id d8s4hpdn0uxuc --domain-name vishnumandirtampa.com`
- Wait for DNS propagation (can take up to 48 hours, usually faster)

## Current Configuration

- **App ID**: `d8s4hpdn0uxuc`
- **App Name**: `vishnu-mandir-frontend`
- **Region**: `us-east-1`
- **Platform**: `WEB_COMPUTE` (Next.js SSR)
- **Build Spec**: `frontend/amplify.yml`
- **Default Domain**: `d8s4hpdn0uxuc.amplifyapp.com`

## Environment Variables Already Set

- `NEXT_PUBLIC_API_URL=http://34.206.184.139:4000/api`
- `CMS_API_URL=http://44.202.153.84:1337/api`
- `NEXT_PUBLIC_URL=https://vishnumandirtampa.com`
- `NEXT_PUBLIC_COGNITO_REGION=us-east-1`
- `STRIPE_API_VERSION=2024-11-20.acacia`
