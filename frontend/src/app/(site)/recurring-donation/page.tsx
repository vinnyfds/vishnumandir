import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Heart, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Recurring Donations | Vishnu Mandir, Tampa - Monthly & Annual Giving",
  description:
    "Set up recurring donations to support Vishnu Mandir, Tampa on a regular basis. Choose monthly, quarterly, or annual donations to help sustain temple operations and programs.",
  keywords: [
    "recurring donation temple",
    "monthly donation Tampa",
    "temple recurring giving",
    "sustaining donation",
  ],
  openGraph: {
    title: "Recurring Donations | Vishnu Mandir, Tampa",
    description: "Set up recurring donations to support the temple on a regular basis.",
    type: "website",
  },
};

/**
 * Recurring Donation page - Set up recurring donations.
 * @returns {JSX.Element} The rendered recurring donation page
 */
export default function RecurringDonationPage() {
  const structuredData = generateWebPageSchema({
    name: "Recurring Donations",
    description:
      "Set up recurring donations for Vishnu Mandir, Tampa",
    url: "/recurring-donation",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Recurring Donations
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Set up a recurring donation to support Vishnu Mandir, Tampa on a regular
          basis.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Sustaining Support for the Temple
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Recurring donations provide consistent, reliable support for
                Vishnu Mandir, Tampa, helping us maintain our facilities, support
                our programs, and serve the community. By setting up a recurring
                donation, you make a meaningful commitment to the temple's mission
                and ensure your support continues automatically.
              </p>
              <p className="text-text-secondary leading-relaxed">
                You can choose to donate monthly, quarterly, or annually. All
                recurring donations are tax-deductible, and you'll receive annual
                donation statements for your records.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Benefits of Recurring Donations
          </h2>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
            <li>Convenient automatic payments - set it and forget it</li>
            <li>Consistent support for temple operations and programs</li>
            <li>Tax-deductible contributions with annual statements</li>
            <li>Flexible frequency - monthly, quarterly, or annual</li>
            <li>Easy to modify or cancel anytime</li>
            <li>Secure payment processing</li>
          </ul>
        </section>

        {/* Donation Options */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Set Up Your Recurring Donation
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 border-2 border-primary/5 rounded-lg text-center">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-text-primary mb-2">Monthly</h3>
              <p className="text-text-secondary text-sm">
                Automatic monthly donations for consistent support throughout the
                year.
              </p>
            </div>
            <div className="p-6 border-2 border-primary/5 rounded-lg text-center">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-text-primary mb-2">Quarterly</h3>
              <p className="text-text-secondary text-sm">
                Donations every three months for regular but less frequent giving.
              </p>
            </div>
            <div className="p-6 border-2 border-primary/5 rounded-lg text-center">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-text-primary mb-2">Annual</h3>
              <p className="text-text-secondary text-sm">
                Once-yearly donation for annual support commitment.
              </p>
            </div>
          </div>
          <Link
            href="/support/donate"
            className="inline-block w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
          >
            Set Up Recurring Donation
          </Link>
          <p className="text-sm text-text-secondary mt-4 text-center">
            You'll be able to select your donation amount and frequency on the
            donation page.
          </p>
        </section>

        {/* Additional Information */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Managing Your Recurring Donation
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Once you set up a recurring donation, you can:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4 mb-6">
            <li>Modify your donation amount or frequency anytime</li>
            <li>Pause your recurring donation temporarily</li>
            <li>Cancel your recurring donation if needed</li>
            <li>View your donation history and statements</li>
            <li>Update your payment method</li>
          </ul>
          <p className="text-text-secondary leading-relaxed">
            For assistance with recurring donations or to make changes, please{" "}
            <Link href="/about/contact" className="text-primary hover:text-primary/80">
              contact us
            </Link>{" "}
            or call (813) 269-7262.
          </p>
        </section>
      </main>
    </>
  );
}
