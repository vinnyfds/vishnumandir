import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Manual cache revalidation endpoint
 * 
 * Allows authorized callers to manually trigger ISR cache refreshes.
 * This is useful when content changes in Strapi and you want to update
 * the frontend cache immediately instead of waiting for ISR revalidation.
 * 
 * Security: Requires REVALIDATION_SECRET env var matching the secret query parameter
 * 
 * Usage:
 *   POST /api/revalidate?secret=YOUR_SECRET&path=/
 *   POST /api/revalidate?secret=YOUR_SECRET&path=/calendar/announcements
 *   POST /api/revalidate?secret=YOUR_SECRET&path=/* (revalidate all routes)
 * 
 * @param {NextRequest} request - The incoming request
 * @returns {NextResponse} Success or error response
 */
export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get("secret");
    const path = request.nextUrl.searchParams.get("path") || "/";

    // Validate secret
    const revalidationSecret = process.env.REVALIDATION_SECRET;
    if (!revalidationSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "REVALIDATION_SECRET not configured on server",
        },
        { status: 500 }
      );
    }

    if (!secret || secret !== revalidationSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid or missing revalidation secret",
        },
        { status: 401 }
      );
    }

    // Validate path format
    if (!path || typeof path !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Path parameter required (e.g., ?path=/calendar/announcements)",
        },
        { status: 400 }
      );
    }

    // Log revalidation request (for debugging)
    console.log(`[revalidate] Cache revalidation requested for path: ${path}`);

    // Revalidate the specified path
    // Using revalidatePath() to trigger ISR revalidation
    revalidatePath(path);

    // If path is "/", also revalidate common pages
    if (path === "/" || path === "/*") {
      revalidatePath("/");
      revalidatePath("/calendar/announcements");
      revalidatePath("/calendar/current-events");
      revalidatePath("/calendar");
    }

    return NextResponse.json(
      {
        success: true,
        message: `Cache revalidated for path: ${path}`,
        revalidatedPath: path,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[revalidate] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to revalidate cache",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET handler - Returns usage information
 * Useful for testing endpoint availability
 */
export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message: "Cache Revalidation API",
      description: "Manual endpoint to trigger ISR cache refreshes",
      usage: "POST /api/revalidate?secret=YOUR_SECRET&path=/calendar/announcements",
      parameters: {
        secret: "REVALIDATION_SECRET from environment (required)",
        path: "Path to revalidate (required, e.g., /, /calendar, /*)",
      },
      examples: [
        "POST /api/revalidate?secret=YOUR_SECRET&path=/",
        "POST /api/revalidate?secret=YOUR_SECRET&path=/calendar/announcements",
        "POST /api/revalidate?secret=YOUR_SECRET&path=/*",
      ],
    },
    { status: 200 }
  );
}
