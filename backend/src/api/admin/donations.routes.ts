import { Request, Response } from "express";
import { Router } from "express";
import { prisma } from "../../utils/prisma.client";
import { requireCognitoJwt } from "../../middleware/auth.middleware";
import { requireRoles } from "../../middleware/auth.middleware";
import { error as errorResponse } from "../../utils/responses";

const router = Router();
const auth = [requireCognitoJwt, requireRoles(["Admin", "Finance"])];

/**
 * GET /api/admin/donations
 * List donations with optional date range, status, pagination. Admin, Finance.
 */
router.get("/", ...auth, async (req: Request, res: Response, next: (err?: unknown) => void) => {
  try {
    const from = req.query.from as string | undefined;
    const to = req.query.to as string | undefined;
    const status = req.query.status as string | undefined;
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (from || to) {
      where.createdAt = {};
      if (from) (where.createdAt as any).gte = new Date(from);
      if (to) (where.createdAt as any).lte = new Date(to);
    }
    if (status?.trim()) where.status = status;

    const [items, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          amount: true,
          donorName: true,
          donorEmail: true,
          frequency: true,
          status: true,
          createdAt: true,
          stripePaymentId: true,
        },
      }),
      prisma.donation.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: { items, total, page, limit },
    });
  } catch (e) {
    console.error("[admin.donations]", e);
    next(e);
  }
});

/**
 * GET /api/admin/donations/export
 * CSV export of donations (no sensitive card data). Admin, Finance.
 */
router.get("/export", ...auth, async (req: Request, res: Response, next: (err?: unknown) => void) => {
  try {
    const from = req.query.from as string | undefined;
    const to = req.query.to as string | undefined;
    const where: Record<string, unknown> = {};
    if (from || to) {
      where.createdAt = {};
      if (from) (where.createdAt as any).gte = new Date(from);
      if (to) (where.createdAt as any).lte = new Date(to);
    }

    const donations = await prisma.donation.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        amount: true,
        frequency: true,
        status: true,
        createdAt: true,
      },
    });

    const headers = ["id", "amount", "frequency", "status", "createdAt"];
    const rows = donations.map((d) =>
      [d.id, d.amount, d.frequency, d.status, d.createdAt.toISOString()].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=donations.csv");
    res.status(200).send(csv);
  } catch (e) {
    console.error("[admin.donations.export]", e);
    next(e);
  }
});

export { router as donationsRoutes };
