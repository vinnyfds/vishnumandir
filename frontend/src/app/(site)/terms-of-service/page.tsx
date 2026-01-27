import type { Metadata } from "next";
import { generateWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service | Vishnu Mandir, Tampa",
  description:
    "Terms of Service for Vishnu Mandir, Tampa. Read our terms and conditions for using our website and services.",
  openGraph: {
    title: "Terms of Service | Vishnu Mandir, Tampa",
    description: "Terms of Service for Vishnu Mandir, Tampa",
    type: "website",
  },
};

/**
 * Terms of Service page
 * @returns {JSX.Element} The rendered terms of service page
 */
export default function TermsOfServicePage() {
  const structuredData = generateWebPageSchema({
    name: "Terms of Service",
    description: "Terms of Service for Vishnu Mandir, Tampa",
    url: "/terms-of-service",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Terms of Service
        </h1>
        <p className="text-text-secondary mb-8">
          <strong>Last Updated:</strong> January 2026
        </p>

        <div className="prose prose-lg max-w-none text-text-secondary space-y-6">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using the Vishnu Mandir, Tampa website (the "Website"), you agree to
              be bound by these Terms of Service (the "Terms"). If you do not agree to these Terms,
              please do not use the Website. We reserve the right to modify these Terms at any time,
              and modifications are effective immediately upon posting to the Website.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              2. Use of Website
            </h2>
            <p>You agree to use this Website only for lawful purposes and in a way that does not:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Infringe upon anyone's intellectual property rights</li>
              <li>Harass or cause distress or inconvenience to any person</li>
              <li>
                Transmit viruses, malware, or any code of destructive nature to the Website or other
                users
              </li>
              <li>Disrupt the normal flow of dialogue within the Website</li>
              <li>Attempt to gain unauthorized access to the Website's systems</li>
              <li>Engage in any form of deceptive or fraudulent activity</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              3. Intellectual Property Rights
            </h2>
            <p>
              All content on this Website, including text, graphics, logos, images, videos, and
              software, is the property of Vishnu Mandir, Tampa or its content suppliers and is
              protected by international copyright laws. You may not reproduce, distribute, transmit,
              modify, or otherwise use any content without our prior written permission.
            </p>
            <p className="mt-2">
              The use of our Website does not grant you ownership rights to any content you access.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              4. Donations and Payments
            </h2>
            <h3 className="font-semibold text-text-primary mb-2">4.1 Donation Terms</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                All donations are voluntary and intended to support Vishnu Mandir, Tampa's programs
                and operations
              </li>
              <li>Donations are generally non-refundable</li>
              <li>All donations are tax-deductible (consult a tax professional for specifics)</li>
              <li>
                You represent that you are authorized to make the donation and that the funds are
                lawfully obtained
              </li>
            </ul>

            <h3 className="font-semibold text-text-primary mb-2 mt-4">4.2 Payment Processing</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Donations are processed securely through Stripe, a PCI DSS Level 1 certified payment processor</li>
              <li>We do not store your credit card information on our servers</li>
              <li>By making a donation, you authorize us to charge your payment method</li>
              <li>You are responsible for maintaining the confidentiality of your payment information</li>
            </ul>

            <h3 className="font-semibold text-text-primary mb-2 mt-4">4.3 Recurring Donations</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                If you set up a recurring donation, you authorize Vishnu Mandir to charge your
                payment method on the specified schedule
              </li>
              <li>You can cancel a recurring donation at any time by notifying us in writing</li>
              <li>Cancellation will take effect after the next scheduled charge</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              5. Puja Sponsorship
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Puja sponsorship requests are subject to availability and the temple's schedule
              </li>
              <li>Payment must be received before the sponsorship request is confirmed</li>
              <li>
                Specific requests (date, deity, intention) may not always be accommodable. The temple
                reserves the right to suggest alternatives
              </li>
              <li>In the event the temple cannot accommodate a sponsorship, we will offer a refund</li>
              <li>Sponsorship fees are non-refundable once the puja has been performed</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              6. Facility Rentals and Requests
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>All facility rental requests are subject to availability and temple policies</li>
              <li>
                The temple reserves the right to decline any rental request at its sole discretion
              </li>
              <li>
                Facilities must be used in accordance with temple policies and local regulations
              </li>
              <li>Users are responsible for any damage to facilities during their use</li>
              <li>
                A security deposit may be required and will be refunded if no damage occurs and all
                policies are followed
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              7. Third-Party Links and Services
            </h2>
            <p>
              Our Website may contain links to third-party websites and services. We are not
              responsible for the content, accuracy, or practices of these external sites. Your use
              of third-party websites is governed by their own terms of service and privacy policies.
              We encourage you to review these policies before providing any personal information.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              8. Disclaimer of Warranties
            </h2>
            <p>
              This Website is provided on an "as-is" and "as-available" basis without any warranties
              of any kind, either express or implied. We disclaim all warranties, including but not
              limited to:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Warranties of merchantability or fitness for a particular purpose</li>
              <li>Warranties of title or non-infringement</li>
              <li>Warranties that the Website will be uninterrupted or error-free</li>
              <li>Warranties that any defects will be corrected</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              9. Limitation of Liability
            </h2>
            <p>
              In no event shall Vishnu Mandir, Tampa, its directors, officers, employees, or agents
              be liable for any direct, indirect, incidental, special, consequential, or punitive
              damages arising out of or in connection with your use of the Website or services,
              including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Loss of data or information</li>
              <li>Lost profits or revenue</li>
              <li>Personal injury or property damage</li>
              <li>Any claim arising from the use or reliance on the Website's content</li>
            </ul>
            <p className="mt-2">
              This limitation applies regardless of the legal theory (contract, tort, strict
              liability, or otherwise), even if we have been advised of the possibility of such
              damages.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              10. Governing Law and Jurisdiction
            </h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of
              the State of Florida, United States, without regard to its conflict of law provisions.
              You agree that any legal action or proceeding arising out of or relating to these Terms
              shall be brought exclusively in the state or federal courts located in Hillsborough
              County, Florida, and you irrevocably consent to the jurisdiction and venue of such
              courts.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              11. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless Vishnu Mandir, Tampa, its directors, officers,
              employees, and agents from any and all claims, damages, liabilities, costs, and
              expenses (including reasonable attorneys' fees) arising out of or in connection with:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Your use of the Website or services</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any applicable law or regulation</li>
              <li>Your infringement of any third-party rights</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              12. Severability
            </h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining
              provisions shall continue in full force and effect, and the invalid provision shall be
              modified to the minimum extent necessary to make it valid and enforceable.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              13. Entire Agreement
            </h2>
            <p>
              These Terms of Service, together with our Privacy Policy, constitute the entire
              agreement between you and Vishnu Mandir, Tampa regarding your use of the Website and
              supersede all prior agreements and understandings.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              14. Contact Information
            </h2>
            <p>
              If you have questions or concerns regarding these Terms of Service, please contact us:
            </p>
            <div className="bg-primary/10 rounded-lg p-6 mt-4">
              <p className="font-semibold text-text-primary mb-2">Vishnu Mandir, Tampa</p>
              <p className="mb-1">Email: info@vishnumandirtampa.com</p>
              <p className="mb-1">Website: vishnumandirtampa.com</p>
              <p>We will address your concerns promptly and professionally.</p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              15. Updates to Terms
            </h2>
            <p>
              Vishnu Mandir, Tampa reserves the right to modify these Terms of Service at any time.
              Modifications are effective immediately upon posting to the Website. Your continued use
              of the Website following the posting of modified Terms constitutes your acceptance of
              the modified Terms. We encourage you to review these Terms periodically to stay
              informed of any changes.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
