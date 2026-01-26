import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Heart } from "lucide-react";
import { DonateForm } from "@/components/forms/DonateForm";

export const metadata: Metadata = {
  title: "Donate | Vishnu Mandir, Tampa - Support the Temple",
  description:
    "Donate to Vishnu Mandir, Tampa. One-time or recurring donations help sustain our temple, programs, and community services.",
  keywords: ["donate temple Tampa", "Vishnu Mandir donation", "temple support", "Hindu temple donate"],
  openGraph: {
    title: "Donate | Vishnu Mandir, Tampa",
    description: "Support Vishnu Mandir, Tampa with your donation.",
    type: "website",
  },
};

/**
 * Donate page – one-time donation via Stripe, link to recurring.
 */
export default function DonatePage() {
  const structuredData = generateWebPageSchema({
    name: "Donate",
    description: "Donate to Vishnu Mandir, Tampa",
    url: "/support/donate",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Donate
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Support Vishnu Mandir, Tampa with a one-time or recurring donation.
        </p>

        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                One-Time Donation
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Your generosity helps us maintain the temple, support programs, and serve the community.
                All donations are tax-deductible.
              </p>
            </div>
          </div>
          <DonateForm />
        </section>

        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Recurring Donations
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Set up monthly, quarterly, or annual giving for sustained support.
          </p>
          <Link
            href="/recurring-donation"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Set up recurring donation
          </Link>
        </section>
      </main>
    </>
  );
}
