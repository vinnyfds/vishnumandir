import { z } from "zod";

export const donationStatementSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.string().email("Invalid email").trim(),
  period: z.enum(["current-year", "previous-year", "custom"]),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  delivery: z.enum(["email", "mail"]),
  address: z.string().optional(),
});

export const changeOfAddressSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.string().email("Invalid email").trim(),
  phone: z.string().optional(),
  newAddress: z.string().min(1, "New address is required").trim(),
});

export const emailSubscriptionSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.string().email("Invalid email").trim(),
  subscribe: z.boolean().optional(),
});

export type DonationStatementInput = z.infer<typeof donationStatementSchema>;
export type ChangeOfAddressInput = z.infer<typeof changeOfAddressSchema>;
export type EmailSubscriptionInput = z.infer<typeof emailSubscriptionSchema>;
