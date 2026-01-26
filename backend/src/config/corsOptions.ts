import { CorsOptions } from "cors";

/**
 * CORS configuration for the Express server.
 * Allows requests from the frontend application.
 */
export const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
};
