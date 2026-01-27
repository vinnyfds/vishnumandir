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

    if (!apiKey) {
      return errorResponse("API key not configured", 500);
    }

    // Forward the request to the backend
    const response = await fetch(`${backendUrl}/api/v1/forms/donation-statement`, {
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
    console.error("[api/v1/forms/donation-statement]", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
