import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Heart, Gift, Users, FileText, ArrowRight } from "lucide-react";
import { ZeffyButton } from "@/components/ui/ZeffyButton";

export const metadata: Metadata = {
  title: "Support | Vishnu Mandir, Tampa - Ways to Support the Temple",
  description:
    "Support Vishnu Mandir, Tampa through donations, sponsorships, memberships, and volunteering. Help us serve and strengthen the Hindu community.",
  keywords: [
    "donate temple Tampa",
    "support Hindu temple",
    "puja sponsorship",
    "temple membership",
    "volunteer temple",
  ],
  openGraph: {
    title: "Support | Vishnu Mandir, Tampa",
    description: "Multiple ways to support Vishnu Mandir, Tampa and the community.",
    type: "website",
  },
};

/**
 * Support hub page - Ways to support the temple including donations, sponsorships, and memberships.
 * @returns {JSX.Element} The rendered support page
 */
export default function SupportPage() {
  const structuredData = generateWebPageSchema({
    name: "Support",
    description: "Ways to support Vishnu Mandir, Tampa",
    url: "/support",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Support Vishnu Mandir, Tampa
        </h1>
        <p className="text-xl text-text-secondary mb-12 font-serif max-w-3xl">
          Your support helps us maintain our sacred space, sustain our programs, and strengthen
          our community. Whether through donations, sponsorships, or membership, every contribution
          makes a meaningful difference.
        </p>

        {/* Support Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Donations */}
          <Link
            href="/support/donate"
            className="group bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-primary/10 rounded-full text-primary">
                <Heart className="w-8 h-8" />
              </div>
              <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-3">
              Make a Donation
            </h2>
            <p className="text-text-secondary mb-4">
              Support the temple with one-time or recurring donations. All contributions are
              tax-deductible and directly support our mission.
            </p>
            <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
              Donate Now
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Recurring Donations */}
          <Link
            href="/recurring-donation"
            className="group bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-secondary/10 rounded-full text-secondary">
                <Gift className="w-8 h-8" />
              </div>
              <ArrowRight className="w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-3">
              Recurring Donations
            </h2>
            <p className="text-text-secondary mb-4">
              Set up monthly or annual donations to provide consistent support for the temple's
              ongoing operations and programs.
            </p>
            <span className="inline-flex items-center gap-2 text-secondary font-semibold group-hover:gap-3 transition-all">
              Set Up Recurring
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Puja Sponsorship */}
          <Link
            href="/online-puja"
            className="group bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-accent/10 rounded-full text-accent">
                <FileText className="w-8 h-8" />
              </div>
              <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-3">
              Sponsor a Puja
            </h2>
            <p className="text-text-secondary mb-4">
              Sponsor a puja for your family, special occasions, or in memory of loved ones. A
              meaningful way to celebrate and honor traditions.
            </p>
            <span className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
              Sponsor Puja
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Membership */}
          <div className="group bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer">
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-text-primary/10 rounded-full text-text-primary">
                <Users className="w-8 h-8" />
              </div>
              <ArrowRight className="w-5 h-5 text-text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-3">
              Become a Member
            </h2>
            <p className="text-text-secondary mb-4">
              Join our temple community as a member and enjoy exclusive benefits, priority event
              access, and deeper spiritual engagement.
            </p>
            <ZeffyButton
              formLink="https://www.zeffy.com/embed/ticketing/vishnu-mandir-memberships?modal=true"
              className="inline-flex items-center gap-2 text-text-primary font-semibold group-hover:gap-3 transition-all hover:text-primary"
            >
              Join Now
              <ArrowRight className="w-4 h-4" />
            </ZeffyButton>
          </div>
        </div>

        {/* Additional Ways to Support */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Other Ways to Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-2">Volunteer</h3>
              <p className="text-text-secondary mb-4">
                Give your time and talents to support temple operations and community service.
              </p>
              <Link
                href="/about/volunteer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">Request Donation Statement</h3>
              <p className="text-text-secondary mb-4">
                Access your donation records for tax purposes. Submit a request for your donation
                statement.
              </p>
              <Link
                href="/forms/donation-statement"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Request Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Your Support Matters */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Why Your Support Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-primary/10">
              <div className="text-3xl font-bold text-primary mb-2">Daily</div>
              <h3 className="font-semibold text-text-primary mb-2">Puja Services</h3>
              <p className="text-text-secondary text-sm">
                Your donations support daily puja services and maintain our sacred spaces for
                spiritual practice.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-primary/10">
              <div className="text-3xl font-bold text-secondary mb-2">Community</div>
              <h3 className="font-semibold text-text-primary mb-2">Programs</h3>
              <p className="text-text-secondary text-sm">
                Support educational classes, cultural events, and community gatherings that enrich
                our temple family.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-primary/10">
              <div className="text-3xl font-bold text-accent mb-2">Spiritual</div>
              <h3 className="font-semibold text-text-primary mb-2">Growth</h3>
              <p className="text-text-secondary text-sm">
                Help us maintain and expand services that foster spiritual development for all
                ages.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
