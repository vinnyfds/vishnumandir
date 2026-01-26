/**
 * Authentication Type Definitions
 * 
 * This file defines TypeScript interfaces for authentication-related types.
 * 
 * @see .cursorrules Section 9 for authentication architecture
 */

import { Request } from 'express';

/**
 * Extended Request interface with authenticated user.
 * Use this type when you know the user is authenticated.
 */
export interface AuthRequest extends Request {
  /** Authenticated user (guaranteed to be defined) */
  user: {
    id: string;
    email: string;
    role: string;
    cognitoSub: string;
    [key: string]: any;
  };
}

/**
 * JWT Payload structure from AWS Cognito
 */
export interface CognitoJwtPayload {
  /** Subject claim - unique user identifier */
  sub: string;
  /** Email address */
  email: string;
  /** Cognito groups (roles) */
  'cognito:groups'?: string[];
  /** Token expiration time */
  exp: number;
  /** Token issued at time */
  iat: number;
  /** Additional claims */
  [key: string]: any;
}

/**
 * User role types
 */
export type UserRole = 'Admin' | 'Editor' | 'Finance' | 'EventManager';

/**
 * Authentication middleware result
 */
export interface AuthResult {
  /** Whether the user is authenticated */
  authenticated: boolean;
  /** User information if authenticated */
  user?: {
    id: string;
    email: string;
    role: UserRole;
    cognitoSub: string;
  };
  /** Error message if authentication failed */
  error?: string;
}
