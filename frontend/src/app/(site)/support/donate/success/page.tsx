import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | Vishnu Mandir, Tampa",
  description: "Thank you for your donation to Vishnu Mandir, Tampa.",
};

/**
 * Donation success page (Stripe return_url).
 */
export default function DonateSuccessPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto text-center">
        <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/30 inline-block mb-6">
          <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" aria-hidden />
        </div>
        <h1 className="font-display text-4xl font-bold text-text-primary mb-4">
          Thank you for your donation
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Your support helps Vishnu Mandir, Tampa serve the community. You will receive a confirmation email shortly.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Return to home
        </Link>
      </div>
    </main>
  );
}
