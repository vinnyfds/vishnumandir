#!/bin/bash
# AWS Amplify Setup Script for Vishnu Mandir Frontend
# This script completes the Amplify setup after the repository is connected via console

set -e

APP_ID="d8s4hpdn0uxuc"
REGION="us-east-1"
BRANCH_NAME="main"
DOMAIN_NAME="vishnumandirtampa.com"
HOSTED_ZONE_ID="Z10186528G387OP9KXEZ"

echo "🚀 Setting up AWS Amplify for Vishnu Mandir Frontend"
echo "App ID: $APP_ID"
echo ""

# Check if branch exists
echo "📋 Checking for branch: $BRANCH_NAME"
BRANCH_EXISTS=$(aws amplify get-branch --app-id $APP_ID --branch-name $BRANCH_NAME --region $REGION 2>&1 || echo "NOT_FOUND")

if [[ "$BRANCH_EXISTS" == *"NOT_FOUND"* ]] || [[ "$BRANCH_EXISTS" == *"NotFoundException"* ]]; then
  echo "Creating branch: $BRANCH_NAME"
  aws amplify create-branch \
    --app-id $APP_ID \
    --branch-name $BRANCH_NAME \
    --framework "Next.js - SSR" \
    --stage PRODUCTION \
    --region $REGION \
    --output json
  echo "✅ Branch created"
else
  echo "✅ Branch already exists"
fi

# Check if domain is already associated
echo ""
echo "🌐 Checking domain association for: $DOMAIN_NAME"
DOMAIN_EXISTS=$(aws amplify get-domain-association --app-id $APP_ID --domain-name $DOMAIN_NAME --region $REGION 2>&1 || echo "NOT_FOUND")

if [[ "$DOMAIN_EXISTS" == *"NOT_FOUND"* ]] || [[ "$DOMAIN_EXISTS" == *"NotFoundException"* ]]; then
  echo "Attaching domain: $DOMAIN_NAME"
  aws amplify create-domain-association \
    --app-id $APP_ID \
    --domain-name $DOMAIN_NAME \
    --sub-domain-settings branchName=$BRANCH_NAME,prefix= branchName=$BRANCH_NAME,prefix=www \
    --region $REGION \
    --output json
  
  echo "✅ Domain association created"
  echo ""
  echo "⏳ Waiting for domain verification..."
  sleep 5
  
  # Get domain association details to retrieve DNS records
  echo "📋 Retrieving DNS records for Route53..."
  aws amplify get-domain-association \
    --app-id $APP_ID \
    --domain-name $DOMAIN_NAME \
    --region $REGION \
    --output json | jq -r '.domainAssociation.subDomains[] | "\(.subDomainSetting.prefix == "" | if . then "@" else . end) \(.verified == true) \(.dnsRecord)"'
  
  echo ""
  echo "⚠️  IMPORTANT: Update Route53 records with the DNS records shown above"
  echo "   Hosted Zone ID: $HOSTED_ZONE_ID"
else
  echo "✅ Domain already associated"
  echo ""
  echo "📋 Current domain status:"
  aws amplify get-domain-association \
    --app-id $APP_ID \
    --domain-name $DOMAIN_NAME \
    --region $REGION \
    --output json | jq '.domainAssociation | {domainName, domainStatus, subDomains: [.subDomains[] | {prefix, verified, dnsRecord}]}'
fi

echo ""
echo "✅ Amplify setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update Route53 records if domain was just attached"
echo "2. Add remaining environment variables (secrets) via Amplify Console"
echo "3. Trigger deployment: aws amplify start-job --app-id $APP_ID --branch-name $BRANCH_NAME --job-type RELEASE --region $REGION"
