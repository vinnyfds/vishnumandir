import { Router } from "express";
import { devRoutes } from "./dev.routes";
import { v1Routes } from "./v1";
import { adminRoutes } from "./admin";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

router.use("/v1", v1Routes);
router.use("/admin", adminRoutes);

if (process.env.NODE_ENV === "development") {
  router.use("/dev", devRoutes);
}

export { router as apiRoutes };
