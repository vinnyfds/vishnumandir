import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { FileText, Sparkles, Building, Receipt, Mail, MapPin, MoreHorizontal } from "lucide-react";

export const metadata: Metadata = {
  title: "Forms | Vishnu Mandir, Tampa - Puja Sponsorships, Facility Requests & More",
  description:
    "Access all temple forms at Vishnu Mandir, Tampa including puja sponsorships, facility rental requests, donation statements, and contact updates.",
  keywords: [
    "Vishnu Mandir forms",
    "puja sponsorship form",
    "temple facility rental",
    "donation statement request",
    "Tampa temple forms",
  ],
  openGraph: {
    title: "Forms | Vishnu Mandir, Tampa",
    description: "Access all temple forms including puja sponsorships, facility requests, and more.",
    type: "website",
  },
};

/**
 * Forms section hub page.
 * @returns {JSX.Element} The rendered forms hub page
 */
export default function FormsPage() {
  const structuredData = generateWebPageSchema({
    name: "Forms",
    description:
      "Temple forms and requests at Vishnu Mandir, Tampa",
    url: "/forms",
  });

  const forms = [
    {
      name: "Puja Sponsorships",
      description: "Sponsor a puja for your family or special occasion",
      href: "/forms/puja-sponsorships",
      icon: Sparkles,
    },
    {
      name: "Request Facility",
      description: "Request facility rental for your event or occasion",
      href: "/forms/request-facility",
      icon: Building,
    },
    {
      name: "Donation Statement",
      description: "Request donation statements for tax purposes",
      href: "/forms/donation-statement",
      icon: Receipt,
    },
    {
      name: "Change of Address",
      description: "Update your contact information with the temple",
      href: "/forms/change-of-address",
      icon: MapPin,
    },
    {
      name: "Email Subscription",
      description: "Manage email subscriptions for newsletters and updates",
      href: "/forms/email-subscription",
      icon: Mail,
    },
    {
      name: "All Other Forms",
      description: "Additional forms and requests",
      href: "/forms/all-other-forms",
      icon: MoreHorizontal,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Temple Forms
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Access all temple forms including puja sponsorships, facility requests,
          and more.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Easy Online Forms
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Vishnu Mandir, Tampa provides convenient online forms to help you
                interact with the temple easily. Whether you want to sponsor a
                puja, request facility rental, update your contact information, or
                access donation statements, our forms make it simple.
              </p>
              <p className="text-text-secondary leading-relaxed">
                All forms are secure and your information is handled with
                confidentiality. After submission, you'll receive confirmation and
                our team will process your request promptly.
              </p>
            </div>
          </div>
        </section>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {forms.map((form, index) => {
            const Icon = form.icon;
            return (
              <Link
                key={index}
                href={form.href}
                className="group bg-white rounded-xl shadow-md p-6 border-2 border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                  {form.name}
                </h2>
                <p className="text-text-secondary mb-4">{form.description}</p>
                <span className="text-primary font-medium group-hover:underline">
                  Access Form →
                </span>
              </Link>
            );
          })}
        </div>

        {/* Additional Information */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Need Help?
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            If you have questions about any form or need assistance with
            submission, please don't hesitate to contact us. We're here to help
            make the process as smooth as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/about/contact"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
            >
              Contact Us
            </Link>
            <a
              href="tel:+18132697262"
              className="inline-block px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors text-center"
            >
              Call (813) 269-7262
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
