import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-responses";

/**
 * POST /api/v1/forms/donation-statement
 * Proxy endpoint that forwards donation statement form submissions to the backend.
 */
export async function POST(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    // Warn if using localhost in production (indicates missing env var)
    if (backendUrl.includes("localhost") && process.env.NODE_ENV === "production") {
      console.error("[api/v1/forms/donation-statement] WARNING: NEXT_PUBLIC_API_URL not set, using localhost fallback:", backendUrl);
    }

    if (!apiKey) {
      console.error("[api/v1/forms/donation-statement] ERROR: NEXT_PUBLIC_API_KEY not configured");
      return errorResponse("API key not configured", 500);
    }

    const targetUrl = `${backendUrl}/api/v1/forms/donation-statement`;
    console.log("[api/v1/forms/donation-statement] Proxying to backend:", targetUrl);

    // Forward the request to the backend
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: await request.text(),
    });

    // Check Content-Type before parsing
    const responseContentType = response.headers.get("content-type") || "";
    const isJson = responseContentType.includes("application/json");

    let data: any;
    if (isJson) {
      try {
        data = await response.json();
      } catch (parseError) {
        // If JSON parsing fails, read as text for error message
        const text = await response.text();
        console.error("[api/v1/forms/donation-statement] Failed to parse JSON response:", text.substring(0, 200));
        return errorResponse(
          `Backend returned invalid response: ${text.substring(0, 100)}`,
          response.status
        );
      }
    } else {
      // Non-JSON response (likely HTML error page)
      const text = await response.text();
      console.error("[api/v1/forms/donation-statement] Backend returned non-JSON:", text.substring(0, 200));
      return errorResponse(
        `Backend error: ${response.status} ${response.statusText}. ${text.substring(0, 100)}`,
        response.status
      );
    }

    if (!response.ok) {
      return errorResponse(
        data?.error || data?.message || "Backend request failed",
        response.status,
        data?.errors
      );
    }

    return successResponse(data.data || data, response.status);
  } catch (error) {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    console.error("[api/v1/forms/donation-statement] Fetch error:", {
      error: error instanceof Error ? error.message : String(error),
      backendUrl,
      targetUrl: `${backendUrl}/api/v1/forms/donation-statement`,
    });
    const message = error instanceof Error ? error.message : "Internal server error";
    // Provide more helpful error message if fetch fails
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return errorResponse(
        `Unable to connect to backend server. Please check NEXT_PUBLIC_API_URL configuration.`,
        500
      );
    }
    return errorResponse(message, 500);
  }
}
