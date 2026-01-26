import { z } from "zod";

/**
 * One-time donation Payment Intent request.
 * @see docs/architecture/api-contracts.md DonationIntentRequest
 */
export const donationIntentSchema = z.object({
  amount: z.coerce.number().int().min(100, "Minimum donation is $1.00 (100 cents)"),
  currency: z.string().length(3).default("usd"),
  donorEmail: z.string().email().optional(),
  donorName: z.string().min(1).optional(),
});

export type DonationIntentInput = z.infer<typeof donationIntentSchema>;

/**
 * Recurring donation Subscription request.
 * @see docs/architecture/api-contracts.md SubscriptionRequest
 */
export const subscriptionSchema = z.object({
  planId: z.string().min(1, "Plan ID is required").trim(),
  email: z.string().email("Invalid email address").trim(),
  name: z.string().min(1, "Name is required").trim(),
});

export type SubscriptionInput = z.infer<typeof subscriptionSchema>;
