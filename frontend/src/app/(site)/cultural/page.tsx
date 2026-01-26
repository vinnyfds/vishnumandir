import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Music, Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Cultural Programs | Vishnu Mandir, Tampa - Music, Dance & Performances",
  description:
    "Discover cultural programs at Vishnu Mandir, Tampa including music performances, dance shows, cultural events, and media galleries from past celebrations.",
  keywords: [
    "Hindu cultural events Tampa",
    "Indian music Tampa",
    "cultural performances",
    "Tampa temple cultural programs",
  ],
  openGraph: {
    title: "Cultural Programs | Vishnu Mandir, Tampa",
    description: "Cultural events, music, dance performances, and media galleries.",
    type: "website",
  },
};

/**
 * Cultural section hub page.
 * @returns {JSX.Element} The rendered cultural hub page
 */
export default function CulturalPage() {
  const structuredData = generateWebPageSchema({
    name: "Cultural Programs",
    description:
      "Cultural programs and events at Vishnu Mandir, Tampa",
    url: "/cultural",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Cultural Programs
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Discover cultural events, music, dance performances, and media galleries
          from past events.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Music className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Celebrating Our Rich Heritage
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Vishnu Mandir, Tampa celebrates Hindu culture through vibrant
                cultural programs including music performances, dance shows,
                traditional arts, and community celebrations. These programs
                showcase our rich heritage and bring families together in joy and
                celebration.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Our cultural events feature talented performers from the community,
                traditional and contemporary music, classical and folk dances, and
                other artistic expressions. These programs are often part of
                festival celebrations and special occasions.
              </p>
            </div>
          </div>
        </section>

        {/* Media Link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/cultural/media"
            className="group bg-white rounded-xl shadow-md p-6 border-2 border-border hover:border-primary/30 transition-all duration-300"
          >
            <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
              Media Gallery
            </h2>
            <p className="text-text-secondary mb-4">
              Browse photo and video galleries from our cultural events, music
              performances, and dance shows. Relive memorable moments from past
              celebrations.
            </p>
            <span className="text-primary font-medium group-hover:underline">
              View Gallery →
            </span>
          </Link>
        </div>

        {/* Cultural Programs */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Types of Cultural Programs
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Music Performances
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Classical and devotional music concerts featuring vocal and
                instrumental performances. Bhajans, kirtans, and traditional
                Indian music.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Dance Shows
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Traditional Indian dance performances including classical dance
                forms, folk dances, and contemporary cultural expressions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Cultural Events
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Special cultural programs, drama performances, poetry recitations,
                and other artistic expressions that celebrate our heritage.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Community Celebrations
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Cultural programs integrated into festival celebrations and
                community gatherings, bringing everyone together.
              </p>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Participate in Cultural Programs
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Cultural programs are typically held during festivals and special
            occasions. Check our calendar for upcoming cultural events, or contact
            us if you're interested in performing or organizing a cultural program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/calendar"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
            >
              View Calendar
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
