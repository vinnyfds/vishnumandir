#!/usr/bin/env node
/**
 * Segregate uploaded assets into folder structure per Assets Building Plan.
 * Prompts and asset list: docs/assets/ASSET_PROMPTS.md
 *
 * Upload assets to frontend/public/uploads/, then run: pnpm run segregate-assets
 *
 * Optional: place asset-mapping.json in frontend/scripts/ to rename on move (e.g. diwali.jpg -> festival-diwali.jpg).
 * Format: { "source-filename": "canonical-filename" }. See asset-mapping.example.json.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, "../public");
const UPLOADS = path.join(PUBLIC, "uploads");

/** Filename -> folder relative to public/ (e.g. "images/og"). */
const ASSET_MAP = {
  "logo.png": "images",
  "tagline.png": "images",
  "og-default.png": "images/og",
  "hero-home.jpg": "images/hero",
  "event-major-festivals.jpg": "images/home",
  "event-cultural-programs.jpg": "images/home",
  "event-educational-classes.jpg": "images/home",
  "deity-vishnu.jpg": "images/deities",
  "deity-lakshmi.jpg": "images/deities",
  "deity-ganesha.jpg": "images/deities",
  "deity-shiva.jpg": "images/deities",
  "deity-saraswati.jpg": "images/deities",
  "deity-hanuman.jpg": "images/deities",
  "festival-diwali.jpg": "images/festivals",
  "festival-navratri.jpg": "images/festivals",
  "festival-janmashtami.jpg": "images/festivals",
  "festival-ganesh-chaturthi.jpg": "images/festivals",
  "festival-holi.jpg": "images/festivals",
  "festival-rama-navami.jpg": "images/festivals",
  "temple-exterior.jpg": "images/temple",
  "temple-main-prayer-hall.jpg": "images/temple",
  "temple-deity-shrines.jpg": "images/temple",
  "temple-community-spaces.jpg": "images/temple",
  "temple-grounds.jpg": "images/temple",
  "gallery-festivals.jpg": "images/gallery",
  "gallery-music.jpg": "images/gallery",
  "gallery-dance.jpg": "images/gallery",
};

const canonicalNames = new Set(Object.keys(ASSET_MAP));

function loadMapping() {
  const p = path.join(__dirname, "asset-mapping.json");
  if (!fs.existsSync(p)) return {};
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return {};
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function run() {
  if (!fs.existsSync(UPLOADS)) {
    console.error("Uploads folder not found:", UPLOADS);
    process.exit(1);
  }

  const mapping = loadMapping();
  const entries = fs
    .readdirSync(UPLOADS, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name !== ".gitkeep" && !e.name.startsWith("."));
  let moved = 0;
  const skipped = [];

  for (const e of entries) {
    const srcPath = path.join(UPLOADS, e.name);
    const canonical = mapping[e.name] ?? e.name;

    if (!canonicalNames.has(canonical)) {
      skipped.push(e.name);
      continue;
    }

    const folder = ASSET_MAP[canonical];
    const destDir = path.join(PUBLIC, folder);
    const destPath = path.join(destDir, canonical);

    ensureDir(destDir);
    fs.renameSync(srcPath, destPath);
    console.log("Moved:", e.name, "->", path.relative(PUBLIC, destPath));
    moved++;
  }

  if (skipped.length) {
    console.warn("Skipped (no mapping):", skipped.join(", "));
  }
  console.log("Done. Moved", moved, "file(s).");
}

run();
