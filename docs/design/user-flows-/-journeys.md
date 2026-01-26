```markdown
# User Flows & Journeys

| | |
| :--- | :--- |
| **Document Type** | User Flows / Journeys |
| **Project** | Vishnu Mandir, Tampa |
| **Category** | Design |
| **Status** | Final |
| **Version** | 1.0 |

## 1. Introduction

This document maps the primary user journeys for the Vishnu Mandir website, focusing on key transactional flows that are central to the project's goals. The primary objective is to design intuitive, self-service experiences that cater to our diverse target audiences, from regular devotees to first-time donors.

By shifting from manual, in-person processes to streamlined digital workflows, we aim to:
- **Serve devotees** by providing accessible, 24/7 access to temple services.
- **Enable self-service transactions**, empowering users to sponsor pujas and make donations at their convenience.
- **Reduce administrative workload** by automating form submissions, payment processing, and notifications.

This document will detail two critical journeys:
1.  **New Online Puja Sponsorship:** A complete redesign of the current paper-based process.
2.  **Online Donation Flow:** Covering both one-time and recurring contributions.

---

## 2. User Personas

To ground our user journeys in real-world scenarios, we've defined the following key personas.

| Persona | Description | Goals | Technical Comfort |
| :--- | :--- | :--- | :--- |
| **Priya Patel** <br> _(Devotee & Family)_ | A 45-year-old IT professional who regularly attends the temple with her family. She manages family religious observances. | Wants to sponsor a puja for her parents' wedding anniversary without having to make a special trip to the temple. She values a secure, straightforward, and trustworthy online process. | High |
| **Anand Sharma** <br> _(Donor)_ | A 60-year-old small business owner and long-time devotee. He wants to support the temple's operational costs consistently. | Wants a simple "set it and forget it" method to make a monthly donation. He needs clear confirmation and an annual receipt for tax purposes. | Medium |
| **Temple Admin** <br> _(Finance/Puja Coordinator)_ | A temple staff member responsible for coordinating pujas and tracking finances. | Needs to receive clear, accurate information from online submissions to schedule priests and update temple records. Wants to reduce manual data entry and payment reconciliation. | Medium |

---

## 3. Journey 1: Online Puja Sponsorship

This journey digitizes the entire puja sponsorship process, from discovery to confirmation, eliminating the need for physical forms and payments.

**Objective:** Allow a devotee (Priya) to discover, select, personalize, and pay for a puja sponsorship online, receiving immediate confirmation for herself and notifying the relevant temple staff.

**Actors:** Devotee, Temple Admin

### 3.1. Sponsorship Flow Diagram

```mermaid
graph TD
    A[Start: User on Website] --> B{Discovery};
    B --> C[1. Puja Services Page];
    B --> D[2. Homepage Banner];
    B --> E[3. Main Navigation];
    C --> F[Selects a specific Puja];
    D --> F;
    E --> C;
    F --> G[Clicks "Sponsor this Puja"];

    G --> H[Step 1: Configuration Form];
    subgraph H [Sponsorship Form]
        direction TB
        H1[Puja Details (pre-filled)]
        H2[Date & Time Selection (calendar view)]
        H3[Personal Details (Name, Gotra, etc.)]
        H4[Contact Information (Email, Phone)]
    end

    H --> I{Review & Confirm};
    I -- Edit --> H;
    I -- Confirm --> J[Step 2: Payment];

    subgraph J [Secure Payment via Stripe]
        direction TB
        J1[Redirect to Stripe Checkout]
        J2[Enter Payment Information]
        J3[Submit Payment]
    end

    J --> K{Payment Status?};
    K -- Success --> L[Step 3: Confirmation];
    K -- Failure --> M[Error Message, Retry Payment];
    M --> J;

    subgraph L [Multi-channel Confirmation]
        direction LR
        L1[On-site Thank You Page]
        L2[Email to Devotee (SES)]
        L3[Email to Admin (SES)]
    end

    L2 --> N[End of User Journey];
    L3 --> O[Admin Workflow Triggered];
```

### 3.2. Step-by-Step Breakdown

| Step | User Action (Priya) | System Action | Technical Notes & Rationale |
| :--- | :--- | :--- | :--- |
| 1. **Discovery & Selection** | Priya navigates to the 'Religious > Puja Services' page. She finds "Satyanarayana Puja" and clicks the "Sponsor this Puja" button next to it. | The website displays a catalog of pujas fetched from the Headless CMS. The button links to the sponsorship form, pre-populating the puja name. | The 'Puja Services' page will be generated via SSG/ISR for fast loading. Each service will be a content type in the CMS, including name, description, price, and a sponsorship link. |
| 2. **Configuration** | Priya fills out the sponsorship form: <br>- Selects a date from an interactive calendar showing available slots. <br>- Enters her family's names, Gotra, and Nakshatra. <br>- Provides her email address and phone number. | The form validates inputs in real-time (e.g., email format, required fields). Available dates/times are fetched dynamically to prevent double-booking. | **Frontend:** Next.js form with state management. <br>**Backend:** An API Gateway endpoint with a Lambda function will fetch available slots from the PostgreSQL database. |
| 3. **Review** | Priya reviews a summary of her sponsorship: Puja Name, Date, Time, Amount, and Personal Details. She confirms everything is correct and clicks "Proceed to Payment". | The system presents a clean, read-only summary of the form data before initiating the payment process. | This step is crucial for user trust and reduces errors. It confirms the user's intent before a financial transaction. |
| 4. **Payment** | Priya is redirected to a Stripe Checkout page. She enters her credit card information and completes the payment. | The backend Lambda function creates a Stripe Checkout session with the sponsorship details and amount. Stripe securely handles the PCI-compliant payment processing. | Using Stripe Checkout offloads security and compliance burdens. The session will include metadata (e.g., `sponsorship_id`, `user_email`) for webhook reconciliation. |
| 5. **Confirmation (Success)** | Priya is redirected back to a "Thank You" page on the Vishnu Mandir website. The page confirms her sponsorship is complete and informs her that a confirmation email has been sent. She then checks her email and finds a detailed receipt. | 1. **Stripe Webhook:** Notifies the backend of the successful payment. <br>2. **Backend Lambda:** <br>   - Saves the confirmed sponsorship details to the PostgreSQL database. <br>   - Triggers two emails via Amazon SES. <br>3. **User Email:** Sent to Priya with all sponsorship details, payment receipt, and instructions (e.g., "Please arrive 15 mins early"). <br>4. **Admin Email:** Sent to `pujas@vishnumandirtampa.org` with all sponsorship details for scheduling and record-keeping. | This asynchronous flow ensures the user gets immediate feedback while the backend processes the data reliably. The database record is the single source of truth for admins. |
| 6. **Confirmation (Failure)** | If her card is declined, Priya is shown an error message on the Stripe page and is given the option to try again with a different card. | Stripe handles the payment failure flow. The user remains within the Stripe Checkout session until payment is successful or they abandon the process. | No record is created in our database until the Stripe webhook confirms a successful payment, preventing orphaned or incomplete entries. |

---

## 4. Journey 2: Online Donation (One-Time & Recurring)

This journey provides a simple and secure way for devotees to support the temple financially.

**Objective:** Enable a donor (Anand) to make a one-time or recurring monthly donation, select a fund, and receive an automated tax receipt.

**Actors:** Donor, Temple Admin (Finance)

### 4.1. Donation Flow Diagram

```mermaid
graph TD
    A[Start: User on Website] --> B[Clicks "Donate" Button];

    B --> C[Step 1: Donation Form];
    subgraph C [Donation Configuration]
        direction TB
        C1[Amount: Preset Tiers + Custom]
        C2[Frequency: One-Time / Monthly]
        C3[Fund Designation (Optional Dropdown)]
        C4[Personal Info for Receipt (Name, Email)]
    end

    C --> D{Proceed to Payment};
    D --> E[Step 2: Payment];
    subgraph E [Secure Payment via Stripe]
        direction TB
        E1[Initiate Stripe Checkout Session]
        E2[Enter Payment Information]
        E3[Submit Payment]
    end

    E --> F{Payment Status?};
    F -- Success --> G[Step 3: Confirmation];
    F -- Failure --> H[Error Message, Retry Payment];
    H --> E;

    subgraph G [Multi-channel Confirmation]
        direction LR
        G1[On-site Thank You Page]
        G2[Email to Donor (SES)]
        G3[Backend Record Creation]
    end

    G2 --> I[End of User Journey];
    G3 --> J[Admin Workflow Triggered];
    J -- New Donation --> K[Notify Finance Team];
```

### 4.2. Step-by-Step Breakdown

| Step | User Action (Anand) | System Action | Technical Notes & Rationale |
| :--- | :--- | :--- | :--- |
| 1. **Initiation & Configuration** | Anand clicks the "Donate" button in the main navigation. On the donation page, he: <br>- Selects "Monthly". <br>- Clicks the "$101" preset amount. <br>- Leaves the fund as "General Fund" (default). <br>- Enters his name and email. <br>- Clicks "Donate Now". | The donation form is a simple, single-view component. Selecting "Monthly" updates the state to create a recurring payment plan. | The UI will clearly state the commitment (e.g., "$101 per month"). The form resides on a dedicated `/donate` page but could also be a modal for quick access. |
| 2. **Payment** | Anand is taken to the Stripe Checkout page. Since he selected "Monthly," the page clearly indicates this is a subscription. He enters his card details and confirms. | The backend Lambda creates a Stripe Checkout session. Crucially, the `mode` is set to `subscription` to establish a recurring payment plan with Stripe. | Stripe handles the recurring billing logic, retries, and card expiration notifications, significantly reducing backend complexity. |
| 3. **Confirmation (Success)** | Anand is redirected to the website's "Thank You" page, which acknowledges his generous recurring donation. He immediately receives an email confirming his monthly subscription and the first payment. | 1. **Stripe Webhook (`checkout.session.completed`):** Triggers a backend Lambda. <br>2. **Backend Lambda:** <br>   - Creates a customer record in Stripe if one doesn't exist. <br>   - Saves the subscription and initial transaction details to the PostgreSQL `donations` table. <br>   - Triggers an email via Amazon SES. <br>3. **User Email:** The confirmation email includes the amount, frequency, start date, and information on how to manage the subscription in the future (e.g., a link to a Stripe customer portal or contact info for the finance team). <br>4. **Admin Notification:** An email is sent to `finance@vishnumandirtampa.org` for their records. | Storing transaction records in our database is vital for admin reporting. The Stripe Customer Portal can be enabled to allow users to self-manage their subscriptions (cancel, update card), further reducing admin load. |
| 4. **Ongoing Actions** | A month later, Anand automatically receives an email receipt for his second monthly donation. At the end of the year, he contacts the temple for a consolidated tax receipt. | **Stripe Webhook (`invoice.paid`):** For each subsequent successful monthly payment, a webhook triggers a Lambda to record the new transaction in our database and send a receipt email via SES. <br>**Admin Reporting:** The Finance admin can log in to the admin panel and export a CSV of all donations for a specific user (Anand) or date range, facilitating the creation of annual tax statements. | Automating monthly receipts ensures transparency for the donor. The admin export functionality directly addresses a key project requirement (`C) Admin (must-have)`). |

---

## 5. Edge Cases & Considerations

- **Accessibility:** All form fields, buttons, and text must have proper labels, ARIA attributes, and sufficient color contrast (`#1f2937` text on `#fefce8` background) to meet WCAG 2.1 AA standards. This ensures the flows are usable by older devotees or those with visual impairments.
- **Mobile Experience:** Both flows must be fully responsive. Forms will collapse into a single-column layout on mobile devices. Buttons and interactive elements will have large tap targets.
- **Form Validation:** Both client-side (instant feedback) and server-side (security) validation will be implemented for all forms to prevent bad data and ensure all required information is captured.
- **System Downtime:** In the rare event that a backend service (e.g., Lambda, SES) is temporarily unavailable after a successful payment, the system should be designed with a retry mechanism (e.g., using SQS Dead-Letter Queues) to ensure notifications are eventually sent and records are created.
- **No-Script Users:** While the site is heavily reliant on JavaScript (Next.js), basic information and contact details should remain accessible. Transactional flows, however, will require JavaScript to be enabled. A `<noscript>` tag will inform users of this requirement on the sponsorship/donation pages.
```