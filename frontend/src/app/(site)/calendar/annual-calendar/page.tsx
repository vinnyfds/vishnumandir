import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Annual Calendar | Vishnu Mandir, Tampa - Full Year Events & Festivals",
  description:
    "View the complete annual calendar of events, festivals, and activities at Vishnu Mandir, Tampa. Plan your participation in religious, cultural, and educational programs.",
  keywords: [
    "Vishnu Mandir calendar",
    "Tampa temple calendar",
    "Hindu festivals calendar",
    "annual events Tampa",
  ],
  openGraph: {
    title: "Annual Calendar | Vishnu Mandir, Tampa",
    description: "Complete annual calendar of events, festivals, and activities.",
    type: "website",
  },
};

/**
 * Annual Calendar page - Full year calendar view.
 * @returns {JSX.Element} The rendered annual calendar page
 */
export default function AnnualCalendarPage() {
  const structuredData = generateWebPageSchema({
    name: "Annual Calendar",
    description:
      "Annual calendar of events and festivals at Vishnu Mandir, Tampa",
    url: "/calendar/annual-calendar",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Annual Calendar
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          View the complete annual calendar of events, festivals, and activities.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Plan Your Year with Us
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                The annual calendar at Vishnu Mandir, Tampa provides a
                comprehensive overview of all events, festivals, and activities
                throughout the year. Use this calendar to plan your participation
                in religious services, cultural programs, educational workshops,
                and community celebrations.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Our calendar includes major Hindu festivals, regular puja
                schedules, special ceremonies, cultural events, educational
                programs, and community activities. Dates and times are subject to
                change, especially for festivals that follow the lunar calendar,
                so please verify specific dates closer to the event.
              </p>
            </div>
          </div>
        </section>

        {/* Calendar Placeholder */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Full Year Calendar
          </h2>
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-primary/40 mx-auto mb-4" />
            <p className="text-text-secondary mb-4">
              Interactive annual calendar will be displayed here. The calendar
              will show all events, festivals, and activities throughout the
              year with filtering options by category.
            </p>
            <p className="text-text-secondary text-sm">
              Calendar is regularly updated. Check back for the latest schedule
              or contact us for specific dates.
            </p>
          </div>
        </section>

        {/* Calendar Categories */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Calendar Categories
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
                <li>Major Hindu festivals (Diwali, Navratri, etc.)</li>
                <li>Deity-specific celebrations</li>
                <li>Special ceremonies and Havans</li>
                <li>Life-cycle ceremonies</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-text-primary">
                  Cultural & Educational
                </h3>
              </div>
              <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm ml-4">
                <li>Cultural programs and performances</li>
                <li>Educational classes and workshops</li>
                <li>Youth programs</li>
                <li>Community gatherings</li>
                <li>Special events and fundraisers</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Important Notes
          </h2>
          <div className="space-y-4 text-text-secondary">
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Festival Dates
              </h3>
              <p className="text-sm leading-relaxed">
                Many Hindu festivals follow the lunar calendar, so dates may vary
                from year to year. Festival dates are typically announced several
                months in advance. Please check our current events page or
                contact the temple for confirmed dates.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Schedule Changes
              </h3>
              <p className="text-sm leading-relaxed">
                Event schedules may change due to various factors. We recommend
                verifying dates and times closer to the event, especially for
                special ceremonies and programs.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Regular Services
              </h3>
              <p className="text-sm leading-relaxed">
                Daily puja services follow a regular schedule, but times may
                adjust during festivals or special occasions. Check our puja
                schedule page for current timings.
              </p>
            </div>
          </div>
        </section>

        {/* Stay Updated */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Stay Updated
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            To ensure you have the most current calendar information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4 mb-6">
            <li>Check our current events page for upcoming activities</li>
            <li>Subscribe to our newsletter for calendar updates</li>
            <li>Contact us at (813) 269-7262 for specific date confirmations</li>
            <li>Visit the temple for posted calendar schedules</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/calendar/current-events"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
            >
              View Current Events
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
