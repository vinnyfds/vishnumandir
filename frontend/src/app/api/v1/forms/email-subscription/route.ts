import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { createFormSubmission } from "@/lib/strapi-sync";
import { successResponse, errorResponse, zodIssuesToContractErrors } from "@/lib/api-responses";
import { emailSubscriptionSchema } from "@/lib/schemas/optional-forms";

/**
 * POST /api/v1/forms/email-subscription
 * Handle email subscription form submissions.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = emailSubscriptionSchema.safeParse(body);
    if (!parsed.success) {
      const errs = zodIssuesToContractErrors(parsed.error.issues);
      return errorResponse("Validation failed", 400, errs);
    }

    const transactionId = `req_${uuidv4().replace(/-/g, "")}`;
    const data = parsed.data;

    // Save to database
    const formSubmission = await prisma.formSubmission.create({
      data: {
        formType: "EMAIL_SUBSCRIPTION",
        email: data.email,
        payload: data as any,
        transactionId,
      },
    });

    // Sync to Strapi (non-blocking)
    createFormSubmission({
      formType: "EMAIL_SUBSCRIPTION",
      email: data.email,
      name: data.name || undefined,
      payload: data as any,
      transactionId,
      postgresId: formSubmission.id,
    }).catch((err) => {
      console.error("[api/v1/forms/email-subscription] Strapi sync error:", err);
    });

    // Send admin notification
    const adminTo = process.env.ADMIN_EMAIL_ADDRESS;
    if (adminTo?.trim()) {
      await sendEmail({
        to: adminTo,
        subject: `[Vishnu Mandir] New email subscription: ${data.name}`,
        html: `<p>New email subscription submission. Transaction ID: ${transactionId}. Email: ${data.email}.</p>`,
        replyTo: data.email,
      });
    }

    // Send confirmation email
    const confirmResult = await sendEmail({
      to: data.email,
      subject: `Vishnu Mandir – Subscription confirmed`,
      html: `<p>Dear ${data.name},</p><p>We have received your email subscription request. Thank you for staying connected with Vishnu Mandir.</p><p>Transaction ID: <strong>${transactionId}</strong></p><p>— Vishnu Mandir, Tampa</p>`,
      replyTo: adminTo || undefined,
    });

    if ("error" in confirmResult) {
      console.error("[api/v1/forms/email-subscription] Confirmation email failed:", confirmResult.error);
    }

    return successResponse(
      {
        message: "Your email subscription has been updated successfully.",
        transactionId,
      },
      201
    );
  } catch (error) {
    console.error("[api/v1/forms/email-subscription]", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
