#!/bin/bash
# Diagnostic script for Strapi CMS API connectivity and content status
# Tests all content type endpoints and reports availability

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}Strapi CMS Content Diagnostic${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Check for CMS_API_TOKEN from environment or .env
if [ -f ".env" ]; then
  export $(grep CMS_API_TOKEN .env | xargs)
fi

if [ -z "$CMS_API_TOKEN" ]; then
  echo -e "${RED}Error: CMS_API_TOKEN not set. Please set it in environment or .env file${NC}"
  exit 1
fi

if [ -z "$CMS_API_URL" ]; then
  CMS_API_URL="https://cms.vishnumandirtampa.com/api"
fi

echo -e "${GREEN}✓${NC} Configuration:"
echo "  CMS_API_URL: $CMS_API_URL"
echo "  CMS_API_TOKEN: ${CMS_API_TOKEN:0:10}...${CMS_API_TOKEN: -10}"
echo ""

# Function to test endpoint
test_endpoint() {
  local endpoint=$1
  local name=$2
  
  echo -n "Testing $name... "
  
  response=$(curl -s -H "Authorization: Bearer $CMS_API_TOKEN" \
    "$CMS_API_URL/$endpoint?populate=*")
  
  # Check if response has data
  if echo "$response" | jq -e '.data' > /dev/null 2>&1; then
    count=$(echo "$response" | jq '.data | length')
    total=$(echo "$response" | jq '.meta.pagination.total // 0')
    
    if [ "$count" -eq 0 ] && [ "$total" -eq 0 ]; then
      echo -e "${YELLOW}⚠${NC} No content (0/$total)"
    else
      echo -e "${GREEN}✓${NC} Found $count content items (total: $total)"
    fi
  else
    # Check for error
    error=$(echo "$response" | jq '.error.message // "Unknown error"' 2>/dev/null)
    echo -e "${RED}✗${NC} Error: $error"
  fi
}

echo -e "${BLUE}Content Type Status:${NC}"
echo ""

test_endpoint "events" "Events"
test_endpoint "puja-services" "Puja Services"
test_endpoint "priests" "Priests"
test_endpoint "announcements" "Announcements"
test_endpoint "newsletters" "Newsletters"
test_endpoint "pages" "Pages"

echo ""
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}Summary${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Get all data to provide summary
events=$(curl -s -H "Authorization: Bearer $CMS_API_TOKEN" \
  "$CMS_API_URL/events?populate=*" | jq '.meta.pagination.total // 0')
puja=$(curl -s -H "Authorization: Bearer $CMS_API_TOKEN" \
  "$CMS_API_URL/puja-services?populate=*" | jq '.meta.pagination.total // 0')
priests=$(curl -s -H "Authorization: Bearer $CMS_API_TOKEN" \
  "$CMS_API_URL/priests?populate=*" | jq '.meta.pagination.total // 0')
announcements=$(curl -s -H "Authorization: Bearer $CMS_API_TOKEN" \
  "$CMS_API_URL/announcements?populate=*" | jq '.meta.pagination.total // 0')
newsletters=$(curl -s -H "Authorization: Bearer $CMS_API_TOKEN" \
  "$CMS_API_URL/newsletters?populate=*" | jq '.meta.pagination.total // 0')

echo "Total Content Items:"
echo "  Events: $events"
echo "  Puja Services: $puja"
echo "  Priests: $priests"
echo "  Announcements: $announcements"
echo "  Newsletters: $newsletters"
echo ""

# Recommendations
echo -e "${BLUE}Recommendations:${NC}"
echo ""

if [ "$events" -eq 0 ]; then
  echo "  • Create Events in Strapi Content Manager"
fi

if [ "$puja" -eq 0 ]; then
  echo "  • Create Puja Services in Strapi Content Manager"
fi

if [ "$priests" -eq 0 ]; then
  echo "  • Create Priests in Strapi Content Manager"
fi

if [ "$announcements" -eq 0 ]; then
  echo "  • Create Announcements in Strapi Content Manager"
fi

if [ "$newsletters" -eq 0 ]; then
  echo "  • Create Newsletters in Strapi Content Manager"
fi

echo ""
echo -e "${BLUE}For more details, see:${NC}"
echo "  docs/deployment/CMS_CONTENT_DIAGNOSTIC_RESULTS.md"
echo ""
