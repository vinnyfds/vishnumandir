# AWS Infrastructure Setup Documentation

This document details the AWS infrastructure setup for the Vishnu Mandir Tampa website deployment.

**Last Updated:** 2026-01-25  
**Status:** Infrastructure Created - Deployment In Progress

## Infrastructure Overview

### Components Deployed

1. **PostgreSQL Database** (Lightsail)
   - Name: `vishnu-mandir-postgres`
   - Endpoint: `ls-6dc3fd3a57dc9f6f7081de1473b92ae349ce8bb7.cgl4acs00ai2.us-east-1.rds.amazonaws.com`
   - Port: 5432
   - Bundle: `micro_2_0` (2 vCPU, 1GB RAM, 40GB storage)
   - Status: Available
   - Master Database: `vishnu_mandir_tampa`
   - Master Username: `mandir_admin`
   - Region: `us-east-1a`

2. **Backend API Instance** (Lightsail)
   - Name: `vishnu-mandir-backend`
   - Blueprint: `ubuntu_22_04`
   - Bundle: `micro_3_0` (2 vCPU, 1GB RAM, 40GB SSD)
   - Static IP: `34.206.184.139`
   - Status: Running
   - SSH User: `ubuntu`
   - SSH Key: `LightsailDefaultKeyPair`

3. **Strapi CMS Instance** (Lightsail)
   - Name: `vishnu-mandir-cms-upgraded` (upgraded from vishnu-mandir-cms)
   - Blueprint: `ubuntu_22_04`
   - Bundle: `medium_3_0` (2 vCPU, 4GB RAM, 80GB SSD) - Upgraded from micro_3_0
   - Public IP: Dynamic (check with AWS CLI)
   - Status: Running
   - SSH User: `ubuntu`
   - SSH Key: `/Users/vamsigangeskalanidhi/Downloads/vishnumandir-cms.pem`

4. **S3 Bucket for CMS Media**
   - Name: `vishnu-mandir-cms-media`
   - Region: `us-east-1`
   - CORS: Configured for public access
   - Status: Created

5. **Amplify App** (Frontend)
   - Status: Needs to be created via AWS Console
   - Repository: `https://github.com/vinnyfds/vishnumandir.git`
   - Build Config: `frontend/amplify.yml` (created)

6. **DNS Configuration** (Route53)
   - Hosted Zone: `Z10186528G387OP9KXEZ` (vishnumandirtampa.com)
   - API Subdomain: `api.vishnumandirtampa.com` → `34.206.184.139` (A record)
   - CMS Subdomain: `cms.vishnumandirtampa.com` → `44.202.153.84` (A record)
   - Main Domain: `vishnumandirtampa.com` → TBD (Amplify CloudFront after app creation)
   - Status: DNS records created and propagating

## Database Configuration

### Connection Details

- **Endpoint:** `ls-6dc3fd3a57dc9f6f7081de1473b92ae349ce8bb7.cgl4acs00ai2.us-east-1.rds.amazonaws.com`
- **Port:** 5432 (default PostgreSQL port)
- **Database Name:** `vishnu_mandir_tampa`
- **Username:** `mandir_admin`
- **Password:** (Stored securely - contact administrator)

### Connection String Format

```
postgresql://mandir_admin:PASSWORD@ENDPOINT:5432/vishnu_mandir_tampa?sslmode=require
```

### Firewall Configuration

The database is publicly accessible. Firewall rules need to be configured to allow connections from:
- Backend instance IP: `34.206.184.139`
- CMS instance IP: `44.202.153.84`
- Your local development IP (for running migrations)

**To configure firewall:**
1. Go to AWS Lightsail Console > Databases > vishnu-mandir-postgres > Networking tab
2. Click "Add rule" or "Edit rules"
3. Add rules to allow PostgreSQL port (5432) from:
   - `34.206.184.139/32` (Backend instance)
   - `44.202.153.84/32` (CMS instance)
   - Your local IP/32 (for migrations)

**Note:** Firewall rules are configured via the AWS Console. The database is already publicly accessible.

### Instance Firewall Ports

**Backend Instance (vishnu-mandir-backend):**
- Port 4000 (TCP) - ✅ Open for Express API
- Port 22 (TCP) - Open for SSH
- Port 80 (TCP) - Open for HTTP

**CMS Instance (vishnu-mandir-cms):**
- Port 1337 (TCP) - ✅ Open for Strapi CMS
- Port 22 (TCP) - Open for SSH
- Port 80 (TCP) - Open for HTTP

**Configuration Method:**
```bash
# Backend
aws lightsail open-instance-public-ports \
  --instance-name vishnu-mandir-backend \
  --port-info fromPort=4000,toPort=4000,protocol=tcp

# CMS
aws lightsail open-instance-public-ports \
  --instance-name vishnu-mandir-cms \
  --port-info fromPort=1337,toPort=1337,protocol=tcp
```

**Verification:**
```bash
aws lightsail get-instance-port-states --instance-name vishnu-mandir-backend
aws lightsail get-instance-port-states --instance-name vishnu-mandir-cms
```

## Deployment Scripts

### Backend Deployment

Location: `scripts/deploy-backend.sh`

**Usage:**
```bash
./scripts/deploy-backend.sh
```

**What it does:**
1. Tests SSH connection to backend instance
2. Installs Node.js 20 if not present
3. Installs PM2 globally
4. Clones/updates repository
5. Installs dependencies and builds TypeScript
6. Starts service with PM2

**Manual steps required:**
- Create `.env` file on server at `/home/ubuntu/vishnu-mandir-tampa/backend/.env`
- Configure all environment variables (see Environment Variables section)

### CMS Deployment

Location: `scripts/deploy-cms.sh`

**Usage:**
```bash
./scripts/deploy-cms.sh
```

**What it does:**
1. Tests SSH connection to CMS instance
2. Installs Node.js 20 if not present
3. Installs PM2 globally
4. Clones/updates repository
5. Installs dependencies and builds Strapi
6. Starts service with PM2

**Manual steps required:**
- Create `.env` file on server at `/home/ubuntu/vishnu-mandir-tampa/cms/.env`
- Configure all environment variables (see Environment Variables section)
- Access admin panel at `http://44.202.153.84:1337/admin` to create admin user
- Generate API token for frontend

## Environment Variables

### Backend (.env on backend instance)

```bash
# Database
DATABASE_URL="postgresql://mandir_admin:PASSWORD@ENDPOINT:5432/vishnu_mandir_tampa?sslmode=require"

# Server
BACKEND_PORT=4000
NODE_ENV=production

# API Security
API_KEY="generate-secure-api-key-here"

# AWS Cognito
COGNITO_USER_POOL_ID="your-cognito-pool-id"
COGNITO_CLIENT_ID="your-cognito-client-id"
COGNITO_REGION=us-east-1

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_API_VERSION="2024-11-20.acacia"

# Email (Resend)
RESEND_API_KEY="re_..."
SENDER_EMAIL_ADDRESS="Vishnu Mandir <no-reply@vishnumandirtampa.com>"
ADMIN_EMAIL_ADDRESS="admin@vishnumandirtampa.com"

# Frontend/CMS URLs
FRONTEND_URL="https://your-amplify-domain.amplifyapp.com"
AMPLIFY_DOMAIN="https://your-amplify-domain.amplifyapp.com"
CMS_API_URL="http://44.202.153.84:1337/api"
```

### CMS (.env on CMS instance)

```bash
# Database (can use same PostgreSQL)
DATABASE_CLIENT=postgres
DATABASE_HOST=ENDPOINT
DATABASE_PORT=5432
DATABASE_NAME=vishnu_mandir_tampa
DATABASE_USERNAME=mandir_admin
DATABASE_PASSWORD=PASSWORD
DATABASE_SSL=true

# Server
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Strapi Security Keys (generate secure random strings)
APP_KEYS="key1,key2,key3,key4"
API_TOKEN_SALT="generate-random-string"
ADMIN_JWT_SECRET="generate-random-string"
TRANSFER_TOKEN_SALT="generate-random-string"
JWT_SECRET="generate-random-string"

# AWS S3 for Media Storage
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="vishnu-mandir-cms-media"

# Public URL
CMS_API_URL="http://44.202.153.84:1337/api"
```

### Amplify Environment Variables

Configure in AWS Amplify Console > App Settings > Environment Variables:

```bash
# API Configuration
NEXT_PUBLIC_API_URL="http://34.206.184.139:4000/api"

# Database (for Prisma Client generation only)
DATABASE_URL="postgresql://mandir_admin:PASSWORD@ENDPOINT:5432/vishnu_mandir_tampa?sslmode=require"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..." # Server-side only

# AWS Cognito
COGNITO_USER_POOL_ID="your-cognito-pool-id"
COGNITO_CLIENT_ID="your-cognito-client-id"
NEXT_PUBLIC_COGNITO_REGION="us-east-1"

# CMS
CMS_API_URL="http://44.202.153.84:1337/api"
CMS_API_TOKEN="your-strapi-api-token"

# Application
NEXT_PUBLIC_URL="https://your-amplify-domain.amplifyapp.com"
NEXT_PUBLIC_API_KEY="same-as-backend-api-key"
```

## AWS Amplify Setup

### Manual Steps Required

1. **Create Amplify App via Console:**
   - Go to AWS Amplify Console
   - Click "New app" > "Host web app"
   - Connect to GitHub repository: `https://github.com/vinnyfds/vishnumandir.git`
   - Select branch: `main` (production)
   - Build settings: Use `frontend/amplify.yml` (already created)
   - Review and create app

2. **Configure Environment Variables:**
   - Go to App Settings > Environment Variables
   - Add all variables listed in the Environment Variables section above

3. **Configure Custom Domain (Optional):**
   - Go to App Settings > Domain Management
   - Add custom domain: `vishnumandirtampa.com`
   - Configure DNS records as instructed
   - SSL certificate will be auto-provisioned

4. **Deploy:**
   - Push to `main` branch to trigger deployment
   - Monitor build logs in Amplify Console

## Database Migrations

Once the database is available:

1. **Get database endpoint:**
   ```bash
   aws lightsail get-relational-database \
     --relational-database-name vishnu-mandir-postgres \
     --query 'relationalDatabase.relationalDatabaseEndpoint.address' \
     --output text
   ```

2. **Update DATABASE_URL** with the endpoint

3. **Run migrations:**
   ```bash
   export DATABASE_URL="postgresql://mandir_admin:PASSWORD@ENDPOINT:5432/vishnu_mandir_tampa?sslmode=require"
   npx prisma migrate deploy
   ```

4. **Verify schema:**
   ```bash
   npx prisma db pull
   npx prisma generate
   ```

## Security Configuration

### Lightsail Firewall Rules

**Backend Instance:**
- Allow SSH (22) from your IP
- Allow HTTP (80) from anywhere (if using Nginx)
- Allow HTTPS (443) from anywhere (if using Nginx)
- Allow API port (4000) from Amplify IPs only (recommended)

**CMS Instance:**
- Allow SSH (22) from your IP
- Allow HTTP (80) from anywhere (if using Nginx)
- Allow HTTPS (443) from anywhere (if using Nginx)
- Allow Strapi port (1337) from Amplify IPs and backend IP only

**Database:**
- Configure firewall to allow connections only from:
  - Backend instance IP: `34.206.184.139`
  - CMS instance IP: `44.202.153.84`
  - Your development IP (for migrations)

### SSL/TLS Setup (Recommended)

For production, set up SSL certificates using Let's Encrypt:

1. Install Certbot on both instances
2. Configure Nginx as reverse proxy
3. Obtain SSL certificates
4. Update firewall to use ports 80/443 instead of direct ports

## Monitoring & Logs

### PM2 Monitoring

On both instances, monitor services:

```bash
# View logs
pm2 logs backend-api  # or strapi-cms

# Monitor
pm2 monit

# Status
pm2 status
```

### CloudWatch Logs (Future Enhancement)

Set up CloudWatch agent on instances for centralized logging.

## Cost Summary

**Monthly Estimated Costs:**
- PostgreSQL Database (micro_2_0): ~$15/month
- Backend Instance (micro_3_0): ~$7/month
- CMS Instance (micro_3_0): ~$7/month
- Static IP: Free (first 5 are free)
- S3 Storage: ~$0.023/GB + transfer costs
- Amplify: Free tier (up to 1000 build minutes/month)
- **Total: ~$29-50/month** (depending on traffic and storage)

## Next Steps

1. ✅ Database created (waiting for availability)
2. ✅ Backend instance created and running
3. ✅ CMS instance created and running
4. ✅ S3 bucket created
5. ✅ Build configuration created
6. ⏳ Wait for database to become available
7. ⏳ Configure database firewall
8. ⏳ Run database migrations
9. ⏳ Deploy backend (run deployment script)
10. ⏳ Deploy CMS (run deployment script)
11. ⏳ Create Amplify app via console
12. ⏳ Configure environment variables
13. ⏳ Deploy frontend
14. ⏳ Test all integrations
15. ⏳ Set up monitoring

## Troubleshooting

### Database Connection Issues

- Verify database is in "available" state
- Check firewall rules allow connections from instance IPs
- Verify DATABASE_URL includes `?sslmode=require`
- Test connection: `psql -h ENDPOINT -U mandir_admin -d vishnu_mandir_tampa`

### Instance SSH Access

- Verify SSH key is correct: `/tmp/lightsail-default-key.pem`
- Check instance is running
- Verify security group allows SSH from your IP

### PM2 Service Not Starting

- Check logs: `pm2 logs`
- Verify .env file exists and has correct values
- Check Node.js version: `node --version` (should be 20+)
- Verify build completed: `ls -la dist/` (backend) or `ls -la build/` (CMS)

## Support

For issues or questions:
- Check AWS Lightsail Console for instance/database status
- Review PM2 logs on instances
- Check Amplify build logs for frontend deployment issues
- Refer to main deployment checklist: `docs/deployment/DEPLOYMENT_CHECKLIST.md`
