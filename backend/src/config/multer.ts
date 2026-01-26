import multer from "multer";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIMES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const storage = multer.memoryStorage();

/**
 * Multer config for optional single file "attachment".
 * Used by POST /api/v1/forms/sponsorship. Defer S3: we accept but don't persist file.
 */
export const uploadOptionalAttachment = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype || !ALLOWED_MIMES.includes(file.mimetype)) {
      cb(new Error("Invalid file type. Allowed: PDF, JPEG, PNG, WebP."));
      return;
    }
    cb(null, true);
  },
}).single("attachment");
