import type { Metadata } from "next";
import { generateWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | Vishnu Mandir, Tampa",
  description:
    "Privacy Policy for Vishnu Mandir, Tampa. Learn how we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy | Vishnu Mandir, Tampa",
    description: "Privacy Policy for Vishnu Mandir, Tampa",
    type: "website",
  },
};

/**
 * Privacy Policy page
 * @returns {JSX.Element} The rendered privacy policy page
 */
export default function PrivacyPolicyPage() {
  const structuredData = generateWebPageSchema({
    name: "Privacy Policy",
    description: "Privacy Policy for Vishnu Mandir, Tampa",
    url: "/privacy-policy",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Privacy Policy
        </h1>
        <p className="text-text-secondary mb-8">
          <strong>Last Updated:</strong> January 2026
        </p>

        <div className="prose prose-lg max-w-none text-text-secondary space-y-6">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              1. Introduction
            </h2>
            <p>
              Vishnu Mandir, Tampa (referred to as "we," "us," "our," or "the Temple") is committed
              to protecting your privacy. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              2. Information We Collect
            </h2>
            <h3 className="font-semibold text-text-primary mb-2">2.1 Information You Provide</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Contact Information:</strong> Name, email address, phone number, and mailing
                address
              </li>
              <li>
                <strong>Donation & Payment Information:</strong> Donation amounts, frequency,
                payment method details (processed securely through Stripe)
              </li>
              <li>
                <strong>Sponsorship & Form Data:</strong> Information provided through puja
                sponsorship forms, facility requests, and other temple forms
              </li>
              <li>
                <strong>Volunteer Information:</strong> Details submitted through volunteer
                registration forms
              </li>
              <li>
                <strong>Communications:</strong> Feedback, comments, and messages you send us
              </li>
            </ul>

            <h3 className="font-semibold text-text-primary mb-2 mt-4">
              2.2 Information Automatically Collected
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Device Information:</strong> IP address, browser type, operating system, and
                device identifiers
              </li>
              <li>
                <strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked, and
                referral sources
              </li>
              <li>
                <strong>Cookies & Tracking:</strong> We use cookies and similar technologies to
                enhance your browsing experience and analyze site performance
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Processing donations and payments</li>
              <li>Fulfilling sponsorship requests and temple services</li>
              <li>Responding to your inquiries and providing customer support</li>
              <li>Sending newsletters, updates, and important temple announcements</li>
              <li>Improving our website, services, and user experience</li>
              <li>Complying with legal obligations and tax requirements</li>
              <li>Preventing fraud and enhancing security</li>
              <li>Conducting surveys and gathering feedback</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              4. Data Security
            </h2>
            <p>
              We implement comprehensive security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>All data transmission is encrypted using HTTPS (TLS 1.2 or higher)</li>
              <li>Payment processing is handled by Stripe, a PCI DSS Level 1 certified service</li>
              <li>We do not store credit card information on our servers</li>
              <li>Access to personal data is restricted to authorized personnel only</li>
              <li>Regular security audits and updates are performed</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              5. Third-Party Services
            </h2>
            <p>
              We use third-party services to deliver our website and services. These services include:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Stripe:</strong> For secure payment processing. See Stripe's privacy policy
                for details
              </li>
              <li>
                <strong>Zeffy:</strong> For donation forms and ticketing. See Zeffy's privacy policy
                for details
              </li>
              <li>
                <strong>AWS Services:</strong> For hosting, email services, and data storage
              </li>
              <li>
                <strong>Strapi CMS:</strong> For content management (data is stored securely on AWS)
              </li>
              <li>
                <strong>Google Fonts & Analytics:</strong> For website performance and analytics
              </li>
            </ul>
            <p className="mt-2">
              We encourage you to review the privacy policies of these third parties for their
              specific data handling practices.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              6. Cookies
            </h2>
            <p>
              We use cookies and similar tracking technologies to improve your user experience:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Essential Cookies:</strong> Required for website functionality and security
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings and preferences
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how visitors use our site
              </li>
              <li>
                <strong>Marketing Cookies:</strong> Track conversion and engagement metrics
              </li>
            </ul>
            <p className="mt-2">
              You can control cookie settings in your browser. However, disabling cookies may affect
              website functionality.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              7. User Rights
            </h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Right to Access:</strong> Request a copy of the personal information we hold
                about you
              </li>
              <li>
                <strong>Right to Correction:</strong> Request correction of inaccurate information
              </li>
              <li>
                <strong>Right to Deletion:</strong> Request deletion of your personal information
              </li>
              <li>
                <strong>Right to Opt-Out:</strong> Unsubscribe from marketing communications and
                newsletters
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Receive your data in a structured,
                machine-readable format
              </li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, please contact us at info@vishnumandirtampa.com with
              details of your request.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              8. Email Communications
            </h2>
            <p>
              When you provide your email address, you may receive communications from Vishnu Mandir,
              including:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Donation confirmations and receipts</li>
              <li>Temple news and announcements</li>
              <li>Event notifications</li>
              <li>Newsletter updates</li>
            </ul>
            <p className="mt-2">
              Each email includes an unsubscribe link, and you can manage your preferences at any
              time.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              9. Retention of Information
            </h2>
            <p>
              We retain your personal information for as long as necessary to provide our services
              and fulfill the purposes outlined in this policy. Specifically:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Donation records are retained for tax and accounting purposes (typically 7 years)
              </li>
              <li>
                Form submission data is retained for administrative and service delivery purposes
              </li>
              <li>
                Newsletter subscribers are retained until you unsubscribe or request deletion
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              10. Children's Privacy
            </h2>
            <p>
              Our website is not intended for children under the age of 13. We do not knowingly
              collect personal information from children under 13. If we discover that a child under
              13 has provided us with personal information, we will take steps to delete such
              information promptly. Parents or guardians who believe a child has provided information
              should contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              11. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices
              or applicable laws. We will notify you of any material changes by updating the "Last
              Updated" date at the top of this page. Continued use of our website following the
              posting of changes constitutes your acceptance of those changes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              12. Contact Information
            </h2>
            <p>
              If you have questions, concerns, or requests regarding this Privacy Policy or our
              privacy practices, please contact us:
            </p>
            <div className="bg-primary/10 rounded-lg p-6 mt-4">
              <p className="font-semibold text-text-primary mb-2">Vishnu Mandir, Tampa</p>
              <p className="mb-1">Email: info@vishnumandirtampa.com</p>
              <p className="mb-1">Website: vishnumandirtampa.com</p>
              <p>
                We will respond to your inquiry within 30 days or as required by applicable law.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              13. Jurisdiction and Governing Law
            </h2>
            <p>
              This Privacy Policy is governed by the laws of the State of Florida and the United
              States. Any disputes arising out of or in connection with this policy shall be subject
              to the exclusive jurisdiction of the courts located in Hillsborough County, Florida.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
