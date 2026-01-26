import { Resend } from "resend";

const globalForResend = globalThis as unknown as {
  resend: Resend | undefined;
};

const apiKey = process.env.RESEND_API_KEY;

/**
 * Resend client singleton.
 * Depends on RESEND_API_KEY. Prevents multiple instances in development with hot reloading.
 * Ensure RESEND_API_KEY is set in .env before sending; the email service validates it.
 */
export const resend =
  globalForResend.resend ?? new Resend(apiKey ?? "");

if (process.env.NODE_ENV !== "production") globalForResend.resend = resend;
