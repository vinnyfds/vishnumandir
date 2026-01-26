import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { BookOpen, Calendar, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Education Programs | Vishnu Mandir, Tampa - Classes, Events & Resources",
  description:
    "Explore educational programs at Vishnu Mandir, Tampa including Sanskrit classes, Hindu scripture study, music lessons, workshops, and learning resources for all ages.",
  keywords: [
    "Hindu education Tampa",
    "Sanskrit classes Tampa",
    "Hindu scripture study",
    "Tampa temple education",
    "cultural education programs",
  ],
  openGraph: {
    title: "Education Programs | Vishnu Mandir, Tampa",
    description: "Educational programs, classes, events, and resources for all ages.",
    type: "website",
  },
};

/**
 * Education section hub page.
 * @returns {JSX.Element} The rendered education hub page
 */
export default function EducationPage() {
  const structuredData = generateWebPageSchema({
    name: "Education Programs",
    description:
      "Educational programs at Vishnu Mandir, Tampa",
    url: "/education",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Education Programs
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Explore our educational programs, classes, workshops, and resources for
          all ages.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Nurturing Knowledge & Culture
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Vishnu Mandir, Tampa is committed to preserving and sharing Hindu
                knowledge, culture, and traditions through comprehensive
                educational programs. We offer classes, workshops, and resources
                for children, youth, and adults, helping our community connect
                with their heritage and deepen their spiritual understanding.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Our educational programs include Sanskrit language classes, Hindu
                scripture study, music and cultural arts, philosophy discussions,
                and youth programs. All programs are designed to be engaging,
                accessible, and meaningful for participants of all backgrounds.
              </p>
            </div>
          </div>
        </section>

        {/* Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/education/classes"
            className="group bg-white rounded-xl shadow-md p-6 border-2 border-border hover:border-primary/30 transition-all duration-300"
          >
            <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
              Classes
            </h2>
            <p className="text-text-secondary mb-4">
              Language, religion, music, and other classes for all ages. Learn
              Sanskrit, study Hindu scriptures, or explore cultural arts.
            </p>
            <span className="text-primary font-medium group-hover:underline">
              View Classes →
            </span>
          </Link>

          <Link
            href="/education/events"
            className="group bg-white rounded-xl shadow-md p-6 border-2 border-border hover:border-primary/30 transition-all duration-300"
          >
            <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
              Events
            </h2>
            <p className="text-text-secondary mb-4">
              Educational events, workshops, and seminars. Join guest lectures,
              special workshops, and learning sessions.
            </p>
            <span className="text-primary font-medium group-hover:underline">
              View Events →
            </span>
          </Link>

          <Link
            href="/education/resources"
            className="group bg-white rounded-xl shadow-md p-6 border-2 border-border hover:border-primary/30 transition-all duration-300"
          >
            <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
              Resources
            </h2>
            <p className="text-text-secondary mb-4">
              Educational materials, reading lists, and learning resources.
              Access study materials and educational content.
            </p>
            <span className="text-primary font-medium group-hover:underline">
              View Resources →
            </span>
          </Link>
        </div>

        {/* Additional Information */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Get Involved
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Whether you're interested in learning Sanskrit, studying Hindu
            scriptures, exploring cultural arts, or participating in educational
            workshops, we have programs to suit your interests and schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/about/contact"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
            >
              Contact Us
            </Link>
            <Link
              href="/calendar"
              className="inline-block px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors text-center"
            >
              View Calendar
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
