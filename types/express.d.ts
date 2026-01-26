/**
 * Express Request Type Augmentation
 * 
 * This file extends the Express Request interface to include custom properties
 * added by authentication middleware (e.g., req.user).
 * 
 * Usage:
 * - Import this file in your TypeScript configuration (tsconfig.json)
 * - After authentication middleware runs, req.user will be available with proper typing
 * 
 * @see .cursorrules Section 24.1 for usage patterns
 */

import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      /**
       * Authenticated user information (added by authentication middleware).
       * Undefined if user is not authenticated.
       */
      user?: {
        /** User's unique identifier */
        id: string;
        /** User's email address */
        email: string;
        /** User's role (Admin, Editor, Finance, Event Manager) */
        role: string;
        /** AWS Cognito subject claim (unique identifier) */
        cognitoSub: string;
        /** Additional user metadata (optional) */
        [key: string]: any;
      };
    }
  }
}

export {};
