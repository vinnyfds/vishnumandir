import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { createPujaSponsorship } from "@/lib/strapi-sync";
import { successResponse, errorResponse, zodIssuesToContractErrors } from "@/lib/api-responses";
import { sponsorshipSchema } from "@/lib/schemas/forms";

/**
 * POST /api/v1/forms/sponsorship
 * Handle puja sponsorship form submissions.
 * Accepts multipart/form-data with optional file attachment.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const raw = {
      devoteeName: formData.get("devoteeName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      pujaId: formData.get("pujaId"),
      sponsorshipDate: formData.get("sponsorshipDate"),
      specialInstructions: formData.get("specialInstructions") || undefined,
      additionalNotes: formData.get("additionalNotes") || undefined,
      location: formData.get("location") || undefined,
    };

    // Validate using Zod schema
    const parsed = sponsorshipSchema.safeParse(raw);

    if (!parsed.success) {
      const errs = zodIssuesToContractErrors(parsed.error.issues);
      return errorResponse("Validation failed", 400, errs);
    }

    const data = parsed.data;
    const requestedDate = new Date(data.sponsorshipDate);

    if (Number.isNaN(requestedDate.getTime())) {
      return errorResponse("Invalid sponsorship date", 400, [
        { field: "sponsorshipDate", code: "INVALID", message: "Must be a valid date." },
      ]);
    }

    const transactionId = `req_${uuidv4().replace(/-/g, "")}`;
    const notes = [data.specialInstructions, data.additionalNotes]
      .filter(Boolean)
      .join("\n\n")
      .trim() || null;

    // Save to database
    const sponsorship = await prisma.pujaSponsorship.create({
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

    // Sync to Strapi (non-blocking)
    createPujaSponsorship({
      pujaId: data.pujaId,
      pujaServiceName: data.pujaId,
      sponsorName: data.devoteeName,
      sponsorEmail: data.email,
      sponsorPhone: data.phone,
      requestedDate: requestedDate.toISOString(),
      location: data.location || undefined,
      notes: notes || undefined,
      status: "pending",
      transactionId,
      postgresId: sponsorship.id,
    }).catch((err) => {
      console.error("[api/v1/forms/sponsorship] Strapi sync error (non-blocking):", err);
    });

    // Send admin notification
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

    // Send confirmation email to devotee
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
      console.error("[api/v1/forms/sponsorship] Confirmation email failed:", confirmResult.error);
    }

    return successResponse(
      {
        message: "Your puja sponsorship request has been submitted successfully.",
        transactionId,
      },
      201
    );
  } catch (error) {
    console.error("[api/v1/forms/sponsorship]", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
