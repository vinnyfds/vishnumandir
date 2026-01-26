# Brand & Design Tokens

| | |
|---|---|
| **Document Type** | Brand & Design Tokens |
| **Category** | design |
| **Project** | Vishnu Mandir, Tampa |
| **Version** | 2.0 |
| **Last Updated**| 2026-01-25 |

## 1. Introduction

This document defines the foundational visual design system for the Vishnu Mandir, Tampa website. These "design tokens" are the single source of truth for all stylistic attributes, including colors, typography, spacing, and shadows.

The primary goal is to create a **spiritual, traditional, and serene** aesthetic. We are moving away from a generic corporate look to one that resonates with the temple's heritage, using saffron, teal, and warm cream tones.

These tokens are designed to be directly implemented within the project's chosen framework: **Next.js with Tailwind CSS**.

## 2. Color Palette ("The Temple Palette")

The color palette balances warm, sacred tones with calming natural hues.

### 2.1. Primary Colors

These colors form the core of the brand identity.

| Name | Swatch | Hex | Tailwind Token | Usage |
|---|---|---|---|---|
| **Saffron (Agni)** | <span style="display:inline-block; width:20px; height:20px; background-color:#EA580C; border: 1px solid #ccc;"></span> | `#EA580C` | `primary` | Primary CTAs (buttons like "Donate"), active navigation links, and key interactive elements. Represents purity and fire. |
| **Peacock (Krishna)** | <span style="display:inline-block; width:20px; height:20px; background-color:#0F766E; border: 1px solid #ccc;"></span> | `#0F766E` | `secondary` | Secondary buttons, footer backgrounds, and informational highlights. Represents serenity and nature. |
| **Marigold (Gold)** | <span style="display:inline-block; width:20px; height:20px; background-color:#F59E0B; border: 1px solid #ccc;"></span> | `#F59E0B` | `accent` | Used for highlights, borders, icons, and special announcements. |

### 2.2. Neutral Colors

Neutrals provide the canvas for the content, ensuring readability and a clean, uncluttered interface.

| Name | Swatch | Hex | Tailwind Token | Usage |
|---|---|---|---|---|
| **Sandalwood (Cream)** | <span style="display:inline-block; width:20px; height:20px; background-color:#FFFBEB; border: 1px solid #ccc;"></span> | `#FFFBEB` | `background` | The primary background color for the site, providing a warm, soft, and paper-like feel. |
| **Earth (Deep Brown)** | <span style="display:inline-block; width:20px; height:20px; background-color:#451a03; border: 1px solid #ccc;"></span> | `#451a03` | `text-primary` | Main body text, headings, and labels. Softer than black, warmer than gray. |
| **Medium Gray** | <span style="display:inline-block; width:20px; height:20px; background-color:#6b7280; border: 1px solid #ccc;"></span> | `#6b7280` | `text-secondary` | Subheadings, meta-text (dates, author), and placeholder text. |
| **Light Gray** | <span style="display:inline-block; width:20px; height:20px; background-color:#e5e7eb; border: 1px solid #ccc;"></span> | `#e5e7eb` | `border` | Standard border color for cards, inputs, and dividers. |

### 2.3. Semantic Colors

These colors provide contextual feedback to users for actions like form submissions or system alerts.

| Name | Swatch | Hex | Tailwind Token | Usage |
|---|---|---|---|---|
| **Success** | <span style="display:inline-block; width:20px; height:20px; background-color:#16a34a; border: 1px solid #ccc;"></span> | `#16a34a` | `success` | Confirmation messages, successful form submissions, and positive alerts. |
| **Warning** | <span style="display:inline-block; width:20px; height:20px; background-color:#f59e0b; border: 1px solid #ccc;"></span> | `#f59e0b` | `warning` | Non-critical alerts, pending statuses, or helpful hints. |
| **Error** | <span style="display:inline-block; width:20px; height:20px; background-color:#dc2626; border: 1px solid #ccc;"></span> | `#dc2626` | `error` | Form validation errors, failed actions, and critical alerts. |

## 3. Typography

We use distinct typefaces to evoke tradition and elegance.

### 3.1. Font Families

| Name | Font | Tailwind Token | Usage |
|---|---|---|---|
| **Cinzel** (Display) | `Cinzel` | `font-display` | Used for main page titles (`h1`, `h2`) to give a classic, inscription-style look. |
| **Playfair Display** (Serif) | `Playfair Display` | `font-serif` | Used for section headers (`h3`, cards) and elegant subheadings. |
| **Lato** (Sans-serif) | `Lato` | `font-sans` | Used for all body copy, paragraphs, labels, and UI elements. Clean and readable. |

### 3.2. Type Scale

A harmonious and responsive type scale is defined using `rem` units for accessibility.

| Tailwind Class | Size (rem) | Size (px) | Usage Examples |
|---|---|---|---|
| `text-xs` | 0.75 rem | 12 px | Legal text, fine print |
| `text-sm` | 0.875 rem | 14 px | Meta information, captions, labels |
| `text-base` | 1 rem | 16 px | Body copy, paragraphs (default size) |
| `text-lg` | 1.125 rem | 18 px | Stand-out paragraphs, sub-headings |
| `text-xl` | 1.25 rem | 20 px | Minor headings (h4) |
| `text-2xl` | 1.5 rem | 24 px | Section titles (h3) |
| `text-3xl` | 1.875 rem | 30 px | Sub-page titles (h2) |
| `text-4xl` | 2.25 rem | 36 px | Main page titles (h1) |
| `text-5xl` | 3 rem | 48 px | Hero section display text |

### 3.3. Font Weights & Leading

| Name | Weight | Tailwind Class | Leading (Line Height) |
|---|---|---|---|
| Regular | 400 | `font-normal` | `leading-relaxed` (1.625) for body copy. |
| Medium | 500 | `font-medium` | Used for button text and bolded labels. |
| Semi-Bold | 600 | `font-semibold`| `leading-tight` (1.25) for headings. |
| Bold | 700 | `font-bold` | For strong emphasis in text. |

## 4. Spacing & Sizing

Consistent spacing is critical for a clean, rhythmic layout. We will adhere to Tailwind's default 4-pixel grid system.

**Rule:** Use `p-{n}`, `m-{n}`, and `gap-{n}` utility classes for all spacing needs. Avoid arbitrary values.

## 5. Borders & Shadows

Subtlety is key. Borders and shadows are used to add depth and define interactive areas without creating visual noise.

### 5.1. Border Radius

| Name | Size | Tailwind Token | Usage |
|---|---|---|---|
| Small | `0.25rem` | `rounded-sm` | Small elements like tags. |
| Default | `0.5rem` | `rounded-lg` | Default for cards, buttons, and inputs. |
| Large | `0.75rem` | `rounded-xl`| Larger containers or images. |
| Full | `9999px` | `rounded-full`| Avatars, circular icons. |

### 5.2. Box Shadows

Shadows are soft and warm to maintain the serene aesthetic.

| Name | Tailwind Token | Value | Usage |
|---|---|---|---|
| **sm** | `shadow-sm` | `0 2px 4px rgb(0 0 0 / 0.05)` | Hover states on list items, subtle lift. |
| **md** | `shadow-md` | `0 4px 10px rgb(0 0 0 / 0.08)` | Default for cards, modals. |
| **lg** | `shadow-lg` | `0 10px 20px rgb(0 0 0 / 0.08)` | Modals, dropdowns, popovers. |
| **warm** | `shadow-warm` | `0 10px 15px -3px rgba(234, 88, 12, 0.1)` | Special warm shadow for featured elements. |

## 6. Iconography

We will use the **Lucide React** icon library (`lucide-react`) for all UI icons.

- **Default Size:** `1.25rem` (20px), corresponding to `h-5 w-5`.
- **Default Stroke:** `1.5px`.
- **Color:** Icons should typically inherit color via `currentColor` to match the surrounding text (e.g., `text-primary`).

## 7. Tailwind CSS Implementation

To apply these tokens globally, the `tailwind.config.ts` file should be configured as follows.

```typescript
// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Palette
        primary: "#EA580C",   // Saffron (Agni)
        secondary: "#0F766E", // Peacock (Krishna)
        accent: "#F59E0B",    // Marigold (Gold)

        // Neutral Palette
        background: "#FFFBEB",    // Sandalwood (Cream)
        "text-primary": "#451a03",// Earth (Deep Brown)
        "text-secondary": "#6b7280",// Medium Gray
        border: "#e5e7eb",        // Light Gray

        // Semantic Palette
        success: "#16a34a",
        warning: "#f59e0b",
        error: "#dc2626",
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-lato)", "sans-serif"],
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
      },
      boxShadow: {
        sm: "0 2px 4px rgb(0 0 0 / 0.05)",
        md: "0 4px 10px rgb(0 0 0 / 0.08)",
        lg: "0 10px 20px rgb(0 0 0 / 0.08)",
        warm: "0 10px 15px -3px rgba(234, 88, 12, 0.1), 0 4px 6px -2px rgba(234, 88, 12, 0.05)",
      }
    },
  },
  plugins: [],
};

export default config;
```
