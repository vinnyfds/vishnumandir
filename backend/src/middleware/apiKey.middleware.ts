import { Request, Response, NextFunction } from "express";
import { error } from "../utils/responses";

/**
 * Validates x-api-key header against API_KEY env.
 * Apply to public v1 form and payment routes; exclude webhooks.
 */
export function requireApiKey(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const key = process.env.API_KEY;
  const provided = req.headers["x-api-key"];

  if (!key?.trim()) {
    error(res, "API key not configured", 500);
    return;
  }

  if (!provided || (typeof provided === "string" ? provided : provided[0]) !== key) {
    error(res, "Invalid or missing API key", 401);
    return;
  }

  next();
}
