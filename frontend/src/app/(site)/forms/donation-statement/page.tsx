import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Receipt } from "lucide-react";
import { DonationStatementForm } from "@/components/forms/DonationStatementForm";

export const metadata: Metadata = {
  title: "Donation Statement Request | Vishnu Mandir, Tampa - Tax Receipts",
  description:
    "Request your donation statement from Vishnu Mandir, Tampa for tax purposes. Get official receipts for your charitable contributions to the temple.",
  keywords: [
    "donation statement Tampa",
    "temple tax receipt",
    "charitable donation receipt",
    "tax deduction statement",
  ],
  openGraph: {
    title: "Donation Statement Request | Vishnu Mandir, Tampa",
    description: "Request donation statements for tax purposes.",
    type: "website",
  },
};

/**
 * Donation Statement form page.
 * @returns {JSX.Element} The rendered donation statement page
 */
export default function DonationStatementPage() {
  const structuredData = generateWebPageSchema({
    name: "Donation Statement Request",
    description:
      "Request donation statements for tax purposes from Vishnu Mandir, Tampa",
    url: "/forms/donation-statement",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Donation Statement Request
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Request your donation statement for tax purposes.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Tax-Deductible Donations
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                All donations to Vishnu Mandir, Tampa are tax-deductible to the
                extent allowed by law. You can request an official donation
                statement for your contributions, which you can use for tax
                filing purposes.
              </p>
              <p className="text-text-secondary leading-relaxed">
                We provide donation statements for both one-time and recurring
                donations. Statements are typically issued annually, but you can
                request statements for specific periods as needed.
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Request Donation Statement
          </h2>
          <DonationStatementForm />
          <p className="text-sm text-text-secondary mt-4">
            Note: This form is currently a placeholder. For immediate donation
            statements, please call us at (813) 269-7262 or email
            info@vishnumandirtampa.com.
          </p>
        </section>

        {/* Additional Information */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            About Donation Statements
          </h2>
          <div className="space-y-4 text-text-secondary">
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Processing Time
              </h3>
              <p className="text-sm leading-relaxed">
                Donation statements are typically processed within 5-7 business
                days. During tax season (January-April), processing may take
                slightly longer due to high volume.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Tax Information
              </h3>
              <p className="text-sm leading-relaxed">
                Vishnu Mandir, Tampa is a registered 501(c)(3) nonprofit
                organization. All donations are tax-deductible. Please consult
                with a tax professional for specific advice about your tax
                situation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Questions?
              </h3>
              <p className="text-sm leading-relaxed">
                If you have questions about your donations or need assistance
                with statement requests, please{" "}
                <Link href="/about/contact" className="text-primary hover:text-primary/80">
                  contact us
                </Link>{" "}
                or call (813) 269-7262.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
