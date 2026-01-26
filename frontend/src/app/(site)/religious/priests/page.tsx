import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Users, Phone, Mail } from "lucide-react";

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

/**
 * Priests page - Profiles of temple priests.
 * @returns {JSX.Element} The rendered priests page
 */
export default function PriestsPage() {
  const structuredData = generateWebPageSchema({
    name: "Our Priests",
    description:
      "Temple priests at Vishnu Mandir, Tampa",
    url: "/religious/priests",
  });

  const priests = [
    {
      name: "Pt. Ganga",
      image: "/images/Preists/pt ganga.jpeg",
      bio: "Experienced priest dedicated to serving the community with traditional Vedic practices and spiritual guidance.",
      specialties: [
        "Daily Puja Services",
        "Havans (Fire Rituals)",
        "Marriage Ceremonies (Vivah)",
        "Life-cycle Ceremonies",
      ],
      contact: "Available for consultation and services",
    },
    {
      name: "Pt. Lal Singh",
      image: "/images/Preists/Pt Lal Singh.png",
      bio: "Knowledgeable priest specializing in Vedic rituals, special deity pujas, and spiritual counseling for devotees.",
      specialties: [
        "Special Deity Pujas",
        "Festival Ceremonies",
        "Memorial Services (Shradham)",
        "Spiritual Guidance",
      ],
      contact: "Available for consultation and services",
    },
    {
      name: "Pt. L. Mehta",
      image: "/images/Preists/Ptl Mehta.png",
      bio: "Devoted priest with expertise in traditional Hindu ceremonies, daily Aarti, and community spiritual services.",
      specialties: [
        "Daily Aarti",
        "Bhoomi Pujan",
        "Namakaran Ceremonies",
        "Yagyopaveet (Thread Ceremony)",
      ],
      contact: "Available for consultation and services",
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {priests.map((priest, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden border-2 border-primary/5 shadow-warm hover:shadow-md transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={priest.image}
                    alt={`${priest.name} - priest at Vishnu Mandir, Tampa`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold text-text-primary mb-4">
                    {priest.name}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {priest.bio}
                  </p>
                  <div className="bg-primary/5 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-text-primary mb-2 text-sm">
                      Specialties
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm">
                      {priest.specialties.map((specialty, idx) => (
                        <li key={idx}>{specialty}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-text-secondary text-sm italic">
                    {priest.contact}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
