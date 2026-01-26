Of course. Here is the comprehensive API Contracts document for the Vishnu Mandir, Tampa project, written in Markdown format.

---

# API Contracts: Vishnu Mandir Web Platform

*   **Document Type:** API Contracts
*   **Category:** Architecture
*   **Version:** 1.0.0
*   **Date:** October 26, 2023
*   **Status:** Baseline

## 1. Overview

This document defines the API contract between the Next.js frontend application and the AWS serverless backend (API Gateway and Lambda). A clear, well-defined contract is essential for parallel development, ensuring seamless integration for handling form submissions and financial transactions.

The API is designed to be RESTful, stateless, and secure. It serves two primary functions for the public-facing website:

1.  **Form Processing**: Endpoints for submitting user requests, such as Puja Sponsorships and Facility Requests.
2.  **Payment Processing**: Endpoints to orchestrate one-time and recurring donations via the Stripe payment gateway.

This document uses the **OpenAPI 3.0 Specification** to formally describe the API endpoints, request/response payloads, and authentication mechanisms.

## 2. General Conventions

### 2.1. Base URL and Versioning

All API endpoints are prefixed with a version number to ensure backward compatibility. The base URL for the production environment will be:

`https://api.vishnumandirtampa.org/v1`

For development and staging, the base URL will be provided by AWS Amplify or API Gateway stage configurations.

### 2.2. Authentication

The public-facing transactional APIs are protected by an API Key to prevent abuse. The Next.js application must include this key in the `x-api-key` header for all requests.

Admin-related APIs (not covered in this document) will be secured using JWTs issued by AWS Cognito.

### 2.3. Data Format

All request and response bodies use `application/json` format, unless specified otherwise (e.g., for file uploads). All text is UTF-8 encoded. Property names follow `camelCase`.

### 2.4. Standard Responses

#### Success Response

A successful `POST` or `PUT` request will typically return a `201 Created` or `200 OK` status with a JSON body confirming the action.

```json
{
  "status": "success",
  "message": "Your request has been submitted successfully.",
  "transactionId": "txn_1a2b3c4d5e"
}
```

#### Error Response

Failed requests will return an appropriate `4xx` or `5xx` status code with a standardized JSON error body.

```json
{
  "status": "error",
  "message": "Invalid email address provided.",
  "errors": [
    {
      "field": "email",
      "code": "INVALID_FORMAT",
      "message": "Must be a valid email address."
    }
  ]
}
```

*   **400 Bad Request**: The request was malformed (e.g., validation error, missing fields).
*   **401 Unauthorized**: The request lacks a valid API key.
*   **403 Forbidden**: The API key is valid, but the action is not permitted.
*   **404 Not Found**: The requested resource does not exist.
*   **429 Too Many Requests**: The client has exceeded the rate limit.
*   **500 Internal Server Error**: A generic server-side error occurred. The backend should log the details.

## 3. OpenAPI 3.0 Specification

The following YAML block defines the formal contract for the public transaction APIs.

```yaml
openapi: 3.0.3
info:
  title: "Vishnu Mandir - Public API"
  description: "API for handling public form submissions and payments for the Vishnu Mandir Tampa website. This contract defines the communication between the Next.js frontend and the AWS Lambda backend."
  version: "1.0.0"
servers:
  - url: https://api.vishnumandirtampa.org/v1
    description: Production Server

security:
  - ApiKeyAuth: []

paths:
  /forms/sponsorship:
    post:
      summary: "Submit a Puja Sponsorship Request"
      description: "Accepts devotee information and details for a puja sponsorship. Triggers admin notifications and confirmation emails via SES. Supports optional file uploads."
      operationId: submitSponsorship
      tags:
        - Forms
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/SponsorshipRequest'
      responses:
        '201':
          description: "Sponsorship request submitted successfully."
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SuccessResponse'
        '400':
          description: "Bad Request - Invalid input."
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: "Internal Server Error."
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /forms/facility-request:
    post:
      summary: "Submit a Facility Request"
      description: "Accepts devotee information for requesting use of temple facilities. Triggers admin notifications and confirmation emails via SES."
      operationId: submitFacilityRequest
      tags:
        - Forms
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/FacilityRequest'
      responses:
        '201':
          description: "Facility request submitted successfully."
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SuccessResponse'
        '400':
          description: "Bad Request - Invalid input."
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: "Internal Server Error."
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /payments/donation-intent:
    post:
      summary: "Create a One-Time Donation Payment Intent"
      description: "Creates a Stripe Payment Intent for a one-time donation. Returns a `client_secret` that the frontend uses with Stripe.js to complete the payment."
      operationId: createDonationIntent
      tags:
        - Payments
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/DonationIntentRequest'
      responses:
        '200':
          description: "Payment Intent created successfully."
          content:
            application/json:
              schema:
                type: object
                properties:
                  clientSecret:
                    type: string
                    description: "The client secret for the Stripe Payment Intent."
                    example: "pi_123abc_secret_456def"
        '400':
          description: "Bad Request - Invalid amount."
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: "Internal Server Error."
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /payments/subscription:
    post:
      summary: "Create a Recurring Donation Subscription"
      description: "Creates a Stripe Customer and a Subscription for recurring donations. Returns a `client_secret` for the initial payment."
      operationId: createSubscription
      tags:
        - Payments
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SubscriptionRequest'
      responses:
        '201':
          description: "Subscription created successfully. The client must confirm the first payment."
          content:
            application/json:
              schema:
                type: object
                properties:
                  subscriptionId:
                    type: string
                    description: "The ID of the newly created Stripe Subscription."
                    example: "sub_123abc"
                  clientSecret:
                    type: string
                    description: "The client secret for the first invoice's Payment Intent."
                    example: "pi_123abc_secret_789ghi"
        '400':
          description: "Bad Request - Invalid plan or user data."
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: "Internal Server Error."
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /webhooks/stripe:
    post:
      summary: "Handle Stripe Webhooks"
      description: "Receives events from Stripe to fulfill orders, such as recording successful payments and sending receipts. This endpoint is called by Stripe, not the frontend, and must not require an API key."
      operationId: handleStripeWebhook
      tags:
        - Webhooks
      security: [] # Webhooks are authenticated via signature verification, not API keys.
      requestBody:
        required: true
        description: "Stripe event object. The raw body is needed to verify the `Stripe-Signature` header."
        content:
          application/json:
            schema:
              type: object
      responses:
        '200':
          description: "Webhook received."
          content:
            application/json:
              schema:
                type: object
                properties:
                  received:
                    type: boolean
                    example: true
        '400':
          description: "Webhook signature verification failed."

components:
  schemas:
    SponsorshipRequest:
      type: object
      required:
        - devoteeName
        - email
        - phone
        - pujaId
        - sponsorshipDate
      properties:
        devoteeName:
          type: string
          description: "Full name of the devotee sponsoring the puja."
          example: "Ravi Kumar"
        email:
          type: string
          format: email
          description: "Contact email for confirmation and communication."
          example: "ravi.kumar@example.com"
        phone:
          type: string
          description: "Contact phone number."
          example: "813-555-1234"
        pujaId:
          type: string
          description: "The unique identifier for the selected puja service."
          example: "PUJ-SATYANARAYAN-01"
        sponsorshipDate:
          type: string
          format: date
          description: "The requested date for the sponsorship."
          example: "2024-05-15"
        specialInstructions:
          type: string
          description: "Any special notes, names, or gotra for the priest."
          example: "Please perform in the name of the Kumar family."
        attachment:
          type: string
          format: binary
          description: "Optional file upload (e.g., a list of names)."

    FacilityRequest:
      type: object
      required:
        - contactName
        - email
        - phone
        - eventType
        - requestedDate
        - numberOfGuests
      properties:
        contactName:
          type: string
          example: "Priya Sharma"
        email:
          type: string
          format: email
          example: "priya.sharma@example.com"
        phone:
          type: string
          example: "813-555-5678"
        eventType:
          type: string
          description: "Type of event (e.g., Birthday, Anniversary, Meeting)."
          example: "Anniversary Celebration"
        requestedDate:
          type: string
          format: date
          example: "2024-06-20"
        startTime:
          type: string
          example: "10:00 AM"
        endTime:
          type: string
          example: "2:00 PM"
        numberOfGuests:
          type: integer
          example: 50
        details:
          type: string
          description: "Additional details about the request."

    DonationIntentRequest:
      type: object
      required:
        - amount
      properties:
        amount:
          type: integer
          description: "The donation amount in cents (e.g., 1000 for $10.00)."
          minimum: 100 # Minimum $1.00
          example: 5000
        currency:
          type: string
          description: "The three-letter ISO currency code."
          default: "usd"
          example: "usd"

    SubscriptionRequest:
      type: object
      required:
        - planId
        - email
        - name
      properties:
        planId:
          type: string
          description: "The Stripe Price ID for the recurring donation plan (e.g., monthly_10, monthly_25)."
          example: "price_1MxyzL2eZvKYlo2CfO1a2b3c"
        email:
          type: string
          format: email
          description: "The donor's email address, used to create a Stripe Customer."
          example: "donor@example.com"
        name:
          type: string
          description: "The donor's full name."
          example: "Ananya Gupta"

    SuccessResponse:
      type: object
      properties:
        status:
          type: string
          example: "success"
        message:
          type: string
          example: "Request processed successfully."
        transactionId:
          type: string
          description: "A unique ID for tracing the submission in the backend."
          example: "req_f1a2b3c4d5"

    ErrorResponse:
      type: object
      properties:
        status:
          type: string
          example: "error"
        message:
          type: string
          description: "A high-level summary of the error."
        errors:
          type: array
          items:
            type: object
            properties:
              field:
                type: string
                description: "The field that caused the validation error."
                example: "email"
              code:
                type: string
                description: "A machine-readable error code."
                example: "INVALID_FORMAT"
              message:
                type: string
                description: "A human-readable description of the error."
                example: "Must be a valid email address."

  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: x-api-key

```

## 4. Workflows

### 4.1. Puja Sponsorship Workflow

1.  **Frontend**: User fills out the Puja Sponsorship form in the Next.js app.
2.  **Frontend**: On submission, the app constructs a `FormData` object and makes a `POST` request to `/forms/sponsorship`.
3.  **Backend (API Gateway -> Lambda)**:
    a. The Lambda function receives the request.
    b. It validates the input data (name, email, pujaId, etc.).
    c. If a file is attached, it's streamed to a secure S3 bucket.
    d. The request data (and S3 file link) is saved to the database (DynamoDB/PostgreSQL) with a `pending` status.
    e. An email notification is sent via SES to the appropriate admin/priest inbox.
    f. A confirmation email is sent via SES to the devotee's email address.
4.  **Backend -> Frontend**: The API returns a `201 Created` response with a success message and a transaction ID.

### 4.2. One-Time Donation Workflow

1.  **Frontend**: User enters a donation amount and clicks "Donate".
2.  **Frontend**: The app makes a `POST` request to `/payments/donation-intent` with the `{ "amount": 5000 }` (for $50.00).
3.  **Backend (API Gateway -> Lambda)**:
    a. The Lambda function calls the Stripe API to create a Payment Intent with the specified amount.
    b. Stripe returns a Payment Intent object.
    c. The Lambda extracts the `client_secret` from the Stripe response.
4.  **Backend -> Frontend**: The API returns a `200 OK` response containing the `clientSecret`.
5.  **Frontend**: The app uses the `clientSecret` with Stripe.js to initialize the payment element and securely collect the user's card details. The user confirms the payment directly with Stripe's servers.
6.  **Stripe -> Backend**: After successful payment, Stripe sends a `payment_intent.succeeded` event to the `/webhooks/stripe` endpoint.
7.  **Backend (Webhook Lambda)**:
    a. The handler verifies the Stripe signature to ensure the request is authentic.
    b. It records the successful donation in the database.
    c. It sends a tax receipt/thank you email to the donor via SES.
    d. It sends a notification to the finance admin.
8.  **Backend**: The webhook handler returns a `200 OK` response to Stripe to acknowledge receipt of the event.

## 5. Development Platform Integration (Cursor IDE)

This documentation is designed to be used effectively within the Cursor IDE environment.

### 5.1. `.cursorrules` Configuration

To provide optimal context to the AI, a `.cursorrules` file should be placed at the root of the project with the following content. This helps the AI understand the project's goals, tech stack, and coding standards.

```
# .cursorrules

## Project Context
Project: Vishnu Mandir, Tampa
Description: Website for a religious organization with goals to serve devotees, drive community participation, enable self-service transactions (donations, sponsorships), and reduce admin workload.
Website Type: Decoupled (Jamstack) architecture.

## Tech Stack
- Frontend: Next.js with Tailwind CSS
- Backend: Node.js/TypeScript on AWS Lambda with API Gateway
- Database: PostgreSQL with Prisma ORM
- Deployment: AWS Amplify
- Payments: Stripe

## Key API Contract
- This project uses a formal OpenAPI contract defined in `docs/architecture/api-contracts.md`.
- All backend endpoints must adhere to the schemas and conventions defined in this contract.
- Frontend API calls must match the defined request/response structures.
- Use `camelCase` for all JSON properties in API requests and responses.

## Code Generation Rules
- When generating a new Lambda handler for an API endpoint, reference the OpenAPI spec in `docs/architecture/api-contracts.md` to define the request/response types.
- When generating frontend code to call an API, use the same contract to ensure correctness.
- All new code should include JSDoc or TSDoc comments explaining its purpose, parameters, and return values.
```

### 5.2. `changelog.md`

A `changelog.md` file will be maintained to track significant changes made by or with the assistance of the AI. This provides a clear audit trail of automated contributions.

```markdown
# Changelog

## [1.0.0] - 2023-10-26

### Added
- **AI**: Generated initial baseline API Contracts document (`docs/architecture/api-contracts.md`) based on project requirements.
- **AI**: Created the Lambda handler skeleton for `POST /forms/sponsorship`, including input validation with Zod based on the OpenAPI schema.
- **User**: Refined the database schema for storing sponsorship requests.
```