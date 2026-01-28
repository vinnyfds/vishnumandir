#!/bin/bash

# Validation script to check all required frontend environment variables
# Ensures both form submission and CMS content flows are properly configured
# Usage: ./scripts/validate-frontend-env.sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Load environment variables from .env.local if available (for local dev testing)
if [ -f "frontend/.env.local" ]; then
  export $(grep -v '^#' frontend/.env.local | xargs)
fi

echo -e "${BLUE}=== Frontend Environment Variables Validation ===${NC}\n"

# Track validation status
ALL_VALID=true

# FORM SUBMISSION VARIABLES
echo -e "${BLUE}[FORM SUBMISSION FLOW]${NC}"
echo "These variables are needed for the form submission proxy to work."
echo ""

# Check NEXT_PUBLIC_API_URL
if [ -z "$NEXT_PUBLIC_API_URL" ]; then
  echo -e "${RED}✗ NEXT_PUBLIC_API_URL${NC}: Not set"
  echo "  Location: Environment or frontend/.env.local"
  echo "  Example: http://localhost:4000"
  echo "  Used for: Proxying form data to Express backend"
  ALL_VALID=false
else
  echo -e "${GREEN}✓ NEXT_PUBLIC_API_URL${NC}: $NEXT_PUBLIC_API_URL"
fi

# Check NEXT_PUBLIC_API_KEY
if [ -z "$NEXT_PUBLIC_API_KEY" ]; then
  echo -e "${RED}✗ NEXT_PUBLIC_API_KEY${NC}: Not set"
  echo "  Location: Environment or frontend/.env.local"
  echo "  Used for: Authentication header (x-api-key) in form submissions"
  ALL_VALID=false
else
  KEY_LENGTH=${#NEXT_PUBLIC_API_KEY}
  echo -e "${GREEN}✓ NEXT_PUBLIC_API_KEY${NC}: Set (${KEY_LENGTH} characters)"
fi

echo ""

# CMS CONTENT VARIABLES
echo -e "${BLUE}[CMS CONTENT FLOW]${NC}"
echo "These variables are needed for fetching announcements, events, etc. from Strapi."
echo ""

# Check CMS_API_URL
if [ -z "$CMS_API_URL" ]; then
  echo -e "${RED}✗ CMS_API_URL${NC}: Not set"
  echo "  Location: Environment or frontend/.env.local"
  echo "  Example: http://localhost:1337/api"
  echo "  Used for: Fetching CMS content (announcements, events, newsletters, etc.)"
  ALL_VALID=false
else
  echo -e "${GREEN}✓ CMS_API_URL${NC}: $CMS_API_URL"
fi

# Check CMS_API_TOKEN
if [ -z "$CMS_API_TOKEN" ]; then
  echo -e "${RED}✗ CMS_API_TOKEN${NC}: Not set"
  echo "  Location: Environment or frontend/.env.local"
  echo "  Used for: Authentication with Strapi CMS API"
  ALL_VALID=false
else
  TOKEN_LENGTH=${#CMS_API_TOKEN}
  echo -e "${GREEN}✓ CMS_API_TOKEN${NC}: Set (${TOKEN_LENGTH} characters)"
fi

echo ""

# SUMMARY
echo -e "${BLUE}=== SUMMARY ===${NC}"
if [ "$ALL_VALID" = true ]; then
  echo -e "${GREEN}✓ All required variables are set!${NC}"
  echo ""
  echo "Both form submission and CMS content flows should work."
  echo ""
  echo "To verify:"
  echo "  1. Navigate to /forms/puja-sponsorships and try submitting a form"
  echo "  2. Navigate to home page and check for announcements/events"
  echo ""
  exit 0
else
  echo -e "${RED}✗ Some required variables are missing!${NC}"
  echo ""
  echo -e "${YELLOW}To fix:${NC}"
  echo "  1. Create/update frontend/.env.local with all four variables"
  echo "  2. Copy from root .env or Amplify Console:"
  echo "     - NEXT_PUBLIC_API_URL"
  echo "     - NEXT_PUBLIC_API_KEY"
  echo "     - CMS_API_URL"
  echo "     - CMS_API_TOKEN"
  echo ""
  echo "  See docs/development/FRONTEND_ENV_SETUP.md for detailed instructions"
  echo ""
  exit 1
fi
