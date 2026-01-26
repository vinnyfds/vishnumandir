import { resend } from "../utils/resend.client";

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

const from = () => process.env.SENDER_EMAIL_ADDRESS;

/**
 * Send a transactional email via Resend.
 * Uses SENDER_EMAIL_ADDRESS for "from". Optional replyTo; use ADMIN_EMAIL_ADDRESS when relevant.
 * Requires RESEND_API_KEY and SENDER_EMAIL_ADDRESS in env. ADMIN_EMAIL_ADDRESS is used by route handlers for admin notifications and replyTo.
 *
 * @param options - to, subject, and either text or html (or both)
 * @returns {Promise<SendEmailResult>} { id } on success, { error } on failure
 */
export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const sender = from();
  if (!apiKey?.trim()) {
    const err = new Error("RESEND_API_KEY is not set");
    console.error("[email.service] RESEND_API_KEY missing:", err.message);
    return { error: err };
  }
  if (!sender?.trim()) {
    const err = new Error("SENDER_EMAIL_ADDRESS is not set");
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
  const { data, error } = await resend.emails.send(withBody);

  if (error) {
    console.error("[email.service] Resend send failed:", error);
    return { error: error instanceof Error ? error : new Error(String(error)) };
  }
  return { id: data!.id };
}
