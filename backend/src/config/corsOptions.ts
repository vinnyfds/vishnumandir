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
const getAllowedOrigins = (): string | string[] => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  const origins = [frontendUrl];
  
  // Add Amplify domain if provided
  if (process.env.AMPLIFY_DOMAIN) {
    origins.push(process.env.AMPLIFY_DOMAIN);
  }
  
  // Add production domain
  origins.push("https://vishnumandirtampa.com");
  origins.push("http://vishnumandirtampa.com");
  
  // Add localhost for development
  if (process.env.NODE_ENV !== "production") {
    origins.push("http://localhost:3000");
  }
  
  // Remove duplicates
  const uniqueOrigins = Array.from(new Set(origins));
  
  return uniqueOrigins.length === 1 ? uniqueOrigins[0] : uniqueOrigins;
};

export const corsOptions: CorsOptions = {
  origin: getAllowedOrigins(),
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
};
