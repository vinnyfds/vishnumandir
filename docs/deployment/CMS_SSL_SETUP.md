# CMS SSL Certificate Setup

**Last Updated:** 2026-01-26  
**Status:** SSL Certificate Configured and Active

## Overview

SSL certificate has been successfully configured for `cms.vishnumandirtampa.com` using nginx reverse proxy with Let's Encrypt.

## Configuration Details

### SSL Certificate
- **Domain:** `cms.vishnumandirtampa.com`
- **Certificate Provider:** Let's Encrypt (via Certbot)
- **Certificate Expiry:** 2026-04-26 (90 days, auto-renewed)
- **Auto-Renewal:** Configured via Certbot timer

### Infrastructure
- **CMS Instance:** `vishnu-mandir-cms` (Lightsail)
- **Instance IP:** `3.93.212.154`
- **Web Server:** nginx 1.18.0 (reverse proxy)
- **Application:** Strapi CMS (running on port 1337 internally)
- **Public Ports:** 80 (HTTP redirect), 443 (HTTPS)

### nginx Configuration
- **Config File:** `/etc/nginx/sites-available/cms.vishnumandirtampa.com`
- **Enabled:** `/etc/nginx/sites-enabled/cms.vishnumandirtampa.com`
- **SSL Certificates:** `/etc/letsencrypt/live/cms.vishnumandirtampa.com/`
- **HTTP Redirect:** Automatically redirects HTTP (port 80) to HTTPS (port 443)

## Access URLs

- **Admin Panel:** `https://cms.vishnumandirtampa.com/admin`
- **API Endpoint:** `https://cms.vishnumandirtampa.com/api`
- **HTTP Redirect:** `http://cms.vishnumandirtampa.com` → `https://cms.vishnumandirtampa.com`

## Setup Process (Completed)

1. ✅ Opened ports 80 and 443 in Lightsail firewall
2. ✅ Installed nginx on CMS instance
3. ✅ Configured nginx as reverse proxy to Strapi (port 1337)
4. ✅ Installed Certbot (Let's Encrypt client)
5. ✅ Requested and obtained SSL certificate
6. ✅ Updated Strapi `SERVER_URL` and `PUBLIC_URL` to HTTPS
7. ✅ Restarted Strapi service with updated environment
8. ✅ Closed port 1337 from public access (security hardening)

## Certificate Renewal

Certbot automatically sets up certificate renewal via systemd timer. Certificates are renewed automatically before expiration.

**Manual Renewal (if needed):**
```bash
sudo certbot renew
```

**Test Renewal:**
```bash
sudo certbot renew --dry-run
```

## Troubleshooting

### Check SSL Certificate Status
```bash
sudo certbot certificates
```

### Check nginx Status
```bash
sudo systemctl status nginx
sudo nginx -t
```

### View nginx Error Logs
```bash
sudo tail -f /var/log/nginx/error.log
```

### Test SSL Connection
```bash
curl -I https://cms.vishnumandirtampa.com/admin
openssl s_client -connect cms.vishnumandirtampa.com:443 -servername cms.vishnumandirtampa.com
```

## Environment Variables

### Frontend (AWS Amplify)
Update `CMS_API_URL` in Amplify Console to:
```
CMS_API_URL=https://cms.vishnumandirtampa.com/api
```

**Note:** Remove the port number (`:1337`) since nginx handles routing.

### Strapi (.env)
The following variables are set in `/home/ubuntu/vishnu-mandir-tampa/cms/.env`:
```
SERVER_URL=https://cms.vishnumandirtampa.com
PUBLIC_URL=https://cms.vishnumandirtampa.com
```

## Security Headers

nginx and Strapi are configured with security headers:
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- Content Security Policy (CSP)

## Security Configuration

### Port Access
- **Port 1337:** Closed from public access (only accessible from localhost)
- **Port 80:** Open (HTTP redirects to HTTPS)
- **Port 443:** Open (HTTPS with SSL certificate)

**Important:** Port 1337 is NOT publicly accessible. All access must go through nginx on port 443 (HTTPS). This ensures:
- All traffic is encrypted with SSL
- Strapi is not directly exposed to the internet
- Single entry point for security monitoring

### Access Requirements
- **Admin Panel:** Must use `https://cms.vishnumandirtampa.com/admin` (no port number)
- **API Endpoint:** Must use `https://cms.vishnumandirtampa.com/api` (no port number)
- **Direct Port Access:** `http://cms.vishnumandirtampa.com:1337` will fail (port closed)

## Notes

- Strapi continues to run on port 1337 **internally** (localhost only)
- nginx handles SSL termination and proxies to Strapi
- HTTP traffic automatically redirects to HTTPS
- Certificate auto-renewal is configured and tested
- Port 1337 is closed from public access for security
