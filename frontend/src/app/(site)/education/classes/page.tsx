import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { BookOpen, Users, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Educational Classes | Vishnu Mandir, Tampa - Sanskrit, Scripture & More",
  description:
    "Learn about educational classes at Vishnu Mandir, Tampa including Sanskrit language, Hindu scriptures, music, cultural arts, and classes for all ages.",
  keywords: [
    "Sanskrit classes Tampa",
    "Hindu scripture study",
    "Tampa temple classes",
    "cultural education classes",
  ],
  openGraph: {
    title: "Educational Classes | Vishnu Mandir, Tampa",
    description: "Educational classes including Sanskrit, Hindu scriptures, music, and cultural arts.",
    type: "website",
  },
};

/**
 * Education Classes page - Details on classes and workshops.
 * @returns {JSX.Element} The rendered education classes page
 */
export default function EducationClassesPage() {
  const structuredData = generateWebPageSchema({
    name: "Educational Classes",
    description:
      "Educational classes at Vishnu Mandir, Tampa",
    url: "/education/classes",
  });

  const classes = [
    {
      name: "Sanskrit Language",
      description:
        "Learn Sanskrit, the ancient language of Hindu scriptures. Classes available for beginners to advanced levels.",
      audience: "All ages",
    },
    {
      name: "Hindu Scriptures",
      description:
        "Study Hindu scriptures including Bhagavad Gita, Ramayana, Mahabharata, and Upanishads with guided instruction.",
      audience: "Youth & Adults",
    },
    {
      name: "Music & Bhajans",
      description:
        "Learn devotional music, bhajans, and traditional Indian music. Classes for vocal and instrumental music.",
      audience: "All ages",
    },
    {
      name: "Cultural Arts",
      description:
        "Explore traditional Indian dance, art, and cultural practices. Classes help preserve and share our rich heritage.",
      audience: "Children & Youth",
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
          Educational Classes
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Learn about our educational classes including language, religion, music,
          and more.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Comprehensive Learning Opportunities
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Vishnu Mandir, Tampa offers a variety of educational classes
                designed to help students of all ages learn about Hindu
                philosophy, culture, language, and arts. Our classes are taught by
                experienced instructors who are passionate about sharing knowledge
                and preserving our traditions.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Classes are typically held on weekends or weekday evenings to
                accommodate various schedules. Registration information and
                schedules are announced in advance, and new students are always
                welcome.
              </p>
            </div>
          </div>
        </section>

        {/* Classes Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {classes.map((classItem, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border-2 border-primary/5 shadow-warm"
            >
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="font-serif text-xl font-semibold text-text-primary">
                  {classItem.name}
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {classItem.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Users className="w-4 h-4 text-primary" />
                <span>{classItem.audience}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Registration */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Class Registration
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            To register for classes or learn more about schedules, fees, and
            requirements:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4 mb-6">
            <li>Contact us at (813) 269-7262</li>
            <li>Email sakeemj@live.com with your class interest</li>
            <li>Check our calendar for class schedules and registration dates</li>
            <li>Visit the temple during office hours to speak with instructors</li>
          </ul>
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

        {/* Additional Information */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Benefits of Our Classes
          </h2>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
            <li>Learn from experienced and dedicated instructors</li>
            <li>Connect with fellow students and community members</li>
            <li>Deepen your understanding of Hindu philosophy and culture</li>
            <li>Preserve and pass on traditions to future generations</li>
            <li>Build a strong foundation in Sanskrit and scriptures</li>
          </ul>
        </section>
      </main>
    </>
  );
}
