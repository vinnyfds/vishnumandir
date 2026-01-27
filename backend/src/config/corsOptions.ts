import { CorsOptions } from "cors";

/**
 * CORS configuration for the Express server.
 * Allows requests from the frontend application.
 */
/**
 * CORS configuration for the Express server.
 * Allows requests from the frontend application.
 * Supports both local development and production (Amplify) domains.
 */
/**
 * Check if an origin is allowed for CORS.
 * Supports Amplify domains, production domain, and localhost.
 */
const isOriginAllowed = (origin: string | undefined): boolean => {
  if (!origin) return false;
  
  // Production domain
  if (origin === "https://vishnumandirtampa.com" || origin === "http://vishnumandirtampa.com") {
    return true;
  }
  
  // Amplify domains (e.g., https://main.d1rp3bwb0j3dq8.amplifyapp.com)
  if (origin.includes(".amplifyapp.com")) {
    return true;
  }
  
  // Localhost for development
  if (process.env.NODE_ENV !== "production" && origin.includes("localhost")) {
    return true;
  }
  
  // FRONTEND_URL from environment
  const frontendUrl = process.env.FRONTEND_URL;
  if (frontendUrl && origin === frontendUrl) {
    return true;
  }
  
  // AMPLIFY_DOMAIN from environment
  const amplifyDomain = process.env.AMPLIFY_DOMAIN;
  if (amplifyDomain && origin === amplifyDomain) {
    return true;
  }
  
  return false;
};

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
};
