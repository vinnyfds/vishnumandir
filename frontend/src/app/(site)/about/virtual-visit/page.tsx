import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Camera, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Virtual Visit | Vishnu Mandir, Tampa - Virtual Temple Tour",
  description:
    "Take a virtual tour of Vishnu Mandir, Tampa. Explore our temple facilities, deities, and sacred spaces from the comfort of your home.",
  keywords: [
    "Vishnu Mandir virtual tour",
    "Tampa temple virtual visit",
    "Hindu temple online tour",
    "virtual temple experience",
  ],
  openGraph: {
    title: "Virtual Visit | Vishnu Mandir, Tampa",
    description: "Explore Vishnu Mandir, Tampa through our virtual tour experience.",
    type: "website",
  },
};

/**
 * Virtual Visit page - Virtual tour of the temple.
 * @returns {JSX.Element} The rendered virtual visit page
 */
export default function VirtualVisitPage() {
  const structuredData = generateWebPageSchema({
    name: "Virtual Visit",
    description:
      "Virtual tour of Vishnu Mandir, Tampa - explore the temple online",
    url: "/about/virtual-visit",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Virtual Visit to Vishnu Mandir, Tampa
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Explore our temple and sacred spaces through our virtual tour
          experience.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Experience Our Temple Virtually
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                While there's nothing quite like visiting Vishnu Mandir in
                person, our virtual tour allows you to explore our temple
                facilities, deities, and sacred spaces from anywhere in the
                world. This is especially helpful for those who cannot visit in
                person or want to familiarize themselves with the temple before
                their first visit.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Through our virtual tour, you can see the main prayer hall,
                deity shrines, community spaces, and other areas of the temple.
                We're continuously working to enhance this experience with more
                interactive features and updated imagery.
              </p>
            </div>
          </div>
        </section>

        {/* Virtual Tour Placeholder */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Interactive Virtual Tour
          </h2>
          <div className="bg-gray-100 rounded-lg h-96 flex flex-col items-center justify-center mb-6">
            <Camera className="w-16 h-16 text-primary/40 mb-4" />
            <p className="text-text-secondary text-center max-w-md">
              Virtual tour interface will be displayed here. This feature is
              currently under development and will include 360-degree views of
              the temple, interactive navigation, and detailed information about
              each area.
            </p>
          </div>
          <p className="text-sm text-text-secondary text-center">
            Virtual tour coming soon. Check back for updates!
          </p>
        </section>

        {/* Temple Areas */}
        <section className="mb-12">
          <h2 className="font-serif text-3xl font-semibold text-text-primary mb-8">
            Explore Temple Areas
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl overflow-hidden border-2 border-primary/5 shadow-warm">
              <div className="relative h-48">
                <Image
                  src="/images/temple/temple-main-prayer-hall.jpg"
                  alt="Main prayer hall at Vishnu Mandir, Tampa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-text-primary mb-3">
                  Main Prayer Hall
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  The heart of our temple, where daily puja services and major
                  ceremonies take place. Experience the serene atmosphere and
                  beautiful architecture.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden border-2 border-primary/5 shadow-warm">
              <div className="relative h-48">
                <Image
                  src="/images/temple/temple-deity-shrines.jpeg"
                  alt="Deity shrines at Vishnu Mandir, Tampa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-text-primary mb-3">
                  Deity Shrines
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Visit the sacred shrines dedicated to various Hindu deities. Each
                  shrine is beautifully decorated and holds special significance.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-primary/5 shadow-warm">
              <h3 className="font-serif text-xl font-semibold text-text-primary mb-3">
                Community Spaces
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Explore our community areas used for cultural events, educational
                programs, and community gatherings.
              </p>
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                <Camera className="w-12 h-12 text-primary/40" />
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden border-2 border-primary/5 shadow-warm">
              <div className="relative h-48">
                <Image
                  src="/images/temple/temple-exterior.webp"
                  alt="Temple exterior and grounds at Vishnu Mandir, Tampa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-text-primary mb-3">
                  Temple Grounds
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  See our temple grounds, parking areas, and exterior spaces. The
                  temple architecture reflects traditional Hindu design principles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Visit in Person */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Visit Us in Person
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                While our virtual tour provides a glimpse of Vishnu Mandir, we
                warmly invite you to visit us in person. Experience the divine
                atmosphere, participate in puja services, and connect with our
                community. There's nothing quite like being present in the sacred
                space of the temple.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-text-secondary mb-2">
                    <strong>Address:</strong> 5803 Lynn Road, Tampa, FL 33624
                  </p>
                  <p className="text-text-secondary mb-2">
                    <strong>Phone:</strong> (813) 269-7262
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/about/location"
                    className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Get Directions
                  </Link>
                  <Link
                    href="/about/contact"
                    className="inline-block px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
