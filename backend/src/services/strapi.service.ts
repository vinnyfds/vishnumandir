import axios, { AxiosError } from "axios";

const CMS_API_URL = process.env.CMS_API_URL || "http://localhost:1337/api";
const CMS_API_TOKEN = process.env.CMS_API_TOKEN || "";

/**
 * Strapi API client configuration
 */
const strapiClient = axios.create({
  baseURL: CMS_API_URL,
  headers: {
    "Content-Type": "application/json",
    ...(CMS_API_TOKEN && { Authorization: `Bearer ${CMS_API_TOKEN}` }),
  },
  timeout: 10000, // 10 second timeout
});

/**
 * Interface for Puja Sponsorship data
 */
interface PujaSponsorshipData {
  pujaId: string;
  pujaServiceName: string;
  sponsorName: string;
  sponsorEmail: string;
  sponsorPhone?: string;
  requestedDate: string; // ISO date string
  location?: string;
  notes?: string;
  attachmentUrl?: string;
  status?: string;
  transactionId?: string;
  postgresId: string;
}

/**
 * Interface for Facility Request data
 */
interface FacilityRequestData {
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  eventType: string;
  eventName?: string;
  eventDate: string; // ISO date string
  startTime?: string;
  endTime?: string;
  numberOfGuests: number;
  details?: string;
  requirements?: string;
  status?: string;
  transactionId?: string;
  postgresId: string;
}

/**
 * Interface for Form Submission data
 */
interface FormSubmissionData {
  formType: "DONATION_STATEMENT" | "CHANGE_OF_ADDRESS" | "EMAIL_SUBSCRIPTION";
  email: string;
  name?: string;
  payload: Record<string, unknown>;
  transactionId: string;
  postgresId: string;
}

/**
 * Creates a puja sponsorship entry in Strapi.
 * Non-blocking - errors are logged but don't throw.
 * @param data Puja sponsorship data
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function createPujaSponsorship(
  data: PujaSponsorshipData
): Promise<boolean> {
  if (!CMS_API_TOKEN) {
    console.warn("[strapi.service] CMS_API_TOKEN not configured, skipping Strapi sync");
    return false;
  }

  try {
    await strapiClient.post("/puja-sponsorships", { data });
    console.log(`[strapi.service] Created puja sponsorship in Strapi: ${data.transactionId}`);
    return true;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      `[strapi.service] Failed to create puja sponsorship in Strapi:`,
      axiosError.response?.status,
      axiosError.response?.data || axiosError.message
    );
    return false;
  }
}

/**
 * Creates a facility request entry in Strapi.
 * Non-blocking - errors are logged but don't throw.
 * @param data Facility request data
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function createFacilityRequest(
  data: FacilityRequestData
): Promise<boolean> {
  if (!CMS_API_TOKEN) {
    console.warn("[strapi.service] CMS_API_TOKEN not configured, skipping Strapi sync");
    return false;
  }

  try {
    await strapiClient.post("/facility-requests", { data });
    console.log(`[strapi.service] Created facility request in Strapi: ${data.transactionId}`);
    return true;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      `[strapi.service] Failed to create facility request in Strapi:`,
      axiosError.response?.status,
      axiosError.response?.data || axiosError.message
    );
    return false;
  }
}

/**
 * Creates a form submission entry in Strapi.
 * Non-blocking - errors are logged but don't throw.
 * @param data Form submission data
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function createFormSubmission(
  data: FormSubmissionData
): Promise<boolean> {
  if (!CMS_API_TOKEN) {
    console.warn("[strapi.service] CMS_API_TOKEN not configured, skipping Strapi sync");
    return false;
  }

  try {
    await strapiClient.post("/form-submissions", { data });
    console.log(`[strapi.service] Created form submission in Strapi: ${data.transactionId}`);
    return true;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      `[strapi.service] Failed to create form submission in Strapi:`,
      axiosError.response?.status,
      axiosError.response?.data || axiosError.message
    );
    return false;
  }
}
