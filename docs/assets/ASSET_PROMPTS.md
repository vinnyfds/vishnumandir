# Asset prompts – Vishnu Mandir, Tampa

Prompts for AI image generation (Midjourney, DALL·E, etc.) or briefs for photographers. **Temple-specific images** (exterior, prayer hall, shrines, grounds) should ideally be **real photos** of Vishnu Mandir, Tampa; prompts are fallbacks or for placeholder use.

**Design context:** Spiritual, traditional, serene. Palette: Saffron (#EA580C), Teal (#0F766E), Marigold (#F59E0B), Warm Cream (#FFFBEB). See [brand & design tokens](../design/brand-&-design-tokens.md).

**After generating:** Upload assets to `frontend/public/uploads/`, then run `pnpm run segregate-assets` (from project root or frontend) to move them into the correct folders. Use [asset-mapping.example.json](../../frontend/scripts/asset-mapping.example.json) if filenames differ.

---

## 1. Branding

| # | Filename | Resolution | Aspect ratio | Prompt |
|---|----------|------------|--------------|--------|
| 1 | `logo.png` | 600 × 240 px | 2.5 : 1 | Elegant Hindu temple logo for "Vishnu Mandir, Tampa," minimal, saffron and teal, traditional kalash or temple silhouette on cream background, clean, professional. |
| 2 | `tagline.png` | 600 × 120 px | 5 : 1 | Optional. Text-only tagline graphic: "A sacred space for devotion, community, and spiritual growth" in serif type, saffron/teal on cream, minimal. |

**Folder:** `frontend/public/images/`

---

## 2. Open Graph / social default

| # | Filename | Resolution | Aspect ratio | Prompt |
|---|----------|------------|--------------|--------|
| 3 | `og-default.png` | 1200 × 630 px | 1.91 : 1 | Serene Hindu temple exterior at golden hour, traditional architecture, saffron and teal accents, space for "Vishnu Mandir, Tampa" text, warm cream sky, photorealistic, peaceful. |

**Folder:** `frontend/public/images/og/`

---

## 3. Hero & home page

| # | Filename | Resolution | Aspect ratio | Prompt |
|---|----------|------------|--------------|--------|
| 4 | `hero-home.jpg` | 2560 × 1080 px | 21 : 9 | Wide cinematic shot of a Hindu temple exterior at dusk, traditional architecture, warm saffron and gold lighting, palm trees, Tampa FL, serene, photorealistic. |
| 5 | `event-major-festivals.jpg` | 800 × 600 px | 4 : 3 | Diwali festival of lights, rows of diyas and marigolds, Hindu temple backdrop, warm golden light, devotees in traditional dress, photorealistic, joyful. |
| 6 | `event-cultural-programs.jpg` | 800 × 600 px | 4 : 3 | Classical Indian dance performance, Bharatanatyam or Odissi, traditional costume, temple hall, warm lighting, photorealistic. |
| 7 | `event-educational-classes.jpg` | 800 × 600 px | 4 : 3 | Hindu temple education class, children and adults learning together, traditional setting, warm cream and saffron tones, photorealistic, serene. |

**Folders:** `frontend/public/images/hero/`, `frontend/public/images/home/`

---

## 4. Deities

| # | Filename | Resolution | Aspect ratio | Prompt |
|---|----------|------------|--------------|--------|
| 8 | `deity-vishnu.jpg` | 800 × 800 px | 1 : 1 | Traditional Hindu murti or painting of Lord Vishnu, four arms, conch and chakra, serene, rich colors, temple setting, reverent, photorealistic. |
| 9 | `deity-lakshmi.jpg` | 800 × 800 px | 1 : 1 | Traditional Hindu murti or painting of Goddess Lakshmi, gold and red, lotus, serene, temple setting, photorealistic. |
| 10 | `deity-ganesha.jpg` | 800 × 800 px | 1 : 1 | Traditional Hindu murti of Lord Ganesha, vibrant, temple setting, reverent, photorealistic. |
| 11 | `deity-shiva.jpg` | 800 × 800 px | 1 : 1 | Traditional Hindu murti of Lord Shiva, meditative, trishul, temple setting, photorealistic. |
| 12 | `deity-saraswati.jpg` | 800 × 800 px | 1 : 1 | Traditional Hindu murti of Goddess Saraswati, veena, white and gold, serene, temple setting, photorealistic. |
| 13 | `deity-hanuman.jpg` | 800 × 800 px | 1 : 1 | Traditional Hindu murti of Lord Hanuman, devoted, strong, temple setting, photorealistic. |

**Folder:** `frontend/public/images/deities/`

---

## 5. Festivals

| # | Filename | Resolution | Aspect ratio | Prompt |
|---|----------|------------|--------------|--------|
| 14 | `festival-diwali.jpg` | 1200 × 675 px | 16 : 9 | Diwali celebration, diyas, rangoli, temple, warm light, community, photorealistic. |
| 15 | `festival-navratri.jpg` | 1200 × 675 px | 16 : 9 | Navratri Garba dance, traditional dress, dandiya, temple hall, vibrant, photorealistic. |
| 16 | `festival-janmashtami.jpg` | 1200 × 675 px | 16 : 9 | Janmashtami celebration, Lord Krishna decoration, temple, devotional, photorealistic. |
| 17 | `festival-ganesh-chaturthi.jpg` | 1200 × 675 px | 16 : 9 | Ganesh Chaturthi celebration, modak, temple, festive, photorealistic. |
| 18 | `festival-holi.jpg` | 1200 × 675 px | 16 : 9 | Holi festival of colors, temple community, spring, joyful, photorealistic. |
| 19 | `festival-rama-navami.jpg` | 1200 × 675 px | 16 : 9 | Rama Navami celebration, devotional, temple, Ramayana, photorealistic. |

**Folder:** `frontend/public/images/festivals/`

---

## 6. Temple / virtual visit

**Prefer real photos of Vishnu Mandir, Tampa.** Prompts are for placeholders or when photos are unavailable.

| # | Filename | Resolution | Aspect ratio | Prompt |
|---|----------|------------|--------------|--------|
| 20 | `temple-exterior.jpg` | 1920 × 1080 px | 16 : 9 | Hindu temple exterior, traditional architecture, daytime, Florida, palm trees, serene, photorealistic. |
| 21 | `temple-main-prayer-hall.jpg` | 1200 × 800 px | 3 : 2 | Hindu temple main prayer hall, sacred, saffron and cream, deities, warm lighting, photorealistic. |
| 22 | `temple-deity-shrines.jpg` | 1200 × 800 px | 3 : 2 | Hindu temple deity shrines, multiple altars, traditional, warm lighting, photorealistic. |
| 23 | `temple-community-spaces.jpg` | 1200 × 800 px | 3 : 2 | Hindu temple community hall, cultural events space, warm, clean, photorealistic. |
| 24 | `temple-grounds.jpg` | 1200 × 800 px | 3 : 2 | Hindu temple grounds, exterior, parking, traditional architecture, daylight, photorealistic. |

**Folder:** `frontend/public/images/temple/`

---

## 7. Gallery (cultural media)

| # | Filename | Resolution | Aspect ratio | Prompt |
|---|----------|------------|--------------|--------|
| 25 | `gallery-festivals.jpg` | 800 × 600 px | 4 : 3 | Hindu temple festival celebration, diyas, community, warm light, photorealistic. |
| 26 | `gallery-music.jpg` | 800 × 600 px | 4 : 3 | Bhajan or devotional music performance, temple hall, traditional instruments, warm lighting, photorealistic. |
| 27 | `gallery-dance.jpg` | 800 × 600 px | 4 : 3 | Classical Indian dance performance, traditional costume, temple stage, photorealistic. |

**Folder:** `frontend/public/images/gallery/`

---

## 8. Favicon (optional refresh)

| # | Filename | Resolution | Aspect ratio | Prompt |
|---|----------|------------|--------------|--------|
| 28 | `favicon.ico` | 32 × 32 px (ico) | 1 : 1 | Simple temple silhouette or Om symbol, saffron on cream, works at 32×32. |
| – | `apple-touch-icon.png` | 180 × 180 px | 1 : 1 | Same as favicon, crisp at 180×180. |

**Locations:** `frontend/src/app/favicon.ico`; apple-touch in `frontend/public/` per Next.js if used.

---

## Summary

| Category | Files | Folder |
|----------|-------|--------|
| Branding | `logo.png`, `tagline.png` (optional) | `images/` |
| OG | `og-default.png` | `images/og/` |
| Hero | `hero-home.jpg` | `images/hero/` |
| Home events | `event-major-festivals.jpg`, `event-cultural-programs.jpg`, `event-educational-classes.jpg` | `images/home/` |
| Deities | 6 deity images | `images/deities/` |
| Festivals | 6 festival images | `images/festivals/` |
| Temple | 5 temple images | `images/temple/` |
| Gallery | 3 category images | `images/gallery/` |
| Favicon | `favicon.ico`, `apple-touch-icon.png` (optional) | `app/`, `public/` |

**Total:** 27 main assets (+ 2 optional tagline/favicon variants).

**Formats:** PNG for logo, OG, favicon; JPG for photos. Export sRGB, 72–150 dpi for web.
