import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Users, Phone, Mail } from "lucide-react";
import { fetchPriests } from "@/lib/strapi";
import { PriestCard } from "@/components/shared/PriestCard";

export const metadata: Metadata = {
  title: "Our Priests | Vishnu Mandir, Tampa - Temple Priests & Services",
  description:
    "Meet the dedicated priests serving at Vishnu Mandir, Tampa. Learn about their expertise, services, and how to contact them for special ceremonies.",
  keywords: [
    "Vishnu Mandir priests",
    "Hindu priests Tampa",
    "Tampa temple priests",
    "puja priest services",
  ],
  openGraph: {
    title: "Our Priests | Vishnu Mandir, Tampa",
    description: "Meet the dedicated priests serving at Vishnu Mandir, Tampa.",
    type: "website",
  },
};

// ISR revalidation: 1 hour (priests change less frequently)
export const revalidate = 3600;

/**
 * Priests page - Profiles of temple priests.
 * @returns {JSX.Element} The rendered priests page
 */
export default async function PriestsPage() {
  const structuredData = generateWebPageSchema({
    name: "Our Priests",
    description:
      "Temple priests at Vishnu Mandir, Tampa",
    url: "/religious/priests",
  });

  // Fetch priests from Strapi
  const priests = await fetchPriests();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Our Priests
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Meet the dedicated priests who serve at Vishnu Mandir, Tampa.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Dedicated Spiritual Guides
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                The priests at Vishnu Mandir, Tampa are experienced, dedicated
                spiritual guides committed to serving the Hindu community. They
                conduct daily puja services, perform special ceremonies, and
                provide spiritual guidance to devotees.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Our priests are well-versed in Vedic traditions, Hindu scriptures,
                and ritual practices. They perform various ceremonies including
                daily Aarti, Havans, life-cycle ceremonies (Namakaran, Vivah,
                Yagyopaveet), and special deity pujas. They are available for
                services both at the temple and off-site locations.
              </p>
            </div>
          </div>
        </section>

        {/* Priest Profiles */}
        <section className="mb-12">
          <h2 className="font-serif text-3xl font-semibold text-text-primary mb-8">
            Meet Our Priests
          </h2>
          {priests.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {priests.map((priest) => (
                <PriestCard key={priest.id} priest={priest} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-primary/40 mx-auto mb-4" />
              <p className="text-text-secondary">
                Priest profiles will be listed here. Check back soon or contact
                us for information about our priests.
              </p>
            </div>
          )}
        </section>

        {/* Priest Services */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Services Provided by Our Priests
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-3">
                Regular Services
              </h3>
              <ul className="list-disc list-inside space-y-2 text-text-secondary text-sm ml-4">
                <li>Daily Aarti and puja services</li>
                <li>Weekly special pujas</li>
                <li>Festival ceremonies</li>
                <li>Special deity pujas</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-3">
                Special Ceremonies
              </h3>
              <ul className="list-disc list-inside space-y-2 text-text-secondary text-sm ml-4">
                <li>Havans (fire rituals)</li>
                <li>Life-cycle ceremonies</li>
                <li>Marriage ceremonies (Vivah)</li>
                <li>Memorial services (Shradham)</li>
                <li>Bhoomi Pujan</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Contact Our Priests
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            To schedule a puja service, special ceremony, or consultation with
            our priests, please contact the temple. Our priests are available for:
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Phone</h3>
                <p className="text-text-secondary">
                  Call the temple at{" "}
                  <a
                    href="tel:+18132697262"
                    className="text-primary hover:text-primary/80"
                  >
                    (813) 269-7262
                  </a>{" "}
                  to speak with our priests or schedule services.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Email</h3>
                <p className="text-text-secondary">
                  Email us at{" "}
                  <a
                    href="mailto:sakeemj@live.com"
                    className="text-primary hover:text-primary/80 break-all"
                  >
                    sakeemj@live.com
                  </a>{" "}
                  with your service request or questions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  In Person
                </h3>
                <p className="text-text-secondary">
                  Visit the temple during regular hours to speak with our priests
                  directly. They are available to answer questions and discuss
                  your spiritual needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Services */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Booking Priest Services
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            To book a puja service or special ceremony with our priests:
          </p>
          <ol className="list-decimal list-inside space-y-3 text-text-secondary ml-4">
            <li>
              Contact the temple by phone or email with your service request
            </li>
            <li>
              Provide details about the type of service, preferred date and time,
              and location (temple or off-site)
            </li>
            <li>
              Discuss any special requirements or materials needed for the
              ceremony
            </li>
            <li>
              Confirm availability and receive pricing information
            </li>
            <li>
              Complete the booking and prepare for the ceremony
            </li>
          </ol>
          <div className="mt-6">
            <Link
              href="/forms/puja-sponsorships"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Request Puja Service
            </Link>
          </div>
        </section>

        {/* Additional Information */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Spiritual Guidance
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Our priests are not only available for ceremonies but also provide
            spiritual guidance and answer questions about Hindu philosophy,
            scriptures, and practices. Whether you're new to Hinduism or seeking
            deeper understanding, our priests are here to help.
          </p>
          <p className="text-text-secondary leading-relaxed">
            For general inquiries about our services, please visit our{" "}
            <Link href="/religious/puja-services" className="text-primary hover:text-primary/80">
              puja services page
            </Link>{" "}
            or{" "}
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
