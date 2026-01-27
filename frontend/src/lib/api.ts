const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

function headers(): HeadersInit {
  const h: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (API_KEY) h["x-api-key"] = API_KEY;
  return h;
}

export type ApiError = { status: "error"; message: string; errors?: { field: string; code: string; message: string }[] };
export type ApiSuccess = { status: "success"; message: string; transactionId?: string };

/**
 * POST JSON to a v1 API endpoint.
 * By default, calls Next.js API routes (/api/v1/*).
 * If NEXT_PUBLIC_API_URL is configured differently, uses that external backend.
 *
 * @param path - API path (e.g., "/forms/sponsorship")
 * @param body - Request body
 * @returns Promise with response data or error
 */
export async function postJson<T = ApiSuccess>(
  path: string,
  body: object
): Promise<{ ok: true; data: T } | { ok: false; error: ApiError; status: number }> {
  // Use Next.js API routes by default (no external backend dependency)
  const url = `/api/v1${path}`;
  
  const res = await fetch(url, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as T | ApiError;
  if (res.ok) return { ok: true, data: data as T };
  return { ok: false, error: data as ApiError, status: res.status };
}

/**
 * POST FormData (multipart) to a v1 API endpoint.
 * By default, calls Next.js API routes (/api/v1/*).
 * If NEXT_PUBLIC_API_URL is configured differently, uses that external backend.
 *
 * @param path - API path (e.g., "/forms/sponsorship")
 * @param formData - FormData object
 * @returns Promise with response data or error
 */
export async function postFormData<T = ApiSuccess>(
  path: string,
  formData: FormData
): Promise<{ ok: true; data: T } | { ok: false; error: ApiError; status: number }> {
  // Use Next.js API routes by default (no external backend dependency)
  const url = `/api/v1${path}`;
  
  const h: Record<string, string> = {};
  if (API_KEY) h["x-api-key"] = API_KEY;
  const res = await fetch(url, {
    method: "POST",
    headers: h,
    body: formData,
  });
  const data = (await res.json()) as T | ApiError;
  if (res.ok) return { ok: true, data: data as T };
  return { ok: false, error: data as ApiError, status: res.status };
}

export { API_URL, API_KEY };
