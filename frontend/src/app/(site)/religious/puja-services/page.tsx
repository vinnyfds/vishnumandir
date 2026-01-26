import type { Metadata } from "next";
import Link from "next/link";
import { generateServiceSchema, generateWebPageSchema } from "@/lib/seo";
import { Sparkles, MapPin, DollarSign, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Puja Services | Vishnu Mandir, Tampa - Catalog & Pricing",
  description:
    "Browse puja services at Vishnu Mandir, Tampa. View available pujas, pricing, descriptions, and sponsorship options. Services available at temple or off-site.",
  keywords: [
    "Vishnu Mandir puja services",
    "Hindu puja Tampa",
    "puja services Florida",
    "Tampa temple puja catalog",
    "sponsor puja Tampa",
    "Hindu ceremonies Tampa",
  ],
  openGraph: {
    title: "Puja Services | Vishnu Mandir, Tampa",
    description: "Browse our catalog of puja services with descriptions, pricing, and sponsorship options.",
    type: "website",
  },
};

/**
 * Puja Services page - Catalog of available puja services.
 * @returns {JSX.Element} The rendered puja services page
 */
export default function PujaServicesPage() {
  const structuredData = generateWebPageSchema({
    name: "Puja Services",
    description:
      "Catalog of available puja services at Vishnu Mandir, Tampa",
    url: "/religious/puja-services",
  });

  const pujaServices = [
    {
      name: "Daily Aarti",
      description:
        "Regular daily prayer ceremony with lamps, incense, and devotional songs. Performed morning and evening.",
      location: "In Temple",
      price: "Donation",
    },
    {
      name: "Havan (Fire Ritual)",
      description:
        "Sacred fire ritual performed for purification, blessings, and special occasions. Can be performed for individuals or families.",
      location: "In Temple or Off-site",
      price: "Contact for pricing",
    },
    {
      name: "Satyanarayan Katha",
      description:
        "Narration of the Satyanarayan story with puja, performed for prosperity, well-being, and fulfillment of wishes.",
      location: "In Temple or Off-site",
      price: "Contact for pricing",
    },
    {
      name: "Namakaran (Naming Ceremony)",
      description:
        "Traditional Hindu naming ceremony for newborns, performed with prayers and blessings for the child's future.",
      location: "In Temple or Off-site",
      price: "Contact for pricing",
    },
    {
      name: "Yagyopaveet (Thread Ceremony)",
      description:
        "Sacred thread initiation ceremony (Upanayana) for young boys, marking their entry into formal Vedic studies.",
      location: "In Temple or Off-site",
      price: "Contact for pricing",
    },
    {
      name: "Vivah (Marriage Ceremony)",
      description:
        "Traditional Hindu marriage ceremony performed according to Vedic traditions with all sacred rituals.",
      location: "In Temple or Off-site",
      price: "Contact for pricing",
    },
    {
      name: "Bhoomi Pujan",
      description:
        "Ground-breaking ceremony performed before starting construction or new projects, seeking blessings for success.",
      location: "On-site",
      price: "Contact for pricing",
    },
    {
      name: "Shradham (Memorial Service)",
      description:
        "Memorial service performed in honor of departed ancestors, offering prayers and offerings for their peace.",
      location: "In Temple or Off-site",
      price: "Contact for pricing",
    },
    {
      name: "Special Deity Pujas",
      description:
        "Devotional services dedicated to specific deities such as Ganesh, Lakshmi, Saraswati, Hanuman, and others.",
      location: "In Temple",
      price: "Contact for pricing",
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
          Puja Services Catalog
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Browse our available puja services with descriptions, pricing, and
          sponsorship options.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Comprehensive Puja Services
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Vishnu Mandir, Tampa offers a comprehensive range of puja
                services to meet your spiritual needs. From daily worship to
                life-cycle ceremonies, special occasions, and festival
                celebrations, our experienced priests conduct all services with
                devotion and authenticity.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Many services can be performed either at the temple or at your
                location (off-site). We follow traditional Hindu practices and
                can accommodate various requirements. For specific pricing and
                availability, please contact us or use our puja sponsorship form.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pujaServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border-2 border-primary/5 shadow-warm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-serif text-xl font-semibold text-text-primary">
                  {service.name}
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-text-secondary">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{service.location}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span>{service.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How to Sponsor */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            How to Sponsor a Puja
          </h2>
          <div className="space-y-4 text-text-secondary">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  Choose Your Service
                </h3>
                <p>
                  Browse our catalog above and select the puja service you'd
                  like to sponsor. Consider your needs, occasion, and location
                  preference (temple or off-site).
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  Submit Request
                </h3>
                <p>
                  Fill out our puja sponsorship form with your details, preferred
                  date and time, and any special requirements. You can also call
                  us directly at (813) 269-7262.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  Confirmation
                </h3>
                <p>
                  We'll review your request and confirm availability. You'll
                  receive details about the ceremony, required materials (if
                  any), and payment information.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/forms/puja-sponsorships"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Sponsor a Puja
            </Link>
          </div>
        </section>

        {/* Additional Information */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Additional Information
          </h2>
          <div className="space-y-4 text-text-secondary">
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Materials & Offerings
              </h3>
              <p className="text-sm leading-relaxed">
                Some pujas may require specific materials or offerings (flowers,
                fruits, etc.). We'll provide a list of required items when you
                book a service. In many cases, the temple can arrange these
                materials for an additional fee.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Off-Site Services
              </h3>
              <p className="text-sm leading-relaxed">
                Many puja services can be performed at your home or other
                location. Please discuss location requirements and any setup needs
                when booking. Additional travel fees may apply for off-site
                services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Festival & Special Events
              </h3>
              <p className="text-sm leading-relaxed">
                During major festivals, we offer special puja packages and
                extended services. Check our festivals page and calendar for
                upcoming celebrations and special puja opportunities.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link
              href="/religious/festivals"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
            >
              View Festivals
            </Link>
            <Link
              href="/about/contact"
              className="inline-block px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors text-center"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
