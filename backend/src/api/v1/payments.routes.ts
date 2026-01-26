import { Request, Response, Router } from "express";
import { stripe } from "../../utils/stripe.client";
import { success, error as errorResponse, zodIssuesToContractErrors } from "../../utils/responses";
import { donationIntentSchema, subscriptionSchema } from "../../schemas/payments";

const router = Router();

/**
 * POST /api/v1/payments/donation-intent
 * Creates a Stripe Payment Intent for one-time donation. Returns clientSecret only.
 */
router.post("/donation-intent", async (req: Request, res: Response, next: (err?: unknown) => void) => {
  try {
    const parsed = donationIntentSchema.safeParse(req.body);
    if (!parsed.success) {
      const errs = zodIssuesToContractErrors(parsed.error.issues);
      return errorResponse(res, "Validation failed", 400, errs);
    }
    const { amount, currency } = parsed.data;

    const metadata: Record<string, string> = {};
    if (parsed.data.donorEmail) metadata.donorEmail = parsed.data.donorEmail;
    if (parsed.data.donorName) metadata.donorName = parsed.data.donorName;

    const pi = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: Object.keys(metadata).length ? metadata : undefined,
    });

    const clientSecret = pi.client_secret;
    if (!clientSecret) {
      return errorResponse(res, "Failed to create payment intent", 500);
    }
    return res.status(200).json({ clientSecret });
  } catch (e) {
    console.error("[payments.donation-intent]", e);
    next(e);
  }
});

/**
 * POST /api/v1/payments/subscription
 * Creates Stripe Customer + Subscription for recurring donation. Returns subscriptionId and clientSecret.
 */
router.post("/subscription", async (req: Request, res: Response, next: (err?: unknown) => void) => {
  try {
    const parsed = subscriptionSchema.safeParse(req.body);
    if (!parsed.success) {
      const errs = zodIssuesToContractErrors(parsed.error.issues);
      return errorResponse(res, "Validation failed", 400, errs);
    }
    const { planId, email, name } = parsed.data;

    const customers = await stripe.customers.list({ email, limit: 1 });
    let customerId: string;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      const customer = await stripe.customers.create({ email, name });
      customerId = customer.id;
    }

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: planId }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    const latestInvoice = subscription.latest_invoice;
    const invoice = typeof latestInvoice === "object" && latestInvoice?.object === "invoice"
      ? latestInvoice
      : latestInvoice
        ? await stripe.invoices.retrieve(latestInvoice as string, { expand: ["payment_intent"] })
        : null;
    const paymentIntent = invoice?.payment_intent;
    const pi = typeof paymentIntent === "object" && paymentIntent?.object === "payment_intent"
      ? paymentIntent
      : paymentIntent
        ? await stripe.paymentIntents.retrieve(paymentIntent as string)
        : null;
    const clientSecret = pi?.client_secret;
    if (!clientSecret) {
      return errorResponse(res, "Failed to create subscription payment", 500);
    }

    return res.status(201).json({
      subscriptionId: subscription.id,
      clientSecret,
    });
  } catch (e) {
    console.error("[payments.subscription]", e);
    next(e);
  }
});

export { router as paymentsRoutes };
