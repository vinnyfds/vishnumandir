import { Calendar, HelpCircle } from "lucide-react";
import Link from "next/link";
import { EventCard } from "./EventCard";
import type { StrapiEvent } from "@/types/strapi";

interface EventListProps {
  events: StrapiEvent[];
  emptyMessage?: string;
  showTroubleshootingTips?: boolean;
}

/**
 * EventList component - Displays a list of events with optional troubleshooting help.
 * @param {EventListProps} props - Component props
 * @returns {JSX.Element} The rendered event list
 */
export function EventList({
  events,
  emptyMessage = "No events found. Check back soon for upcoming events.",
  showTroubleshootingTips = true,
}: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-primary/40 mx-auto mb-4" />
        <p className="text-text-secondary dark:text-gray-400 mb-6">{emptyMessage}</p>
        
        {showTroubleshootingTips && (
          <div className="bg-primary/5 border-2 border-primary/10 rounded-lg p-6 text-left max-w-2xl mx-auto mt-8">
            <div className="flex items-start gap-3 mb-4">
              <HelpCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <h3 className="font-semibold text-text-primary">Troubleshooting</h3>
            </div>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <strong>Check event dates:</strong> Events must have a future date and time to display here.
                Currently past events are filtered out automatically.
              </li>
              <li>
                <strong>Verify in Strapi CMS:</strong> Ensure events are published and have both date and time
                fields set correctly.
              </li>
              <li>
                <strong>Cache delay:</strong> New events may take up to 5 minutes to appear due to caching.
              </li>
              <li>
                <strong>Need help?</strong> Admins can use{" "}
                <Link
                  href="/api/debug/content"
                  className="text-primary font-medium hover:underline"
                  target="_blank"
                >
                  /api/debug/content
                </Link>
                {" "}
                to see detailed event filtering analysis.
              </li>
            </ul>
          </div>
        )}
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
