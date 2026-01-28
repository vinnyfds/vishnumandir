# Resend Inbound Email Setup Guide

## Overview

This document describes how to configure and maintain inbound email handling using Resend for the Vishnu Mandir, Tampa project. The setup involves:

1. **DNS Configuration** (Route 53) – Add an MX record for Resend to receive emails
2. **Resend Dashboard** – Enable receiving and configure webhook
3. **Backend** – Webhook handler verifies and processes inbound emails

---

## Part 1: DNS Configuration (Route 53)

### Step 1: Verify domain in Resend

Before setting up receiving, the domain must be verified for sending (this should already be done for `vishnumandirtampa.com`).

### Step 2: Add MX record in Route 53

1. Go to [Resend Domains](https://resend.com/domains)
2. For your domain (e.g. `vishnumandirtampa.com`), find the **Receiving** section
3. Copy the **MX record** shown (e.g. `10 inbound-smtp.us-east-1.amazonaws.com`)
4. In AWS Route 53 for the domain's hosted zone:
   - **Type**: MX
   - **Name**: Leave blank or enter the domain name (apex)
   - **Value**: Paste the exact MX record from Resend (including priority, e.g. `10 inbound-smtp.us-east-1.amazonaws.com`)
   - **TTL**: Auto or 300 seconds
5. Save the record

### Step 3: Verify in Resend

1. Back in [Resend Domains](https://resend.com/domains), click **"I've added the record"**
2. Wait 2–5 minutes for DNS propagation
3. Resend will confirm when the MX record is verified

### Important: MX Priority & Conflicts

- **Lowest priority wins**: Resend will only receive emails if its MX record has the lowest priority value on the domain
- **Existing mail service**: If the domain already has MX records for Google Workspace, Microsoft 365, etc.:
  - **Option A**: Create a **subdomain** (e.g. `mail.vishnumandirtampa.com`) and add Resend's MX there. Use that subdomain in Resend for receiving.
  - **Option B**: Configure forwarding in your existing mail service to forward emails to Resend addresses
  - **Option C**: Ensure Resend's MX has the lowest priority (risky; may interfere with existing mail)

---

## Part 2: Resend Dashboard Configuration

### Step 1: Enable Receiving

1. Go to [Resend Domains](https://resend.com/domains)
2. Click your domain, find **Receiving** section
3. Toggle **"Enable Receiving"** ON
4. Confirm by clicking **"I've added the record"** after MX is in Route 53 (see Part 1)

### Step 2: Add Webhook Endpoint

1. Go to [Resend Webhooks](https://resend.com/webhooks)
2. Click **"Add Webhook"**
3. **Endpoint URL**: Your backend base URL + `/webhooks/resend` (e.g. `https://api.vishnumandirtampa.com/webhooks/resend`)
4. **Event Type**: Select `email.received`
5. Click **"Add Webhook"**
6. **Copy the signing secret** (shown after creation)

### Step 3: Store Webhook Secret

1. Add the signing secret to backend `.env`:
   ```bash
   RESEND_WEBHOOK_SECRET="whsec_..."
   ```
   Replace `"whsec_..."` with the actual secret from Resend.

2. Also add to production backend environment in AWS (if deployed):
   - AWS Amplify Console → App Settings → Environment Variables
   - Key: `RESEND_WEBHOOK_SECRET`
   - Value: The secret from Resend

---

## Part 3: Backend Implementation

### Webhook Route

The webhook route is implemented in `backend/src/api/webhooks/resend.routes.ts`:

- **Endpoint**: `POST /webhooks/resend`
- **Raw body handling**: The route must receive the raw body for signature verification (Svix signing is body-sensitive)
- **Signature verification**: Uses Resend SDK (`resend.webhooks.verify()`) to verify the webhook with headers: `svix-id`, `svix-timestamp`, `svix-signature`
- **Event handling**: Currently handles `email.received` events and:
  - Logs the inbound email details (from, to, subject)
  - Optionally sends an admin notification email
- **Response**: Always returns `200 OK` if webhook is valid, allowing Resend to mark it as delivered

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `RESEND_API_KEY` | API key for Resend (sending) | `re_...` |
| `RESEND_WEBHOOK_SECRET` | Webhook signing secret (receiving) | `whsec_...` |
| `SENDER_EMAIL_ADDRESS` | Sender address for outbound emails | `Vishnu Mandir <no-reply@vishnumandirtampa.com>` |
| `ADMIN_EMAIL_ADDRESS` | Admin email for notifications | `admin@vishnumandirtampa.com` |

### Testing Locally

If you want to test the webhook locally:

1. Use a tool like [Ngrok](https://ngrok.com/) to expose your local backend:
   ```bash
   ngrok http 4000
   ```
   This gives you a public URL (e.g. `https://abc123.ngrok.io`).

2. In Resend Webhooks, add a test webhook endpoint pointing to your Ngrok URL + `/webhooks/resend`.

3. Use Resend's test webhook feature or send a real email to your Resend-receiving address.

4. Watch your backend logs for the webhook event.

---

## Part 4: Email Flow Diagram

```
┌──────────────┐
│  Sender      │ Sends email to: contact@vishnumandirtampa.com
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│ DNS MX Lookup (Route 53) │ Resolves to: inbound-smtp.us-east-1.amazonaws.com
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Resend Inbound SMTP      │ Receives email, validates, processes
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Resend Webhook Service   │ Sends POST to /webhooks/resend (email.received)
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│ Backend: POST /webhooks/resend           │
│ - Verify Svix signature                  │
│ - Parse email.received event             │
│ - Log inbound email                      │
│ - Send admin notification (optional)     │
│ - Return 200 OK                          │
└──────┬───────────────────────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Database / Storage       │ Optional: persist email data
└──────────────────────────┘
```

---

## Troubleshooting

### MX Record Shows "Failed" in Resend

**Symptoms**: Resend dashboard shows "Receiving: Missing required MX record" with "Failed" status.

**Solutions**:

1. **Check exact record**: Verify the MX record in Route 53 matches exactly what Resend shows (priority + hostname, no typos).
2. **Check priority**: If other MX records exist on the domain, ensure Resend's MX has the **lowest** priority.
3. **DNS propagation**: Wait 2–5 minutes after adding the record in Route 53.
4. **Use subdomain**: If the domain has existing mail service, consider adding Resend's MX on a subdomain instead.

### Webhook Not Receiving Events

**Symptoms**: Inbound emails arrive at Resend but no POST to backend.

**Solutions**:

1. **Check webhook URL**: In Resend Webhooks, verify the endpoint URL is correct and publicly accessible.
2. **Check logs**: Look at backend logs for any errors during verification.
3. **Resend webhook logs**: In Resend Webhooks → Your webhook, check delivery logs for HTTP response codes.
4. **Verify secret**: Ensure `RESEND_WEBHOOK_SECRET` in backend `.env` matches the secret in Resend dashboard.

### Webhook Verification Fails (400 Invalid Webhook)

**Symptoms**: Backend returns `400 Invalid webhook signature`.

**Solutions**:

1. **Raw body required**: The webhook route **must** receive raw body, not parsed JSON (it's body-sensitive for verification).
2. **Secret mismatch**: Double-check `RESEND_WEBHOOK_SECRET` matches Resend dashboard.
3. **Headers present**: Verify `svix-id`, `svix-timestamp`, `svix-signature` headers are included in the request.

---

## References

- [Resend Custom Receiving Domains](https://resend.com/docs/dashboard/receiving/custom-domains)
- [Resend Webhook Verification](https://resend.com/docs/webhooks/verify-webhooks-requests)
- [Resend Webhook Events](https://resend.com/docs/webhooks/event-types)
- [Svix Webhook Verification](https://docs.svix.com/receiving/verifying-payloads/how)

---

## Changelog

- **v1.0** (2026-01-28): Initial inbound email setup guide and backend webhook implementation
  - Created `backend/src/api/webhooks/resend.routes.ts` with Svix verification
  - Mounted webhook route in `backend/src/server.ts`
  - Added `RESEND_WEBHOOK_SECRET` to backend env template
  - Documented Route 53 MX configuration, Resend dashboard setup, and troubleshooting
