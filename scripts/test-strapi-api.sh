#!/bin/bash

# Test Strapi API endpoints with API token
# Usage: ./scripts/test-strapi-api.sh [TOKEN]
# If TOKEN not provided, reads from .env file

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get token from argument or .env file
if [ -n "$1" ]; then
  TOKEN="$1"
else
  # Try to read from .env file
  if [ -f ".env" ]; then
    TOKEN=$(grep "^CMS_API_TOKEN=" .env | cut -d= -f2)
  else
    echo -e "${RED}Error: No token provided and .env file not found${NC}"
    echo "Usage: $0 [TOKEN]"
    exit 1
  fi
fi

if [ -z "$TOKEN" ]; then
  echo -e "${RED}Error: CMS_API_TOKEN not found in .env file${NC}"
  echo "Please provide token as argument: $0 <TOKEN>"
  exit 1
fi

CMS_URL="https://cms.vishnumandirtampa.com/api"

echo -e "${YELLOW}=== Testing Strapi API Endpoints ===${NC}"
echo "CMS URL: $CMS_URL"
echo "Token: ${TOKEN:0:20}..."
echo ""

# Test endpoints
endpoints=("events" "puja-services" "priests" "announcements" "newsletters")

for endpoint in "${endpoints[@]}"; do
  echo -e "${YELLOW}--- Testing /api/$endpoint ---${NC}"
  
  response=$(curl -s -w "\n%{http_code}" -H "Authorization: Bearer $TOKEN" \
    "$CMS_URL/$endpoint?populate=*")
  
  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | sed '$d')
  
  # Parse JSON response
  if command -v python3 &> /dev/null; then
    has_error=$(echo "$body" | python3 -c "import sys, json; d=json.load(sys.stdin); print('true' if d.get('error') else 'false')" 2>/dev/null || echo "unknown")
    data_count=$(echo "$body" | python3 -c "import sys, json; d=json.load(sys.stdin); print(len(d.get('data', [])) if d.get('data') else 0)" 2>/dev/null || echo "unknown")
    error_msg=$(echo "$body" | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('error', {}).get('message', 'None'))" 2>/dev/null || echo "unknown")
  else
    has_error="unknown"
    data_count="unknown"
    error_msg="unknown"
  fi
  
  # Print results
  if [ "$http_code" = "200" ] && [ "$has_error" = "false" ]; then
    echo -e "${GREEN}✓ Status: OK (HTTP $http_code)${NC}"
    echo -e "${GREEN}  Data count: $data_count${NC}"
  elif [ "$http_code" = "200" ] && [ "$has_error" = "true" ]; then
    echo -e "${RED}✗ Status: ERROR (HTTP $http_code)${NC}"
    echo -e "${RED}  Error: $error_msg${NC}"
  elif [ "$http_code" = "404" ]; then
    echo -e "${RED}✗ Status: NOT FOUND (HTTP 404)${NC}"
    echo -e "${RED}  Error: $error_msg${NC}"
    echo -e "${YELLOW}  → Permissions not configured for this content type${NC}"
  else
    echo -e "${RED}✗ Status: ERROR (HTTP $http_code)${NC}"
    echo -e "${RED}  Response: ${body:0:200}...${NC}"
  fi
  
  echo ""
done

echo -e "${YELLOW}=== Summary ===${NC}"
echo "If you see 404 errors, you need to:"
echo "1. Go to Strapi Admin → Settings → API Tokens → Edit token"
echo "2. Find content types in Permissions tab"
echo "3. Enable 'find' and 'findOne' for each content type"
echo "4. Click Save"
echo ""
echo "See: docs/deployment/STRAPI_FIND_CONTENT_TYPES_IN_PERMISSIONS.md"
