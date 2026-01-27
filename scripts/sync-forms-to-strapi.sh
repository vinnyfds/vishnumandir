#!/bin/bash
# Script to sync existing PostgreSQL form records to Strapi CMS
# This is useful for backfilling data after fixing API token permissions

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔄 Starting form submission sync to Strapi CMS...${NC}"

# Check if we're in the right directory
if [ ! -d "backend/dist" ]; then
  echo -e "${RED}❌ Error: backend/dist directory not found.${NC}"
  echo "Please run 'npm run build' in the backend directory first."
  exit 1
fi

# Check environment variables
if [ -z "$CMS_API_URL" ]; then
  echo -e "${RED}❌ Error: CMS_API_URL environment variable not set${NC}"
  exit 1
fi

if [ -z "$CMS_API_TOKEN" ]; then
  echo -e "${RED}❌ Error: CMS_API_TOKEN environment variable not set${NC}"
  exit 1
fi

if [ -z "$DATABASE_URL" ]; then
  echo -e "${RED}❌ Error: DATABASE_URL environment variable not set${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Environment variables configured${NC}"
echo "  CMS_API_URL: $CMS_API_URL"
echo "  DATABASE_URL: ${DATABASE_URL:0:50}..."

# Create a Node.js script to perform the sync
cat > /tmp/sync-forms.js << 'ENDSCRIPT'
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get Strapi client
function getStrapiClient() {
  const CMS_API_URL = process.env.CMS_API_URL || "http://localhost:1337/api";
  const CMS_API_TOKEN = process.env.CMS_API_TOKEN || "";

  if (!CMS_API_TOKEN) {
    return null;
  }

  return axios.create({
    baseURL: CMS_API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CMS_API_TOKEN}`,
    },
    timeout: 10000,
  });
}

async function syncPujaSponsorship(sponsorship) {
  const client = getStrapiClient();
  if (!client) {
    console.log(`⚠️  Skipping sync for PujaSponsorship ${sponsorship.id}: CMS_API_TOKEN not configured`);
    return false;
  }

  try {
    const payload = {
      pujaId: sponsorship.pujaId,
      pujaServiceName: sponsorship.pujaServiceName,
      sponsorName: sponsorship.sponsorName,
      sponsorEmail: sponsorship.sponsorEmail,
      sponsorPhone: sponsorship.sponsorPhone || undefined,
      requestedDate: sponsorship.requestedDate.toISOString(),
      location: sponsorship.location || undefined,
      notes: sponsorship.notes || undefined,
      attachmentUrl: sponsorship.attachmentUrl || undefined,
      status: sponsorship.status,
      transactionId: sponsorship.transactionId,
      postgresId: sponsorship.id,
    };

    const response = await client.post("/puja-sponsorships", { data: payload });
    console.log(`✅ Synced PujaSponsorship ${sponsorship.transactionId} (ID: ${sponsorship.id})`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to sync PujaSponsorship ${sponsorship.id}:`, error.response?.status, error.response?.data || error.message);
    return false;
  }
}

async function syncFacilityRequest(request) {
  const client = getStrapiClient();
  if (!client) {
    console.log(`⚠️  Skipping sync for FacilityRequest ${request.id}: CMS_API_TOKEN not configured`);
    return false;
  }

  try {
    const payload = {
      requesterName: request.requesterName,
      requesterEmail: request.requesterEmail,
      requesterPhone: request.requesterPhone,
      eventType: request.eventType,
      eventName: request.eventName || undefined,
      eventDate: request.eventDate.toISOString(),
      startTime: request.startTime || undefined,
      endTime: request.endTime || undefined,
      numberOfGuests: request.numberOfGuests,
      details: request.details || undefined,
      requirements: request.requirements || undefined,
      status: request.status,
      transactionId: request.transactionId,
      postgresId: request.id,
    };

    const response = await client.post("/facility-requests", { data: payload });
    console.log(`✅ Synced FacilityRequest ${request.transactionId} (ID: ${request.id})`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to sync FacilityRequest ${request.id}:`, error.response?.status, error.response?.data || error.message);
    return false;
  }
}

async function main() {
  try {
    console.log("\n📊 Fetching unsync'd forms from PostgreSQL...");
    
    // Fetch all puja sponsorships
    const sponsorships = await prisma.pujaSponsorship.findMany({
      orderBy: { createdAt: 'desc' },
    });

    console.log(`\nFound ${sponsorships.length} Puja Sponsorship records`);
    
    let syncedCount = 0;
    for (const sponsorship of sponsorships) {
      const success = await syncPujaSponsorship(sponsorship);
      if (success) syncedCount++;
    }
    
    console.log(`\n✅ Synced ${syncedCount}/${sponsorships.length} Puja Sponsorships`);

    // Fetch all facility requests
    const requests = await prisma.facilityRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });

    console.log(`\nFound ${requests.length} Facility Request records`);
    
    syncedCount = 0;
    for (const request of requests) {
      const success = await syncFacilityRequest(request);
      if (success) syncedCount++;
    }
    
    console.log(`\n✅ Synced ${syncedCount}/${requests.length} Facility Requests`);

    console.log("\n🎉 Sync complete!");
  } catch (error) {
    console.error("Error during sync:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
ENDSCRIPT

echo -e "\n${YELLOW}📋 Running sync script...${NC}\n"

# Run the sync script with environment variables
cd backend
CMS_API_URL="$CMS_API_URL" \
CMS_API_TOKEN="$CMS_API_TOKEN" \
DATABASE_URL="$DATABASE_URL" \
node /tmp/sync-forms.js

echo -e "\n${GREEN}✅ Sync script completed!${NC}"
