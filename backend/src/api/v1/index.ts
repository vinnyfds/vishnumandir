import { Router } from "express";
import { requireApiKey } from "../../middleware/apiKey.middleware";
import { formsRoutes } from "./forms.routes";
import { paymentsRoutes } from "./payments.routes";

const router = Router();

router.use(requireApiKey);
router.use("/forms", formsRoutes);
router.use("/payments", paymentsRoutes);

export { router as v1Routes };
