import type { Metadata } from "next";
import Link from "next/link";
import { generatePlaceSchema } from "@/lib/seo";
import { MapPin, Navigation, Car, Bus } from "lucide-react";

export const metadata: Metadata = {
  title: "Location & Directions | Vishnu Mandir, Tampa - Map & Parking",
  description:
    "Find Vishnu Mandir, Tampa at 5803 Lynn Road, Tampa, FL 33624. Get directions, view map, and learn about parking and transportation options.",
  keywords: [
    "Vishnu Mandir Tampa location",
    "Hindu temple Tampa directions",
    "5803 Lynn Road Tampa",
    "Tampa temple map",
    "Vishnu Mandir parking",
  ],
  openGraph: {
    title: "Location & Directions | Vishnu Mandir, Tampa",
    description: "Find us at 5803 Lynn Road, Tampa, FL 33624. Get directions and parking information.",
    type: "website",
  },
};

/**
 * Location page - Map and directions.
 * @returns {JSX.Element} The rendered location page
 */
export default function LocationPage() {
  const structuredData = generatePlaceSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Location & Directions
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Find Vishnu Mandir, Tampa and plan your visit with ease.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Address & Map */}
          <div className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm">
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
              Our Address
            </h2>
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-text-secondary leading-relaxed text-lg">
                  <strong>Vishnu Mandir, Tampa</strong>
                  <br />
                  5803 Lynn Road
                  <br />
                  Tampa, FL 33624
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
              <div className="text-center text-text-secondary">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-primary/40" />
                <p className="text-sm">Interactive map will be displayed here</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=5803+Lynn+Road+Tampa+FL+33624"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 text-sm mt-2 inline-block"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Directions */}
          <div className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm">
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
              Getting Here
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Car className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-text-primary">By Car</h3>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Vishnu Mandir is located on Lynn Road in Tampa. From I-275,
                  take exit 45B for Hillsborough Avenue, then head west. Turn
                  onto Lynn Road and continue until you reach 5803 Lynn Road.
                  Ample parking is available on-site.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Bus className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-text-primary">
                    Public Transportation
                  </h3>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  HART (Hillsborough Area Regional Transit) bus routes serve the
                  area. Please check the HART website for current routes and
                  schedules. The nearest bus stop is within walking distance of
                  the temple.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Navigation className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-text-primary">
                    GPS Navigation
                  </h3>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Use GPS coordinates or search for "Vishnu Mandir Tampa" or
                  "5803 Lynn Road, Tampa, FL 33624" in your navigation app.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Parking Information */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Parking Information
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Vishnu Mandir, Tampa provides convenient on-site parking for all
            visitors. Parking is free and available during all temple hours and
            events. During major festivals and special events, additional
            parking may be available nearby.
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
            <li>Free on-site parking available</li>
            <li>Handicap accessible parking spaces provided</li>
            <li>Ample space for regular services and events</li>
            <li>Additional parking may be available during major festivals</li>
          </ul>
        </section>

        {/* Nearby Attractions */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Nearby Information
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Vishnu Mandir is conveniently located in Tampa with easy access to
            major highways and local amenities. The temple is part of the vibrant
            Tampa Bay Hindu community, with several other Hindu temples and
            cultural centers in the area.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Nearby Services
              </h3>
              <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm ml-4">
                <li>Restaurants and dining options</li>
                <li>Shopping centers</li>
                <li>Hotels and accommodations</li>
                <li>Medical facilities</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Other Hindu Temples
              </h3>
              <p className="text-text-secondary text-sm">
                The Tampa Bay area is home to several Hindu temples, each
                serving the community with unique traditions and services.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="mt-8 text-center">
          <p className="text-text-secondary mb-4">
            Need help finding us or have questions about visiting?
          </p>
          <Link
            href="/about/contact"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </main>
    </>
  );
}
