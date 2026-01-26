import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Calendar, BookOpen, Sparkles, Users, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Religious Services | Vishnu Mandir, Tampa - Puja, Festivals & More",
  description:
    "Explore religious services at Vishnu Mandir, Tampa including daily puja schedules, puja services catalog, festivals, prayer books, and priest services.",
  keywords: [
    "Vishnu Mandir religious services",
    "Hindu puja Tampa",
    "Tampa temple puja schedule",
    "Hindu festivals Tampa",
    "puja services Florida",
  ],
  openGraph: {
    title: "Religious Services | Vishnu Mandir, Tampa",
    description: "Explore our comprehensive religious services including puja schedules, festivals, and spiritual resources.",
    type: "website",
  },
};

/**
 * Religious section hub page.
 * @returns {JSX.Element} The rendered religious hub page
 */
export default function ReligiousPage() {
  const structuredData = generateWebPageSchema({
    name: "Religious Services",
    description:
      "Religious services and spiritual resources at Vishnu Mandir, Tampa",
    url: "/religious",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Religious Services
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Explore our comprehensive religious services, puja schedules,
          festivals, and spiritual resources.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <p className="text-text-secondary leading-relaxed mb-4">
            At Vishnu Mandir, Tampa, we offer a wide range of religious services
            to support your spiritual journey. From daily puja schedules to
            special ceremonies, festivals, and educational resources, we are
            committed to serving the Hindu community with devotion and
            authenticity.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Our temple follows traditional Hindu practices and doctrines,
            observing various rites and ceremonies including Aarti, Sanskaaras,
            Havans, Bhoomi Pujan, Yagyopaveet (Thread Ceremony), Namakaran
            (Naming ceremony), and Vivah (marriage). All services are conducted
            by experienced priests dedicated to preserving and sharing our rich
            spiritual heritage.
          </p>
        </section>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link
            href="/religious/puja-schedule"
            className="group bg-white rounded-xl shadow-md p-6 border-2 border-border hover:border-primary/30 transition-all duration-300"
          >
            <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
              Puja Schedule
            </h2>
            <p className="text-text-secondary mb-4">
              View daily and weekly puja timings. Stay informed about regular
              worship services and special ceremonies.
            </p>
            <span className="text-primary font-medium group-hover:underline">
              View Schedule →
            </span>
          </Link>

          <Link
            href="/religious/puja-services"
            className="group bg-white rounded-xl shadow-md p-6 border-2 border-border hover:border-primary/30 transition-all duration-300"
          >
            <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
              Puja Services
            </h2>
            <p className="text-text-secondary mb-4">
              Browse our catalog of available puja services with descriptions,
              pricing, and sponsorship options. Services available at temple or
              off-site.
            </p>
            <span className="text-primary font-medium group-hover:underline">
              View Services →
            </span>
          </Link>

          <Link
            href="/religious/prayer-books"
            className="group bg-white rounded-xl shadow-md p-6 border-2 border-border hover:border-primary/30 transition-all duration-300"
          >
            <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
              Prayer Books
            </h2>
            <p className="text-text-secondary mb-4">
              Download prayer books, slokas, and other religious materials in
              PDF format. Enhance your spiritual practice with these resources.
            </p>
            <span className="text-primary font-medium group-hover:underline">
              View Resources →
            </span>
          </Link>

          <Link
            href="/religious/festivals"
            className="group bg-white rounded-xl shadow-md p-6 border-2 border-border hover:border-primary/30 transition-all duration-300"
          >
            <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
              Festivals
            </h2>
            <p className="text-text-secondary mb-4">
              Explore major annual festivals celebrated at our temple. Learn
              about significance, schedules, and how to participate.
            </p>
            <span className="text-primary font-medium group-hover:underline">
              View Festivals →
            </span>
          </Link>

          <Link
            href="/religious/priests"
            className="group bg-white rounded-xl shadow-md p-6 border-2 border-border hover:border-primary/30 transition-all duration-300"
          >
            <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
              Priests
            </h2>
            <p className="text-text-secondary mb-4">
              Meet our dedicated temple priests. Learn about their expertise and
              how to contact them for special services.
            </p>
            <span className="text-primary font-medium group-hover:underline">
              Meet Our Priests →
            </span>
          </Link>
        </div>

        {/* Additional Information */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Need Help?
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            If you have questions about our religious services, need to schedule
            a special ceremony, or want to learn more about any of our programs,
            please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/about/contact"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
            >
              Contact Us
            </Link>
            <Link
              href="/forms/puja-sponsorships"
              className="inline-block px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors text-center"
            >
              Sponsor a Puja
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
