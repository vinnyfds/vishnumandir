import { NextResponse } from "next/server";
import { fetchAnnouncements, fetchEvents } from "@/lib/strapi";
import { isFutureEvent } from "@/lib/strapi-utils";

/**
 * Content Diagnostic Endpoint
 * 
 * Shows raw CMS content vs. filtered content to help diagnose why content isn't displaying.
 * Useful for debugging cache and filtering issues.
 * 
 * Response includes:
 * - Raw API responses (before filtering)
 * - Filtered results (after client-side filtering)
 * - Explanation of why items were filtered out
 * - Environment variable status
 * 
 * @returns {NextResponse} Diagnostic information
 */
export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch all data (raw and with filters)
    const rawAnnouncements = await fetchAnnouncements({
      includeExpired: true, // Get all announcements
    });

    const filteredAnnouncements = await fetchAnnouncements({
      displayUntil: today, // Get only current announcements
    });

    const allEvents = await fetchEvents({
      publishedAt: true,
      sort: "date:asc",
    });

    // Separate events by filter status
    const futureEvents: unknown[] = [];
    const pastEvents: unknown[] = [];

    // Calculate now for date comparisons
    const now = new Date();

    allEvents.forEach((event) => {
      if (!event?.attributes?.date || !event?.attributes?.startTime) {
        pastEvents.push({
          id: event.id,
          title: event.attributes?.title || "Untitled",
          date: event.attributes?.date || "MISSING",
          startTime: event.attributes?.startTime || "MISSING",
          publishedAt: event.attributes?.publishedAt,
          reason: "Missing date or startTime",
          analysis: {
            hasDate: !!event?.attributes?.date,
            hasStartTime: !!event?.attributes?.startTime,
          },
        });
        return;
      }

      // Enhanced analysis for date/time parsing
      const dateStr = String(event.attributes.date);
      const timeStr = String(event.attributes.startTime);
      let parsedDateTime: Date | null = null;
      let parseError: string | null = null;

      try {
        // Try parsing the date/time combination
        parsedDateTime = new Date(`${dateStr}T${timeStr}`);
        
        // Validate it's a valid date
        if (isNaN(parsedDateTime.getTime())) {
          throw new Error("Invalid Date object");
        }
      } catch (err) {
        parseError = `Failed to parse "${dateStr}T${timeStr}": ${err instanceof Error ? err.message : "Unknown error"}`;
      }

      if (!parsedDateTime || parseError) {
        pastEvents.push({
          id: event.id,
          title: event.attributes?.title,
          date: dateStr,
          startTime: timeStr,
          publishedAt: event.attributes?.publishedAt,
          reason: "Date/time parsing failed",
          analysis: {
            parseError,
            dateFormat: dateStr,
            timeFormat: timeStr,
          },
        });
        return;
      }

      const isFuture = parsedDateTime > now;
      
      if (isFuture) {
        futureEvents.push({
          id: event.id,
          title: event.attributes?.title,
          date: dateStr,
          startTime: timeStr,
          publishedAt: event.attributes?.publishedAt,
          analysis: {
            eventDateTime: parsedDateTime.toISOString(),
            currentTime: now.toISOString(),
            timeUntilEvent: Math.floor((parsedDateTime.getTime() - now.getTime()) / 1000 / 60) + " minutes",
          },
        });
      } else {
        pastEvents.push({
          id: event.id,
          title: event.attributes?.title,
          date: dateStr,
          startTime: timeStr,
          publishedAt: event.attributes?.publishedAt,
          reason: "Date/time is in the past",
          analysis: {
            eventDateTime: parsedDateTime.toISOString(),
            currentTime: now.toISOString(),
            minutesPast: Math.floor((now.getTime() - parsedDateTime.getTime()) / 1000 / 60) + " minutes ago",
          },
        });
      }
    });

    // Analyze announcements
    const expiredAnnouncements: unknown[] = [];
    const currentAnnouncements: unknown[] = [];

    rawAnnouncements.forEach((announcement) => {
      const displayUntil = announcement?.attributes?.displayUntil;

      if (!displayUntil) {
        currentAnnouncements.push({
          id: announcement.id,
          title: announcement.attributes?.title,
          level: announcement.attributes?.level,
          displayUntil: null,
          reason: "No expiry date",
        });
      } else {
        try {
          const expiryDate = new Date(displayUntil);
          expiryDate.setHours(0, 0, 0, 0);

          if (expiryDate > today) {
            currentAnnouncements.push({
              id: announcement.id,
              title: announcement.attributes?.title,
              level: announcement.attributes?.level,
              displayUntil,
              reason: `Expires on ${expiryDate.toLocaleDateString()}`,
            });
          } else {
            expiredAnnouncements.push({
              id: announcement.id,
              title: announcement.attributes?.title,
              level: announcement.attributes?.level,
              displayUntil,
              reason: `Expired on ${expiryDate.toLocaleDateString()}`,
            });
          }
        } catch {
          currentAnnouncements.push({
            id: announcement.id,
            title: announcement.attributes?.title,
            level: announcement.attributes?.level,
            displayUntil,
            reason: "Invalid date format - included anyway",
          });
        }
      }
    });

    // Build diagnostic response
    const diagnosticResponse = {
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        cmsApiUrl: process.env.CMS_API_URL || "not set",
        cmsApiTokenSet: !!process.env.CMS_API_TOKEN,
      },
      summary: {
        announcements: {
          total: rawAnnouncements.length,
          current: filteredAnnouncements.length,
          expired: rawAnnouncements.length - filteredAnnouncements.length,
        },
        events: {
          total: allEvents.length,
          future: futureEvents.length,
          past: pastEvents.length,
        },
      },
      details: {
        announcements: {
          raw: {
            total: rawAnnouncements.length,
            items: rawAnnouncements.map((a) => ({
              id: a.id,
              title: a.attributes?.title,
              level: a.attributes?.level,
              publishedAt: a.attributes?.publishedAt,
              displayUntil: a.attributes?.displayUntil,
            })),
          },
          filtered: {
            total: filteredAnnouncements.length,
            items: currentAnnouncements,
          },
          expired: {
            total: expiredAnnouncements.length,
            items: expiredAnnouncements,
          },
        },
        events: {
          raw: {
            total: allEvents.length,
            items: allEvents.map((e) => ({
              id: e.id,
              title: e.attributes?.title,
              date: e.attributes?.date,
              startTime: e.attributes?.startTime,
            })),
          },
          future: {
            total: futureEvents.length,
            items: futureEvents,
          },
          past: {
            total: pastEvents.length,
            items: pastEvents,
          },
        },
      },
      recommendations: {
        announcements:
          filteredAnnouncements.length === 0 && rawAnnouncements.length > 0
            ? [
                "⚠️ All announcements are expired. Update displayUntil dates in Strapi to show announcements on home page.",
              ]
            : [],
        events:
          futureEvents.length === 0 && allEvents.length > 0
            ? [
                "⚠️ All events are in the past. Add future events to Strapi or update event dates.",
              ]
            : [],
        general: [
          filteredAnnouncements.length > 0 && futureEvents.length > 0
            ? "✓ Content is available and should display on home page."
            : "❌ No content to display. Check Strapi for published items.",
          "If content doesn't appear on home page after 5 minutes, try revalidating cache:",
          `  POST /api/revalidate?secret=YOUR_SECRET&path=/`,
          "If content still missing after revalidation, check /api/debug/cms for API issues.",
        ],
      },
      filteringLogic: {
        announcements: "displayUntil must be null or in the future (current date)",
        events: "Date and startTime must be in the future",
        today: today.toISOString().split("T")[0],
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        currentTime: now.toISOString(),
        note: "Event dates are compared using JavaScript Date objects. Ensure Strapi dates are in ISO format (YYYY-MM-DD) and times are in HH:mm:ss format.",
      },
    };

    return NextResponse.json(diagnosticResponse, { status: 200 });
  } catch (error) {
    console.error("[debug/content] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to gather diagnostic information",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
