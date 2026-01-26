import { Info, AlertCircle } from "lucide-react";
import type { StrapiAnnouncement } from "@/types/strapi";

interface AnnouncementCardProps {
  announcement: StrapiAnnouncement;
}

/**
 * AnnouncementCard component - Displays an announcement.
 * @param {AnnouncementCardProps} props - Component props
 * @returns {JSX.Element} The rendered announcement card
 */
export function AnnouncementCard({
  announcement,
}: AnnouncementCardProps) {
  // Guard against undefined attributes
  if (!announcement?.attributes) {
    return null;
  }

  const { attributes } = announcement;
  const isHighPriority = attributes.level === "High-Priority";

  return (
    <div
      className={`rounded-xl p-6 border-2 shadow-warm relative overflow-hidden ${
        isHighPriority
          ? "bg-accent/10 border-accent/30 dark:bg-accent/5"
          : "bg-white border-primary/5 dark:bg-gray-800 dark:border-gray-700"
      }`}
    >
      {isHighPriority && (
        <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
      )}

      <div className="flex items-start gap-4">
        <div
          className={`p-3 rounded-full flex-shrink-0 ${
            isHighPriority
              ? "bg-accent/20 text-accent"
              : "bg-primary/10 text-primary"
          }`}
        >
          {isHighPriority ? (
            <AlertCircle className="w-6 h-6" />
          ) : (
            <Info className="w-6 h-6" />
          )}
        </div>

        <div className="flex-1">
          <h3
            className={`font-serif text-xl font-semibold mb-2 ${
              isHighPriority
                ? "text-accent dark:text-accent"
                : "text-text-primary dark:text-gray-100"
            }`}
          >
            {attributes.title}
          </h3>

          <div className="text-text-secondary leading-relaxed dark:text-gray-400">
            {typeof attributes.content === "string" &&
            attributes.content.startsWith("<") ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: attributes.content,
                }}
              />
            ) : (
              <p>{String(attributes.content)}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
