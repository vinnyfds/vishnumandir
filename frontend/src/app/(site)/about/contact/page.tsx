import type { Metadata } from "next";
import Link from "next/link";
import { generatePlaceSchema } from "@/lib/seo";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Vishnu Mandir, Tampa - Address, Phone & Hours",
  description:
    "Contact Vishnu Mandir, Tampa at 5803 Lynn Road, Tampa, FL 33624. Call (813) 269-7262 or email us. Find our location, hours, and contact information.",
  keywords: [
    "Vishnu Mandir Tampa contact",
    "Hindu temple Tampa address",
    "Tampa temple phone number",
    "Vishnu Mandir location",
    "Tampa Bay Hindu temple contact",
  ],
  openGraph: {
    title: "Contact Us | Vishnu Mandir, Tampa",
    description: "Get in touch with Vishnu Mandir, Tampa. Visit us at 5803 Lynn Road, Tampa, FL 33624.",
    type: "website",
  },
};

/**
 * Contact page - Contact information and form.
 * @returns {JSX.Element} The rendered contact page
 */
export default function ContactPage() {
  const structuredData = generatePlaceSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Contact Vishnu Mandir, Tampa
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Get in touch with us. We&apos;re here to help with your spiritual needs,
          questions, and service requests.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm space-y-6">
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Contact Information
            </h2>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Address</h3>
                <p className="text-text-secondary leading-relaxed">
                  5803 Lynn Road
                  <br />
                  Tampa, FL 33624
                </p>
                <Link
                  href="/about/location"
                  className="text-primary hover:text-primary/80 text-sm mt-2 inline-block"
                >
                  Get Directions →
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Phone</h3>
                <p className="text-text-secondary">
                  <a
                    href="tel:+18132697262"
                    className="hover:text-primary transition-colors"
                  >
                    (813) 269-7262
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Email</h3>
                <p className="text-text-secondary">
                  <a
                    href="mailto:sakeemj@live.com"
                    className="hover:text-primary transition-colors break-all"
                  >
                    sakeemj@live.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  Temple Hours
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Please contact us for current operating hours and puja schedule
                  timings. Hours may vary during festivals and special events.
                </p>
                <Link
                  href="/religious/puja-schedule"
                  className="text-primary hover:text-primary/80 text-sm mt-2 inline-block"
                >
                  View Puja Schedule →
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm">
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              Send Us a Message
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Have a question or need assistance? Fill out the form below and
              we&apos;ll get back to you as soon as possible.
            </p>
            <form
              action="#"
              method="post"
              className="space-y-4"
              aria-label="Contact form"
            >
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Subject / Inquiry Type <span className="text-primary">*</span>
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  required
                  aria-required="true"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select inquiry type</option>
                  <option value="general">General Question</option>
                  <option value="puja">Puja / Services</option>
                  <option value="donation">Donation</option>
                  <option value="facility">Facility Rental</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="website">Website Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  aria-required="true"
                  autoComplete="name"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
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
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  aria-required="true"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
            <p className="text-sm text-text-secondary mt-4">
              Note: This form is currently a placeholder. For immediate
              assistance, please call us at (813) 269-7262.
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Other Ways to Connect
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Puja Services
              </h3>
              <p className="text-text-secondary text-sm mb-2">
                Need to schedule a puja or religious ceremony?
              </p>
              <Link
                href="/forms/puja-sponsorships"
                className="text-primary hover:text-primary/80 text-sm"
              >
                Request Puja Service →
              </Link>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Facility Rental
              </h3>
              <p className="text-text-secondary text-sm mb-2">
                Interested in renting our facility for an event?
              </p>
              <Link
                href="/forms/request-facility"
                className="text-primary hover:text-primary/80 text-sm"
              >
                Request Facility →
              </Link>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Volunteer
              </h3>
              <p className="text-text-secondary text-sm mb-2">
                Want to get involved and serve the community?
              </p>
              <Link
                href="/about/volunteer"
                className="text-primary hover:text-primary/80 text-sm"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
