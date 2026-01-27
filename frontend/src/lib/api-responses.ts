import { NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Contract-style success response for Next.js API routes.
 * @see docs/architecture/api-contracts.md
 */
export function successResponse(
  options: { message: string; transactionId?: string; data?: any },
  statusCode = 200
) {
  return NextResponse.json(
    {
      status: "success",
      message: options.message,
      ...(options.transactionId && { transactionId: options.transactionId }),
      ...(options.data && { data: options.data }),
    },
    { status: statusCode }
  );
}

/**
 * Contract-style error response for Next.js API routes.
 * @see docs/architecture/api-contracts.md
 */
export function errorResponse(
  message: string,
  statusCode = 400,
  errors?: Array<{ field: string; code: string; message: string }>
) {
  return NextResponse.json(
    {
      status: "error",
      message,
      ...(errors && errors.length > 0 && { errors }),
    },
    { status: statusCode }
  );
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
