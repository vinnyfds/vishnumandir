import type { Metadata } from "next";
import { generateWebPageSchema } from "@/lib/seo";
import { fetchAnnouncements } from "@/lib/strapi";
import { AnnouncementCard } from "@/components/shared/AnnouncementCard";
import type { StrapiAnnouncement } from "@/types/strapi";

export const metadata: Metadata = {
  title: "Announcements Archive | Vishnu Mandir, Tampa",
  description:
    "View all announcements and updates from Vishnu Mandir, Tampa, including current and past announcements.",
  keywords: [
    "Vishnu Mandir announcements",
    "Temple announcements",
    "Tampa temple news",
    "announcement archive",
  ],
  openGraph: {
    title: "Announcements Archive | Vishnu Mandir, Tampa",
    description: "View all announcements and updates from Vishnu Mandir, Tampa.",
    type: "website",
  },
};

// ISR revalidation: 5 minutes (same as other pages)
export const revalidate = 300;

/**
 * Announcements Archive Page - Shows all current and past announcements
 * @returns {JSX.Element} The rendered announcements archive page
 */
export default async function AnnouncementsPage() {
  const structuredData = generateWebPageSchema({
    name: "Announcements Archive",
    description: "Vishnu Mandir, Tampa - Announcements Archive",
    url: "/calendar/announcements",
  });

  // Fetch ALL announcements (including expired ones)
  const allAnnouncements = await fetchAnnouncements({
    includeExpired: true,
  });

  // Get current date for filtering
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Separate announcements into current and past
  const currentAnnouncements: StrapiAnnouncement[] = [];
  const pastAnnouncements: StrapiAnnouncement[] = [];

  allAnnouncements.forEach((announcement) => {
    const displayUntil = announcement?.attributes?.displayUntil;

    // Current: displayUntil is null OR in the future
    if (!displayUntil) {
      currentAnnouncements.push(announcement);
    } else {
      try {
        const expiryDate = new Date(displayUntil);
        expiryDate.setHours(0, 0, 0, 0);

        if (expiryDate > today) {
          currentAnnouncements.push(announcement);
        } else {
          pastAnnouncements.push(announcement);
        }
      } catch (error) {
        // If date parsing fails, treat as current
        currentAnnouncements.push(announcement);
      }
    }
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Announcements
        </h1>
        <p className="text-xl text-text-secondary mb-12 font-serif max-w-2xl">
          Stay informed with the latest announcements from Vishnu Mandir, Tampa. Browse current
          updates and past announcements.
        </p>

        {/* Current Announcements Section */}
        <section className="mb-12">
          <h2 className="font-serif text-3xl font-semibold text-text-primary mb-6">
            Current Announcements
          </h2>

          {currentAnnouncements && currentAnnouncements.length > 0 ? (
            <div className="space-y-6">
              {currentAnnouncements.map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <p className="text-text-secondary text-center">
                No current announcements at this time. Please check back soon!
              </p>
            </div>
          )}
        </section>

        {/* Past Announcements Section */}
        {pastAnnouncements && pastAnnouncements.length > 0 && (
          <section>
            <h2 className="font-serif text-3xl font-semibold text-text-primary mb-6">
              Past Announcements
            </h2>
            <div className="space-y-6 opacity-75">
              {pastAnnouncements.map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </div>
          </section>
        )}

        {/* No Announcements at All */}
        {allAnnouncements.length === 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
            <p className="text-text-secondary text-center">
              No announcements available. Check back soon for updates!
            </p>
          </div>
        )}
      </main>
    </>
  );
}
