import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Calendar, Clock, MapPin } from "lucide-react";
import { fetchEvents } from "@/lib/strapi";
import { EventList } from "@/components/shared/EventList";
import { isFutureEvent } from "@/lib/strapi-utils";

export const metadata: Metadata = {
  title: "Current Events | Vishnu Mandir, Tampa - Upcoming Events & Activities",
  description:
    "View current and upcoming events at Vishnu Mandir, Tampa including puja services, festivals, cultural programs, and educational activities.",
  keywords: [
    "Vishnu Mandir events",
    "Tampa temple events",
    "upcoming Hindu events",
    "Tampa Bay Hindu community events",
  ],
  openGraph: {
    title: "Current Events | Vishnu Mandir, Tampa",
    description: "View current and upcoming events at Vishnu Mandir, Tampa.",
    type: "website",
  },
};

// ISR revalidation: 5 minutes
export const revalidate = 300;

/**
 * Current Events page - Upcoming events and activities.
 * @returns {JSX.Element} The rendered current events page
 */
export default async function CurrentEventsPage() {
  // Fetch all published events
  const allEvents = await fetchEvents({
    publishedAt: true,
    sort: "date:asc",
  });

  // Filter for future events only
  const futureEvents = allEvents.filter((event) =>
    isFutureEvent(event.attributes.date, event.attributes.startTime)
  );
  const structuredData = generateWebPageSchema({
    name: "Current Events",
    description:
      "Current and upcoming events at Vishnu Mandir, Tampa",
    url: "/calendar/current-events",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Current Events
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          View upcoming events and activities at Vishnu Mandir, Tampa.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Stay Connected with Temple Events
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Vishnu Mandir, Tampa hosts a variety of events throughout the
                year including daily puja services, major festivals, cultural
                programs, educational workshops, and community gatherings. Stay
                informed about upcoming events to participate in our vibrant
                community activities.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Events are regularly updated, especially during festival seasons.
                Check back frequently or subscribe to our newsletter to receive
                event announcements directly.
              </p>
            </div>
          </div>
        </section>

        {/* Events List */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Upcoming Events
          </h2>
          <EventList
            events={futureEvents}
            emptyMessage="Event listings will be displayed here. Check back soon for upcoming events, or contact us for current event information."
          />
        </section>

        {/* Event Categories */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Types of Events
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-text-primary">
                  Religious Events
                </h3>
              </div>
              <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm ml-4">
                <li>Daily puja services</li>
                <li>Festival celebrations</li>
                <li>Special deity pujas</li>
                <li>Havans and ceremonies</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-text-primary">
                  Cultural Events
                </h3>
              </div>
              <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm ml-4">
                <li>Music and dance performances</li>
                <li>Cultural programs</li>
                <li>Community celebrations</li>
                <li>Art and craft exhibitions</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-text-primary">
                  Educational Events
                </h3>
              </div>
              <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm ml-4">
                <li>Classes and workshops</li>
                <li>Scripture study sessions</li>
                <li>Youth programs</li>
                <li>Guest lectures</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-text-primary">
                  Community Events
                </h3>
              </div>
              <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm ml-4">
                <li>Community meals</li>
                <li>Volunteer activities</li>
                <li>Social gatherings</li>
                <li>Fundraising events</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Stay Updated */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Stay Updated
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            To stay informed about current and upcoming events:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4 mb-6">
            <li>Check this page regularly for event updates</li>
            <li>View our annual calendar for the full year schedule</li>
            <li>Subscribe to our newsletter for event announcements</li>
            <li>Contact us at (813) 269-7262 for specific event information</li>
            <li>Visit the temple for posted event schedules</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/calendar/annual-calendar"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
            >
              View Annual Calendar
            </Link>
            <Link
              href="/calendar/newsletter"
              className="inline-block px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors text-center"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
