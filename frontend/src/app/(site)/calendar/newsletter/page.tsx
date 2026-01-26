import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Mail, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Newsletter | Vishnu Mandir, Tampa - Archive & Subscription",
  description:
    "Access the Vishnu Mandir, Tampa newsletter archive and subscribe to receive updates about temple events, festivals, and community news.",
  keywords: [
    "Vishnu Mandir newsletter",
    "Tampa temple newsletter",
    "Hindu temple newsletter",
    "Tampa Bay Hindu community news",
  ],
  openGraph: {
    title: "Newsletter | Vishnu Mandir, Tampa",
    description: "Subscribe to our newsletter and access the newsletter archive.",
    type: "website",
  },
};

/**
 * Newsletter page - Temple newsletter archive.
 * @returns {JSX.Element} The rendered newsletter page
 */
export default function NewsletterPage() {
  const structuredData = generateWebPageSchema({
    name: "Newsletter",
    description:
      "Newsletter archive and subscription for Vishnu Mandir, Tampa",
    url: "/calendar/newsletter",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Newsletter
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Access our temple newsletter archive and stay updated with temple news
          and events.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Stay Connected with Our Community
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                The Vishnu Mandir, Tampa newsletter keeps you informed about
                upcoming events, festivals, special puja services, educational
                programs, and community news. Our newsletter is published
                regularly and includes important announcements, event schedules,
                and updates from the temple.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Subscribe to receive our newsletter directly in your inbox, or
                browse our archive to access past issues. The newsletter is a
                valuable resource for staying connected with temple activities
                and the Hindu community in Tampa Bay.
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter Archive */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Newsletter Archive
          </h2>
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-primary/40 mx-auto mb-4" />
            <p className="text-text-secondary mb-4">
              Newsletter archive will be available here. Past issues will be
              accessible as PDF downloads.
            </p>
            <p className="text-text-secondary text-sm">
              Check back soon for archived newsletters, or contact us to receive
              past issues.
            </p>
          </div>
        </section>

        {/* Subscribe Section */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Receive our newsletter directly in your email inbox. Stay updated
            with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4 mb-6">
            <li>Upcoming festivals and special events</li>
            <li>Puja schedules and service announcements</li>
            <li>Educational program updates</li>
            <li>Cultural event information</li>
            <li>Temple news and community updates</li>
            <li>Volunteer opportunities</li>
          </ul>
          <div className="bg-primary/5 rounded-lg p-6">
            <h3 className="font-semibold text-text-primary mb-4">
              Newsletter Subscription Form
            </h3>
            <form
              action="#"
              method="post"
              className="space-y-4"
              aria-label="Newsletter subscription form"
            >
              <div>
                <label
                  htmlFor="newsletter-email"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Email Address <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  id="newsletter-email"
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
                  htmlFor="newsletter-name"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Name (Optional)
                </label>
                <input
                  type="text"
                  id="newsletter-name"
                  name="name"
                  autoComplete="name"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="eventUpdates"
                    className="w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-text-secondary">
                    I also want event and program updates
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Mail className="w-5 h-5" />
                Subscribe to Newsletter
              </button>
            </form>
            <p className="text-sm text-text-secondary mt-4">
              Note: This form is currently a placeholder. For immediate
              subscription, please contact us at (813) 269-7262 or email
              sakeemj@live.com.
            </p>
          </div>
        </section>

        {/* Alternative Subscription */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Other Ways to Stay Updated
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            In addition to our newsletter, you can stay informed through:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Website Calendar
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                Check our online calendar for current events and schedules.
              </p>
              <Link
                href="/calendar"
                className="text-primary hover:text-primary/80 text-sm"
              >
                View Calendar →
              </Link>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Direct Contact
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                Call us at (813) 269-7262 or email sakeemj@live.com for event
                information.
              </p>
              <Link
                href="/about/contact"
                className="text-primary hover:text-primary/80 text-sm"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
