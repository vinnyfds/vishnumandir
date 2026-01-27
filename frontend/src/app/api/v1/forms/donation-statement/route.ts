import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { createFormSubmission } from "@/lib/strapi-sync";
import { successResponse, errorResponse, zodIssuesToContractErrors } from "@/lib/api-responses";
import {
  donationStatementSchema,
  changeOfAddressSchema,
  emailSubscriptionSchema,
} from "@/lib/schemas/optional-forms";

type FormSubmissionType = "DONATION_STATEMENT" | "CHANGE_OF_ADDRESS" | "EMAIL_SUBSCRIPTION";

/**
 * POST /api/v1/forms/donation-statement
 * Handle donation statement request form submissions.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate using appropriate schema
    let parsed;
    let formType: FormSubmissionType;

    const pathSegments = request.nextUrl.pathname.split("/");
    const currentFormType = pathSegments[pathSegments.length - 1];

    if (currentFormType === "donation-statement") {
      parsed = donationStatementSchema.safeParse(body);
      formType = "DONATION_STATEMENT";

      if (!parsed.success) {
        const errs = zodIssuesToContractErrors(parsed.error.issues);
        return errorResponse("Validation failed", 400, errs);
      }

      const data = parsed.data;
      if (data.period === "custom" && (!data.startDate || !data.endDate)) {
        return errorResponse("Start and end dates required for custom period", 400, [
          { field: "startDate", code: "REQUIRED", message: "Required for custom period" },
          { field: "endDate", code: "REQUIRED", message: "Required for custom period" },
        ]);
      }
      if (data.delivery === "mail" && !data.address?.trim()) {
        return errorResponse("Mailing address required for US Mail delivery", 400, [
          { field: "address", code: "REQUIRED", message: "Required for US Mail" },
        ]);
      }

      return submitOptionalForm(
        formType,
        data,
        "Donation Statement",
        (name, txn) =>
          `<p>Dear ${name},</p><p>We have received your donation statement request. We will process it and send your statement accordingly.</p><p>Transaction ID: <strong>${txn}</strong></p><p>— Vishnu Mandir, Tampa</p>`
      );
    } else if (currentFormType === "change-of-address") {
      parsed = changeOfAddressSchema.safeParse(body);
      formType = "CHANGE_OF_ADDRESS";

      if (!parsed.success) {
        const errs = zodIssuesToContractErrors(parsed.error.issues);
        return errorResponse("Validation failed", 400, errs);
      }

      return submitOptionalForm(
        formType,
        parsed.data,
        "Change of Address",
        (name, txn) =>
          `<p>Dear ${name},</p><p>We have received your change of address request. We will update our records accordingly.</p><p>Transaction ID: <strong>${txn}</strong></p><p>— Vishnu Mandir, Tampa</p>`
      );
    } else if (currentFormType === "email-subscription") {
      parsed = emailSubscriptionSchema.safeParse(body);
      formType = "EMAIL_SUBSCRIPTION";

      if (!parsed.success) {
        const errs = zodIssuesToContractErrors(parsed.error.issues);
        return errorResponse("Validation failed", 400, errs);
      }

      return submitOptionalForm(
        formType,
        parsed.data,
        "Email Subscription",
        (name, txn) =>
          `<p>Dear ${name},</p><p>We have received your email subscription request. Thank you for staying connected.</p><p>Transaction ID: <strong>${txn}</strong></p><p>— Vishnu Mandir, Tampa</p>`
      );
    }

    return errorResponse("Unknown form type", 400);
  } catch (error) {
    console.error("[api/v1/forms] Optional form error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return errorResponse(message, 500);
  }
}

async function submitOptionalForm(
  formType: FormSubmissionType,
  data: { name: string; email: string; [k: string]: any },
  formLabel: string,
  confirmHtml: (name: string, txn: string) => string
) {
  try {
    const transactionId = `req_${uuidv4().replace(/-/g, "")}`;

    // Save to database
    const formSubmission = await prisma.formSubmission.create({
      data: { formType, email: data.email, payload: data as any, transactionId },
    });

    // Sync to Strapi (non-blocking)
    createFormSubmission({
      formType,
      email: data.email,
      name: data.name || undefined,
      payload: data as any,
      transactionId,
      postgresId: formSubmission.id,
    }).catch((err) => {
      console.error(`[api/v1/forms/${formType}] Strapi sync error (non-blocking):`, err);
    });

    // Send admin notification
    const adminTo = process.env.ADMIN_EMAIL_ADDRESS;
    if (adminTo?.trim()) {
      await sendEmail({
        to: adminTo,
        subject: `[Vishnu Mandir] New ${formLabel}: ${data.name}`,
        html: `<p>New ${formLabel} submission. Transaction ID: ${transactionId}. Email: ${data.email}.</p>`,
        replyTo: data.email,
      });
    }

    // Send confirmation email
    const confirmResult = await sendEmail({
      to: data.email,
      subject: `Vishnu Mandir – Request received`,
      html: confirmHtml(data.name, transactionId),
      replyTo: adminTo || undefined,
    });

    if ("error" in confirmResult) {
      console.error(`[api/v1/forms/${formType}] Confirmation email failed:`, confirmResult.error);
    }

    return successResponse(
      {
        message: "Your request has been submitted successfully.",
        transactionId,
      },
      201
    );
  } catch (error) {
    console.error(`[api/v1/forms] Submit error:`, error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
