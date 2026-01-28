import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-responses";

/**
 * POST /api/v1/forms/facility-request
 * Proxy endpoint that forwards facility request form submissions to the backend.
 */
export async function POST(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    // Validate required environment variables
    if (!backendUrl) {
      console.error("[api/v1/forms/facility-request] NEXT_PUBLIC_API_URL not configured");
      return errorResponse(
        "Backend API URL not configured. Contact administrator.",
        500
      );
    }

    if (!apiKey) {
      console.error("[api/v1/forms/facility-request] NEXT_PUBLIC_API_KEY not configured");
      return errorResponse("API key not configured", 500);
    }

    // Get the original Content-Type header
    const contentType = request.headers.get("content-type") || "";
    const isMultipart = contentType.includes("multipart/form-data");

    // Preserve request body and content type
    const body = await request.arrayBuffer();

    const headers: HeadersInit = {
      "x-api-key": apiKey,
    };

    // Preserve original Content-Type for multipart
    if (isMultipart && contentType) {
      headers["Content-Type"] = contentType;
    } else {
      headers["Content-Type"] = "application/json";
    }

    // Forward the request to the backend
    const response = await fetch(`${backendUrl}/api/v1/forms/facility-request`, {
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
        console.error("[api/v1/forms/facility-request] Failed to parse JSON response:", text.substring(0, 200));
        return errorResponse(
          `Backend returned invalid response: ${text.substring(0, 100)}`,
          response.status
        );
      }
    } else {
      // Non-JSON response (likely HTML error page)
      const text = await response.text();
      console.error("[api/v1/forms/facility-request] Backend returned non-JSON:", text.substring(0, 200));
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
    console.error("[api/v1/forms/facility-request]", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
