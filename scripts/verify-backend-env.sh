#!/bin/bash
# Script to verify backend environment variables on Lightsail instance

set -e

INSTANCE_IP="34.206.184.139"
SSH_USER="ubuntu"
SSH_KEY="/Users/vamsigangeskalanidhi/Downloads/vishnumandir-backend.pem"
PROJECT_DIR="/home/ubuntu/vishnu-mandir-tampa/backend"

echo "🔍 Verifying backend environment variables on Lightsail instance..."
echo "📍 Instance: $INSTANCE_IP"
echo ""

# SSH to the instance and check environment variables
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$SSH_USER@$INSTANCE_IP" << 'ENDSSH'
  cd /home/ubuntu/vishnu-mandir-tampa/backend
  
  ENV_FILE=".env"
  
  echo "📋 Checking .env file..."
  if [ -f "$ENV_FILE" ]; then
    echo "✅ .env file exists"
    echo ""
    
    echo "🔐 Environment variables status:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Check DATABASE_URL
    if grep -q "^DATABASE_URL=" "$ENV_FILE"; then
      DB_URL=$(grep '^DATABASE_URL=' "$ENV_FILE" | cut -d'=' -f2 | cut -d'@' -f1)
      if [ ! -z "$DB_URL" ]; then
        echo "✅ DATABASE_URL: Set (value masked for security)"
      else
        echo "❌ DATABASE_URL: Empty"
      fi
    else
      echo "❌ DATABASE_URL: Not found"
    fi
    
    # Check CMS_API_URL
    if grep -q "^CMS_API_URL=" "$ENV_FILE"; then
      CMS_URL=$(grep '^CMS_API_URL=' "$ENV_FILE" | cut -d'=' -f2)
      if [ ! -z "$CMS_URL" ]; then
        echo "✅ CMS_API_URL: $CMS_URL"
      else
        echo "❌ CMS_API_URL: Empty"
      fi
    else
      echo "❌ CMS_API_URL: Not found"
    fi
    
    # Check CMS_API_TOKEN
    if grep -q "^CMS_API_TOKEN=" "$ENV_FILE"; then
      CMS_TOKEN=$(grep '^CMS_API_TOKEN=' "$ENV_FILE" | cut -d'=' -f2)
      if [ ! -z "$CMS_TOKEN" ]; then
        TOKEN_LENGTH=${#CMS_TOKEN}
        echo "✅ CMS_API_TOKEN: Set (${TOKEN_LENGTH} characters)"
      else
        echo "❌ CMS_API_TOKEN: Empty"
      fi
    else
      echo "❌ CMS_API_TOKEN: Not found"
    fi
    
    # Check other critical variables
    if grep -q "^NODE_ENV=" "$ENV_FILE"; then
      NODE_ENV=$(grep '^NODE_ENV=' "$ENV_FILE" | cut -d'=' -f2)
      echo "✅ NODE_ENV: $NODE_ENV"
    else
      echo "❌ NODE_ENV: Not found"
    fi
    
    if grep -q "^BACKEND_PORT=" "$ENV_FILE"; then
      BACKEND_PORT=$(grep '^BACKEND_PORT=' "$ENV_FILE" | cut -d'=' -f2)
      echo "✅ BACKEND_PORT: $BACKEND_PORT"
    else
      echo "❌ BACKEND_PORT: Not found"
    fi
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    # Check PM2 service status
    echo "📊 Backend service status:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    if pm2 list 2>/dev/null | grep -q "backend-api"; then
      STATUS=$(pm2 show backend-api 2>/dev/null | grep "status" | awk '{print $NF}')
      echo "✅ Backend service (backend-api) is running"
      echo "   Status: $STATUS"
      
      # Show recent logs
      echo ""
      echo "📝 Recent backend logs (last 20 lines):"
      echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
      pm2 logs backend-api --lines 20 --nostream 2>/dev/null | tail -20
    else
      echo "❌ Backend service (backend-api) is not running"
      echo "   Run: ./scripts/deploy-backend.sh"
    fi
    
  else
    echo "❌ .env file NOT found at $ENV_FILE"
    echo "   Please create it using:"
    echo "   cp ../scripts/backend-env-template.txt $ENV_FILE"
    echo "   Then edit it with actual production values"
    exit 1
  fi
ENDSSH

echo ""
echo "✅ Verification complete!"
