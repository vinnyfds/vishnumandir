"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { postJson } from "@/lib/api";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);
    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${typeof window !== "undefined" ? window.location.origin : ""}/support/donate/success`,
      },
    });
    setLoading(false);
    if (submitError) {
      setError(submitError.message || "Payment failed.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {error && (
        <div className="p-4 rounded-lg bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300" role="alert">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70"
      >
        {loading ? "Processing…" : `Donate $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
}

/**
 * One-time donation form. Fetches Payment Intent from API, renders Stripe Elements.
 */
export function DonateForm() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [amount, setAmount] = useState(5000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [donorEmail, setDonorEmail] = useState("");
  const [donorName, setDonorName] = useState("");

  async function handleCreateIntent(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await postJson<{ clientSecret: string }>("/payments/donation-intent", {
      amount,
      currency: "usd",
      ...(donorEmail && { donorEmail }),
      ...(donorName && { donorName }),
    });
    setLoading(false);
    if (result.ok) {
      setClientSecret(result.data.clientSecret);
    } else {
      setError(result.error.message || "Failed to create donation.");
    }
  }

  if (clientSecret) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" } }}>
        <CheckoutForm amount={amount} />
      </Elements>
    );
  }

  return (
    <form onSubmit={handleCreateIntent} className="space-y-6">
      <div>
        <label htmlFor="donate-amount" className="block text-sm font-medium text-text-primary mb-2">
          Amount (USD) <span className="text-primary">*</span>
        </label>
        <select
          id="donate-amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value={1000}>$10</option>
          <option value={2500}>$25</option>
          <option value={5000}>$50</option>
          <option value={10000}>$100</option>
          <option value={25000}>$250</option>
          <option value={50000}>$500</option>
          <option value={100000}>$1,000</option>
        </select>
      </div>
      <div>
        <label htmlFor="donate-name" className="block text-sm font-medium text-text-primary mb-2">
          Your name (optional, for receipt)
        </label>
        <input
          type="text"
          id="donate-name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Your full name"
        />
      </div>
      <div>
        <label htmlFor="donate-email" className="block text-sm font-medium text-text-primary mb-2">
          Email (optional, for receipt)
        </label>
        <input
          type="email"
          id="donate-email"
          value={donorEmail}
          onChange={(e) => setDonorEmail(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="your.email@example.com"
        />
      </div>
      {error && (
        <div className="p-4 rounded-lg bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300" role="alert">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70"
      >
        {loading ? "Preparing…" : "Continue to payment"}
      </button>
    </form>
  );
}
