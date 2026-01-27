import type { Metadata } from "next";
import { generateWebPageSchema } from "@/lib/seo";
import { MessageSquare, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Feedback | Vishnu Mandir, Tampa - Share Your Thoughts",
  description:
    "Share your feedback, suggestions, and comments with Vishnu Mandir, Tampa. Help us improve our services and better serve the Hindu community.",
  keywords: [
    "Vishnu Mandir feedback",
    "Tampa temple suggestions",
    "Hindu temple comments",
  ],
  openGraph: {
    title: "Feedback | Vishnu Mandir, Tampa",
    description: "Share your feedback and suggestions to help us improve our services.",
    type: "website",
  },
};

/**
 * Feedback page - Submit feedback form.
 * @returns {JSX.Element} The rendered feedback page
 */
export default function FeedbackPage() {
  const structuredData = generateWebPageSchema({
    name: "Feedback",
    description: "Submit feedback and suggestions to Vishnu Mandir, Tampa",
    url: "/about/feedback",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Share Your Feedback
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Your thoughts and suggestions help us improve our services and better
          serve the community.
        </p>

        <div className="max-w-2xl mx-auto">
          {/* Introduction */}
          <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                  We Value Your Input
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  At Vishnu Mandir, Tampa, we are committed to continuously
                  improving our services, programs, and facilities. Your feedback
                  helps us understand what we&apos;re doing well and where we can
                  enhance the experience for all devotees.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Whether you have suggestions for new programs, feedback about
                  existing services, ideas for improvements, or general comments,
                  we&apos;d love to hear from you.
                </p>
              </div>
            </div>
          </section>

          {/* Feedback Form */}
          <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm">
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
              Feedback Form
            </h2>
            <form
              action="#"
              method="post"
              className="space-y-6"
              aria-label="Feedback form"
            >
              <div>
                <label
                  htmlFor="feedback-name"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="feedback-name"
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
                  htmlFor="feedback-email"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  id="feedback-email"
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
                  htmlFor="feedback-phone"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  id="feedback-phone"
                  name="phone"
                  autoComplete="tel"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="(813) 555-1234"
                />
              </div>

              <div>
                <label
                  htmlFor="feedback-category"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Category <span className="text-primary">*</span>
                </label>
                <select
                  id="feedback-category"
                  name="category"
                  required
                  aria-required="true"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a category</option>
                  <option value="services">Puja Services</option>
                  <option value="events">Events &amp; Festivals</option>
                  <option value="education">Education Programs</option>
                  <option value="facilities">Facilities</option>
                  <option value="website">Website</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="feedback-message"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Your Feedback <span className="text-primary">*</span>
                </label>
                <textarea
                  id="feedback-message"
                  name="message"
                  rows={6}
                  required
                  aria-required="true"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Please share your thoughts, suggestions, or comments..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Heart className="w-5 h-5" />
                Submit Feedback
              </button>
            </form>

            <p className="text-sm text-text-secondary mt-6">
              <strong>Note:</strong> This form is currently a placeholder. For
              immediate feedback, please call us at (813) 269-7262 or email
              info@vishnumandirtampa.com.
            </p>
          </section>

          {/* Thank You Message */}
          <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5 mt-8 text-center">
            <div className="p-3 bg-primary/10 rounded-full text-primary inline-block mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
              Thank You for Your Feedback
            </h2>
            <p className="text-text-secondary leading-relaxed">
              We appreciate you taking the time to share your thoughts with us.
              Your feedback is valuable in helping us serve the community better.
              We review all feedback and use it to guide improvements to our
              services and programs.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
