# Route53 DNS Records Status

**Date**: 2026-01-26  
**Hosted Zone**: `Z10186528G387OP9KXEZ` (vishnumandirtampa.com)  
**Status**: All records correctly configured

## Current DNS Records

### Frontend (Amplify/CloudFront)

**Apex Domain** (`vishnumandirtampa.com`):
- **Type**: A (ALIAS)
- **Target**: `d3lqee0j4vm8q4.cloudfront.net`
- **Hosted Zone ID**: `Z2FDTNDATAQYW2` (CloudFront)
- **Status**: Configured correctly
- **Amplify Verification**: Pending (record is correct, verification may take time)

**WWW Subdomain** (`www.vishnumandirtampa.com`):
- **Type**: CNAME
- **Target**: `d3lqee0j4vm8q4.cloudfront.net`
- **TTL**: 500
- **Status**: Verified in Amplify

### Backend Services

**API Subdomain** (`api.vishnumandirtampa.com`):
- **Type**: A
- **Target**: `34.206.184.139` (Backend Lightsail instance)
- **Status**: Configured correctly

**CMS Subdomain** (`cms.vishnumandirtampa.com`):
- **Type**: A
- **Target**: `44.202.153.84` (CMS Lightsail instance)
- **Status**: Configured correctly

### SSL Certificate Validation

**Certificate Validation** (`_ad920e339c295fc2413305d8dde74fc9.vishnumandirtampa.com`):
- **Type**: CNAME
- **Target**: `_5407209bddebfabc67fea0c50bd03f04.jkddzztszm.acm-validations.aws.`
- **Status**: Configured correctly (for Amplify-managed SSL certificate)

## DNS Resolution Verification

**Apex Domain**:
```bash
$ dig +short vishnumandirtampa.com
143.204.29.97
143.204.29.90
143.204.29.72
143.204.29.29
```
✅ Resolves to CloudFront IP addresses

**WWW Subdomain**:
```bash
$ dig +short www.vishnumandirtampa.com
d3lqee0j4vm8q4.cloudfront.net.
143.204.29.29
143.204.29.97
143.204.29.72
143.204.29.90
```
✅ Resolves correctly through CNAME to CloudFront

## Amplify Domain Association

**Domain**: `vishnumandirtampa.com`  
**Status**: `AVAILABLE`  
**CloudFront Distribution**: `d3lqee0j4vm8q4.cloudfront.net`

**Subdomain Status**:
- Apex domain (`vishnumandirtampa.com`): DNS record correct, verification pending
- WWW subdomain (`www.vishnumandirtampa.com`): Verified

**Certificate**: Amplify-managed SSL certificate (verification CNAME configured)

## Notes

1. **ALIAS vs CNAME**: The apex domain uses an ALIAS A record (not CNAME) because Route53 doesn't allow CNAME records for apex domains. This is the correct AWS best practice.

2. **Verification Timing**: The apex domain shows as "not verified" in Amplify, but the DNS record is correct. Amplify's verification process may take additional time to recognize the ALIAS record. The record itself is properly configured.

3. **DNS Propagation**: All records are resolving correctly. DNS changes have propagated.

4. **HTTPS Access**: Both `https://vishnumandirtampa.com` and `https://www.vishnumandirtampa.com` are reaching CloudFront (currently returning 404, which is a separate deployment/configuration issue, not a DNS issue).

## Verification Commands

```bash
# Check Route53 records
aws route53 list-resource-record-sets \
  --hosted-zone-id Z10186528G387OP9KXEZ \
  --query "ResourceRecordSets[?contains(Name, 'vishnumandirtampa.com') && Type!='NS' && Type!='SOA']"

# Check Amplify domain status
aws amplify get-domain-association \
  --app-id d8s4hpdn0uxuc \
  --domain-name vishnumandirtampa.com \
  --region us-east-1

# Test DNS resolution
dig vishnumandirtampa.com
dig www.vishnumandirtampa.com
dig api.vishnumandirtampa.com
dig cms.vishnumandirtampa.com
```

## Summary

✅ **All DNS records are correctly configured**  
✅ **DNS resolution is working correctly**  
✅ **All subdomains (www, api, cms) are properly configured**  
⏳ **Amplify verification for apex domain is pending** (record is correct, may need time)

No DNS changes are required. All records are properly set up according to AWS best practices.
