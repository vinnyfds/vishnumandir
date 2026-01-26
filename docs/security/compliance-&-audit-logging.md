```markdown
# Compliance & Audit Logging

| | |
|---|---|
| **Document Type** | Compliance & Audit Logging |
| **Category** | Security |
| **Project** | Vishnu Mandir, Tampa |
| **Author** | Technical Writer AI |
| **Version** | 1.0 |
| **Date** | 2023-10-27 |

## 1. Overview

This document defines the strategy for implementing a comprehensive audit logging system for the Vishnu Mandir website. The purpose of this system is to create an immutable, chronological record of all significant actions performed within the administrative backend.

This addresses the non-functional requirement **"Audit log for admin actions"** by ensuring:
- **Accountability:** Track which user performed what action and when.
- **Security:** Detect and investigate suspicious activity, unauthorized access, or data breaches.
- **Compliance:** Maintain records of financial transactions and data handling for potential audits.
- **Troubleshooting:** Reconstruct events to diagnose errors or unintended content changes.

## 2. Scope of Audit Logging

Audit logs will capture events across three primary categories: Content Management, User & System Administration, and Financial Records. The log will capture the *creation*, *modification*, and *deletion* of key resources.

### 2.1. Content Management Actions

These events are typically performed by users with `Admin`, `Editor`, or `Event Manager` roles.

- **Pages/Posts:** Create, update, delete, publish, unpublish.
- **Events:** Create, update, delete (includes daily pujas, cultural events, classes).
- **Puja Services:** Create, update, delete (including pricing changes).
- **Festival Pages:** Create, update, delete.
- **Newsletter Archives:** Upload, update metadata, delete.
- **Media Files:** Upload, delete (e.g., images, PDFs).

### 2.2. User and System Administration Actions

These events are primarily restricted to the `Admin` role.

- **User Authentication:** Successful login, failed login attempt.
- **User Management:** User invited, user deleted.
- **Role Management:** User's role assigned or changed (e.g., promoting an `Editor` to `Admin`).
- **Report Generation:** Export of donation, sponsorship, or form submission data (CSV).

### 2.3. Financial and Transactional Events

These events are logged automatically by the system or by users with `Admin` or `Finance` roles.

- **Donations:** Record successful one-time and recurring donation events received via Stripe webhooks. The log will reference the Stripe Transaction ID.
- **Puja Sponsorships:** New sponsorship request submitted via form.
- **Sponsorship Status Change:** Manual update to a sponsorship's status (e.g., from `Pending` to `Confirmed` or `Completed`).
- **Facility Requests:** New facility rental request submitted via form.

## 3. Audit Log Data Structure

All audit events will be stored in a dedicated PostgreSQL table named `audit_logs`. This structured approach allows for efficient querying, filtering, and reporting.

The `audit_logs` table will adhere to the following schema:

| Column Name | Data Type | Description | Example |
|---|---|---|---|
| `id` | `BIGSERIAL` | Primary key, auto-incrementing integer. | `1024` |
| `timestamp` | `TIMESTAMPTZ` | The exact UTC date and time the event occurred. | `2023-10-27 14:30:05.123Z` |
| `user_id` | `VARCHAR(255)` | The unique identifier (e.g., Cognito `sub`) of the user who performed the action. `NULL` for system-initiated events. | `a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8` |
| `user_role` | `VARCHAR(50)` | The role of the user at the time of the action. | `Admin` |
| `action_type` | `VARCHAR(100)` | A dot-notation string identifying the action. | `event.create`, `user.role.update` |
| `target_resource`| `VARCHAR(100)`| The type of entity being acted upon. | `Event`, `User`, `Donation` |
| `target_resource_id` | `VARCHAR(255)` | The unique ID of the entity being acted upon. | `evt_a9b8c7d6`, `usr_f5e4d3c2` |
| `before_state` | `JSONB` | A JSON snapshot of the resource's data *before* the change. `NULL` for creation events. | `{ "title": "Old Title", "status": "draft" }` |
| `after_state` | `JSONB` | A JSON snapshot of the resource's data *after* the change. `NULL` for deletion events. | `{ "title": "New Updated Title", "status": "published" }` |
| `ip_address` | `INET` | The IP address from which the request originated. | `203.0.113.55` |
| `status` | `VARCHAR(20)` | The outcome of the action. | `SUCCESS`, `FAILURE` |
| `details` | `TEXT` | Additional human-readable context or error messages. | `User role changed from Editor to Admin.` |
| `source` | `VARCHAR(50)` | The system component that generated the log. | `StrapiCMS`, `APILambda`, `StripeWebhook` |

### SQL Schema Definition

```sql
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id VARCHAR(255),
    user_role VARCHAR(50),
    action_type VARCHAR(100) NOT NULL,
    target_resource VARCHAR(100),
    target_resource_id VARCHAR(255),
    before_state JSONB,
    after_state JSONB,
    ip_address INET,
    status VARCHAR(20) NOT NULL,
    details TEXT,
    source VARCHAR(50) NOT NULL
);

-- Create indexes for efficient querying
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_logs_action_type ON audit_logs(action_type);
```

## 4. Implementation Strategy

Logging will be implemented at different layers of the architecture to ensure complete coverage.

### 4.1. Headless CMS (Strapi)

Content management actions will be captured directly within Strapi using its lifecycle hooks. A custom middleware or hook will be developed to intercept `beforeUpdate`, `afterCreate`, `afterUpdate`, and `afterDelete` events for all relevant content types.

**Example (Strapi Lifecycle Hook):**
This pseudo-code illustrates how to log an event update in `src/api/event/content-types/event/lifecycles.js`.

```javascript
// src/api/event/content-types/event/lifecycles.js

module.exports = {
  async beforeUpdate(event) {
    const { params } = event;
    const { data } = params;

    // Fetch the current state of the entry before it's updated
    const existingEntry = await strapi.entityService.findOne('api::event.event', data.id);
    
    // Attach the 'before' state to the event object for the 'afterUpdate' hook
    event.state.before_state = existingEntry;
  },

  async afterUpdate(event) {
    const { result, state, params } = event;
    const { data } = params;
    const user = data.__auth.credentials; // Assuming auth info is injected

    // Log to the audit service/database
    await strapi.service('api::audit.logger').log({
      userId: user.id, // Or Cognito SUB from token
      userRole: user.role.name,
      actionType: 'event.update',
      targetResource: 'Event',
      targetResourceId: result.id,
      beforeState: state.before_state,
      afterState: result,
      ipAddress: data.__request_ip, // Assuming IP is injected
      status: 'SUCCESS',
      source: 'StrapiCMS'
    });
  },
};
```

### 4.2. Custom Backend APIs (Node.js/Express on Lambda)

For actions handled by custom API endpoints (e.g., user management, report exports), a dedicated Express.js middleware will be created. This middleware will wrap protected routes, extract user and request data, and log the action.

**Example (Express.js Logging Middleware):**

```javascript
// middleware/auditLogger.js
const { auditLogService } = require('../services/auditLogService');

const logAction = (actionType, targetResource) => {
  return async (req, res, next) => {
    // Execute the actual controller logic first
    // Use 'res.on('finish', ...)' to capture the result after the response is sent
    res.on('finish', async () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        // User info is expected to be on the request object from the Cognito auth middleware
        const user = req.user;
        
        await auditLogService.create({
          userId: user['cognito:username'] || user.sub,
          userRole: user['cognito:groups'] ? user['cognito:groups'][0] : 'Unknown',
          actionType: actionType,
          targetResource: targetResource,
          targetResourceId: req.params.id || res.locals.resourceId, // Extract from params or locals
          afterState: res.locals.entity, // Controller should place the resulting entity in res.locals
          ipAddress: req.ip,
          status: 'SUCCESS',
          source: 'APILambda'
        });
      }
    });
    next();
  };
};

module.exports = logAction;

// Usage in a route
// router.post('/users/:id/role', authMiddleware, logAction('user.role.update', 'User'), userController.updateRole);
```

### 4.3. Financial Transactions (Stripe Webhooks)

Direct changes to financial records are not permitted. Instead, events from Stripe will trigger a Lambda function via API Gateway. This function will log the successful transaction and link it to the corresponding donor or sponsorship record in our database.

- The log entry's `action_type` will be `donation.succeeded` or `invoice.paid`.
- The `target_resource_id` will be the Stripe Charge or Invoice ID.
- The `after_state` will contain key, non-sensitive data from the Stripe event payload.

## 5. Log Storage and Retention Policy

To balance accessibility, cost, and compliance, the following retention policy will be implemented:

- **Active Storage (PostgreSQL):** All audit logs will be stored in the primary PostgreSQL `audit_logs` table for **18 months**. This allows for immediate access and analysis via the admin dashboard.
- **Archive Storage (AWS S3 Glacier):** After 18 months, logs will be automatically exported to a secure AWS S3 bucket and transitioned to Glacier Deep Archive for long-term retention.
  - **Financial-related logs** will be retained for a minimum of **7 years**.
  - **All other logs** will be retained for a minimum of **3 years**.
- **Data Integrity:** The S3 bucket will have object versioning and object lock policies enabled to prevent accidental deletion or tampering of archived logs.

## 6. Access and Monitoring

Access to audit logs will be strictly controlled and monitored.

- **Access Control:**
  - Direct read access to the `audit_logs` table in PostgreSQL will be granted only to a specific service account and to database superusers.
  - The application's `Admin` role will have permission to view audit logs through a dedicated user interface. No other roles (`Editor`, `Finance`, `Event Manager`) will have access to the full audit trail.

- **Admin UI for Log Viewing:**
  A dedicated "Audit Trail" section will be added to the admin dashboard. This interface will provide `Admin` users with the ability to:
  - **Search** logs by user, action type, date range, or resource ID.
  - **Filter** logs by status (`SUCCESS`/`FAILURE`) or source (`CMS`/`API`).
  - **View** the `before_state` and `after_state` JSON objects in a human-readable, side-by-side "diff" format.

- **Monitoring and Alerting:**
  **AWS CloudWatch Alarms** will be configured to monitor for high-risk activities and send immediate notifications to the temple administration via **Amazon SES**. Key alerts will include:
  - Multiple failed login attempts for a single user account in a short period.
  - Any change to a user's role, especially promotion to `Admin`.
  - Export of any report containing Personally Identifiable Information (PII).

```