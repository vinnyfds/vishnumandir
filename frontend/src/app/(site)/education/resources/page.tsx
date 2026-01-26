import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { FileText, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Educational Resources | Vishnu Mandir, Tampa - Learning Materials",
  description:
    "Access educational materials, reading lists, and learning resources from Vishnu Mandir, Tampa. Find study guides, recommended readings, and educational content.",
  keywords: [
    "Hindu education resources",
    "temple learning materials",
    "Hindu scripture resources",
    "educational content Tampa",
  ],
  openGraph: {
    title: "Educational Resources | Vishnu Mandir, Tampa",
    description: "Educational materials, reading lists, and learning resources.",
    type: "website",
  },
};

/**
 * Education Resources page - Educational materials and resources.
 * @returns {JSX.Element} The rendered education resources page
 */
export default function EducationResourcesPage() {
  const structuredData = generateWebPageSchema({
    name: "Educational Resources",
    description:
      "Educational materials and resources from Vishnu Mandir, Tampa",
    url: "/education/resources",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Educational Resources
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Access educational materials, reading lists, and learning resources.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Learning Resources
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Vishnu Mandir, Tampa provides educational resources to support
                your learning journey. These resources complement our classes and
                events, helping you deepen your understanding of Hindu philosophy,
                culture, and practices.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Our resources include recommended reading lists, study guides,
                educational materials, and links to helpful content. We're
                continuously adding new resources to support learners of all
                levels.
              </p>
            </div>
          </div>
        </section>

        {/* Resources Placeholder */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Available Resources
          </h2>
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-primary/40 mx-auto mb-4" />
            <p className="text-text-secondary mb-4">
              Educational resources will be available here. Check back soon for
              reading lists, study materials, and learning guides.
            </p>
            <p className="text-text-secondary text-sm">
              Resources are regularly updated. Contact us for specific resource
              recommendations.
            </p>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Resource Categories
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-text-primary">
                  Scripture Study
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Resources for studying Hindu scriptures including translations,
                commentaries, and study guides for Bhagavad Gita, Ramayana, and
                other texts.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-text-primary">
                  Sanskrit Learning
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Materials for learning Sanskrit including textbooks, grammar
                guides, vocabulary lists, and practice exercises.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-text-primary">
                  Philosophy & Culture
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Resources on Hindu philosophy, cultural practices, traditions, and
                their significance in modern life.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-text-primary">
                  Youth Resources
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Age-appropriate materials and resources designed for children and
                youth to learn about Hindu culture and values.
              </p>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Get Help Finding Resources
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            If you're looking for specific resources or need recommendations for
            your learning journey, please don't hesitate to contact us. Our
            instructors and staff can help guide you to appropriate materials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/about/contact"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
            >
              Contact Us
            </Link>
            <Link
              href="/education/classes"
              className="inline-block px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors text-center"
            >
              View Classes
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
