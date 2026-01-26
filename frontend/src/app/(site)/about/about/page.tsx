import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us | Vishnu Mandir, Tampa - Mission, Vision & History",
  description:
    "Learn about Vishnu Mandir Tampa's mission, vision, and history. Serving the Hindu community in Tampa Bay since 2003 with spiritual guidance and cultural preservation.",
  keywords: [
    "Vishnu Mandir Tampa",
    "Hindu temple Tampa",
    "about Hindu temple",
    "Tampa Bay Hindu community",
    "Hindu temple history",
    "Tampa temple mission",
  ],
  openGraph: {
    title: "About Us | Vishnu Mandir, Tampa",
    description:
      "Learn about our mission, vision, and history serving the Tampa Bay Hindu community.",
    type: "website",
  },
};

/**
 * About Us page - Mission, vision, and history.
 * @returns {JSX.Element} The rendered about us page
 */
export default function AboutUsPage() {
  const structuredData = generateWebPageSchema({
    name: "About Us",
    description:
      "Mission, vision, and history of Vishnu Mandir, Tampa - serving the Hindu community since 2003",
    url: "/about/about",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          About Vishnu Mandir, Tampa
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Learn about our mission, vision, and history serving the Hindu
          community in Tampa Bay.
        </p>

        <div className="space-y-12">
          {/* Mission Section */}
          <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm">
            <h2 className="font-serif text-3xl font-semibold text-text-primary mb-4">
              Our Mission
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Vishnu Mandir, Tampa is dedicated to establishing a space of deep
              spiritual understanding for our community. Our mission is to give
              each member an equal opportunity to voice their opinion and lead a
              life as defined by Hindu Dharma. We strive to utilize novel methods
              to connect devotees with their faith while preserving our rich
              cultural heritage.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Through daily worship, educational programs, cultural events, and
              community service, we aim to foster spiritual growth, cultural
              preservation, and unity within the Hindu community of Tampa Bay.
            </p>
          </section>

          {/* Vision Section */}
          <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm">
            <h2 className="font-serif text-3xl font-semibold text-text-primary mb-4">
              Our Vision
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We envision Vishnu Mandir as a beacon of Hindu spirituality and
              culture in the Tampa Bay area, where devotees of all ages can come
              together to worship, learn, and celebrate. Our vision includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary leading-relaxed ml-4">
              <li>
                Providing a sacred space for daily worship and spiritual
                practices
              </li>
              <li>
                Preserving and promoting Hindu traditions, festivals, and
                cultural heritage
              </li>
              <li>
                Educating the next generation about Hindu philosophy, scriptures,
                and values
              </li>
              <li>
                Building a strong, inclusive community that supports all members
              </li>
              <li>
                Serving as a bridge between different cultures and fostering
                interfaith understanding
              </li>
            </ul>
          </section>

          {/* History Section */}
          <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm">
            <h2 className="font-serif text-3xl font-semibold text-text-primary mb-4">
              Our History
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Vishnu Mandir, Tampa has been serving the Hindu community in the
              Tampa Bay area since 2003. Originally located in Ybor City's Palm
              Avenue, our temple relocated to Lynn Road to better serve our
              growing community and accommodate the increasing number of devotees.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              Over the years, we have established ourselves as a center for
              Hindu worship, education, and cultural activities. We follow the
              practices and doctrines of Hinduism, observing a wide range of
              Hindu rites and ceremonies including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary leading-relaxed ml-4">
              <li>
                <strong>Aarti:</strong> Daily prayer ceremonies with lamps and
                incense
              </li>
              <li>
                <strong>Sanskaaras:</strong> Traditional life-cycle ceremonies
              </li>
              <li>
                <strong>Havans:</strong> Sacred fire rituals
              </li>
              <li>
                <strong>Bhoomi Pujan:</strong> Ground-breaking ceremonies
              </li>
              <li>
                <strong>Yagyopaveet:</strong> Thread ceremony (sacred thread
                initiation)
              </li>
              <li>
                <strong>Namakaran:</strong> Naming ceremonies for newborns
              </li>
              <li>
                <strong>Vivah:</strong> Marriage ceremonies
              </li>
            </ul>
            <p className="text-text-secondary leading-relaxed mt-4">
              Today, Vishnu Mandir continues to grow and evolve, always staying
              true to our core values of devotion, community, and service.
            </p>
          </section>

          {/* Services Overview */}
          <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm">
            <h2 className="font-serif text-3xl font-semibold text-text-primary mb-4">
              What We Offer
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Vishnu Mandir, Tampa provides a comprehensive range of services
              and programs for the Hindu community:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-serif text-xl font-semibold text-text-primary mb-2">
                  Religious Services
                </h3>
                <ul className="list-disc list-inside space-y-1 text-text-secondary ml-4">
                  <li>Daily puja schedules</li>
                  <li>Puja services catalog</li>
                  <li>Festival celebrations</li>
                  <li>Priest services</li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-text-primary mb-2">
                  Community Programs
                </h3>
                <ul className="list-disc list-inside space-y-1 text-text-secondary ml-4">
                  <li>Cultural events and performances</li>
                  <li>Educational classes</li>
                  <li>Youth programs</li>
                  <li>Volunteer opportunities</li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/religious/puja-schedule"
                className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
              >
                View Puja Schedule →
              </Link>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
            <h2 className="font-serif text-3xl font-semibold text-text-primary mb-4">
              Visit Us
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We welcome all devotees to visit Vishnu Mandir, Tampa. Whether
              you're seeking spiritual guidance, participating in worship, or
              simply exploring Hindu culture, our doors are open to you.
            </p>
            <div className="space-y-2 text-text-secondary mb-6">
              <p>
                <strong>Address:</strong> 5803 Lynn Road, Tampa, FL 33624
              </p>
              <p>
                <strong>Phone:</strong> (813) 269-7262
              </p>
              <p>
                <strong>Email:</strong> sakeemj@live.com
              </p>
            </div>
            <Link
              href="/about/contact"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
