import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { createFacilityRequest } from "@/lib/strapi-sync";
import { successResponse, errorResponse, zodIssuesToContractErrors } from "@/lib/api-responses";
import { facilityRequestSchema } from "@/lib/schemas/forms";

/**
 * POST /api/v1/forms/facility-request
 * Handle facility rental request form submissions.
 * Accepts JSON body.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate using Zod schema
    const parsed = facilityRequestSchema.safeParse(body);

    if (!parsed.success) {
      const errs = zodIssuesToContractErrors(parsed.error.issues);
      return errorResponse("Validation failed", 400, errs);
    }

    const data = parsed.data;
    const eventDate = new Date(data.requestedDate);

    if (Number.isNaN(eventDate.getTime())) {
      return errorResponse("Invalid requested date", 400, [
        { field: "requestedDate", code: "INVALID", message: "Must be a valid date." },
      ]);
    }

    const transactionId = `req_${uuidv4().replace(/-/g, "")}`;

    // Save to database
    const facilityRequest = await prisma.facilityRequest.create({
      data: {
        requesterName: data.contactName,
        requesterEmail: data.email,
        requesterPhone: data.phone,
        eventType: data.eventType,
        eventName: null,
        eventDate,
        startTime: data.startTime || null,
        endTime: data.endTime || null,
        numberOfGuests: data.numberOfGuests,
        details: data.details || null,
        requirements: data.requirements || null,
        status: "pending",
        transactionId,
      },
    });

    // Sync to Strapi (non-blocking)
    createFacilityRequest({
      requesterName: data.contactName,
      requesterEmail: data.email,
      requesterPhone: data.phone,
      eventType: data.eventType,
      eventName: undefined,
      eventDate: eventDate.toISOString(),
      startTime: data.startTime || undefined,
      endTime: data.endTime || undefined,
      numberOfGuests: data.numberOfGuests,
      details: data.details || undefined,
      requirements: data.requirements || undefined,
      status: "pending",
      transactionId,
      postgresId: facilityRequest.id,
    }).catch((err) => {
      console.error("[api/v1/forms/facility-request] Strapi sync error (non-blocking):", err);
    });

    // Send admin notification
    const adminTo = process.env.ADMIN_EMAIL_ADDRESS;
    if (adminTo?.trim()) {
      await sendEmail({
        to: adminTo,
        subject: `[Vishnu Mandir] New facility request: ${data.contactName}`,
        html: `
          <p><strong>New facility rental request</strong></p>
          <p>Transaction ID: ${transactionId}</p>
          <ul>
            <li>Name: ${data.contactName}</li>
            <li>Email: ${data.email}</li>
            <li>Phone: ${data.phone}</li>
            <li>Event type: ${data.eventType}</li>
            <li>Date: ${data.requestedDate}</li>
            <li>Guests: ${data.numberOfGuests}</li>
            ${data.startTime ? `<li>Start: ${data.startTime}</li>` : ""}
            ${data.endTime ? `<li>End: ${data.endTime}</li>` : ""}
          </ul>
          ${data.details ? `<p><strong>Details:</strong><br/>${data.details.replace(/\n/g, "<br/>")}</p>` : ""}
          ${data.requirements ? `<p><strong>Requirements:</strong><br/>${data.requirements.replace(/\n/g, "<br/>")}</p>` : ""}
        `,
        replyTo: data.email,
      });
    }

    // Send confirmation email to requester
    const confirmResult = await sendEmail({
      to: data.email,
      subject: "Vishnu Mandir – Facility request received",
      html: `
        <p>Dear ${data.contactName},</p>
        <p>Thank you for your facility rental request. We have received it and will contact you shortly.</p>
        <p>Transaction ID: <strong>${transactionId}</strong></p>
        <p>— Vishnu Mandir, Tampa</p>
      `,
      replyTo: adminTo || undefined,
    });

    if ("error" in confirmResult) {
      console.error("[api/v1/forms/facility-request] Confirmation email failed:", confirmResult.error);
    }

    return successResponse(
      {
        message: "Your facility request has been submitted successfully.",
        transactionId,
      },
      201
    );
  } catch (error) {
    console.error("[api/v1/forms/facility-request]", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
