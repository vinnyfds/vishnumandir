import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ | Vishnu Mandir, Tampa - Frequently Asked Questions",
  description:
    "Find answers to frequently asked questions about Vishnu Mandir, Tampa. Learn about puja services, festivals, visiting hours, donations, and more.",
  keywords: [
    "Vishnu Mandir Tampa FAQ",
    "Hindu temple questions",
    "Tampa temple information",
    "puja services questions",
  ],
  openGraph: {
    title: "FAQ | Vishnu Mandir, Tampa",
    description: "Frequently asked questions about Vishnu Mandir, Tampa and our services.",
    type: "website",
  },
};

/**
 * FAQ page - Frequently asked questions.
 * @returns {JSX.Element} The rendered FAQ page
 */
export default function FAQPage() {
  const structuredData = generateWebPageSchema({
    name: "Frequently Asked Questions",
    description:
      "FAQ about Vishnu Mandir, Tampa - answers to common questions",
    url: "/about/faq",
  });

  const faqs = [
    {
      question: "What are the temple hours?",
      answer:
        "Temple hours may vary, especially during festivals and special events. Please contact us at (813) 269-7262 or check our puja schedule page for current timings. Regular puja services are typically held daily, and the temple is open for devotees during scheduled service times.",
    },
    {
      question: "Where is Vishnu Mandir located?",
      answer:
        "Vishnu Mandir, Tampa is located at 5803 Lynn Road, Tampa, FL 33624. The temple was originally in Ybor City's Palm Avenue and relocated to Lynn Road in 2003. For detailed directions and parking information, please visit our location page.",
    },
    {
      question: "How can I sponsor a puja?",
      answer:
        "You can sponsor a puja by filling out our puja sponsorship form. We offer various puja services both at the temple and off-site. Visit our puja services page to see available services and pricing, then use the sponsorship form to make a request.",
    },
    {
      question: "What puja services are available?",
      answer:
        "Vishnu Mandir offers a wide range of puja services including daily Aarti, special pujas for festivals, life-cycle ceremonies (Namakaran, Vivah, Yagyopaveet), Havans, and more. Services can be performed at the temple or off-site. Please visit our puja services page for a complete catalog.",
    },
    {
      question: "Can I rent the temple facility for an event?",
      answer:
        "Yes, the temple facility may be available for rental for appropriate events. Please fill out our facility request form with details about your event, date, and requirements. We'll review your request and get back to you with availability and pricing information.",
    },
    {
      question: "How can I make a donation?",
      answer:
        "You can make a one-time or recurring donation through our donation page. We accept donations online via secure payment processing. All donations are tax-deductible, and you can request a donation statement for tax purposes through our forms section.",
    },
    {
      question: "What festivals are celebrated at the temple?",
      answer:
        "We celebrate major Hindu festivals throughout the year including Diwali, Navratri, Janmashtami, Ganesh Chaturthi, and many others. Each festival includes special puja services, cultural programs, and community celebrations. Check our festivals page and calendar for upcoming celebrations.",
    },
    {
      question: "Are there educational programs or classes?",
      answer:
        "Yes, Vishnu Mandir offers various educational programs including Sanskrit classes, Hindu scripture study, music lessons, and cultural arts. We have programs for children, youth, and adults. Visit our education section to learn more about available classes and registration.",
    },
    {
      question: "How can I volunteer at the temple?",
      answer:
        "We welcome volunteers for festivals, events, education programs, and temple operations. Please visit our volunteer page to learn about opportunities and fill out the volunteer interest form. You can also contact us directly at (813) 269-7262.",
    },
    {
      question: "Is the temple accessible for people with disabilities?",
      answer:
        "Yes, Vishnu Mandir strives to be accessible to all devotees. We have handicap-accessible parking and facilities. If you have specific accessibility needs, please contact us in advance so we can ensure your visit is comfortable.",
    },
    {
      question: "Can I get married at the temple?",
      answer:
        "Yes, we perform Vivah (marriage) ceremonies at Vishnu Mandir. Please contact us well in advance to discuss your wedding plans, available dates, and requirements. Our priests can guide you through the traditional Hindu marriage ceremony.",
    },
    {
      question: "How do I stay updated with temple events?",
      answer:
        "You can stay updated by checking our calendar page regularly, subscribing to our newsletter, or following us on social media (when available). You can also subscribe to email updates through our email subscription form.",
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
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Find answers to common questions about Vishnu Mandir, Tampa.
        </p>

        <div className="max-w-3xl mx-auto space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white rounded-xl border-2 border-primary/5 shadow-warm overflow-hidden group"
            >
              <summary className="p-6 cursor-pointer flex items-center justify-between hover:bg-primary/5 transition-colors">
                <h2 className="font-serif text-lg font-semibold text-text-primary pr-4">
                  {faq.question}
                </h2>
                <ChevronDown className="w-5 h-5 text-primary flex-shrink-0 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 pt-0">
                <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Still Have Questions */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5 text-center">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Still Have Questions?
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6 max-w-2xl mx-auto">
            If you couldn't find the answer you're looking for, please don't
            hesitate to contact us. We're here to help with any questions about
            our services, events, or temple activities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about/contact"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="tel:+18132697262"
              className="inline-block px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
            >
              Call (813) 269-7262
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
