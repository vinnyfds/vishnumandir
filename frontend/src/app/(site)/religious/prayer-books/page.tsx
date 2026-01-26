import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { FileText, Download, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Prayer Books & Resources | Vishnu Mandir, Tampa - Download PDFs",
  description:
    "Download prayer books, slokas, and religious materials from Vishnu Mandir, Tampa. Access PDF resources for daily prayers, mantras, and spiritual practice.",
  keywords: [
    "Hindu prayer books Tampa",
    "prayer books PDF",
    "slokas download",
    "Hindu mantras",
    "religious resources Tampa",
  ],
  openGraph: {
    title: "Prayer Books & Resources | Vishnu Mandir, Tampa",
    description: "Download prayer books, slokas, and religious materials in PDF format.",
    type: "website",
  },
};

/**
 * Prayer Books page - Downloadable prayer books and resources.
 * @returns {JSX.Element} The rendered prayer books page
 */
export default function PrayerBooksPage() {
  const structuredData = generateWebPageSchema({
    name: "Prayer Books & Resources",
    description:
      "Downloadable prayer books and religious resources from Vishnu Mandir, Tampa",
    url: "/religious/prayer-books",
  });

  const resources = [
    {
      name: "Daily Prayers",
      description:
        "Collection of daily prayers, mantras, and slokas for morning and evening worship.",
      category: "Prayers",
    },
    {
      name: "Festival Prayers",
      description:
        "Special prayers and mantras for major Hindu festivals including Diwali, Navratri, and Janmashtami.",
      category: "Festivals",
    },
    {
      name: "Deity Slokas",
      description:
        "Devotional hymns and slokas dedicated to various Hindu deities including Vishnu, Shiva, Ganesha, and Lakshmi.",
      category: "Devotional",
    },
    {
      name: "Aarti Collection",
      description:
        "Traditional Aarti songs and prayers performed during worship ceremonies.",
      category: "Aarti",
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
          Prayer Books & Resources
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Download prayer books, slokas, and other religious materials.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Spiritual Resources for Your Practice
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Vishnu Mandir, Tampa provides downloadable prayer books, slokas,
                and religious materials to support your spiritual practice. These
                resources include daily prayers, festival prayers, devotional
                hymns, and mantras that you can use at home or during temple
                visits.
              </p>
              <p className="text-text-secondary leading-relaxed">
                All resources are available in PDF format for easy download and
                printing. We're continuously adding new materials to help enrich
                your spiritual journey.
              </p>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border-2 border-primary/5 shadow-warm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-serif text-xl font-semibold text-text-primary">
                  {resource.name}
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {resource.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary bg-primary/10 px-2 py-1 rounded">
                  {resource.category}
                </span>
                <button
                  disabled
                  className="flex items-center gap-2 text-primary font-medium opacity-50 cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  Coming Soon
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Resources Coming Soon
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            We're currently organizing and preparing our collection of prayer
            books and religious materials for download. Soon, you'll be able to
            access:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
            <li>Daily prayer collections with translations</li>
            <li>Festival-specific prayers and mantras</li>
            <li>Deity slokas and devotional hymns</li>
            <li>Aarti collections</li>
            <li>Vedic mantras and chants</li>
            <li>Scripture excerpts and teachings</li>
          </ul>
          <p className="text-text-secondary leading-relaxed mt-4">
            Check back soon or contact us at (813) 269-7262 if you need specific
            prayer materials in the meantime.
          </p>
        </section>

        {/* How to Use */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            How to Use These Resources
          </h2>
          <div className="space-y-4 text-text-secondary">
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Daily Practice
              </h3>
              <p className="text-sm leading-relaxed">
                Use daily prayer collections for your morning and evening worship
                at home. These prayers help maintain spiritual discipline and
                connect you with the divine.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Festival Preparation
              </h3>
              <p className="text-sm leading-relaxed">
                Download festival-specific prayers to prepare for major
                celebrations. Learn the mantras and slokas before attending temple
                services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Learning & Education
              </h3>
              <p className="text-sm leading-relaxed">
                These resources are excellent for learning about Hindu prayers,
                mantras, and devotional practices. Share them with family members,
                especially children, to help them learn our traditions.
              </p>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Additional Resources
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            In addition to downloadable materials, Vishnu Mandir offers other ways
            to enhance your spiritual practice:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Educational Classes
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                Learn Sanskrit, Hindu scriptures, and prayer recitation through
                our educational programs.
              </p>
              <Link
                href="/education/classes"
                className="text-primary hover:text-primary/80 text-sm"
              >
                View Classes →
              </Link>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Temple Services
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                Attend daily puja services at the temple to learn prayers and
                mantras through participation.
              </p>
              <Link
                href="/religious/puja-schedule"
                className="text-primary hover:text-primary/80 text-sm"
              >
                View Schedule →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
