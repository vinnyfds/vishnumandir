import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Building } from "lucide-react";
import { FacilityRequestForm } from "@/components/forms/FacilityRequestForm";

export const metadata: Metadata = {
  title: "Facility Rental Request | Vishnu Mandir, Tampa - Rent Temple Facility",
  description:
    "Request facility rental at Vishnu Mandir, Tampa for your event or occasion. Submit your facility request form with event details, date, and requirements.",
  keywords: [
    "temple facility rental Tampa",
    "Hindu temple event space",
    "Tampa temple rental",
    "facility request form",
  ],
  openGraph: {
    title: "Facility Rental Request | Vishnu Mandir, Tampa",
    description: "Request facility rental for your event or occasion.",
    type: "website",
  },
};

/**
 * Request Facility form page.
 * @returns {JSX.Element} The rendered request facility page
 */
export default function RequestFacilityPage() {
  const structuredData = generateWebPageSchema({
    name: "Facility Rental Request",
    description:
      "Facility rental request form for Vishnu Mandir, Tampa",
    url: "/forms/request-facility",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Request Facility Rental
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Request facility rental for your event or occasion.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Rent Our Facility
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Vishnu Mandir, Tampa offers facility rental for appropriate
                events and occasions. Our facility can accommodate various types
                of events including religious ceremonies, cultural programs,
                community gatherings, and educational activities.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Please submit your facility request with all necessary details.
                We&apos;ll review your request and contact you regarding availability,
                pricing, and any special requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Facility Rental Request Form
          </h2>
          <FacilityRequestForm />
          <p className="text-sm text-text-secondary mt-4">
            For immediate assistance, call (813) 269-7262 or email sakeemj@live.com.
          </p>
        </section>

        {/* Additional Information */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Facility Rental Information
          </h2>
          <div className="space-y-4 text-text-secondary">
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Review Process
              </h3>
              <p className="text-sm leading-relaxed">
                After submitting your request, we&apos;ll review it and contact you
                within a few business days to discuss availability, pricing, and
                any special arrangements needed for your event.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Event Guidelines
              </h3>
              <p className="text-sm leading-relaxed">
                Events must be appropriate for a temple setting and align with
                our values and community standards. We&apos;ll discuss specific
                guidelines when we contact you about your request.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Questions?
              </h3>
              <p className="text-sm leading-relaxed">
                If you have questions about facility rental or need to discuss
                your event before submitting a form, please{" "}
                <Link href="/about/contact" className="text-primary hover:text-primary/80">
                  contact us
                </Link>{" "}
                directly.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
