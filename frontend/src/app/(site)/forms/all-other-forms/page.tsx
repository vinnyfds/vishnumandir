import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { FileText, MoreHorizontal } from "lucide-react";

export const metadata: Metadata = {
  title: "Other Forms | Vishnu Mandir, Tampa - Additional Forms & Requests",
  description:
    "Access additional forms and requests for Vishnu Mandir, Tampa. Find forms for special requests, general inquiries, and other temple services.",
  keywords: [
    "temple forms Tampa",
    "additional temple requests",
    "Hindu temple forms",
  ],
  openGraph: {
    title: "Other Forms | Vishnu Mandir, Tampa",
    description: "Additional forms and requests for Vishnu Mandir, Tampa.",
    type: "website",
  },
};

/**
 * All Other Forms page.
 * @returns {JSX.Element} The rendered all other forms page
 */
export default function AllOtherFormsPage() {
  const structuredData = generateWebPageSchema({
    name: "Other Forms",
    description:
      "Additional forms and requests for Vishnu Mandir, Tampa",
    url: "/forms/all-other-forms",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Other Forms & Requests
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Access additional forms and requests.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <MoreHorizontal className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Additional Forms & Services
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                In addition to our main forms (puja sponsorships, facility
                requests, donation statements, etc.), Vishnu Mandir, Tampa may
                have other forms and request options available. This page serves
                as a hub for additional forms and special requests.
              </p>
              <p className="text-text-secondary leading-relaxed">
                If you don't see the form you need in our main forms section,
                check here for additional options. You can also contact us
                directly if you have a special request or need assistance with a
                specific form.
              </p>
            </div>
          </div>
        </section>

        {/* Available Forms */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Available Forms
          </h2>
          <div className="space-y-4">
            <div className="p-4 border-2 border-primary/5 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">
                General Inquiry Form
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                For general questions, information requests, or inquiries that
                don't fit into other specific form categories.
              </p>
              <button
                disabled
                className="text-primary font-medium opacity-50 cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
            <div className="p-4 border-2 border-primary/5 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">
                Special Request Form
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                For special requests, accommodations, or unique service needs not
                covered by standard forms.
              </p>
              <button
                disabled
                className="text-primary font-medium opacity-50 cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
            <div className="p-4 border-2 border-primary/5 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">
                Membership Form
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                For those interested in temple membership or becoming more
                involved with the community.
              </p>
              <button
                disabled
                className="text-primary font-medium opacity-50 cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </section>

        {/* Main Forms Link */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Main Forms
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            For our most commonly used forms, please visit our main forms page:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4 mb-6">
            <li>
              <Link href="/forms/puja-sponsorships" className="text-primary hover:text-primary/80">
                Puja Sponsorships
              </Link>
            </li>
            <li>
              <Link href="/forms/request-facility" className="text-primary hover:text-primary/80">
                Facility Rental Request
              </Link>
            </li>
            <li>
              <Link href="/forms/donation-statement" className="text-primary hover:text-primary/80">
                Donation Statement Request
              </Link>
            </li>
            <li>
              <Link href="/forms/change-of-address" className="text-primary hover:text-primary/80">
                Change of Address
              </Link>
            </li>
            <li>
              <Link href="/forms/email-subscription" className="text-primary hover:text-primary/80">
                Email Subscription
              </Link>
            </li>
          </ul>
          <Link
            href="/forms"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            View All Forms
          </Link>
        </section>

        {/* Contact */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Need a Different Form?
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            If you need a form that's not listed here, or have questions about
            available forms and services, please don't hesitate to contact us.
            We're here to help and can assist with special requests or provide
            guidance on which form to use.
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
