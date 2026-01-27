import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-responses";

/**
 * POST /api/v1/forms/sponsorship
 * Proxy endpoint that forwards puja sponsorship form submissions to the backend.
 * Accepts multipart/form-data with optional file attachment.
 */
export async function POST(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    // Warn if using localhost in production (indicates missing env var)
    if (backendUrl.includes("localhost") && process.env.NODE_ENV === "production") {
      console.error("[api/v1/forms/sponsorship] WARNING: NEXT_PUBLIC_API_URL not set, using localhost fallback:", backendUrl);
    }

    if (!apiKey) {
      console.error("[api/v1/forms/sponsorship] ERROR: NEXT_PUBLIC_API_KEY not configured");
      return errorResponse("API key not configured", 500);
    }

    const targetUrl = `${backendUrl}/api/v1/forms/sponsorship`;
    console.log("[api/v1/forms/sponsorship] Proxying to backend:", targetUrl);

    // Get the original Content-Type header (includes boundary for multipart)
    const contentType = request.headers.get("content-type") || "";
    const isMultipart = contentType.includes("multipart/form-data");

    // Preserve multipart boundaries by forwarding body as ArrayBuffer
    const body = await request.arrayBuffer();

    const headers: HeadersInit = {
      "x-api-key": apiKey,
    };

    // Preserve original Content-Type for multipart (includes boundary parameter)
    if (isMultipart && contentType) {
      headers["Content-Type"] = contentType;
    }

    // Forward the request to the backend
    const response = await fetch(targetUrl, {
      method: "POST",
      headers,
      body,
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
        console.error("[api/v1/forms/sponsorship] Failed to parse JSON response:", text.substring(0, 200));
        return errorResponse(
          `Backend returned invalid response: ${text.substring(0, 100)}`,
          response.status
        );
      }
    } else {
      // Non-JSON response (likely HTML error page)
      const text = await response.text();
      console.error("[api/v1/forms/sponsorship] Backend returned non-JSON:", text.substring(0, 200));
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
    console.error("[api/v1/forms/sponsorship] Fetch error:", {
      error: error instanceof Error ? error.message : String(error),
      backendUrl,
      targetUrl: `${backendUrl}/api/v1/forms/sponsorship`,
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
