/**
 * Utility functions for working with Strapi CMS data.
 * Handles image URL transformation, rich text rendering, etc.
 */

import type { StrapiMedia } from "@/types/strapi";

const CMS_API_URL =
  process.env.CMS_API_URL || "http://localhost:1337/api";

/**
 * Get full URL for a Strapi media/image
 * Strapi returns relative URLs like "/uploads/image.jpg"
 * We need to prepend the CMS base URL (without /api)
 * 
 * Handles both Strapi v4 (nested: media.data.attributes.url) 
 * and v5 (flat: media.url) structures
 * 
 * @param media - Strapi media object
 * @returns Full URL string or null if no image
 */
export function getStrapiImageUrl(media: StrapiMedia | undefined): string | null {
  if (!media) {
    return null;
  }

  // Strapi v5: flat structure with url directly accessible
  if ('url' in media && typeof media.url === 'string') {
    const imageUrl = media.url;
    const baseUrl = CMS_API_URL.replace("/api", "");
    
    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }
    
    return `${baseUrl}${imageUrl}`;
  }

  // Strapi v4: nested structure with data.attributes.url
  if (media?.data?.attributes?.url) {
    const baseUrl = CMS_API_URL.replace("/api", "");
    const imageUrl = media.data.attributes.url;

    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }

    return `${baseUrl}${imageUrl}`;
  }

  return null;
}

/**
 * Get full URL for a Strapi file (PDF, etc.)
 * Handles both Strapi v4 (nested: file.data.attributes.url)
 * and v5 (flat: file.url) structures
 * @param file - Strapi file object (similar structure to media)
 * @returns Full URL string or null if no file
 */
export function getStrapiFileUrl(
  file: any
): string | null {
  if (!file) {
    return null;
  }

  // Strapi v5: flat structure with url directly accessible
  if ('url' in file && typeof file.url === 'string') {
    const fileUrl = file.url;
    const baseUrl = CMS_API_URL.replace("/api", "");

    if (fileUrl.startsWith("http")) {
      return fileUrl;
    }

    return `${baseUrl}${fileUrl}`;
  }

  // Strapi v4: nested structure with data.attributes.url
  if (file?.data?.attributes?.url) {
    const baseUrl = CMS_API_URL.replace("/api", "");
    const fileUrl = file.data.attributes.url;

    if (fileUrl.startsWith("http")) {
      return fileUrl;
    }

    return `${baseUrl}${fileUrl}`;
  }

  return null;
}

/**
 * Format date and time for display
 * @param date - ISO date string
 * @param time - Time string (HH:mm:ss)
 * @returns Formatted date/time string
 */
export function formatEventDateTime(date: string, time: string): string {
  try {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return `${date} at ${time}`;
  }
}

/**
 * Format date for display
 * @param date - ISO date string
 * @returns Formatted date string
 */
export function formatDate(date: string): string {
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return date;
  }
}

/**
 * Format time for display
 * @param time - Time string (HH:mm:ss)
 * @returns Formatted time string (HH:mm AM/PM)
 */
export function formatTime(time: string): string {
  try {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  } catch {
    return time;
  }
}

/**
 * Check if an event is in the future
 * @param date - ISO date string
 * @param time - Time string (HH:mm:ss)
 * @returns True if event is in the future
 */
export function isFutureEvent(date: string, time: string): boolean {
  try {
    const eventDate = new Date(`${date}T${time}`);
    const now = new Date();
    return eventDate > now;
  } catch {
    return false;
  }
}

/**
 * Render Strapi rich text to HTML string
 * This is a simple implementation that converts rich text JSON to HTML
 * For more complex rendering, consider using @strapi/richtext-react-renderer
 * @param richText - Rich text JSON from Strapi
 * @returns HTML string
 */
export function renderRichText(richText: string | undefined): string {
  if (!richText) {
    return "";
  }

  try {
    // If it's already HTML, return as-is
    if (typeof richText === "string" && richText.startsWith("<")) {
      return richText;
    }

    // If it's JSON, parse and convert to HTML
    const parsed = typeof richText === "string" ? JSON.parse(richText) : richText;

    if (Array.isArray(parsed)) {
      return parsed
        .map((node) => {
          if (node.type === "paragraph") {
            return `<p>${renderRichTextNode(node)}</p>`;
          }
          if (node.type === "heading") {
            const level = node.level || 2;
            return `<h${level}>${renderRichTextNode(node)}</h${level}>`;
          }
          if (node.type === "list") {
            const tag = node.format === "ordered" ? "ol" : "ul";
            const items = node.children
              .map((child: unknown) => `<li>${renderRichTextNode(child)}</li>`)
              .join("");
            return `<${tag}>${items}</${tag}>`;
          }
          return renderRichTextNode(node);
        })
        .join("");
    }

    return String(richText);
  } catch {
    // If parsing fails, return as plain text
    return String(richText);
  }
}

/**
 * Render a single rich text node
 * @param node - Rich text node
 * @returns HTML string for the node
 */
function renderRichTextNode(node: unknown): string {
  if (typeof node !== "object" || node === null) {
    return String(node);
  }

  const n = node as { type?: string; text?: string; children?: unknown[] };

  if (n.text) {
    let text = n.text;
    // Handle formatting (bold, italic, etc.)
    if (n.type === "text") {
      const format = (n as { bold?: boolean; italic?: boolean }).bold
        ? "strong"
        : (n as { italic?: boolean }).italic
          ? "em"
          : null;
      if (format) {
        text = `<${format}>${text}</${format}>`;
      }
    }
    return text;
  }

  if (Array.isArray(n.children)) {
    return n.children.map(renderRichTextNode).join("");
  }

  return "";
}
