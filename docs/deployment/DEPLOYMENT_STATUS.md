# Deployment Status

**Last Updated:** 2026-01-26  
**Status:** Infrastructure Deployed - Configuration Pending

## Infrastructure Created

### ✅ Database (Lightsail PostgreSQL)
- **Name:** `vishnu-mandir-postgres`
- **Endpoint:** `ls-6dc3fd3a57dc9f6f7081de1473b92ae349ce8bb7.cgl4acs00ai2.us-east-1.rds.amazonaws.com`
- **Port:** 5432
- **Database:** `vishnu_mandir_tampa`
- **Username:** `mandir_admin`
- **Status:** Available
- **Bundle:** micro_2_0 (2 vCPU, 1GB RAM, 40GB storage)

### ✅ Backend Instance (Lightsail)
- **Name:** `vishnu-mandir-backend`
- **IP:** `34.206.184.139` (Static IP)
- **Status:** Running
- **Build:** ✅ Completed (`dist/server.js` exists)
- **Bundle:** micro_3_0 (1 vCPU, 1GB RAM, 40GB SSD)
- **Node.js:** v20.20.0
- **PM2:** Installed
- **Service Status:** ⚠️ Not running (PM2 process not started)
- **Environment:** ⚠️ `.env` file missing
- **Port 4000:** ✅ Open (firewall configured)
- **Connectivity:** DNS resolving correctly, port accessible (service needs to be started)

### ✅ CMS Instance (Lightsail)
- **Name:** `vishnu-mandir-cms`
- **IP:** `3.93.212.154` (upgraded instance - DNS updated)
- **Status:** Running
- **SSH Key:** `/Users/vamsigangeskalanidhi/Downloads/vishnumandir-cms.pem`
- **Bundle:** ✅ Upgraded to `medium_3_0` (2 vCPU, 4GB RAM, 80GB SSD)
- **Build:** ✅ Built (using npm run build - completed successfully)
- **Dependencies:** ✅ Installed (1475 packages, reinstalled with 4GB RAM)
- **Node.js:** v20.20.0
- **PM2:** Installed
- **Service Status:** ⚠️ Running but failing (PM2 process `strapi-cms` online, but service crashes due to database password authentication error)
- **Environment:** ✅ `.env` file created with:
  - ✅ All Strapi security keys generated (APP_KEYS, JWT secrets, etc.)
  - ✅ AWS credentials configured (S3 for media storage)
  - ✅ Database connection settings configured
  - ⚠️ **DATABASE_PASSWORD needs to be set** (currently placeholder: `REPLACE_WITH_ACTUAL_PASSWORD`)
- **Port 1337:** ✅ Open (firewall configured and verified - port opened via AWS CLI)
- **Connectivity:** ✅ Service accessible via both IP and domain
- **API Endpoint:** `http://cms.vishnumandirtampa.com:1337/api` ✅ Accessible
- **Admin Panel:** `http://cms.vishnumandirtampa.com:1337/admin` ✅ Accessible
- **Upgrade Method:** Snapshot method - created snapshot, recreated instance with medium_3_0 bundle
- **Note:** Using self-hosted Strapi (open-source/free version) on Lightsail, not Strapi Cloud

### ✅ S3 Bucket
- **Name:** `vishnu-mandir-cms-media`
- **Region:** us-east-1
- **CORS:** Configured
- **Status:** Created

### ✅ Build Configuration
- **Amplify Config:** `frontend/amplify.yml` created
- **Deployment Scripts:** Created in `scripts/`
- **Environment Templates:** Created

### ✅ DNS Configuration (Route53)
- **Hosted Zone:** `Z10186528G387OP9KXEZ` (vishnumandirtampa.com)
- **API Subdomain:** `api.vishnumandirtampa.com` → `34.206.184.139` (A record, INSYNC)
- **CMS Subdomain:** `cms.vishnumandirtampa.com` → `3.93.212.154` (A record, INSYNC) - Updated after instance upgrade
- **Main Domain:** `vishnumandirtampa.com` → TBD (will point to Amplify after app creation)
- **Status:** DNS records created and propagating

### ✅ Firewall Ports (Lightsail)
- **Backend Instance:** Port 4000 (TCP) - ✅ Open (accessible from 0.0.0.0/0)
- **CMS Instance:** Port 1337 (TCP) - ✅ Open (accessible from 0.0.0.0/0) - **Fixed:** Port opened via `aws lightsail open-instance-public-ports` on 2026-01-26
- **Status:** Firewall ports configured and verified
- **Note:** Services must be started for ports to be functional

## Next Steps (Manual Configuration Required)

### 1. Database Configuration

**Get Database Password:**
- The database password was generated during creation
- Retrieve from AWS Lightsail Console > Databases > vishnu-mandir-postgres > Master password
- Or from secure storage where it was saved

**Configure Firewall:**
- Go to AWS Lightsail Console > Databases > vishnu-mandir-postgres > Networking
- Add firewall rules to allow:
  - Backend IP: `34.206.184.139`
  - CMS IP: `44.202.153.84`
  - Your local IP (for running migrations)

**Run Migrations:**
```bash
export DATABASE_URL="postgresql://mandir_admin:PASSWORD@ls-6dc3fd3a57dc9f6f7081de1473b92ae349ce8bb7.cgl4acs00ai2.us-east-1.rds.amazonaws.com:5432/vishnu_mandir_tampa?sslmode=require"
cd /path/to/project
./scripts/run-migrations.sh
```

### 2. Backend Service Configuration

**SSH to Backend Instance:**
```bash
ssh -i /tmp/lightsail-default-key.pem ubuntu@34.206.184.139
```

**Create .env File:**
```bash
cd /home/ubuntu/vishnu-mandir-tampa/backend
cp .env.template .env
# Edit .env with actual values (see scripts/backend-env-template.txt)
nano .env
```

**Required Values:**
- `DATABASE_URL` (with actual password)
- `API_KEY` (generate secure random key)
- `COGNITO_USER_POOL_ID`, `COGNITO_CLIENT_ID`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `FRONTEND_URL` (Amplify URL - update after Amplify app is created)

**Start Service:**
```bash
cd /home/ubuntu/vishnu-mandir-tampa/backend
pm2 start dist/server.js --name backend-api
pm2 save
pm2 startup
```

### 3. CMS Service Configuration

**SSH to CMS Instance:**
```bash
ssh -i /tmp/lightsail-default-key.pem ubuntu@44.202.153.84
```

**Wait for npm install to complete, then build:**
```bash
cd /home/ubuntu/vishnu-mandir-tampa/cms
# Check if npm install is done
ps aux | grep npm
# Once done, build
npm run build
```

**Create .env File:**
```bash
cd /home/ubuntu/vishnu-mandir-tampa/cms
cp .env.template .env
# Edit .env with actual values (see scripts/cms-env-template.txt)
nano .env
```

**Generate Security Keys:**
```bash
# Generate random strings for:
# APP_KEYS (4 comma-separated values)
# API_TOKEN_SALT
# ADMIN_JWT_SECRET
# TRANSFER_TOKEN_SALT
# JWT_SECRET

openssl rand -base64 32  # Run 5 times for the keys above
```

**Start Service:**
```bash
cd /home/ubuntu/vishnu-mandir-tampa/cms
pm2 start npm --name strapi-cms -- start
pm2 save
pm2 startup
```

**Initial Setup:**
1. Access admin panel: `http://44.202.153.84:1337/admin`
2. Create first admin user
3. Generate API token: Settings > API Tokens > Create new API Token
4. Save token for Amplify configuration

### 4. AWS Amplify App Creation

**Manual Steps (via AWS Console):**
1. Go to AWS Amplify Console
2. Click "New app" > "Host web app"
3. Connect to GitHub: `https://github.com/vinnyfds/vishnumandir.git`
4. Select branch: `main`
5. Build settings: Use existing `frontend/amplify.yml`
6. Review and create app

**Configure Environment Variables:**
Go to App Settings > Environment Variables and add:
- `DATABASE_URL` (for Prisma Client generation)
- `NEXT_PUBLIC_API_URL="http://34.206.184.139:4000/api"`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `COGNITO_USER_POOL_ID`, `COGNITO_CLIENT_ID`, `NEXT_PUBLIC_COGNITO_REGION`
- `CMS_API_URL="http://44.202.153.84:1337/api"`
- `CMS_API_TOKEN` (from Strapi admin panel)
- `NEXT_PUBLIC_URL` (Amplify app URL)
- `NEXT_PUBLIC_API_KEY` (same as backend API_KEY)

**Deploy:**
- Push to `main` branch triggers automatic deployment
- Or manually trigger build in Amplify Console

### 5. Service Verification

**Test Backend:**
```bash
curl http://34.206.184.139:4000/api/health
# Or test a specific endpoint
```

**Test CMS:**
```bash
curl http://44.202.153.84:1337/api
# Access admin: http://44.202.153.84:1337/admin
```

**Test Database Connection:**
```bash
# From backend instance
psql "postgresql://mandir_admin:PASSWORD@ls-6dc3fd3a57dc9f6f7081de1473b92ae349ce8bb7.cgl4acs00ai2.us-east-1.rds.amazonaws.com:5432/vishnu_mandir_tampa?sslmode=require" -c "SELECT 1;"
```

## Files Created

### Deployment Scripts
- `scripts/deploy-backend.sh` - Backend deployment automation
- `scripts/deploy-cms.sh` - CMS deployment automation
- `scripts/run-migrations.sh` - Database migration runner
- `scripts/backend-env-template.txt` - Backend environment template
- `scripts/cms-env-template.txt` - CMS environment template

### Configuration Files
- `frontend/amplify.yml` - Amplify build configuration
- `docs/deployment/aws-infrastructure.md` - Infrastructure documentation
- `docs/deployment/DEPLOYMENT_STATUS.md` - This file

## Important Notes

1. **Database Password:** Must be retrieved from AWS Lightsail Console or secure storage
2. **Environment Variables:** All sensitive values must be configured on servers (never commit to Git)
3. **Firewall Rules:** Database firewall must be configured via Lightsail Console
4. **Amplify App:** Requires manual creation via AWS Console (OAuth token setup)
5. **SSL/TLS:** Consider setting up SSL certificates for production domains (Let's Encrypt)

## Support

For issues:
- Check AWS Lightsail Console for instance/database status
- Review PM2 logs: `pm2 logs` on instances
- Check Amplify build logs in AWS Console
- Refer to `docs/deployment/TROUBLESHOOTING.md`
