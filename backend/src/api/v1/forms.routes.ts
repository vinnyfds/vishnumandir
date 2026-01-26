import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Router } from "express";
import { uploadOptionalAttachment } from "../../config/multer";
import { prisma } from "../../utils/prisma.client";
import { sendEmail } from "../../services/email.service";
import { success, error as errorResponse, zodIssuesToContractErrors } from "../../utils/responses";
import { sponsorshipSchema, facilityRequestSchema } from "../../schemas/forms";
import {
  donationStatementSchema,
  changeOfAddressSchema,
  emailSubscriptionSchema,
} from "../../schemas/optional-forms";
// FormSubmissionType enum from Prisma
// Using string literals to match Prisma enum values
type FormSubmissionType = "DONATION_STATEMENT" | "CHANGE_OF_ADDRESS" | "EMAIL_SUBSCRIPTION";
const FormSubmissionType = {
  DONATION_STATEMENT: "DONATION_STATEMENT" as const,
  CHANGE_OF_ADDRESS: "CHANGE_OF_ADDRESS" as const,
  EMAIL_SUBSCRIPTION: "EMAIL_SUBSCRIPTION" as const,
} as const;

const router = Router();

/**
 * POST /api/v1/forms/sponsorship
 * Multipart form. Validates, persists PujaSponsorship, sends admin + devotee emails.
 * Attachment accepted but not stored (S3 deferred).
 */
router.post(
  "/sponsorship",
  (req: Request, res: Response, next: (err?: unknown) => void) => {
    uploadOptionalAttachment(req, res, (err: unknown) => {
      if (err) {
        const msg = err instanceof Error ? err.message : "File upload failed.";
        errorResponse(res, msg, 400);
        return;
      }
      next();
    });
  },
  async (req: Request, res: Response, next: (err?: unknown) => void) => {
    try {
      const raw = req.body as Record<string, unknown>;
      const parsed = sponsorshipSchema.safeParse({
        devoteeName: raw.devoteeName,
        email: raw.email,
        phone: raw.phone,
        pujaId: raw.pujaId,
        sponsorshipDate: raw.sponsorshipDate,
        specialInstructions: raw.specialInstructions ?? undefined,
        additionalNotes: raw.additionalNotes ?? undefined,
        location: raw.location ?? undefined,
      });

      if (!parsed.success) {
        const errs = zodIssuesToContractErrors(parsed.error.issues);
        return errorResponse(res, "Validation failed", 400, errs);
      }

      const data = parsed.data;
      const requestedDate = new Date(data.sponsorshipDate);
      if (Number.isNaN(requestedDate.getTime())) {
        return errorResponse(res, "Invalid sponsorship date", 400, [
          { field: "sponsorshipDate", code: "INVALID", message: "Must be a valid date." },
        ]);
      }

      const transactionId = `req_${uuidv4().replace(/-/g, "")}`;
      const notes = [data.specialInstructions, data.additionalNotes]
        .filter(Boolean)
        .join("\n\n")
        .trim() || null;

      await prisma.pujaSponsorship.create({
        data: {
          pujaId: data.pujaId,
          pujaServiceName: data.pujaId,
          sponsorName: data.devoteeName,
          sponsorEmail: data.email,
          sponsorPhone: data.phone,
          requestedDate,
          location: data.location || null,
          notes,
          status: "pending",
          transactionId,
        },
      });

      const adminTo = process.env.ADMIN_EMAIL_ADDRESS;
      if (adminTo?.trim()) {
        await sendEmail({
          to: adminTo,
          subject: `[Vishnu Mandir] New puja sponsorship: ${data.devoteeName}`,
          html: `
            <p><strong>New puja sponsorship request</strong></p>
            <p>Transaction ID: ${transactionId}</p>
            <ul>
              <li>Name: ${data.devoteeName}</li>
              <li>Email: ${data.email}</li>
              <li>Phone: ${data.phone}</li>
              <li>Puja: ${data.pujaId}</li>
              <li>Date: ${data.sponsorshipDate}</li>
              ${data.location ? `<li>Location: ${data.location}</li>` : ""}
            </ul>
            ${notes ? `<p><strong>Notes:</strong><br/>${notes.replace(/\n/g, "<br/>")}</p>` : ""}
          `,
          replyTo: data.email,
        });
      }

      const confirmResult = await sendEmail({
        to: data.email,
        subject: "Vishnu Mandir – Puja sponsorship received",
        html: `
          <p>Dear ${data.devoteeName},</p>
          <p>Thank you for your puja sponsorship request. We have received it and will contact you shortly to confirm details.</p>
          <p>Transaction ID: <strong>${transactionId}</strong></p>
          <p>— Vishnu Mandir, Tampa</p>
        `,
        replyTo: adminTo || undefined,
      });
      if ("error" in confirmResult) {
        console.error("[forms.sponsorship] Confirmation email failed:", confirmResult.error);
      }

      return success(res, { message: "Your puja sponsorship request has been submitted successfully.", transactionId }, 201);
    } catch (e) {
      console.error("[forms.sponsorship]", e);
      next(e);
    }
  }
);

/**
 * POST /api/v1/forms/facility-request
 * JSON body. Validates, persists FacilityRequest, sends admin + requester emails.
 */
router.post("/facility-request", async (req: Request, res: Response, next: (err?: unknown) => void) => {
  try {
    const parsed = facilityRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      const errs = zodIssuesToContractErrors(parsed.error.issues);
      return errorResponse(res, "Validation failed", 400, errs);
    }

    const data = parsed.data;
    const eventDate = new Date(data.requestedDate);
    if (Number.isNaN(eventDate.getTime())) {
      return errorResponse(res, "Invalid requested date", 400, [
        { field: "requestedDate", code: "INVALID", message: "Must be a valid date." },
      ]);
    }

    const transactionId = `req_${uuidv4().replace(/-/g, "")}`;

    await prisma.facilityRequest.create({
      data: {
        requesterName: data.contactName,
        requesterEmail: data.email,
        requesterPhone: data.phone,
        eventType: data.eventType,
        eventName: null,
        eventDate,
        startTime: data.startTime || null,
        endTime: data.endTime || null,
        numberOfGuests: data.numberOfGuests,
        details: data.details || null,
        requirements: data.requirements || null,
        status: "pending",
        transactionId,
      },
    });

    const adminTo = process.env.ADMIN_EMAIL_ADDRESS;
    if (adminTo?.trim()) {
      await sendEmail({
        to: adminTo,
        subject: `[Vishnu Mandir] New facility request: ${data.contactName}`,
        html: `
          <p><strong>New facility rental request</strong></p>
          <p>Transaction ID: ${transactionId}</p>
          <ul>
            <li>Name: ${data.contactName}</li>
            <li>Email: ${data.email}</li>
            <li>Phone: ${data.phone}</li>
            <li>Event type: ${data.eventType}</li>
            <li>Date: ${data.requestedDate}</li>
            <li>Guests: ${data.numberOfGuests}</li>
            ${data.startTime ? `<li>Start: ${data.startTime}</li>` : ""}
            ${data.endTime ? `<li>End: ${data.endTime}</li>` : ""}
          </ul>
          ${data.details ? `<p><strong>Details:</strong><br/>${data.details.replace(/\n/g, "<br/>")}</p>` : ""}
          ${data.requirements ? `<p><strong>Requirements:</strong><br/>${data.requirements.replace(/\n/g, "<br/>")}</p>` : ""}
        `,
        replyTo: data.email,
      });
    }

    const confirmResult = await sendEmail({
      to: data.email,
      subject: "Vishnu Mandir – Facility request received",
      html: `
        <p>Dear ${data.contactName},</p>
        <p>Thank you for your facility rental request. We have received it and will contact you shortly.</p>
        <p>Transaction ID: <strong>${transactionId}</strong></p>
        <p>— Vishnu Mandir, Tampa</p>
      `,
      replyTo: adminTo || undefined,
    });
    if ("error" in confirmResult) {
      console.error("[forms.facility-request] Confirmation email failed:", confirmResult.error);
    }

    return success(res, { message: "Your facility request has been submitted successfully.", transactionId }, 201);
  } catch (e) {
    console.error("[forms.facility-request]", e);
    next(e);
  }
});

async function submitOptionalForm(
  res: Response,
  next: (err?: unknown) => void,
  formType: FormSubmissionType,
  data: { name: string; email: string; [k: string]: unknown },
  confirmHtml: (name: string, txn: string) => string
): Promise<Response | void> {
  try {
    const transactionId = `req_${uuidv4().replace(/-/g, "")}`;
    const payload = data as object;
    await prisma.formSubmission.create({
      data: { formType, email: data.email, payload, transactionId },
    });
    const adminTo = process.env.ADMIN_EMAIL_ADDRESS;
    if (adminTo?.trim()) {
      await sendEmail({
        to: adminTo,
        subject: `[Vishnu Mandir] New ${formType} form: ${data.name}`,
        html: `<p>New ${formType} submission. Transaction ID: ${transactionId}. Email: ${data.email}.</p>`,
        replyTo: data.email,
      });
    }
    const confirmResult = await sendEmail({
      to: data.email,
      subject: `Vishnu Mandir – Request received`,
      html: confirmHtml(data.name, transactionId),
      replyTo: adminTo || undefined,
    });
    if ("error" in confirmResult) {
      console.error(`[forms.${formType}] Confirmation email failed:`, confirmResult.error);
    }
    return success(res, { message: "Your request has been submitted successfully.", transactionId }, 201);
  } catch (e) {
    console.error(`[forms.${formType}]`, e);
    next(e);
  }
}

router.post("/donation-statement", async (req: Request, res: Response, next: (err?: unknown) => void) => {
  try {
    const parsed = donationStatementSchema.safeParse(req.body);
    if (!parsed.success) {
      return errorResponse(res, "Validation failed", 400, zodIssuesToContractErrors(parsed.error.issues));
    }
    const data = parsed.data;
    if (data.period === "custom" && (!data.startDate || !data.endDate)) {
      return errorResponse(res, "Start and end dates required for custom period", 400, [
        { field: "startDate", code: "REQUIRED", message: "Required for custom period" },
        { field: "endDate", code: "REQUIRED", message: "Required for custom period" },
      ]);
    }
    if (data.delivery === "mail" && !data.address?.trim()) {
      return errorResponse(res, "Mailing address required for US Mail delivery", 400, [
        { field: "address", code: "REQUIRED", message: "Required for US Mail" },
      ]);
    }
    return submitOptionalForm(
      res,
      next,
      FormSubmissionType.DONATION_STATEMENT,
      data,
      (name, txn) =>
        `<p>Dear ${name},</p><p>We have received your donation statement request. We will process it and send your statement accordingly.</p><p>Transaction ID: <strong>${txn}</strong></p><p>— Vishnu Mandir, Tampa</p>`
    );
  } catch (e) {
    console.error("[forms.donation-statement]", e);
    next(e);
  }
});

router.post("/change-of-address", async (req: Request, res: Response, next: (err?: unknown) => void) => {
  try {
    const parsed = changeOfAddressSchema.safeParse(req.body);
    if (!parsed.success) {
      return errorResponse(res, "Validation failed", 400, zodIssuesToContractErrors(parsed.error.issues));
    }
    return submitOptionalForm(
      res,
      next,
      FormSubmissionType.CHANGE_OF_ADDRESS,
      parsed.data,
      (name, txn) =>
        `<p>Dear ${name},</p><p>We have received your change of address request. We will update our records accordingly.</p><p>Transaction ID: <strong>${txn}</strong></p><p>— Vishnu Mandir, Tampa</p>`
    );
  } catch (e) {
    console.error("[forms.change-of-address]", e);
    next(e);
  }
});

router.post("/email-subscription", async (req: Request, res: Response, next: (err?: unknown) => void) => {
  try {
    const parsed = emailSubscriptionSchema.safeParse(req.body);
    if (!parsed.success) {
      return errorResponse(res, "Validation failed", 400, zodIssuesToContractErrors(parsed.error.issues));
    }
    return submitOptionalForm(
      res,
      next,
      FormSubmissionType.EMAIL_SUBSCRIPTION,
      parsed.data,
      (name, txn) =>
        `<p>Dear ${name},</p><p>We have received your email subscription request. Thank you for staying connected.</p><p>Transaction ID: <strong>${txn}</strong></p><p>— Vishnu Mandir, Tampa</p>`
    );
  } catch (e) {
    console.error("[forms.email-subscription]", e);
    next(e);
  }
});

export { router as formsRoutes };
