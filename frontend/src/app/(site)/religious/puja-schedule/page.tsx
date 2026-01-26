import type { Metadata } from "next";
import Link from "next/link";
import { generateWebPageSchema } from "@/lib/seo";
import { Clock, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Puja Schedule | Vishnu Mandir, Tampa - Daily & Weekly Timings",
  description:
    "View the daily and weekly puja schedule at Vishnu Mandir, Tampa. Find timings for regular worship services, Aarti, and special ceremonies.",
  keywords: [
    "Vishnu Mandir puja schedule",
    "Hindu temple daily puja Tampa",
    "Tampa temple worship schedule",
    "puja timings Florida",
    "daily Aarti schedule",
  ],
  openGraph: {
    title: "Puja Schedule | Vishnu Mandir, Tampa",
    description: "Daily and weekly puja schedule and worship timings at Vishnu Mandir, Tampa.",
    type: "website",
  },
};

/**
 * Puja Schedule page - Daily and weekly puja timings.
 * @returns {JSX.Element} The rendered puja schedule page
 */
export default function PujaSchedulePage() {
  const structuredData = generateWebPageSchema({
    name: "Puja Schedule",
    description:
      "Daily and weekly puja schedule at Vishnu Mandir, Tampa",
    url: "/religious/puja-schedule",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Puja Schedule
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          View the daily and weekly puja schedule at Vishnu Mandir, Tampa.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Regular Worship Schedule
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Vishnu Mandir, Tampa conducts regular puja services throughout
                the week. Our schedule includes daily Aarti, special deity pujas,
                and weekly ceremonies. Please note that timings may vary during
                festivals and special events.
              </p>
              <p className="text-text-secondary leading-relaxed">
                For the most current schedule, especially during festival seasons,
                please contact us at (813) 269-7262 or check our calendar for
                upcoming events and special services.
              </p>
            </div>
          </div>
        </section>

        {/* Schedule Table */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-6">
            Weekly Puja Schedule
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary/10">
                  <th className="border border-border px-4 py-3 text-left font-semibold text-text-primary">
                    Day
                  </th>
                  <th className="border border-border px-4 py-3 text-left font-semibold text-text-primary">
                    Time
                  </th>
                  <th className="border border-border px-4 py-3 text-left font-semibold text-text-primary">
                    Service
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-3 text-text-secondary">
                    Monday - Sunday
                  </td>
                  <td className="border border-border px-4 py-3 text-text-secondary">
                    Morning
                  </td>
                  <td className="border border-border px-4 py-3 text-text-secondary">
                    Daily Puja & Aarti
                  </td>
                </tr>
                <tr className="bg-primary/5">
                  <td className="border border-border px-4 py-3 text-text-secondary">
                    Monday - Sunday
                  </td>
                  <td className="border border-border px-4 py-3 text-text-secondary">
                    Evening
                  </td>
                  <td className="border border-border px-4 py-3 text-text-secondary">
                    Evening Aarti
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-3 text-text-secondary">
                    Special Days
                  </td>
                  <td className="border border-border px-4 py-3 text-text-secondary">
                    Varies
                  </td>
                  <td className="border border-border px-4 py-3 text-text-secondary">
                    Special Pujas & Festivals
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-text-secondary mt-4 italic">
            * Schedule is subject to change. Please contact the temple for
            current timings and special event schedules.
          </p>
        </section>

        {/* Special Services */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Special Services & Ceremonies
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            In addition to regular daily pujas, Vishnu Mandir offers various
            special services and ceremonies:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
            <li>
              <strong>Havans:</strong> Sacred fire rituals performed on special
              occasions
            </li>
            <li>
              <strong>Life-Cycle Ceremonies:</strong> Namakaran (naming),
              Yagyopaveet (thread ceremony), Vivah (marriage)
            </li>
            <li>
              <strong>Festival Pujas:</strong> Special worship services during
              major Hindu festivals
            </li>
            <li>
              <strong>Special Deity Pujas:</strong> Devotional services for
              specific deities
            </li>
            <li>
              <strong>Bhoomi Pujan:</strong> Ground-breaking ceremonies for new
              projects
            </li>
          </ul>
          <div className="mt-6">
            <Link
              href="/religious/puja-services"
              className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
            >
              View All Puja Services →
            </Link>
          </div>
        </section>

        {/* Festival Schedule */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-primary" />
            <h2 className="font-serif text-2xl font-semibold text-text-primary">
              Festival Schedule
            </h2>
          </div>
          <p className="text-text-secondary leading-relaxed mb-4">
            During major Hindu festivals, we have extended schedules with
            multiple puja services throughout the day. Festival schedules are
            announced in advance and may include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
            <li>Early morning special pujas</li>
            <li>Midday ceremonies and rituals</li>
            <li>Evening Aarti and celebrations</li>
            <li>Cultural programs and community gatherings</li>
          </ul>
          <div className="mt-6">
            <Link
              href="/religious/festivals"
              className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
            >
              View Festival Calendar →
            </Link>
          </div>
        </section>

        {/* Contact & Updates */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Stay Updated
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            For the most current puja schedule, especially during festival
            seasons or special events, please:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4 mb-6">
            <li>Contact us at (813) 269-7262</li>
            <li>Check our calendar for upcoming events</li>
            <li>Subscribe to our newsletter for schedule updates</li>
            <li>Visit our temple for posted schedules</li>
          </ul>
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
