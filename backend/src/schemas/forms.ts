import { z } from "zod";

/**
 * Sponsorship form fields (from multipart form or JSON).
 * @see docs/architecture/api-contracts.md SponsorshipRequest
 */
export const sponsorshipSchema = z.object({
  devoteeName: z.string().min(1, "Full name is required").trim(),
  email: z.string().email("Invalid email address").trim(),
  phone: z.string().min(1, "Phone is required").trim(),
  pujaId: z.string().min(1, "Puja selection is required").trim(),
  sponsorshipDate: z.string().min(1, "Preferred date is required"),
  specialInstructions: z.string().optional(),
  additionalNotes: z.string().optional(),
  location: z.string().optional(),
});

export type SponsorshipInput = z.infer<typeof sponsorshipSchema>;

/**
 * Facility request body (JSON).
 * @see docs/architecture/api-contracts.md FacilityRequest
 */
export const facilityRequestSchema = z.object({
  contactName: z.string().min(1, "Contact name is required").trim(),
  email: z.string().email("Invalid email address").trim(),
  phone: z.string().min(1, "Phone is required").trim(),
  eventType: z.string().min(1, "Event type is required").trim(),
  requestedDate: z.string().min(1, "Requested date is required"),
  numberOfGuests: z.coerce.number().int().min(1, "At least 1 guest required"),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  details: z.string().optional(),
  requirements: z.string().optional(),
});

export type FacilityRequestInput = z.infer<typeof facilityRequestSchema>;
