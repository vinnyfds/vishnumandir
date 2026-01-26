import { Router, Request, Response } from "express";
import { sendEmail } from "../services/email.service";

const router = Router();

/**
 * POST /api/dev/test-email
 * Development-only. Sends a fixed test email to ADMIN_EMAIL_ADDRESS.
 * Mounted only when NODE_ENV === "development".
 */
router.post("/test-email", async (req: Request, res: Response) => {
  const to = process.env.ADMIN_EMAIL_ADDRESS;
  if (!to?.trim()) {
    return res.status(500).json({
      success: false,
      error: "ADMIN_EMAIL_ADDRESS is not set",
    });
  }
  const result = await sendEmail({
    to,
    subject: "Vishnu Mandir – Resend test",
    text: "This is a test email from the Vishnu Mandir backend. Resend is configured correctly.",
    html: "<p>This is a test email from the Vishnu Mandir backend. Resend is configured correctly.</p>",
  });
  if ("error" in result) {
    return res.status(500).json({
      success: false,
      error: result.error.message,
    });
  }
  return res.status(200).json({
    success: true,
    message: "Test email sent",
    id: result.id,
  });
});

export { router as devRoutes };
