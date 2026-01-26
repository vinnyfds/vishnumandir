import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Camera, Video, Image as ImageIcon, Music } from "lucide-react";

export const metadata: Metadata = {
  title: "Cultural Media Gallery | Vishnu Mandir, Tampa - Photos & Videos",
  description:
    "Browse photo and video galleries from cultural events, music performances, and dance shows at Vishnu Mandir, Tampa. Relive memorable moments from past celebrations.",
  keywords: [
    "temple photo gallery",
    "cultural event photos",
    "Hindu temple videos",
    "Tampa temple media",
  ],
  openGraph: {
    title: "Cultural Media Gallery | Vishnu Mandir, Tampa",
    description: "Photo and video galleries from cultural events and performances.",
    type: "website",
  },
};

/**
 * Cultural Media page - Photo and video galleries.
 * @returns {JSX.Element} The rendered cultural media page
 */
export default function CulturalMediaPage() {
  const structuredData = generateWebPageSchema({
    name: "Cultural Media Gallery",
    description:
      "Photo and video galleries from cultural events at Vishnu Mandir, Tampa",
    url: "/cultural/media",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Cultural Media Gallery
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Browse photo and video galleries from our cultural events and
          performances.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Relive Memorable Moments
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Our media gallery captures the vibrant cultural programs,
                performances, and celebrations at Vishnu Mandir, Tampa. Browse
                through photos and videos from past events including music
                concerts, dance performances, festival celebrations, and community
                gatherings.
              </p>
              <p className="text-text-secondary leading-relaxed">
                These galleries help preserve memories of our community
                celebrations and allow those who couldn't attend to experience the
                joy and beauty of our cultural programs.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Placeholder */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Photo & Video Galleries
          </h2>
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-primary/40 mx-auto mb-4" />
            <p className="text-text-secondary mb-4">
              Media galleries will be displayed here. Check back soon for photos
              and videos from our cultural events and performances.
            </p>
            <p className="text-text-secondary text-sm">
              Galleries are regularly updated with new content from recent events.
            </p>
          </div>
        </section>

        {/* Gallery Categories */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Gallery Categories
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <ImageIcon className="w-5 h-5 text-primary" aria-hidden />
                <h3 className="font-semibold text-text-primary">Festivals</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Photos and videos from major festival celebrations including
                Diwali, Navratri, and other special occasions.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Music className="w-5 h-5 text-primary" aria-hidden />
                <h3 className="font-semibold text-text-primary">Music</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Recordings and photos from music concerts, bhajan sessions, and
                devotional music performances.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Video className="w-5 h-5 text-primary" aria-hidden />
                <h3 className="font-semibold text-text-primary">Dance</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Videos and photos from dance performances, cultural shows, and
                traditional dance presentations.
              </p>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Share Your Photos
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            If you have photos or videos from temple events that you'd like to
            share, please contact us. We're always happy to add community
            contributions to our gallery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/about/contact"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
            >
              Contact Us
            </Link>
            <Link
              href="/cultural"
              className="inline-block px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors text-center"
            >
              Cultural Programs
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
