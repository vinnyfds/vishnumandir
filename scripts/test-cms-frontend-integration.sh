#!/bin/bash
# Comprehensive CMS-Frontend Integration Test Script
# Tests Strapi CMS API connectivity and validates content is accessible for frontend rendering
# This script tests each content type endpoint and verifies the response structure

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Timestamp for logs
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Test results counters
PASSED=0
FAILED=0
WARNINGS=0

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}CMS Frontend Integration Test${NC}"
echo -e "${BLUE}Test Time: $TIMESTAMP${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Load environment variables from .env if available
# Only load CMS_API_URL and CMS_API_TOKEN to avoid issues with special characters
if [ -f ".env" ]; then
  CMS_API_URL_FROM_ENV=$(grep '^CMS_API_URL=' .env | cut -d '=' -f2- | tr -d '"')
  CMS_API_TOKEN_FROM_ENV=$(grep '^CMS_API_TOKEN=' .env | cut -d '=' -f2- | tr -d '"')
  
  if [ -z "$CMS_API_URL" ] && [ -n "$CMS_API_URL_FROM_ENV" ]; then
    CMS_API_URL="$CMS_API_URL_FROM_ENV"
  fi
  
  if [ -z "$CMS_API_TOKEN" ] && [ -n "$CMS_API_TOKEN_FROM_ENV" ]; then
    CMS_API_TOKEN="$CMS_API_TOKEN_FROM_ENV"
  fi
fi

# Check for required configuration
if [ -z "$CMS_API_TOKEN" ]; then
  echo -e "${RED}✗ Error: CMS_API_TOKEN not set${NC}"
  echo "  Set CMS_API_TOKEN in .env or environment variables"
  exit 1
fi

if [ -z "$CMS_API_URL" ]; then
  CMS_API_URL="https://cms.vishnumandirtampa.com/api"
  echo -e "${YELLOW}⚠ Using default CMS_API_URL: $CMS_API_URL${NC}"
fi

echo -e "${GREEN}✓ Configuration Loaded${NC}"
echo "  CMS_API_URL: $CMS_API_URL"
echo "  CMS_API_TOKEN: ${CMS_API_TOKEN:0:10}...${CMS_API_TOKEN: -10}"
echo ""

# Function to test an endpoint and validate response structure
test_endpoint() {
  local endpoint=$1
  local name=$2
  local expected_fields=$3
  
  echo -n "Testing $name... "
  
  response=$(curl -s -w "\n%{http_code}" \
    -H "Authorization: Bearer $CMS_API_TOKEN" \
    "$CMS_API_URL/$endpoint?populate=*&pagination[limit]=1")
  
  # Extract status code (last line) and response (all but last line)
  http_code=$(echo "$response" | tail -n 1)
  response_body=$(echo "$response" | sed '$d')
  
  # Check HTTP status
  if [ "$http_code" != "200" ]; then
    echo -e "${RED}✗ HTTP Error $http_code${NC}"
    if echo "$response_body" | jq -e '.error' > /dev/null 2>&1; then
      error_msg=$(echo "$response_body" | jq '.error.message // .error' 2>/dev/null)
      echo "  Error: $error_msg"
    fi
    FAILED=$((FAILED + 1))
    return 1
  fi
  
  # Check if response has data structure
  if ! echo "$response_body" | jq -e '.data' > /dev/null 2>&1; then
    echo -e "${RED}✗ Invalid response structure (missing 'data' field)${NC}"
    FAILED=$((FAILED + 1))
    return 1
  fi
  
  # Get count and total
  count=$(echo "$response_body" | jq '.data | length')
  total=$(echo "$response_body" | jq '.meta.pagination.total // 0')
  
  # Check for content
  if [ "$count" -eq 0 ] && [ "$total" -eq 0 ]; then
    echo -e "${YELLOW}⚠ No content (0 items)${NC}"
    WARNINGS=$((WARNINGS + 1))
  else
    echo -e "${GREEN}✓ Found $count item(s) (total: $total)${NC}"
    PASSED=$((PASSED + 1))
    
    # If there's content, validate structure
    if [ "$count" -gt 0 ]; then
      first_item=$(echo "$response_body" | jq '.data[0]')
      has_id=$(echo "$first_item" | jq -e '.id' > /dev/null 2>&1 && echo "yes" || echo "no")
      has_attributes=$(echo "$first_item" | jq -e '.attributes' > /dev/null 2>&1 && echo "yes" || echo "no")
      
      if [ "$has_id" != "yes" ] || [ "$has_attributes" != "yes" ]; then
        echo -e "${YELLOW}  ⚠ Response structure issue: id=$has_id, attributes=$has_attributes${NC}"
        WARNINGS=$((WARNINGS + 1))
      fi
    fi
  fi
  
  return 0
}

# Function to test a content type with specific validations
test_content_type() {
  local endpoint=$1
  local name=$2
  local required_fields=$3
  
  echo -e "${CYAN}→ Testing $name${NC}"
  test_endpoint "$endpoint" "$name" "$required_fields"
  echo ""
}

echo -e "${BLUE}Content Type Tests:${NC}"
echo ""

# Test each content type
test_content_type "events" "Events" "title,date,startTime,category"
test_content_type "announcements" "Announcements" "title,content"
test_content_type "newsletters" "Newsletters" "title,publicationDate"
test_content_type "priests" "Priests" "name"
test_content_type "puja-services" "Puja Services" "name,price"
test_content_type "pages" "Pages" "title,slug,content"

# Summary
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}Test Summary${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

if [ "$PASSED" -gt 0 ]; then
  echo -e "${GREEN}✓ Passed: $PASSED${NC}"
fi

if [ "$WARNINGS" -gt 0 ]; then
  echo -e "${YELLOW}⚠ Warnings: $WARNINGS${NC}"
fi

if [ "$FAILED" -gt 0 ]; then
  echo -e "${RED}✗ Failed: $FAILED${NC}"
fi

echo ""

# Recommendations
echo -e "${BLUE}Recommendations:${NC}"
echo ""

if [ "$FAILED" -gt 0 ]; then
  echo -e "${RED}API connectivity issues detected:${NC}"
  echo "  1. Verify CMS_API_TOKEN is valid in Strapi Admin Panel"
  echo "  2. Verify token has 'Full access' type or permissions enabled for:"
  echo "     - Event (find, findOne)"
  echo "     - Announcement (find, findOne)"
  echo "     - Newsletter (find, findOne)"
  echo "     - Priest (find, findOne)"
  echo "     - Puja Service (find, findOne)"
  echo "  3. Verify CMS_API_URL is correct (currently: $CMS_API_URL)"
  echo "  4. Check Strapi server is running and accessible"
  echo ""
fi

if [ "$WARNINGS" -gt 0 ]; then
  echo -e "${YELLOW}Content issues detected:${NC}"
  echo "  1. Some content types have no published items"
  echo "  2. Create test content in Strapi Admin Panel"
  echo "  3. Make sure to PUBLISH each content item (not just save as draft)"
  echo "  4. For events, ensure date/time is in the future"
  echo ""
fi

if [ "$PASSED" -gt 0 ] && [ "$FAILED" -eq 0 ]; then
  echo -e "${GREEN}✓ All API endpoints accessible${NC}"
  echo "  Frontend should be able to fetch content successfully"
  echo ""
fi

# Frontend page mapping
echo -e "${BLUE}Frontend Page Mapping:${NC}"
echo ""
echo "Content Type      → Frontend Pages"
echo "────────────────────────────────────────────────────"
echo "Event             → / (home), /calendar/current-events, /education/events"
echo "Announcement      → / (home)"
echo "Puja Service      → /religious/puja-services"
echo "Priest            → /religious/priests"
echo "Newsletter        → /calendar/newsletter"
echo "Page              → Dynamic pages (not currently used)"
echo ""

# Exit with appropriate code
if [ "$FAILED" -gt 0 ]; then
  exit 1
fi

exit 0
