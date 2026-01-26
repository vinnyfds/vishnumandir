import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Calendar, Users } from "lucide-react";
import { fetchEvents } from "@/lib/strapi";
import { EventList } from "@/components/shared/EventList";
import { isFutureEvent } from "@/lib/strapi-utils";

export const metadata: Metadata = {
  title: "Educational Events | Vishnu Mandir, Tampa - Workshops & Seminars",
  description:
    "Discover educational events, workshops, and seminars at Vishnu Mandir, Tampa. Join guest lectures, special workshops, and learning sessions.",
  keywords: [
    "Hindu education events Tampa",
    "temple workshops",
    "educational seminars",
    "Tampa temple events",
  ],
  openGraph: {
    title: "Educational Events | Vishnu Mandir, Tampa",
    description: "Educational events, workshops, and seminars for all ages.",
    type: "website",
  },
};

// ISR revalidation: 5 minutes
export const revalidate = 300;

/**
 * Education Events page - Educational events and workshops.
 * @returns {JSX.Element} The rendered education events page
 */
export default async function EducationEventsPage() {
  // Fetch educational events
  const allEvents = await fetchEvents({
    category: "Educational",
    publishedAt: true,
    sort: "date:asc",
  });

  // Filter for future events only
  const futureEvents = allEvents.filter((event) =>
    isFutureEvent(event.attributes.date, event.attributes.startTime)
  );
  const structuredData = generateWebPageSchema({
    name: "Educational Events",
    description:
      "Educational events and workshops at Vishnu Mandir, Tampa",
    url: "/education/events",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Educational Events
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Discover upcoming educational events, workshops, and seminars.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Learning Through Events
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Vishnu Mandir, Tampa regularly hosts educational events,
                workshops, and seminars to enhance learning and community
                engagement. These events provide opportunities to explore Hindu
                philosophy, culture, and practices in depth.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Our educational events include guest lectures by scholars,
                interactive workshops, study groups, youth programs, and special
                learning sessions. Events are typically open to all community
                members and are designed to be accessible and engaging.
              </p>
            </div>
          </div>
        </section>

        {/* Events List */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Upcoming Educational Events
          </h2>
          <EventList
            events={futureEvents}
            emptyMessage="Educational events will be listed here. Check back soon for upcoming workshops, seminars, and learning sessions."
          />
        </section>

        {/* Event Types */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Types of Educational Events
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-text-primary">
                  Guest Lectures
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Learn from visiting scholars, spiritual leaders, and experts who
                share insights on Hindu philosophy, scriptures, and practices.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-text-primary">Workshops</h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Interactive workshops on topics such as meditation, yoga,
                scripture study, and cultural practices.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-text-primary">Study Groups</h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Regular study groups for reading and discussing Hindu scriptures
                and philosophical texts.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-text-primary">Youth Programs</h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Special educational programs designed for children and youth to
                learn about their heritage in engaging ways.
              </p>
            </div>
          </div>
        </section>

        {/* Stay Updated */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Stay Informed
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            To stay updated on educational events:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4 mb-6">
            <li>Check our calendar for upcoming events</li>
            <li>Subscribe to our newsletter for event announcements</li>
            <li>Contact us at (813) 269-7262 for specific event information</li>
            <li>Visit the temple for posted event schedules</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/calendar"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
            >
              View Calendar
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
