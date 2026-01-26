# Manual Steps to Restart Strapi on CMS Server

**Last Updated:** 2026-01-26  
**Purpose:** Step-by-step instructions to restart Strapi service on the CMS server

## Prerequisites

- SSH access to CMS server (`3.93.212.154`)
- SSH key configured or password access

## Steps to Restart Strapi

### Step 1: Connect to CMS Server

```bash
ssh ubuntu@3.93.212.154
```

If you have a specific SSH key:
```bash
ssh -i /path/to/your/key.pem ubuntu@3.93.212.154
```

### Step 2: Check Strapi Process Status

```bash
pm2 list
```

Look for process named `vishnu-mandir-cms` or similar.

### Step 3: Restart Strapi

```bash
pm2 restart vishnu-mandir-cms
```

Or if using a different process name:
```bash
pm2 restart all
```

### Step 4: Wait for Strapi to Start

Wait 30 seconds for Strapi to fully start up.

### Step 5: Check Logs

```bash
pm2 logs vishnu-mandir-cms --lines 30 --nostream
```

Look for:
- "Server started" or similar success message
- Any error messages
- API route registration messages

### Step 6: Verify Strapi is Running

```bash
pm2 status
```

Should show the process as "online" or "restarting".

## Alternative: If Using systemd

If Strapi is managed by systemd instead of PM2:

```bash
sudo systemctl restart strapi
sudo systemctl status strapi
sudo journalctl -u strapi -n 50
```

## After Restart

Once Strapi is restarted, test the API:

```bash
# From your local machine
./scripts/test-strapi-api.sh
```

Or manually:
```bash
curl -H "Authorization: Bearer <TOKEN>" \
  'https://cms.vishnumandirtampa.com/api/events?populate=*'
```

## Troubleshooting

### Process Not Found

If `pm2 list` doesn't show the process:

```bash
# Check if Strapi is running differently
ps aux | grep strapi
ps aux | grep node

# Check systemd
sudo systemctl status strapi
```

### Permission Denied

If you get permission errors:

```bash
# Try with sudo
sudo pm2 restart vishnu-mandir-cms

# Or check if you need to switch user
sudo su - ubuntu
pm2 restart vishnu-mandir-cms
```

### Strapi Won't Start

Check logs for errors:

```bash
pm2 logs vishnu-mandir-cms --lines 100
```

Common issues:
- Database connection errors
- Port already in use
- Missing environment variables
- File permission issues
