import { Resend } from "resend";

const globalForResend = globalThis as unknown as {
  resend: Resend | undefined;
};

/**
 * Resend client singleton.
 * Depends on RESEND_API_KEY. Prevents multiple instances in development with hot reloading.
 * Ensure RESEND_API_KEY is set in .env before sending; the email service validates it.
 * Initializes with a placeholder key if RESEND_API_KEY is not set (will be validated in email service).
 */
function getResendClient(): Resend {
  if (globalForResend.resend) {
    return globalForResend.resend;
  }
  
  // Load environment variable (dotenv.config() should be called in server.ts before this module is imported)
  const apiKey = process.env.RESEND_API_KEY;
  
  // Resend requires a non-empty string, so use a placeholder if key is missing
  // The email service will validate and return an error if the key is invalid
  const client = new Resend(apiKey || "placeholder_key_will_be_validated");
  
  if (process.env.NODE_ENV !== "production") {
    globalForResend.resend = client;
  }
  
  return client;
}

export const resend = getResendClient();
