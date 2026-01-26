import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Deities | Vishnu Mandir, Tampa - Hindu Deities & Significance",
  description:
    "Discover the divine deities enshrined at Vishnu Mandir, Tampa. Learn about Lord Vishnu, Lakshmi, Ganesha, Shiva, and other Hindu deities, their significance, and blessings.",
  keywords: [
    "Hindu deities Tampa",
    "Vishnu temple Tampa",
    "Lakshmi Ganesha Shiva",
    "Hindu gods Tampa",
    "deity worship",
  ],
  openGraph: {
    title: "Our Deities | Vishnu Mandir, Tampa",
    description: "Discover the divine deities enshrined at Vishnu Mandir, Tampa.",
    type: "website",
  },
};

/**
 * Deities page - Main listing of all deities at the temple.
 * @returns {JSX.Element} The rendered deities page
 */
export default function DeitiesPage() {
  const structuredData = generateWebPageSchema({
    name: "Our Deities",
    description:
      "Hindu deities enshrined at Vishnu Mandir, Tampa",
    url: "/deities",
  });

  const deities = [
    {
      name: "Lord Vishnu",
      image: "/images/deities/deity-vishnu.jpg",
      description:
        "The Preserver of the universe, Lord Vishnu is the principal deity of our temple. He maintains cosmic order and protects dharma. Devotees worship Vishnu for protection, prosperity, and spiritual growth.",
      significance:
        "Vishnu represents preservation, compassion, and divine grace. His avatars (incarnations) include Rama and Krishna, who guide humanity toward righteousness.",
    },
    {
      name: "Goddess Lakshmi",
      image: "/images/deities/deity-lakshmi.jpg",
      description:
        "Goddess of wealth, prosperity, and abundance. Lakshmi is the consort of Lord Vishnu and bestows material and spiritual prosperity upon devotees.",
      significance:
        "Worshipping Lakshmi brings financial stability, success, and overall well-being. She is especially revered during Diwali and other prosperity festivals.",
    },
    {
      name: "Lord Ganesha",
      image: "/images/deities/deity-ganesha.jpg",
      description:
        "The remover of obstacles and god of wisdom, Ganesha is worshipped at the beginning of all ceremonies and endeavors. He brings success and removes hurdles.",
      significance:
        "Ganesha is invoked before starting any new venture, journey, or important task. His blessings ensure smooth progress and success.",
    },
    {
      name: "Lord Shiva",
      image: undefined,
      description:
        "The Destroyer and Transformer, Shiva represents the cycle of creation, preservation, and destruction. He is the supreme yogi and source of spiritual knowledge.",
      significance:
        "Shiva worship brings spiritual transformation, inner peace, and liberation. He is especially revered during Maha Shivaratri and other Shiva festivals.",
    },
    {
      name: "Goddess Saraswati",
      image: "/images/deities/deity-saraswati.jpg",
      description:
        "Goddess of knowledge, wisdom, music, and arts. Saraswati is the patron of learning and creativity, worshipped by students, teachers, and artists.",
      significance:
        "Saraswati bestows knowledge, wisdom, and artistic abilities. She is especially honored during Vasant Panchami and educational ceremonies.",
    },
    {
      name: "Lord Hanuman",
      image: "/images/deities/deity-hanuman.jpg",
      description:
        "The devoted servant of Lord Rama, Hanuman represents strength, devotion, and selfless service. He protects devotees and removes obstacles.",
      significance:
        "Hanuman worship brings courage, strength, and protection. He is especially revered on Tuesdays and during Hanuman Jayanti.",
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
          Our Deities
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Discover the divine deities enshrined at Vishnu Mandir, Tampa. Each
          deity holds special significance and blessings for devotees.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <p className="text-text-secondary leading-relaxed mb-4">
            Vishnu Mandir, Tampa is home to beautiful shrines dedicated to
            various Hindu deities. Each deity represents different aspects of the
            divine and offers unique blessings to devotees. Our temple provides a
            sacred space where devotees can offer prayers, perform pujas, and seek
            the divine grace of these deities.
          </p>
          <p className="text-text-secondary leading-relaxed">
            The deities enshrined at our temple are worshipped with devotion and
            reverence. Regular puja services are conducted for each deity, and
            devotees can sponsor special pujas or visit during their preferred
            times for personal worship.
          </p>
        </section>

        {/* Deities Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {deities.map((deity, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden border-2 border-primary/5 shadow-warm hover:shadow-md transition-shadow"
            >
              {deity.image ? (
                <div className="relative w-full aspect-square">
                  <Image
                    src={deity.image}
                    alt={`${deity.name} - deity enshrined at Vishnu Mandir, Tampa`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="h-32 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-primary/40" />
                </div>
              )}
              <div className="p-6">
                <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
                  {deity.name}
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                {deity.description}
              </p>
              <div className="bg-primary/5 rounded-lg p-4">
                  <h3 className="font-semibold text-text-primary mb-2 text-sm">
                    Significance
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {deity.significance}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Worship Information */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Worshipping Our Deities
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Devotees can worship the deities at Vishnu Mandir in several ways:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4 mb-6">
            <li>
              <strong>Daily Puja Services:</strong> Attend regular puja services
              conducted by our priests for each deity
            </li>
            <li>
              <strong>Special Puja Sponsorship:</strong> Sponsor a special puja
              for a specific deity on important occasions
            </li>
            <li>
              <strong>Personal Worship:</strong> Visit the temple during open hours
              for personal prayers and offerings
            </li>
            <li>
              <strong>Festival Celebrations:</strong> Participate in special
              deity festivals and celebrations throughout the year
            </li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/religious/puja-schedule"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
            >
              View Puja Schedule
            </Link>
            <Link
              href="/religious/puja-services"
              className="inline-block px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors text-center"
            >
              Sponsor a Puja
            </Link>
          </div>
        </section>

        {/* Deity Festivals */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Deity Festivals
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Throughout the year, we celebrate special festivals dedicated to our
            deities:
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-text-secondary text-sm">
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Vishnu & Lakshmi Festivals
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Diwali (Lakshmi Puja)</li>
                <li>Vishnu Jayanti</li>
                <li>Rama Navami</li>
                <li>Janmashtami (Krishna)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Other Deity Festivals
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Ganesh Chaturthi</li>
                <li>Maha Shivaratri</li>
                <li>Vasant Panchami (Saraswati)</li>
                <li>Hanuman Jayanti</li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/religious/festivals"
              className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
            >
              View All Festivals →
            </Link>
          </div>
        </section>

        {/* Additional Information */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Learn More
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            To learn more about our deities, their worship, and how to
            participate in deity-specific pujas and festivals, please visit our
            religious services section or contact the temple.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/religious"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
            >
              Religious Services
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
