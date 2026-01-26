import { Request, Response, NextFunction } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { error as errorResponse } from "../utils/responses";

const region = process.env.COGNITO_REGION || "us-east-1";
const userPoolId = process.env.COGNITO_USER_POOL_ID;
const jwksUrl = userPoolId
  ? `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`
  : "";

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;
if (jwksUrl) {
  jwks = createRemoteJWKSet(new URL(jwksUrl));
}

/**
 * Verifies Cognito JWT from Authorization: Bearer <token>.
 * Attaches req.user (id, email, role, cognitoSub) from sub and cognito:groups.
 */
export async function requireCognitoJwt(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!userPoolId?.trim()) {
    errorResponse(res, "Cognito not configured", 500);
    return;
  }
  if (!jwks) {
    errorResponse(res, "Cognito not configured", 500);
    return;
  }

  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) {
    errorResponse(res, "Authentication required", 401);
    return;
  }

  try {
    const { payload } = await jwtVerify(token, jwks, {
      issuer: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`,
      audience: process.env.COGNITO_CLIENT_ID,
    });
    const sub = payload.sub as string;
    const groups = (payload["cognito:groups"] as string[] | undefined) || [];
    const email = (payload.email as string) || "";

    (req as any).user = {
      id: sub,
      email,
      role: groups[0] || "Editor",
      cognitoSub: sub,
      groups,
    };
    next();
  } catch {
    errorResponse(res, "Invalid or expired token", 401);
  }
}

/**
 * RBAC: requires user to have one of allowedRoles.
 * Use after requireCognitoJwt.
 */
export function requireRoles(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;
    if (!user) {
      errorResponse(res, "Authentication required", 401);
      return;
    }
    const roles = user.groups || [user.role];
    const hasRole = roles.some((r: string) => allowedRoles.includes(r));
    if (!hasRole) {
      errorResponse(res, "Forbidden", 403);
      return;
    }
    next();
  };
}
