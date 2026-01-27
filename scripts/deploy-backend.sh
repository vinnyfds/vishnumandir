#!/bin/bash
# Deployment script for Express backend to Lightsail instance

set -e

INSTANCE_NAME="vishnu-mandir-backend"
INSTANCE_IP="34.206.184.139"
SSH_USER="ubuntu"
SSH_KEY="/Users/vamsigangeskalanidhi/Downloads/vishnumandir-backend.pem"
PROJECT_DIR="/home/ubuntu/vishnu-mandir-tampa"

echo "🚀 Deploying backend to Lightsail instance..."

# Test SSH connection
echo "📡 Testing SSH connection..."
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$SSH_USER@$INSTANCE_IP" "echo 'SSH connection successful'"

# Install Node.js 20 if not present
echo "📦 Checking Node.js installation..."
ssh -i "$SSH_KEY" "$SSH_USER@$INSTANCE_IP" << 'ENDSSH'
  if ! command -v node &> /dev/null; then
    echo "Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
  fi
  node --version
  npm --version
ENDSSH

# Install PM2 globally if not present
echo "📦 Installing PM2..."
ssh -i "$SSH_KEY" "$SSH_USER@$INSTANCE_IP" "sudo npm install -g pm2 || true"

# Clone or update repository
echo "📥 Setting up repository..."
ssh -i "$SSH_KEY" "$SSH_USER@$INSTANCE_IP" << ENDSSH
  if [ ! -d "$PROJECT_DIR" ]; then
    git clone https://github.com/vinnyfds/vishnumandir.git "$PROJECT_DIR"
  else
    cd "$PROJECT_DIR"
    git pull origin main
  fi
ENDSSH

# Install dependencies and build
echo "🔨 Building backend..."
ssh -i "$SSH_KEY" "$SSH_USER@$INSTANCE_IP" << 'ENDSSH'
  cd /home/ubuntu/vishnu-mandir-tampa
  npx prisma generate
  cd backend
  npm install
  npm run build
ENDSSH

# Verify and create .env file if needed
echo "🔍 Verifying backend environment variables..."
ssh -i "$SSH_KEY" "$SSH_USER@$INSTANCE_IP" << 'ENDSSH'
  cd /home/ubuntu/vishnu-mandir-tampa/backend
  
  ENV_FILE=".env"
  
  # Check if .env exists
  if [ ! -f "$ENV_FILE" ]; then
    echo "⚠️  .env file not found. Checking for template..."
    
    # Try to use template from scripts
    if [ -f "../scripts/backend-env-template.txt" ]; then
      echo "📋 Creating .env from template..."
      cp ../scripts/backend-env-template.txt "$ENV_FILE"
      echo "✅ .env created from template at $PROJECT_DIR/backend/.env"
      echo "⚠️  IMPORTANT: Verify these values are correct:"
      echo "   - DATABASE_URL (RDS endpoint)"
      echo "   - CMS_API_URL (should be http://cms.vishnumandirtampa.com:1337/api)"
      echo "   - CMS_API_TOKEN (should be set)"
      echo "   - STRIPE_SECRET_KEY"
      echo "   - RESEND_API_KEY"
    else
      echo "❌ Template file not found at ../scripts/backend-env-template.txt"
      echo "   Please manually create .env file with required variables"
      exit 1
    fi
  else
    echo "✅ .env file exists"
  fi
  
  # Verify critical variables are set
  if grep -q "^CMS_API_TOKEN=" "$ENV_FILE" && [ "$(grep '^CMS_API_TOKEN=' "$ENV_FILE" | cut -d'=' -f2)" != "" ]; then
    echo "✅ CMS_API_TOKEN is set"
  else
    echo "❌ ERROR: CMS_API_TOKEN is not set in .env"
    echo "   This is required for Strapi form sync to work"
    exit 1
  fi
  
  if grep -q "^CMS_API_URL=" "$ENV_FILE" && [ "$(grep '^CMS_API_URL=' "$ENV_FILE" | cut -d'=' -f2)" != "" ]; then
    echo "✅ CMS_API_URL is set"
  else
    echo "❌ ERROR: CMS_API_URL is not set in .env"
    exit 1
  fi
  
  if grep -q "^DATABASE_URL=" "$ENV_FILE" && [ "$(grep '^DATABASE_URL=' "$ENV_FILE" | cut -d'=' -f2)" != "" ]; then
    echo "✅ DATABASE_URL is set"
  else
    echo "❌ ERROR: DATABASE_URL is not set in .env"
    exit 1
  fi
ENDSSH

# Start/restart with PM2
echo "🔄 Starting backend service with PM2..."
ssh -i "$SSH_KEY" "$SSH_USER@$INSTANCE_IP" << 'ENDSSH'
  cd /home/ubuntu/vishnu-mandir-tampa/backend
  pm2 stop backend-api || true
  pm2 delete backend-api || true
  pm2 start dist/server.js --name backend-api
  pm2 save
  pm2 startup
ENDSSH

echo "✅ Backend deployment complete!"
echo "📍 Backend API should be available at: http://$INSTANCE_IP:4000"
