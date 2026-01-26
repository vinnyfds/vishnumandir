```markdown
# Authorization & Access Control

| | |
|---|---|
| **Document Type:** | Authorization & Access Control |
| **Category:** | Security |
| **Project:** | Vishnu Mandir, Tampa |
| **Version:** | 1.0 |
| **Date:** | 2023-10-27 |
| **Author:** | AI Technical Writer |

---

## 1. Overview

This document defines the Role-Based Access Control (RBAC) model for the Vishnu Mandir, Tampa website's administrative functions. The purpose is to ensure that authenticated users have appropriate permissions to manage content, events, financial data, and other administrative tasks, adhering to the principle of least privilege.

This model directly addresses the project's C) Admin requirement for distinct roles and permissions. It governs access to the backend systems, including the Headless CMS (Strapi) and the custom serverless API built on AWS.

The four primary administrative roles are:

*   **Admin:** Full system access for technical and user management.
*   **Editor:** Manages general website content and static pages.
*   **Finance:** Manages financial transactions, reporting, and sponsorships.
*   **Event Manager:** Manages the event calendar and all time-sensitive event content.

## 2. Authentication Architecture

User authentication for all administrative access will be managed by **AWS Cognito**. This provides a secure, managed, and scalable user directory and authentication service.

**Authentication Flow:**

1.  An administrator navigates to the administrative URL (e.g., `admin.vishnumandirtampa.org`).
2.  The user is redirected to the Cognito-hosted UI login page.
3.  The user enters their credentials (username and password). Multi-Factor Authentication (MFA) is recommended for all roles.
4.  Upon successful authentication, Cognito generates a JSON Web Token (JWT) containing the user's identity and their assigned role(s) (via Cognito Groups).
5.  The user is redirected back to the admin application (Next.js frontend or Strapi CMS).
6.  The JWT is included in the `Authorization` header of all subsequent requests to the backend API (API Gateway/Lambda) and the Headless CMS.

## 3. Authorization Model

Authorization—determining what an authenticated user is allowed to do—is enforced at the application and API level.

*   **Custom Backend API (API Gateway + Lambda):** API Gateway will be configured to use a Cognito Authorizer, which automatically validates the incoming JWT. The Lambda function will inspect the token's claims (specifically the `cognito:groups` array) to determine the user's role and grant or deny access to the requested resource or action.
*   **Headless CMS (Strapi):** Strapi has its own internal RBAC system. User accounts will be created within Strapi, and roles will be assigned manually to match the user's primary function. For simplicity in this initial phase, we will not use SSO between Cognito and Strapi; an Admin will be responsible for creating corresponding user accounts in both systems.
*   **Frontend UI:** The administrative frontend will read the role from the JWT to conditionally render UI components. For example, a user with the `Finance` role will not see navigation links for editing website pages.

## 4. Role Definitions and Permissions Matrix

The following table details the specific permissions granted to each role across the website's key features and systems. The permissions are defined using a simplified CRUD (Create, Read, Update, Delete) model where applicable.

| Feature / Module | System | Admin | Editor | Finance | Event Manager | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **User Management** | AWS Cognito | **Full Control** | None | None | None | Create, suspend, delete users; assign roles. |
| **User Management** | Strapi CMS | **Full Control** | None | None | None | Manage Strapi user accounts and roles. |
| **Pages & Posts** | Strapi CMS | **Full Control** | C, R, U | Read-Only | Read-Only | Editor manages static content like "Deities", "About Us", and general announcements. |
| **Media Library** | Strapi CMS | **Full Control** | C, R, U, D | None | C, R, U, D | Editor and Event Manager can upload images/files relevant to their content areas. |
| **Event Calendar** | Strapi CMS | **Full Control** | Read-Only | Read-Only | **C, R, U, D** | Event Manager has full control over all event types: pujas, cultural, classes. |
| **Puja Schedule** | Strapi CMS | **Full Control** | Read-Only | Read-Only | **C, R, U, D** | Managed by the Event Manager for timely updates. |
| **Puja Services Catalog** | Strapi CMS | **Full Control** | R, U | Read-Only | Read-Only | Editor can update text/pricing. Admin required to change structure. |
| **Newsletter Archives** | Strapi CMS | **Full Control** | C, R, U | None | None | Editor is responsible for uploading new PDF newsletters. |
| **Donations Report** | Custom Backend API | **Full Control** | None | **R, Export** | None | Finance can view transaction lists and export CSV reports. No PII is exported. |
| **Sponsorship Forms** | Custom Backend API | **Full Control** | None | **R, U** | None | Finance can view and update the status of sponsorship submissions. |
| **Facility Request Forms** | Custom Backend API | **Full Control** | Read-Only | None | Read-Only | Admin manages submissions. Editor/Event Manager may need to view for context. |
| **Stripe Dashboard** | Stripe | Admin Access | None | View-Only Access | None | Finance role has view-only access to verify transactions. No refund/charge ability. |
| **Audit Logs** | AWS CloudWatch | Read-Only | None | None | None | Admin has read-only access to review system and user activity logs. |

---

## 5. Implementation Details & Code Examples

### 5.1. API Authorization Middleware (Node.js/Express)

All protected routes on the custom backend API must use a middleware to verify the user's role before executing the controller logic. The role is extracted from the `cognito:groups` claim within the decoded JWT.

Below is a conceptual example of an authorization middleware:

```javascript
// middleware/auth.js

/**
 * Middleware to check if a user belongs to one of the allowed roles.
 * This assumes a previous middleware has already verified the JWT and attached
 * the user's decoded token to the request object (e.g., req.user).
 *
 * @param {string[]} allowedRoles - An array of role names allowed to access the route.
 */
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    // The decoded JWT payload is expected on req.user
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    // cognito:groups claim contains an array of the user's roles
    const userRoles = req.user['cognito:groups'] || [];

    const isAllowed = userRoles.some(role => allowedRoles.includes(role));

    if (!isAllowed) {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to perform this action.' });
    }

    next();
  };
};

export default checkRole;

// --- Usage in an Express route ---
// routes/reports.js
import express from 'express';
import checkRole from '../middleware/auth.js';
import { getDonationReport } from '../controllers/reportController.js';

const router = express.Router();

// Only users in the 'Admin' or 'Finance' group can access this route.
router.get('/donations', checkRole(['Admin', 'Finance']), getDonationReport);

export default router;
```

### 5.2. Role Naming Convention

To ensure consistency across systems, the following role names **must** be used precisely as written in AWS Cognito Groups and Strapi Roles:

*   `Admin`
*   `Editor`
*   `Finance`
*   `Event Manager`

## 6. Security Best Practices

*   **Principle of Least Privilege:** This entire model is based on providing the minimum level of access required for a user to perform their duties. Permissions should be reviewed periodically and revoked if no longer needed.
*   **Audit Logging:** As per non-functional requirement D), all actions performed by authenticated users within the administrative interfaces (CMS content changes, form status updates, report exports) **must be logged**. The log entry should include:
    *   `Timestamp`
    *   `UserID` (from Cognito `sub` claim)
    *   `UserRole` (from `cognito:groups`)
    *   `Action` (e.g., `CREATE`, `UPDATE`, `EXPORT`)
    *   `ResourceType` (e.g., `Page`, `Event`, `DonationReport`)
    *   `ResourceID` (e.g., `page_id_123`)
    *   `SourceIP`
*   **Separation of Duties:** The roles are designed to create a clear separation of duties. For instance, the `Finance` role, which handles sensitive financial data, cannot publish content. The `Editor` role cannot access financial reports. This separation minimizes the risk of unauthorized data access or modification.
*   **Regular Access Reviews:** The `Admin` role holder should conduct a quarterly review of all user accounts and their assigned permissions to ensure they remain appropriate.
```