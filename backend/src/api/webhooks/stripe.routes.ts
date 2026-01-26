import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../../utils/stripe.client";
import { prisma } from "../../utils/prisma.client";
import { sendEmail } from "../../services/email.service";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const adminTo = process.env.ADMIN_EMAIL_ADDRESS;

/**
 * POST /webhooks/stripe
 * Raw body required. Verifies signature, handles payment_intent.succeeded and invoice.paid,
 * creates Donation, sends receipt + admin notification.
 */
export async function handleStripeWebhook(req: Request, res: Response): Promise<void> {
  const rawBody = req.body;
  if (!rawBody || !Buffer.isBuffer(rawBody)) {
    res.status(400).json({ status: "error", message: "Missing raw body" });
    return;
  }

  const sig = req.headers["stripe-signature"];
  if (!sig || typeof sig !== "string") {
    res.status(400).json({ status: "error", message: "Missing Stripe signature" });
    return;
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Invalid signature";
    res.status(400).json({ status: "error", message: msg });
    return;
  }

  try {
    if (event.type === "payment_intent.succeeded") {
      const pi = event.data.object as Stripe.PaymentIntent;
      if (pi.invoice) {
        res.status(200).json({ received: true });
        return;
      }
      const amount = pi.amount;
      const donorEmail = (pi.metadata?.donorEmail as string)?.trim() || "donor@unknown";
      const donorName = (pi.metadata?.donorName as string)?.trim() || "Donor";
      const paymentId = pi.id;

      const existing = await prisma.donation.findUnique({ where: { stripePaymentId: paymentId } });
      if (existing) {
        res.status(200).json({ received: true });
        return;
      }

      await prisma.donation.create({
        data: {
          amount,
          donorName,
          donorEmail,
          frequency: "ONE_TIME",
          stripePaymentId: paymentId,
          status: "succeeded",
        },
      });

      if (donorEmail !== "donor@unknown") {
        await sendEmail({
          to: donorEmail,
          subject: "Vishnu Mandir – Thank you for your donation",
          html: `<p>Dear ${donorName},</p><p>Thank you for your donation of $${(amount / 100).toFixed(2)}. We appreciate your support.</p><p>— Vishnu Mandir, Tampa</p>`,
        });
      }
      if (adminTo) {
        await sendEmail({
          to: adminTo,
          subject: `[Vishnu Mandir] New one-time donation: $${(amount / 100).toFixed(2)}`,
          html: `<p>Donation received from ${donorName} (${donorEmail}). Amount: $${(amount / 100).toFixed(2)}.</p>`,
        });
      }
    } else if (event.type === "invoice.paid") {
      const inv = event.data.object as Stripe.Invoice;
      const subId = inv.subscription as string | null;
      const customerId = inv.customer as string | null;
      if (!subId || !customerId) {
        res.status(200).json({ received: true });
        return;
      }

      const amount = inv.amount_paid;
      let donorEmail = "donor@unknown";
      let donorName = "Donor";
      try {
        const customer = await stripe.customers.retrieve(customerId);
        if (!customer.deleted && customer.email) donorEmail = customer.email;
        if (!customer.deleted && customer.name) donorName = customer.name;
      } catch {
        /* ignore */
      }

      const paymentId = inv.payment_intent as string | null;
      const existing = paymentId
        ? await prisma.donation.findUnique({ where: { stripePaymentId: paymentId } })
        : null;
      if (existing) {
        res.status(200).json({ received: true });
        return;
      }
      if (!paymentId) {
        res.status(200).json({ received: true });
        return;
      }
      await prisma.donation.create({
        data: {
          amount,
          donorName,
          donorEmail,
          frequency: "MONTHLY",
          stripePaymentId: paymentId,
          stripeCustomerId: customerId,
          stripeSubscriptionId: subId,
          status: "succeeded",
        },
      });

      if (donorEmail !== "donor@unknown") {
        await sendEmail({
          to: donorEmail,
          subject: "Vishnu Mandir – Recurring donation received",
          html: `<p>Dear ${donorName},</p><p>Thank you for your recurring donation of $${(amount / 100).toFixed(2)}. We appreciate your support.</p><p>— Vishnu Mandir, Tampa</p>`,
        });
      }
      if (adminTo) {
        await sendEmail({
          to: adminTo,
          subject: `[Vishnu Mandir] Recurring donation: $${(amount / 100).toFixed(2)}`,
          html: `<p>Recurring donation from ${donorName} (${donorEmail}). Amount: $${(amount / 100).toFixed(2)}. Subscription: ${subId}.</p>`,
        });
      }
    }
  } catch (e) {
    console.error("[webhooks.stripe]", e);
    res.status(500).json({ status: "error", message: "Webhook handler failed" });
    return;
  }

  res.status(200).json({ received: true });
}
