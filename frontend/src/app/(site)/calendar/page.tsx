import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { fetchEvents } from "@/lib/strapi";
import { isFutureEvent } from "@/lib/strapi-utils";

export const metadata: Metadata = {
  title: "Calendar | Vishnu Mandir, Tampa - Events & Activities",
  description:
    "Explore the Vishnu Mandir, Tampa calendar with daily puja schedules, festivals, cultural programs, and educational events.",
  keywords: [
    "Vishnu Mandir calendar",
    "Tampa temple calendar",
    "Hindu events calendar",
    "puja schedule",
  ],
  openGraph: {
    title: "Calendar | Vishnu Mandir, Tampa",
    description: "Explore events, puja schedules, and cultural programs at Vishnu Mandir, Tampa.",
    type: "website",
  },
};

// ISR revalidation: 5 minutes
export const revalidate = 300;

/**
 * Calendar hub page - Main calendar view with links to sub-pages and event summaries.
 * @returns {JSX.Element} The rendered calendar page
 */
export default async function CalendarPage() {
  const structuredData = generateWebPageSchema({
    name: "Calendar",
    description: "Vishnu Mandir, Tampa - Events & Activities Calendar",
    url: "/calendar",
  });

  // Fetch upcoming events for display
  const allEvents = await fetchEvents({
    publishedAt: true,
    sort: "date:asc",
  });

  const upcomingEvents = allEvents
    .filter((event) => {
      if (!event?.attributes?.date || !event?.attributes?.startTime) {
        return false;
      }
      return isFutureEvent(event.attributes.date, event.attributes.startTime);
    })
    .slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Calendar
        </h1>
        <p className="text-xl text-text-secondary mb-12 font-serif max-w-2xl">
          Stay updated with Vishnu Mandir, Tampa's events and activities. View puja schedules,
          festivals, cultural programs, and educational opportunities.
        </p>

        {/* Calendar Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Current Events */}
          <Link
            href="/calendar/current-events"
            className="group bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Calendar className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2">
              Current Events
            </h2>
            <p className="text-text-secondary">
              Browse upcoming events and activities happening at the temple.
            </p>
          </Link>

          {/* Announcements */}
          <Link
            href="/calendar/announcements"
            className="group bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-accent/10 rounded-full text-accent">
                <Calendar className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2">
              Announcements
            </h2>
            <p className="text-text-secondary">
              View all current and past announcements from the temple.
            </p>
          </Link>

          {/* Annual Calendar */}
          <Link
            href="/calendar/annual-calendar"
            className="group bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-secondary/10 rounded-full text-secondary">
                <Calendar className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2">
              Annual Calendar
            </h2>
            <p className="text-text-secondary">
              View the full year calendar with all major festivals and celebrations.
            </p>
          </Link>

          {/* Newsletter */}
          <Link
            href="/calendar/newsletter"
            className="group bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-accent/10 rounded-full text-accent">
                <Calendar className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2">
              Newsletter Archive
            </h2>
            <p className="text-text-secondary">
              Access archived newsletters and stay informed about temple news.
            </p>
          </Link>
        </div>

        {/* Upcoming Events Preview */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Upcoming Events
          </h2>

          {upcomingEvents && upcomingEvents.length > 0 ? (
            <div className="space-y-4 mb-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg p-4 border border-primary/10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary mb-2">
                        {event.attributes?.title || "Untitled Event"}
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-4 text-sm text-text-secondary">
                        {event.attributes?.date && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(event.attributes.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        )}
                        {event.attributes?.startTime && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {event.attributes.startTime}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-secondary mb-6">
              No upcoming events at this time. Please check back soon!
            </p>
          )}

          <Link
            href="/calendar/current-events"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            View All Events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Quick Links */}
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Quick Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/religious/puja-schedule"
              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-primary/10 hover:border-primary/30 transition-colors group"
            >
              <Clock className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-medium text-text-primary group-hover:text-primary transition-colors">
                Daily Puja Schedule
              </span>
            </Link>
            <Link
              href="/religious/festivals"
              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-primary/10 hover:border-primary/30 transition-colors group"
            >
              <Calendar className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-medium text-text-primary group-hover:text-primary transition-colors">
                Festivals
              </span>
            </Link>
            <Link
              href="/education/events"
              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-primary/10 hover:border-primary/30 transition-colors group"
            >
              <Calendar className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
              <span className="font-medium text-text-primary group-hover:text-primary transition-colors">
                Educational Events
              </span>
            </Link>
            <Link
              href="/cultural/media"
              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-primary/10 hover:border-primary/30 transition-colors group"
            >
              <Calendar className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
              <span className="font-medium text-text-primary group-hover:text-primary transition-colors">
                Cultural Programs
              </span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
