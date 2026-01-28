import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { corsOptions } from "./config/corsOptions";
import { apiRoutes } from "./api";
import { handleStripeWebhook } from "./api/webhooks/stripe.routes";
import { handleResendWebhook } from "./api/webhooks/resend.routes";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app: Express = express();
const PORT = process.env.BACKEND_PORT || 4000;

app.use(cors(corsOptions));
app.use(morgan("dev"));

app.post(
  "/webhooks/stripe",
  express.raw({ type: "application/json" }),
  async (req: express.Request, res: express.Response) => {
    await handleStripeWebhook(req, res);
  }
);

app.post(
  "/webhooks/resend",
  express.raw({ type: "application/json" }),
  async (req: express.Request, res: express.Response) => {
    await handleResendWebhook(req, res);
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});
