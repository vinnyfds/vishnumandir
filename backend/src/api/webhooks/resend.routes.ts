import { Request, Response } from "express";
import { resend } from "../../utils/resend.client";

const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
const adminTo = process.env.ADMIN_EMAIL_ADDRESS;

/**
 * POST /webhooks/resend
 * Raw body required. Verifies Resend webhook signature using Svix headers,
 * handles email.received events, and processes inbound emails.
 *
 * Resend uses Svix for webhook signing. Headers: svix-id, svix-timestamp, svix-signature.
 */
export async function handleResendWebhook(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const payload = await (req.body instanceof Buffer
      ? Promise.resolve(req.body.toString("utf-8"))
      : req.body instanceof String
      ? Promise.resolve(req.body.toString())
      : Promise.resolve(JSON.stringify(req.body)));

    if (!webhookSecret) {
      console.error("[webhooks.resend] RESEND_WEBHOOK_SECRET not configured");
      res.status(400).json({
        status: "error",
        message: "Webhook secret not configured",
      });
      return;
    }

    // Verify webhook signature using Resend SDK
    let event: any;
    try {
      event = await resend.webhooks.verify({
        payload,
        headers: {
          id: (req.headers["svix-id"] as string) || "",
          timestamp: (req.headers["svix-timestamp"] as string) || "",
          signature: (req.headers["svix-signature"] as string) || "",
        },
        webhookSecret,
      });
    } catch (verifyError) {
      const msg =
        verifyError instanceof Error
          ? verifyError.message
          : "Invalid webhook signature";
      console.error("[webhooks.resend] Signature verification failed:", msg);
      res.status(400).json({ status: "error", message: msg });
      return;
    }

    // Handle email.received event
    if (event.type === "email.received") {
      const emailData = event.data;
      const from = emailData.from || "unknown@unknown";
      const to = Array.isArray(emailData.to) ? emailData.to[0] : emailData.to;
      const subject = emailData.subject || "(No subject)";
      const messageId = emailData.message_id || "unknown";

      console.log(
        `[webhooks.resend] Received inbound email from: ${from}, to: ${to}, subject: ${subject}`
      );

      // Optional: Send admin notification of inbound email
      if (adminTo) {
        await sendAdminNotification({
          from,
          to,
          subject,
          messageId,
          email_id: emailData.email_id,
        });
      }

      // Return success immediately (Resend retries if no 200)
      res.status(200).json({ received: true });
      return;
    }

    // For other event types, just acknowledge
    console.log(`[webhooks.resend] Received event type: ${event.type}`);
    res.status(200).json({ received: true });
  } catch (error) {
    console.error("[webhooks.resend] Webhook handler error:", error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

/**
 * Send admin notification of received inbound email.
 * @param emailInfo - Email details from Resend webhook
 */
async function sendAdminNotification(emailInfo: {
  from: string;
  to: string;
  subject: string;
  messageId: string;
  email_id: string;
}): Promise<void> {
  try {
    const { sendEmail } = await import("../../services/email.service");

    const html = `
      <p>You have received a new inbound email:</p>
      <ul>
        <li><strong>From:</strong> ${emailInfo.from}</li>
        <li><strong>To:</strong> ${emailInfo.to}</li>
        <li><strong>Subject:</strong> ${emailInfo.subject}</li>
        <li><strong>Message ID:</strong> ${emailInfo.messageId}</li>
        <li><strong>Email ID:</strong> ${emailInfo.email_id}</li>
      </ul>
      <p>Check the Resend dashboard for full email details and attachments.</p>
    `;

    await sendEmail({
      to: process.env.ADMIN_EMAIL_ADDRESS!,
      subject: `[Inbound Email] ${emailInfo.subject}`,
      html,
      text: `New inbound email from ${emailInfo.from}: ${emailInfo.subject}`,
    });

    console.log(
      "[webhooks.resend] Admin notification sent for email:",
      emailInfo.email_id
    );
  } catch (notificationError) {
    console.error(
      "[webhooks.resend] Failed to send admin notification:",
      notificationError
    );
    // Don't throw - we already acknowledged the webhook to Resend
  }
}
