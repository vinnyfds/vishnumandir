import { Request, Response, NextFunction } from "express";

export type ApiErrorItem = { field: string; code: string; message: string };

/**
 * Error with contract-style shape for API routes.
 */
export class ApiError extends Error {
  statusCode: number;
  errors?: ApiErrorItem[];

  constructor(
    message: string,
    statusCode = 500,
    errors?: ApiErrorItem[]
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

/**
 * Global error handling middleware.
 * Returns contract-style { status, message, errors? } for /api/v1 and /api/admin.
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Error:", err);

  const statusCode = (err as ApiError).statusCode || 500;
  const message = err.message || "Internal Server Error";
  const isApiContract =
    req.path.startsWith("/api/v1") || req.path.startsWith("/api/admin");

  if (isApiContract && (err instanceof ApiError || (err as any).errors)) {
    const errors = (err as ApiError).errors;
    res.status(statusCode).json({
      status: "error",
      message,
      ...(errors && errors.length > 0 && { errors }),
    });
    return;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: (err as any).stack }),
  });
}
