import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { MapPin } from "lucide-react";
import { ChangeOfAddressForm } from "@/components/forms/ChangeOfAddressForm";

export const metadata: Metadata = {
  title: "Change of Address | Vishnu Mandir, Tampa - Update Contact Info",
  description:
    "Update your contact information with Vishnu Mandir, Tampa. Change your address, phone number, or email to stay connected with temple communications.",
  keywords: [
    "update temple contact",
    "change address temple",
    "Tampa temple contact update",
  ],
  openGraph: {
    title: "Change of Address | Vishnu Mandir, Tampa",
    description: "Update your contact information with the temple.",
    type: "website",
  },
};

/**
 * Change of Address form page.
 * @returns {JSX.Element} The rendered change of address page
 */
export default function ChangeOfAddressPage() {
  const structuredData = generateWebPageSchema({
    name: "Change of Address",
    description:
      "Update contact information with Vishnu Mandir, Tampa",
    url: "/forms/change-of-address",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Change of Address
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Update your contact information with the temple.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Keep Your Information Current
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Help us stay connected with you by keeping your contact
                information up to date. Updated information ensures you receive
                important temple communications, event announcements, newsletters,
                and donation statements.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Use this form to update your address, phone number, email, or
                other contact details. We&apos;ll update your information in our
                records promptly.
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Update Contact Information
          </h2>
          <ChangeOfAddressForm />
          <p className="text-sm text-text-secondary mt-4">
            For immediate updates, call (813) 269-7262 or email sakeemj@live.com.
          </p>
        </section>

        {/* Additional Information */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Why Update Your Information?
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Keeping your contact information current ensures you:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
            <li>Receive event announcements and festival schedules</li>
            <li>Get newsletters and temple updates</li>
            <li>Receive donation statements for tax purposes</li>
            <li>Stay informed about important temple communications</li>
            <li>Are reachable for special event invitations</li>
          </ul>
          <p className="text-text-secondary leading-relaxed mt-4">
            If you have questions about updating your information, please{" "}
            <Link href="/about/contact" className="text-primary hover:text-primary/80">
              contact us
            </Link>{" "}
            directly.
          </p>
        </section>
      </main>
    </>
  );
}
