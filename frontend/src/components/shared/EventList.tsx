import { Calendar } from "lucide-react";
import { EventCard } from "./EventCard";
import type { StrapiEvent } from "@/types/strapi";

interface EventListProps {
  events: StrapiEvent[];
  emptyMessage?: string;
}

/**
 * EventList component - Displays a list of events.
 * @param {EventListProps} props - Component props
 * @returns {JSX.Element} The rendered event list
 */
export function EventList({
  events,
  emptyMessage = "No events found. Check back soon for upcoming events.",
}: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-primary/40 mx-auto mb-4" />
        <p className="text-text-secondary dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} showDescription={false} />
      ))}
    </div>
  );
}
