import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Heart } from "lucide-react";
import { DonateForm } from "@/components/forms/DonateForm";
import { ZeffyButton } from "@/components/ui/ZeffyButton";

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
 * Donate page – donations via Zeffy
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
                Make a Donation
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Your generosity helps us maintain the temple, support programs, and serve the community.
                All donations are tax-deductible. Choose one-time or recurring donations using the button below.
              </p>
            </div>
          </div>
          <ZeffyButton
            formLink="https://www.zeffy.com/embed/donation-form/monthly-donor-4?modal=true"
            className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center gap-2"
          >
            <Heart className="w-5 h-5" />
            Donate Now
          </ZeffyButton>
        </section>

        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            About Your Donation
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            When you click the donation button above, you&apos;ll be taken to our secure donation platform where you can:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4 mb-6">
            <li>Make a one-time donation of any amount</li>
            <li>Set up monthly, quarterly, or annual recurring donations</li>
            <li>Choose to remain anonymous or share your information</li>
            <li>Receive a tax receipt for your donation</li>
          </ul>
          <p className="text-text-secondary leading-relaxed">
            All donations go directly toward maintaining our sacred space, supporting community programs,
            and serving the Hindu community in Tampa Bay.
          </p>
        </section>
      </main>
    </>
  );
}
