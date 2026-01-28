import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

/**
 * Strapi webhook handler
 * 
 * This endpoint receives webhooks from Strapi when content is published/updated.
 * When content changes, it automatically triggers cache revalidation on the frontend.
 * 
 * Security:
 * - Verifies webhook signature using STRAPI_WEBHOOK_SECRET
 * - Only processes webhooks from trusted Strapi instance
 * 
 * Strapi Webhook Configuration:
 * 1. Go to Strapi Admin -> Settings -> Webhooks
 * 2. Create a new webhook
 * 3. URL: https://yourdomain.com/api/webhooks/strapi
 * 4. Events to trigger: publish, unpublish
 * 5. Headers: Add X-Webhook-Secret: YOUR_SECRET_VALUE
 * 6. Save STRAPI_WEBHOOK_SECRET in environment variables
 * 
 * @param {NextRequest} request - The incoming webhook request
 * @returns {NextResponse} Success or error response
 */
export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-webhook-secret");
    const strapiSecret = process.env.STRAPI_WEBHOOK_SECRET;

    // Verify webhook signature
    if (!strapiSecret) {
      console.warn(
        "[webhook:strapi] STRAPI_WEBHOOK_SECRET not configured - webhook verification skipped"
      );
    } else if (!signature || signature !== strapiSecret) {
      console.warn("[webhook:strapi] Invalid webhook signature - rejecting request");
      return NextResponse.json(
        {
          success: false,
          error: "Invalid webhook signature",
        },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Extract event information
    const event = body.event; // e.g., "entry.publish"
    const model = body.model; // e.g., "announcement", "event"

    console.log("[webhook:strapi] Received webhook:", {
      event,
      model,
      timestamp: new Date().toISOString(),
    });

    // Determine which paths to revalidate based on event and model
    const pathsToRevalidate: string[] = [];

    if (
      event === "entry.publish" ||
      event === "entry.unpublish" ||
      event === "entry.update"
    ) {
      // Map Strapi content types to frontend pages
      switch (model) {
        case "announcement":
          pathsToRevalidate.push("/"); // Home page shows announcements
          pathsToRevalidate.push("/calendar/announcements"); // Announcements archive
          pathsToRevalidate.push("/calendar");
          break;

        case "event":
          pathsToRevalidate.push("/"); // Home page shows featured events
          pathsToRevalidate.push("/calendar/current-events"); // Current events page
          pathsToRevalidate.push("/calendar");
          break;

        case "newsletter":
          pathsToRevalidate.push("/calendar/newsletter");
          pathsToRevalidate.push("/calendar");
          break;

        case "puja-service":
          pathsToRevalidate.push("/religious/puja-services");
          break;

        case "priest":
          pathsToRevalidate.push("/religious/priests");
          break;

        case "puja-schedule":
          pathsToRevalidate.push("/religious/puja-schedule");
          break;

        default:
          // For unknown content types, revalidate home and calendar
          pathsToRevalidate.push("/");
          pathsToRevalidate.push("/calendar");
      }
    }

    // Revalidate all affected paths
    let revalidatedCount = 0;
    for (const path of pathsToRevalidate) {
      try {
        revalidatePath(path);
        revalidatedCount++;
        console.log(`[webhook:strapi] Revalidated path: ${path}`);
      } catch (error) {
        console.error(`[webhook:strapi] Failed to revalidate path ${path}:`, error);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Webhook processed and ${revalidatedCount} paths revalidated`,
        event,
        model,
        revalidatedPaths: pathsToRevalidate,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[webhook:strapi] Error processing webhook:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process webhook",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET handler - Returns webhook information
 */
export async function GET() {
  return NextResponse.json(
    {
      message: "Strapi Webhook Endpoint",
      description: "Receives webhooks from Strapi CMS and triggers frontend cache revalidation",
      documentation: {
        setup: [
          "1. Create webhook in Strapi Admin -> Settings -> Webhooks",
          "2. URL: https://yourdomain.com/api/webhooks/strapi",
          "3. Events: Publish, Unpublish, Update",
          "4. Set X-Webhook-Secret header with STRAPI_WEBHOOK_SECRET value",
          "5. Add STRAPI_WEBHOOK_SECRET to environment variables",
        ],
        security: "Webhook signature verification using X-Webhook-Secret header",
        supportedModels: [
          "announcement",
          "event",
          "newsletter",
          "puja-service",
          "priest",
          "puja-schedule",
        ],
      },
    },
    { status: 200 }
  );
}
