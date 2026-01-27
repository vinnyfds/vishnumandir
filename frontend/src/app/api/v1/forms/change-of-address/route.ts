import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-responses";

/**
 * POST /api/v1/forms/change-of-address
 * Proxy endpoint that forwards change of address form submissions to the backend.
 */
export async function POST(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey) {
      return errorResponse("API key not configured", 500);
    }

    // Forward the request to the backend
    const response = await fetch(`${backendUrl}/api/v1/forms/change-of-address`, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: await request.text(),
    });

    const data = await response.json();

    if (!response.ok) {
      return errorResponse(
        data.error || "Backend request failed",
        response.status,
        data.errors
      );
    }

    return successResponse(data.data, response.status);
  } catch (error) {
    console.error("[api/v1/forms/change-of-address]", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
