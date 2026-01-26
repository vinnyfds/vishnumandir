import { Request, Response } from "express";
import { Router } from "express";
import { prisma } from "../../utils/prisma.client";
import { requireCognitoJwt, requireRoles } from "../../middleware/auth.middleware";

const router = Router();
const auth = [requireCognitoJwt, requireRoles(["Admin", "Event Manager"])];

/**
 * GET /api/admin/facility-requests
 * List FacilityRequest. Admin only.
 */
router.get("/", ...auth, async (req: Request, res: Response, next: (err?: unknown) => void) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
    const skip = (page - 1) * limit;
    const status = req.query.status as string | undefined;
    const where = status?.trim() ? { status } : {};

    const [items, total] = await Promise.all([
      prisma.facilityRequest.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.facilityRequest.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: { items, total, page, limit },
    });
  } catch (e) {
    console.error("[admin.facility-requests]", e);
    next(e);
  }
});

export { router as facilityRoutes };
