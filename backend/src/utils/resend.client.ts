import { Resend } from "resend";

const globalForResend = globalThis as unknown as {
  resend: Resend | undefined;
};

/**
 * Resend client singleton.
 * Depends on RESEND_API_KEY. Prevents multiple instances in development with hot reloading.
 * Ensure RESEND_API_KEY is set in .env before sending; the email service validates it.
 * Lazy initialization to ensure dotenv has loaded environment variables.
 */
function getResendClient(): Resend {
  if (globalForResend.resend) {
    return globalForResend.resend;
  }
  
  const apiKey = process.env.RESEND_API_KEY;
  const client = new Resend(apiKey || "");
  
  if (process.env.NODE_ENV !== "production") {
    globalForResend.resend = client;
  }
  
  return client;
}

export const resend = getResendClient();
