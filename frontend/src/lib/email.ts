/**
 * Email service wrapper for Next.js API routes.
 * Uses Resend for transactional email delivery.
 */

import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey?.trim()) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export type SendEmailOptions = {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
};

export type SendEmailResult =
  | { id: string }
  | { error: Error };

/**
 * Send a transactional email via Resend.
 * Uses SENDER_EMAIL_ADDRESS for "from". Optional replyTo.
 *
 * @param options - to, subject, and either text or html (or both)
 * @returns {Promise<SendEmailResult>} { id } on success, { error } on failure
 */
export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  try {
    const resend = getResendClient();
    const sender = process.env.SENDER_EMAIL_ADDRESS;

    if (!sender?.trim()) {
      const err = new Error("SENDER_EMAIL_ADDRESS is not configured");
      console.error("[email.service] SENDER_EMAIL_ADDRESS missing:", err.message);
      return { error: err };
    }

    if (!options.text?.trim() && !options.html?.trim()) {
      const err = new Error("Either text or html is required");
      console.error("[email.service]", err.message);
      return { error: err };
    }

    const to = Array.isArray(options.to) ? options.to : [options.to];
    const base = {
      from: sender,
      to,
      subject: options.subject,
      ...(options.replyTo && { replyTo: options.replyTo }),
    };

    const withBody = options.html
      ? { ...base, html: options.html, ...(options.text && { text: options.text }) }
      : { ...base, text: options.text! };

    const response = await resend.emails.send(withBody as any);

    // Check if the response has error
    if ("error" in response && response.error) {
      console.error("[email.service] Resend send failed:", response.error);
      return { error: response.error instanceof Error ? response.error : new Error(String(response.error)) };
    }

    // Extract id from successful response
    const emailId = "data" in response && response.data?.id ? response.data.id : (response as any).id;
    
    if (!emailId) {
      console.error("[email.service] No email ID in response:", response);
      return { error: new Error("Failed to get email ID from Resend response") };
    }

    return { id: emailId };
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error("[email.service] Error sending email:", error.message);
    return { error };
  }
}
