import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { getStrapiImageUrl, formatDate, formatTime } from "@/lib/strapi-utils";
import type { StrapiEvent } from "@/types/strapi";

interface EventCardProps {
  event: StrapiEvent;
  showDescription?: boolean;
}

/**
 * EventCard component - Displays an event in a card format.
 * @param {EventCardProps} props - Component props
 * @returns {JSX.Element} The rendered event card
 */
export function EventCard({ event, showDescription = false }: EventCardProps) {
  const { attributes } = event;
  const imageUrl = getStrapiImageUrl(attributes.image);

  // Format date and time
  const eventDate = formatDate(attributes.date);
  const startTime = formatTime(attributes.startTime);
  const endTime = attributes.endTime
    ? ` - ${formatTime(attributes.endTime)}`
    : "";

  // Get category color
  const categoryColors = {
    Religious: "bg-primary/10 text-primary border-primary/20",
    Cultural: "bg-secondary/10 text-secondary border-secondary/20",
    Educational: "bg-accent/10 text-accent border-accent/20",
    Festival: "bg-primary/10 text-primary border-primary/20",
  };

  const categoryColor =
    categoryColors[attributes.category] ||
    "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-primary/5 shadow-warm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
      {imageUrl && (
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={attributes.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <h3 className="font-serif text-xl font-semibold text-text-primary dark:text-gray-100">
          {attributes.title}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColor} whitespace-nowrap ml-2`}
        >
          {attributes.category}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-text-secondary dark:text-gray-400">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-sm">{eventDate}</span>
        </div>

        <div className="flex items-center gap-2 text-text-secondary dark:text-gray-400">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm">
            {startTime}
            {endTime}
          </span>
        </div>

        {attributes.location && (
          <div className="flex items-center gap-2 text-text-secondary dark:text-gray-400">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm">{attributes.location}</span>
          </div>
        )}
      </div>

      {showDescription && attributes.description && (
        <div className="text-text-secondary text-sm leading-relaxed mb-4 dark:text-gray-400">
          {typeof attributes.description === "string" &&
          attributes.description.startsWith("<") ? (
            <div
              dangerouslySetInnerHTML={{
                __html: attributes.description,
              }}
            />
          ) : (
            <p>{String(attributes.description)}</p>
          )}
        </div>
      )}

      {attributes.registrationLink && (
        <Link
          href={attributes.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
        >
          Register
          <ExternalLink className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
