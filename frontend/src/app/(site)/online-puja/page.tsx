import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Sparkles, Calendar, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Online Puja Sponsorship | Vishnu Mandir, Tampa - Sponsor Puja Online",
  description:
    "Sponsor a puja online at Vishnu Mandir, Tampa. Easily select a puja service, choose your date, and complete your sponsorship from the comfort of your home.",
  keywords: [
    "online puja sponsorship",
    "sponsor puja online",
    "Hindu puja booking",
    "Tampa temple puja online",
  ],
  openGraph: {
    title: "Online Puja Sponsorship | Vishnu Mandir, Tampa",
    description: "Sponsor a puja online for your family or special occasion.",
    type: "website",
  },
};

/**
 * Online Puja page - Sponsor a puja online.
 * @returns {JSX.Element} The rendered online puja page
 */
export default function OnlinePujaPage() {
  const structuredData = generateWebPageSchema({
    name: "Online Puja Sponsorship",
    description:
      "Sponsor a puja online at Vishnu Mandir, Tampa",
    url: "/online-puja",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Online Puja Sponsorship
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Sponsor a puja online for your family or special occasion.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Convenient Online Puja Sponsorship
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Sponsor a puja at Vishnu Mandir, Tampa easily from the comfort of
                your home. Our online puja sponsorship form makes it simple to
                select a puja service, choose your preferred date and time, and
                complete your sponsorship request.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Whether you're seeking blessings for a special occasion,
                celebrating a milestone, or fulfilling a spiritual wish, our
                experienced priests will perform the puja with devotion and
                authenticity. Services can be performed at the temple or at your
                location.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            How Online Puja Sponsorship Works
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  Select Your Puja
                </h3>
                <p className="text-text-secondary text-sm">
                  Choose from our catalog of puja services including daily Aarti,
                  special deity pujas, Havans, and life-cycle ceremonies.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  Choose Date & Location
                </h3>
                <p className="text-text-secondary text-sm">
                  Select your preferred date and time, and choose whether the puja
                  should be performed at the temple or at your location.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  Submit Request
                </h3>
                <p className="text-text-secondary text-sm">
                  Fill out the sponsorship form with your details and any special
                  requests. We'll review and confirm your booking.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  Confirmation
                </h3>
                <p className="text-text-secondary text-sm">
                  Receive confirmation with all details, pricing, and any required
                  materials. Complete payment to finalize your sponsorship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5 mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Ready to Sponsor a Puja?
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Use our convenient online form to sponsor a puja. The process is
            simple, secure, and you'll receive prompt confirmation of your
            request.
          </p>
          <Link
            href="/forms/puja-sponsorships"
            className="inline-block px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center text-lg"
          >
            Sponsor a Puja Online
          </Link>
        </section>

        {/* Additional Information */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Learn More About Puja Services
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Before sponsoring a puja, you may want to learn more about our
            available services, pricing, and what to expect.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/religious/puja-services"
              className="p-4 border-2 border-primary/5 rounded-lg hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-text-primary">
                  Puja Services Catalog
                </h3>
              </div>
              <p className="text-text-secondary text-sm">
                Browse our complete catalog of available puja services with
                descriptions and information.
              </p>
            </Link>
            <Link
              href="/about/contact"
              className="p-4 border-2 border-primary/5 rounded-lg hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-text-primary">
                  Contact Us
                </h3>
              </div>
              <p className="text-text-secondary text-sm">
                Have questions? Contact us for assistance with puja sponsorship
                or to discuss your needs.
              </p>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
