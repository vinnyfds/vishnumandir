import { Response } from "express";
import { ZodError } from "zod";

/**
 * Contract-style success response.
 * @see docs/architecture/api-contracts.md
 */
export function success(
  res: Response,
  options: { message: string; transactionId?: string },
  statusCode = 200
) {
  return res.status(statusCode).json({
    status: "success",
    message: options.message,
    ...(options.transactionId && { transactionId: options.transactionId }),
  });
}

/**
 * Contract-style error response.
 * @see docs/architecture/api-contracts.md
 */
export function error(
  res: Response,
  message: string,
  statusCode = 400,
  errors?: Array<{ field: string; code: string; message: string }>
) {
  return res.status(statusCode).json({
    status: "error",
    message,
    ...(errors && errors.length > 0 && { errors }),
  });
}

/**
 * Map Zod issues to contract-style errors array.
 */
export function zodIssuesToContractErrors(
  issues: ZodError["issues"]
): Array<{ field: string; code: string; message: string }> {
  return issues.map((issue) => ({
    field: issue.path.join(".") || "body",
    code: issue.code.toUpperCase(),
    message: issue.message,
  }));
}
