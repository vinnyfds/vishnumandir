# AWS Cognito Setup Documentation

**Last Updated:** 2026-01-26  
**Status:** ✅ Configured

## Overview

AWS Cognito User Pool has been configured for admin authentication with role-based access control (RBAC) for the Vishnu Mandir, Tampa website.

## Configuration Details

### User Pool

- **Pool ID:** `us-east-1_N3Kxkj933`
- **Pool Name:** `vishnu-mandir-admin-pool`
- **Region:** `us-east-1`
- **Password Policy:**
  - Minimum length: 12 characters
  - Require uppercase, lowercase, numbers, and special characters
- **Sign-in Options:** Email
- **Auto-verified:** Email

### App Client

- **Client ID:** `343pre3iphtlr0od4bkl1n78ar`
- **Client Name:** `vishnu-mandir-frontend-client`
- **OAuth 2.0:** Enabled
- **Grant Types:** Authorization code grant
- **Scopes:** `openid`, `email`, `profile`
- **Callback URLs:**
  - `https://main.d1rp3bwb0j3dq8.amplifyapp.com/*` (Production)
  - `http://localhost:3000/*` (Local development)
- **Sign-out URLs:** Same as callback URLs

### User Groups (Roles)

Four user groups have been created for role-based access control:

1. **Admin** - Full system access
2. **Editor** - Content management (pages, posts)
3. **Finance** - Financial reports and exports
4. **EventManager** - Event calendar management

**Note:** The group name is `EventManager` (no space) due to Cognito naming constraints. The backend code has been updated to use `EventManager` instead of `Event Manager`.

### Initial Admin User

- **Email:** `admin@vishnumandirtampa.com`
- **Temporary Password:** `TempPass123!@#`
- **Status:** User must change password on first login
- **Group:** Admin

**Important:** Change the admin password immediately after first login. The temporary password should not be used in production.

## Environment Variables

### Backend (.env)

```bash
COGNITO_USER_POOL_ID="us-east-1_N3Kxkj933"
COGNITO_CLIENT_ID="343pre3iphtlr0od4bkl1n78ar"
COGNITO_REGION="us-east-1"
```

### Frontend (Amplify Environment Variables)

Set these in AWS Amplify Console > App Settings > Environment Variables:

```bash
COGNITO_USER_POOL_ID="us-east-1_N3Kxkj933"
COGNITO_CLIENT_ID="343pre3iphtlr0od4bkl1n78ar"
NEXT_PUBLIC_COGNITO_REGION="us-east-1"
```

## Authentication Flow

1. Admin navigates to `/admin/login` in the frontend
2. Frontend redirects to Cognito Hosted UI
3. User enters credentials (email and password)
4. Cognito validates credentials and generates JWT
5. JWT includes `cognito:groups` claim with user's role(s)
6. Frontend receives JWT and includes it in `Authorization: Bearer <token>` header
7. Backend middleware validates JWT via JWKS endpoint
8. Backend extracts `cognito:groups` and enforces role-based access

## Managing Users

### Create New User

```bash
aws cognito-idp admin-create-user \
  --user-pool-id us-east-1_N3Kxkj933 \
  --username "user@example.com" \
  --user-attributes Name=email,Value="user@example.com" Name=email_verified,Value=true \
  --temporary-password "TempPass123!@#" \
  --message-action SUPPRESS \
  --region us-east-1
```

### Assign User to Group

```bash
aws cognito-idp admin-add-user-to-group \
  --user-pool-id us-east-1_N3Kxkj933 \
  --username "user@example.com" \
  --group-name "Editor" \
  --region us-east-1
```

### List Users

```bash
aws cognito-idp list-users \
  --user-pool-id us-east-1_N3Kxkj933 \
  --region us-east-1
```

### List Groups

```bash
aws cognito-idp list-groups \
  --user-pool-id us-east-1_N3Kxkj933 \
  --region us-east-1
```

## Testing Authentication

1. **Set environment variables** in Amplify Console
2. **Deploy frontend** to Amplify
3. **Navigate to** `https://main.d1rp3bwb0j3dq8.amplifyapp.com/admin/login`
4. **Login with:**
   - Email: `admin@vishnumandirtampa.com`
   - Password: `TempPass123!@#` (change on first login)
5. **Verify JWT** contains `cognito:groups: ["Admin"]`
6. **Test protected routes** in backend API

## Security Notes

- **Password Policy:** Enforced at User Pool level (12+ chars, mixed case, numbers, symbols)
- **MFA:** Optional but recommended for production (can be enabled in User Pool settings)
- **JWT Validation:** Backend validates all JWTs via Cognito's JWKS endpoint
- **Role Enforcement:** Backend middleware checks `cognito:groups` claim before allowing access
- **HTTPS Only:** OAuth callbacks only work over HTTPS in production

## Troubleshooting

### JWT Validation Fails

- Verify `COGNITO_USER_POOL_ID` and `COGNITO_CLIENT_ID` are correct
- Check that JWT audience matches `COGNITO_CLIENT_ID`
- Ensure JWT issuer matches `https://cognito-idp.us-east-1.amazonaws.com/us-east-1_N3Kxkj933`

### User Can't Login

- Verify user exists: `aws cognito-idp admin-get-user --user-pool-id us-east-1_N3Kxkj933 --username <email>`
- Check user status (should be `CONFIRMED`)
- Verify user is assigned to a group

### Role-Based Access Not Working

- Verify user is in correct group: `aws cognito-idp admin-list-groups-for-user --user-pool-id us-east-1_N3Kxkj933 --username <email>`
- Check JWT contains `cognito:groups` claim
- Verify backend code uses correct role names (Admin, Editor, Finance, EventManager)

## Related Documentation

- [Authorization & Access Control](../security/authorization-&-access-control.md)
- [Amplify Environment Variables](./AMPLIFY_ENV_VARS.md)
- [Backend Auth Middleware](../../backend/src/middleware/auth.middleware.ts)
