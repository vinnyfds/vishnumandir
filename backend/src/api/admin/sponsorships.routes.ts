import { Request, Response } from "express";
import { Router } from "express";
import { prisma } from "../../utils/prisma.client";
import { requireCognitoJwt, requireRoles } from "../../middleware/auth.middleware";
import { error as errorResponse, zodIssuesToContractErrors } from "../../utils/responses";
import { z } from "zod";

const router = Router();
const auth = [requireCognitoJwt, requireRoles(["Admin", "Finance"])];

const updateStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed"]),
});

/**
 * GET /api/admin/sponsorships
 * List PujaSponsorship. Admin, Finance.
 */
router.get("/", ...auth, async (req: Request, res: Response, next: (err?: unknown) => void) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
    const skip = (page - 1) * limit;
    const status = req.query.status as string | undefined;
    const where = status?.trim() ? { status } : {};

    const [items, total] = await Promise.all([
      prisma.pujaSponsorship.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.pujaSponsorship.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: { items, total, page, limit },
    });
  } catch (e) {
    console.error("[admin.sponsorships]", e);
    next(e);
  }
});

/**
 * PATCH /api/admin/sponsorships/:id
 * Update sponsorship status. Admin, Finance.
 */
router.patch("/:id", ...auth, async (req: Request, res: Response, next: (err?: unknown) => void) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const parsed = updateStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      const errs = zodIssuesToContractErrors(parsed.error.issues);
      return errorResponse(res, "Validation failed", 400, errs);
    }
    const { status } = parsed.data;

    const updated = await prisma.pujaSponsorship.update({
      where: { id },
      data: { status },
    });
    res.status(200).json({ success: true, data: updated });
  } catch (e: any) {
    if (e?.code === "P2025") {
      return errorResponse(res, "Sponsorship not found", 404);
    }
    console.error("[admin.sponsorships.patch]", e);
    next(e);
  }
});

export { router as sponsorshipsRoutes };
