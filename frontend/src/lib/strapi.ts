/**
 * Strapi CMS API client utility.
 * Provides type-safe functions to fetch content from Strapi CMS.
 */

import type {
  StrapiCollectionResponse,
  StrapiResponse,
  StrapiEvent,
  StrapiPujaService,
  StrapiPriest,
  StrapiAnnouncement,
  StrapiNewsletter,
  StrapiPage,
} from "@/types/strapi";

const CMS_API_URL =
  process.env.CMS_API_URL || "http://localhost:1337/api";
const CMS_API_TOKEN = process.env.CMS_API_TOKEN || "";

/**
 * Generic function to fetch content from Strapi API
 * @param endpoint - API endpoint (e.g., "events", "puja-services")
 * @param filters - Query parameters for filtering, sorting, etc.
 * @returns Promise with typed response
 */
async function fetchStrapiContent<T>(
  endpoint: string,
  filters?: Record<string, string | number | boolean | undefined>
): Promise<T | null> {
  try {
    const url = new URL(`${CMS_API_URL}/${endpoint}`);
    
    // Add query parameters
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    // Add populate parameter to include related data and media
    url.searchParams.append("populate", "*");

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (CMS_API_TOKEN) {
      headers["Authorization"] = `Bearer ${CMS_API_TOKEN}`;
    }

    const response = await fetch(url.toString(), {
      headers,
      next: { revalidate: 300 }, // Default ISR revalidation
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[strapi] Failed to fetch ${endpoint}:`,
        response.status,
        response.statusText,
        errorText.substring(0, 200)
      );
      return null;
    }

    const data = await response.json();
    
    // Debug logging for API responses
    if (process.env.NODE_ENV === "development") {
      console.log(`[strapi] Fetched ${endpoint}:`, {
        hasData: !!data?.data,
        dataCount: Array.isArray(data?.data) ? data.data.length : data?.data ? 1 : 0,
        hasError: !!data?.error,
        error: data?.error,
      });
    }
    
    return data as T;
  } catch (error) {
    console.error(`[strapi] Error fetching ${endpoint}:`, error);
    return null;
  }
}

/**
 * Fetch events from Strapi
 * @param filters - Optional filters (category, publishedAt, etc.)
 * @returns Promise with array of events
 */
export async function fetchEvents(filters?: {
  category?: "Religious" | "Cultural" | "Educational" | "Festival";
  publishedAt?: boolean;
  sort?: string;
}): Promise<StrapiEvent[]> {
  const queryParams: Record<string, string> = {};

  if (filters?.category) {
    queryParams["filters[category][$eq]"] = filters.category;
  }

  // Note: publishedAt filter removed due to Strapi v5 compatibility issue
  // The API only returns published items by default anyway
  // if (filters?.publishedAt !== false) {
  //   queryParams["filters[publishedAt][$notNull]"] = "true";
  // }

  if (filters?.sort) {
    queryParams["sort"] = filters.sort;
  } else {
    queryParams["sort"] = "date:asc";
  }

  const response = await fetchStrapiContent<
    StrapiCollectionResponse<StrapiEvent>
  >("events", queryParams);

  if (!response || !response.data) {
    // Debug logging
    if (process.env.NODE_ENV === "development") {
      console.log("[strapi] fetchEvents result:", {
        hasResponse: !!response,
        hasData: !!response?.data,
        filters,
      });
    }
    return [];
  }

  // Debug logging for filtered results
  if (process.env.NODE_ENV === "development") {
    console.log("[strapi] fetchEvents filtered:", {
      totalEvents: response.data.length,
      category: filters?.category,
      events: response.data.map((e) => ({
        title: e.attributes.title,
        category: e.attributes.category,
        date: e.attributes.date,
        published: !!e.attributes.publishedAt,
      })),
    });
  }

  return response.data;
}

/**
 * Fetch a single event by slug
 * @param slug - Event slug
 * @returns Promise with event or null
 */
export async function fetchEventBySlug(
  slug: string
): Promise<StrapiEvent | null> {
  const response = await fetchStrapiContent<
    StrapiCollectionResponse<StrapiEvent>
  >("events", {
    "filters[slug][$eq]": slug,
    // publishedAt filter removed due to Strapi v5 compatibility
  });

  if (!response || !response.data || response.data.length === 0) {
    return null;
  }

  return response.data[0];
}

/**
 * Fetch puja services from Strapi
 * @returns Promise with array of puja services
 */
export async function fetchPujaServices(): Promise<StrapiPujaService[]> {
  const response = await fetchStrapiContent<
    StrapiCollectionResponse<StrapiPujaService>
  >("puja-services", {
    sort: "name:asc",
    // Filters removed due to Strapi v5 compatibility
  });

  if (!response || !response.data) {
    return [];
  }

  return response.data;
}

/**
 * Fetch a single puja service by slug
 * @param slug - Puja service slug
 * @returns Promise with puja service or null
 */
export async function fetchPujaServiceBySlug(
  slug: string
): Promise<StrapiPujaService | null> {
  const response = await fetchStrapiContent<
    StrapiCollectionResponse<StrapiPujaService>
  >("puja-services", {
    "filters[slug][$eq]": slug,
    // publishedAt filter removed due to Strapi v5 compatibility
  });

  if (!response || !response.data || response.data.length === 0) {
    return null;
  }

  return response.data[0];
}

/**
 * Fetch priests from Strapi
 * @returns Promise with array of priests
 */
export async function fetchPriests(): Promise<StrapiPriest[]> {
  const response = await fetchStrapiContent<
    StrapiCollectionResponse<StrapiPriest>
  >("priests", {
    sort: "name:asc",
    // Filters removed due to Strapi v5 compatibility
  });

  if (!response || !response.data) {
    return [];
  }

  return response.data;
}

/**
 * Fetch announcements from Strapi
 * @param filters - Optional filters (displayUntil, level, etc.)
 * @returns Promise with array of announcements
 */
export async function fetchAnnouncements(filters?: {
  displayUntil?: Date;
  level?: "Info" | "High-Priority";
}): Promise<StrapiAnnouncement[]> {
  const queryParams: Record<string, string> = {
    // publishedAt filter removed due to Strapi v5 compatibility
    sort: "publishedAt:desc",
  };

  if (filters?.level) {
    queryParams["filters[level][$eq]"] = filters.level;
  }

  // Note: displayUntil filter logic moved to frontend filtering
  // if (filters?.displayUntil) {
  //   Only show announcements that haven't expired
  //   queryParams["filters[$or][0][displayUntil][$gte]"] =
  //     filters.displayUntil.toISOString();
  //   queryParams["filters[$or][1][displayUntil][$null]"] = "true";
  // }

  const response = await fetchStrapiContent<
    StrapiCollectionResponse<StrapiAnnouncement>
  >("announcements", queryParams);

  if (!response || !response.data) {
    return [];
  }

  return response.data;
}

/**
 * Fetch newsletters from Strapi
 * @returns Promise with array of newsletters
 */
export async function fetchNewsletters(): Promise<StrapiNewsletter[]> {
  const response = await fetchStrapiContent<
    StrapiCollectionResponse<StrapiNewsletter>
  >("newsletters", {
    sort: "publicationDate:desc",
    // Filters removed due to Strapi v5 compatibility
  });

  if (!response || !response.data) {
    return [];
  }

  return response.data;
}

/**
 * Fetch a page by slug from Strapi
 * @param slug - Page slug
 * @returns Promise with page or null
 */
export async function fetchPageBySlug(
  slug: string
): Promise<StrapiPage | null> {
  const response = await fetchStrapiContent<
    StrapiCollectionResponse<StrapiPage>
  >("pages", {
    "filters[slug][$eq]": slug,
    // publishedAt filter removed due to Strapi v5 compatibility
  });

  if (!response || !response.data || response.data.length === 0) {
    return null;
  }

  return response.data[0];
}
