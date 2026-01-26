import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Mail } from "lucide-react";
import { EmailSubscriptionForm } from "@/components/forms/EmailSubscriptionForm";

export const metadata: Metadata = {
  title: "Email Subscription | Vishnu Mandir, Tampa - Manage Newsletter Subscriptions",
  description:
    "Manage your email subscriptions with Vishnu Mandir, Tampa. Subscribe or unsubscribe from newsletters, event announcements, and temple updates.",
  keywords: [
    "temple newsletter subscription",
    "Hindu temple email updates",
    "Tampa temple newsletter",
  ],
  openGraph: {
    title: "Email Subscription | Vishnu Mandir, Tampa",
    description: "Manage email subscriptions for newsletters and updates.",
    type: "website",
  },
};

/**
 * Email Subscription form page.
 * @returns {JSX.Element} The rendered email subscription page
 */
export default function EmailSubscriptionPage() {
  const structuredData = generateWebPageSchema({
    name: "Email Subscription",
    description:
      "Manage email subscriptions for Vishnu Mandir, Tampa",
    url: "/forms/email-subscription",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Email Subscription
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Manage your email subscriptions for temple newsletters and updates.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Stay Connected via Email
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Subscribe to our email list to receive temple newsletters, event
                announcements, festival schedules, and important updates directly
                in your inbox. You can customize your subscription preferences or
                unsubscribe at any time.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Our emails keep you informed about upcoming events, special puja
                services, educational programs, and community news. We respect
                your privacy and you can manage your preferences anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Subscription Form */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Subscribe or Update Preferences
          </h2>
          <EmailSubscriptionForm />
          <p className="text-sm text-text-secondary mt-4">
            For immediate subscription updates, call (813) 269-7262 or email sakeemj@live.com.
          </p>
        </section>

        {/* Unsubscribe */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Unsubscribe
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            If you wish to unsubscribe from our emails, please enter your email
            address below. You can also click the unsubscribe link in any email
            you receive from us.
          </p>
          <form
            action="#"
            method="post"
            className="space-y-4"
            aria-label="Unsubscribe from emails"
          >
            <div>
              <label
                htmlFor="unsubscribe-email"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                id="unsubscribe-email"
                name="email"
                required
                aria-required="true"
                autoComplete="email"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="unsubscribe-reason"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Reason for unsubscribing (optional)
              </label>
              <select
                id="unsubscribe-reason"
                name="reason"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a reason</option>
                <option value="too-many">Too many emails</option>
                <option value="not-relevant">Not relevant to me</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Unsubscribe
            </button>
          </form>
        </section>

        {/* Additional Information */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Email Privacy
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            We respect your privacy and will never share your email address with
            third parties. Our emails are sent only for temple-related
            communications, and you can unsubscribe at any time.
          </p>
          <p className="text-text-secondary leading-relaxed">
            For questions about email subscriptions or to update your preferences
            by phone, please{" "}
            <Link href="/about/contact" className="text-primary hover:text-primary/80">
              contact us
            </Link>{" "}
            at (813) 269-7262.
          </p>
        </section>
      </main>
    </>
  );
}
