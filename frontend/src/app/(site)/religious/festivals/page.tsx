import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Calendar, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Hindu Festivals | Vishnu Mandir, Tampa - Celebrations & Events",
  description:
    "Explore major Hindu festivals celebrated at Vishnu Mandir, Tampa including Diwali, Navratri, Janmashtami, and more. Learn about significance, schedules, and participation.",
  keywords: [
    "Hindu festivals Tampa",
    "Diwali Tampa",
    "Navratri Tampa",
    "Janmashtami Tampa",
    "Tampa temple festivals",
    "Hindu celebrations Florida",
  ],
  openGraph: {
    title: "Hindu Festivals | Vishnu Mandir, Tampa",
    description: "Major Hindu festivals and celebrations at Vishnu Mandir, Tampa.",
    type: "website",
  },
};

/**
 * Festivals page - Major annual festivals.
 * @returns {JSX.Element} The rendered festivals page
 */
export default function FestivalsPage() {
  const structuredData = generateWebPageSchema({
    name: "Hindu Festivals",
    description:
      "Major Hindu festivals celebrated at Vishnu Mandir, Tampa",
    url: "/religious/festivals",
  });

  const festivals = [
    {
      name: "Diwali",
      image: "/images/festivals/festival-diwali.jpg",
      description:
        "The Festival of Lights, celebrating the victory of light over darkness and good over evil. Includes Lakshmi Puja, fireworks, and community celebrations.",
      time: "October/November",
    },
    {
      name: "Navratri",
      image: "/images/festivals/festival-navratri.jpg",
      description:
        "Nine nights dedicated to Goddess Durga, featuring daily pujas, Garba and Dandiya dances, and special ceremonies.",
      time: "March/April & September/October",
    },
    {
      name: "Janmashtami",
      image: "/images/festivals/festival-janmashtami.jpg",
      description:
        "Birthday celebration of Lord Krishna with special pujas, devotional songs, and cultural programs.",
      time: "August/September",
    },
    {
      name: "Ganesh Chaturthi",
      image: "/images/festivals/festival-ganesh-chaturthi.jpg",
      description:
        "Celebration of Lord Ganesha's birthday with special pujas, modak offerings, and community festivities.",
      time: "August/September",
    },
    {
      name: "Holi",
      image: "/images/festivals/festival-holi.jpg",
      description:
        "Festival of colors celebrating the arrival of spring and the victory of good over evil. Includes color play, music, and community gathering.",
      time: "March",
    },
    {
      name: "Rama Navami",
      image: "/images/festivals/festival-rama-navami.jpg",
      description:
        "Birthday celebration of Lord Rama with special pujas, Ramayana recitations, and devotional activities.",
      time: "March/April",
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
          Hindu Festivals
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Explore the major annual festivals celebrated at Vishnu Mandir, Tampa.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Celebrating Our Rich Heritage
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                At Vishnu Mandir, Tampa, we celebrate major Hindu festivals
                throughout the year, bringing our community together in prayer,
                devotion, and joy. Each festival holds deep spiritual significance
                and provides an opportunity for families to connect with their
                faith and culture.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Our festival celebrations include special puja services, cultural
                programs, community meals, and traditional activities. All
                devotees are welcome to participate in these sacred and joyous
                occasions.
              </p>
            </div>
          </div>
        </section>

        {/* Festivals Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {festivals.map((festival, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden border-2 border-primary/5 shadow-warm hover:shadow-md transition-shadow"
            >
              <div className="relative h-40">
                <Image
                  src={festival.image}
                  alt={`${festival.name} celebration at Vishnu Mandir, Tampa`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="font-serif text-xl font-semibold text-text-primary">
                    {festival.name}
                  </h3>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-3">
                  {festival.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Typically celebrated: {festival.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Festival Schedule */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Festival Schedule & Participation
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Festival schedules are announced in advance and may include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4 mb-6">
            <li>Early morning special pujas and ceremonies</li>
            <li>Midday rituals and devotional activities</li>
            <li>Evening Aarti and celebrations</li>
            <li>Cultural programs including music and dance</li>
            <li>Community meals (Prasad distribution)</li>
            <li>Traditional games and activities for children</li>
          </ul>
          <p className="text-text-secondary leading-relaxed">
            During major festivals, the temple may have extended hours and
            multiple puja services throughout the day. We encourage all
            devotees to participate and celebrate together.
          </p>
        </section>

        {/* Sponsorship */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Festival Sponsorship
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            You can sponsor festival celebrations, special pujas, or contribute to
            festival expenses. Sponsorship helps support our community
            celebrations and ensures these important traditions continue for future
            generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/forms/puja-sponsorships"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
            >
              Sponsor a Festival
            </Link>
            <Link
              href="/support/donate"
              className="inline-block px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors text-center"
            >
              Make a Donation
            </Link>
          </div>
        </section>

        {/* Stay Updated */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Stay Updated on Festivals
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            To stay informed about upcoming festivals, schedules, and special
            events:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4 mb-6">
            <li>Check our calendar for festival dates and schedules</li>
            <li>Subscribe to our newsletter for festival announcements</li>
            <li>Follow us on social media (when available)</li>
            <li>Contact us at (813) 269-7262 for specific festival information</li>
            <li>Visit the temple for posted festival schedules</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/calendar"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
            >
              View Calendar
            </Link>
            <Link
              href="/calendar/newsletter"
              className="inline-block px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors text-center"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
