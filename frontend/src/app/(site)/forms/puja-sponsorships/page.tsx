import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Sparkles } from "lucide-react";
import { PujaSponsorshipForm } from "@/components/forms/PujaSponsorshipForm";

export const metadata: Metadata = {
  title: "Puja Sponsorship | Vishnu Mandir, Tampa - Sponsor a Puja Online",
  description:
    "Sponsor a puja at Vishnu Mandir, Tampa for your family or special occasion. Choose from various puja services, select date and time, and complete your sponsorship online.",
  keywords: [
    "sponsor puja Tampa",
    "puja sponsorship form",
    "Hindu puja booking",
    "Tampa temple puja",
    "online puja sponsorship",
  ],
  openGraph: {
    title: "Puja Sponsorship | Vishnu Mandir, Tampa",
    description: "Sponsor a puja for your family or special occasion.",
    type: "website",
  },
};

/**
 * Puja Sponsorships form page.
 * @returns {JSX.Element} The rendered puja sponsorships page
 */
export default function PujaSponsorshipsPage() {
  const structuredData = generateWebPageSchema({
    name: "Puja Sponsorship",
    description:
      "Puja sponsorship form for Vishnu Mandir, Tampa",
    url: "/forms/puja-sponsorships",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Puja Sponsorship
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Sponsor a puja for your family or special occasion.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Sponsor a Sacred Puja
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Sponsoring a puja at Vishnu Mandir, Tampa is a meaningful way to
                seek divine blessings for your family, celebrate special
                occasions, or fulfill spiritual wishes. Our experienced priests
                will perform the puja with devotion and authenticity.
              </p>
              <p className="text-text-secondary leading-relaxed">
                You can choose from various puja services including daily Aarti,
                special deity pujas, Havans, life-cycle ceremonies, and more.
                Services can be performed at the temple or at your location
                (off-site).
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Puja Sponsorship Form
          </h2>
          <PujaSponsorshipForm />
          <p className="text-sm text-text-secondary mt-4">
            For immediate assistance, call (813) 269-7262 or email info@vishnumandirtampa.com.
          </p>
        </section>

        {/* Additional Information */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            What Happens Next?
          </h2>
          <div className="space-y-3 text-text-secondary">
            <p>
              After submitting your puja sponsorship request, our team will:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Review your request and check availability</li>
              <li>Contact you to confirm details and discuss pricing</li>
              <li>Provide information about required materials (if any)</li>
              <li>Confirm the final date, time, and location</li>
              <li>Send you a confirmation with all details</li>
            </ol>
            <p className="mt-4">
              For questions or to discuss your puja needs, please{" "}
              <Link href="/about/contact" className="text-primary hover:text-primary/80">
                contact us
              </Link>{" "}
              or visit our{" "}
              <Link href="/religious/puja-services" className="text-primary hover:text-primary/80">
                puja services page
              </Link>{" "}
              to learn more about available services.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
