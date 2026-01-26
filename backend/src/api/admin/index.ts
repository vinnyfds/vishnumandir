import { Router } from "express";
import { donationsRoutes } from "./donations.routes";
import { sponsorshipsRoutes } from "./sponsorships.routes";
import { facilityRoutes } from "./facility.routes";

const router = Router();

router.use("/donations", donationsRoutes);
router.use("/sponsorships", sponsorshipsRoutes);
router.use("/facility-requests", facilityRoutes);

export { router as adminRoutes };
