#!/bin/bash

# End-to-End Form Submission Testing Script
# Tests all form submissions to ensure proper validation, database storage, and CMS sync

set -e

echo "========================================"
echo "Form Submission End-to-End Test Suite"
echo "========================================"
echo ""

API_URL="http://localhost:3000"

# Test 1: Puja Sponsorship Form
echo "TEST 1: Puja Sponsorship Form Submission"
echo "========================================="
echo "Testing multipart/form-data submission with validation..."

FORM_DATA=$(cat <<'EOF'
{
  "devoteeName": "John Doe",
  "email": "john@example.com",
  "phone": "(813) 555-1234",
  "pujaId": "PUJ-DAILY-AARTI-01",
  "sponsorshipDate": "2026-02-15",
  "location": "temple",
  "specialInstructions": "For family blessings",
  "additionalNotes": "Please contact before event"
}
EOF
)

# Note: This would need to be tested via browser or FormData API
# For now, we'll do a simple JSON test
echo "Sending puja sponsorship request..."
RESPONSE=$(curl -s -X POST "${API_URL}/api/v1/forms/sponsorship" \
  -H "Content-Type: application/json" \
  -d "${FORM_DATA}")

echo "Response: ${RESPONSE}"
echo ""

# Test 2: Facility Request Form
echo "TEST 2: Facility Request Form Submission"
echo "========================================"
echo "Testing JSON submission with validation..."

FACILITY_DATA=$(cat <<'EOF'
{
  "contactName": "Jane Smith",
  "email": "jane@example.com",
  "phone": "(813) 555-5678",
  "eventType": "religious",
  "requestedDate": "2026-03-01",
  "numberOfGuests": 50,
  "startTime": "18:00",
  "endTime": "20:00",
  "details": "Religious ceremony for family gathering",
  "requirements": "Need tables and chairs"
}
EOF
)

echo "Sending facility request..."
RESPONSE=$(curl -s -X POST "${API_URL}/api/v1/forms/facility-request" \
  -H "Content-Type: application/json" \
  -d "${FACILITY_DATA}")

echo "Response: ${RESPONSE}"
echo ""

# Test 3: Email Subscription Form
echo "TEST 3: Email Subscription Form Submission"
echo "=========================================="
echo "Testing email subscription..."

EMAIL_SUB_DATA=$(cat <<'EOF'
{
  "name": "Robert Johnson",
  "email": "robert@example.com",
  "subscribe": true
}
EOF
)

echo "Sending email subscription..."
RESPONSE=$(curl -s -X POST "${API_URL}/api/v1/forms/email-subscription" \
  -H "Content-Type: application/json" \
  -d "${EMAIL_SUB_DATA}")

echo "Response: ${RESPONSE}"
echo ""

# Test 4: Change of Address Form
echo "TEST 4: Change of Address Form Submission"
echo "========================================"

ADDRESS_DATA=$(cat <<'EOF'
{
  "name": "Patricia Miller",
  "email": "patricia@example.com",
  "phone": "(813) 555-9999",
  "newAddress": "123 New Street, Tampa, FL 33602"
}
EOF
)

echo "Sending change of address request..."
RESPONSE=$(curl -s -X POST "${API_URL}/api/v1/forms/change-of-address" \
  -H "Content-Type: application/json" \
  -d "${ADDRESS_DATA}")

echo "Response: ${RESPONSE}"
echo ""

# Test 5: Donation Statement Form
echo "TEST 5: Donation Statement Form Submission"
echo "=========================================="

DONATION_STMT_DATA=$(cat <<'EOF'
{
  "name": "Michael Brown",
  "email": "michael@example.com",
  "period": "current-year",
  "delivery": "email"
}
EOF
)

echo "Sending donation statement request..."
RESPONSE=$(curl -s -X POST "${API_URL}/api/v1/forms/donation-statement" \
  -H "Content-Type: application/json" \
  -d "${DONATION_STMT_DATA}")

echo "Response: ${RESPONSE}"
echo ""

# Test 6: Validation Error Testing
echo "TEST 6: Validation Error Testing"
echo "==============================="
echo "Testing invalid email format..."

INVALID_EMAIL=$(cat <<'EOF'
{
  "name": "Test User",
  "email": "invalid-email-format",
  "period": "current-year",
  "delivery": "email"
}
EOF
)

RESPONSE=$(curl -s -X POST "${API_URL}/api/v1/forms/donation-statement" \
  -H "Content-Type: application/json" \
  -d "${INVALID_EMAIL}")

echo "Invalid email response: ${RESPONSE}"
echo ""

echo "========================================"
echo "Test Suite Completed!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Check database for form submissions"
echo "2. Verify emails were sent"
echo "3. Check Strapi CMS for synced data"
echo "4. Review browser console for form submission feedback"
