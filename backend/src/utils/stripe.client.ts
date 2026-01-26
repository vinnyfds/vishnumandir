import Stripe from "stripe";

const apiVersion = process.env.STRIPE_API_VERSION || "2024-11-20.acacia";

/**
 * Stripe client singleton.
 * Uses STRIPE_SECRET_KEY and STRIPE_API_VERSION from env.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: apiVersion as Stripe.LatestApiVersion,
  typescript: true,
});
