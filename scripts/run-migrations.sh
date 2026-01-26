#!/bin/bash
# Script to run Prisma migrations on production database

set -e

DB_ENDPOINT="ls-6dc3fd3a57dc9f6f7081de1473b92ae349ce8bb7.cgl4acs00ai2.us-east-1.rds.amazonaws.com"
DB_PORT="5432"
DB_NAME="vishnu_mandir_tampa"
DB_USER="mandir_admin"

echo "🚀 Running Prisma migrations on production database..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ Error: DATABASE_URL environment variable is not set"
  echo ""
  echo "Please set DATABASE_URL with the following format:"
  echo "export DATABASE_URL=\"postgresql://${DB_USER}:PASSWORD@${DB_ENDPOINT}:${DB_PORT}/${DB_NAME}?sslmode=require\""
  echo ""
  echo "Then run this script again:"
  echo "./scripts/run-migrations.sh"
  exit 1
fi

# Verify connection string format
if [[ ! "$DATABASE_URL" == *"?sslmode=require"* ]]; then
  echo "⚠️  Warning: DATABASE_URL should include ?sslmode=require for SSL connection"
fi

echo "📦 Generating Prisma Client..."
npx prisma generate

echo "🔄 Running migrations..."
npx prisma migrate deploy

echo "✅ Migrations completed successfully!"
echo ""
echo "Verifying schema..."
npx prisma db pull --force
npx prisma generate

echo "✅ Database schema verified!"
