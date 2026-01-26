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
 * POST JSON to a v1 API endpoint. Uses NEXT_PUBLIC_API_URL and x-api-key.
 */
export async function postJson<T = ApiSuccess>(
  path: string,
  body: object
): Promise<{ ok: true; data: T } | { ok: false; error: ApiError; status: number }> {
  const res = await fetch(`${API_URL}/api/v1${path}`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as T | ApiError;
  if (res.ok) return { ok: true, data: data as T };
  return { ok: false, error: data as ApiError, status: res.status };
}

/**
 * POST FormData (multipart) to a v1 API endpoint. Omits Content-Type so browser sets boundary.
 */
export async function postFormData<T = ApiSuccess>(
  path: string,
  formData: FormData
): Promise<{ ok: true; data: T } | { ok: false; error: ApiError; status: number }> {
  const h: Record<string, string> = {};
  if (API_KEY) h["x-api-key"] = API_KEY;
  const res = await fetch(`${API_URL}/api/v1${path}`, {
    method: "POST",
    headers: h,
    body: formData,
  });
  const data = (await res.json()) as T | ApiError;
  if (res.ok) return { ok: true, data: data as T };
  return { ok: false, error: data as ApiError, status: res.status };
}

export { API_URL, API_KEY };
