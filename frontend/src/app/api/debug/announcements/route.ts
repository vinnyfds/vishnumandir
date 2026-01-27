/**
 * Debug endpoint for announcements fetching and filtering
 * Helps diagnose why announcements are not appearing on the frontend
 * 
 * Access at: /api/debug/announcements
 */

import { fetchAnnouncements } from "@/lib/strapi";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const today = new Date();

    // Fetch announcements using the same logic as the homepage
    const allAnnouncements = await fetchAnnouncements({
      displayUntil: today,
    });

    // Filter out items with missing attributes (same as homepage)
    const validAnnouncements = allAnnouncements.filter(
      (announcement) => announcement?.attributes
    );

    return NextResponse.json({
      success: true,
      data: {
        timestamp: new Date().toISOString(),
        testDate: today.toISOString(),
        totals: {
          fetchedAnnouncements: allAnnouncements.length,
          validAnnouncements: validAnnouncements.length,
        },
        announcements: validAnnouncements.map((a) => ({
          id: a.id,
          title: a.attributes?.title,
          content: a.attributes?.content?.substring(0, 100) || "N/A",
          level: a.attributes?.level,
          publishedAt: a.attributes?.publishedAt,
          displayUntil: a.attributes?.displayUntil,
          createdAt: a.attributes?.createdAt,
          hasAttributes: !!a.attributes,
        })),
        message:
          allAnnouncements.length === 0
            ? "No announcements found. Check if they are published in Strapi."
            : `Found ${allAnnouncements.length} announcements`,
      },
    });
  } catch (error) {
    console.error("[api/debug/announcements] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error fetching announcements",
        details: error,
      },
      { status: 500 }
    );
  }
}
