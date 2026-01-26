#!/bin/bash
# Deployment script for Strapi CMS to Lightsail instance

set -e

INSTANCE_NAME="vishnu-mandir-cms"
INSTANCE_IP="44.202.153.84"
SSH_USER="ubuntu"
SSH_KEY="/Users/vamsigangeskalanidhi/Downloads/vishnumandir-cms.pem"
PROJECT_DIR="/home/ubuntu/vishnu-mandir-tampa"

echo "🚀 Deploying Strapi CMS to Lightsail instance..."

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
echo "🔨 Building Strapi CMS..."
ssh -i "$SSH_KEY" "$SSH_USER@$INSTANCE_IP" << 'ENDSSH'
  cd /home/ubuntu/vishnu-mandir-tampa/cms
  npm install
  npm run build
ENDSSH

# Create .env file (user needs to provide values)
echo "⚠️  Note: You need to create .env file on the server with production values"
echo "   Location: $PROJECT_DIR/cms/.env"

# Start/restart with PM2
echo "🔄 Starting Strapi CMS service with PM2..."
ssh -i "$SSH_KEY" "$SSH_USER@$INSTANCE_IP" << 'ENDSSH'
  cd /home/ubuntu/vishnu-mandir-tampa/cms
  pm2 stop strapi-cms || true
  pm2 delete strapi-cms || true
  pm2 start npm --name strapi-cms -- start
  pm2 save
  pm2 startup
ENDSSH

echo "✅ Strapi CMS deployment complete!"
echo "📍 CMS should be available at: http://$INSTANCE_IP:1337"
echo "📍 Admin panel: http://$INSTANCE_IP:1337/admin"
