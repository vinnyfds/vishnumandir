"use client";

import { useState } from "react";
import { postFormData } from "@/lib/api";

/**
 * Client-side Puja Sponsorship form. Submits multipart form to /api/v1/forms/sponsorship.
 */
export function PujaSponsorshipForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await postFormData("/forms/sponsorship", formData);
    if (result.ok) {
      setStatus("success");
      setMessage(result.data.message || "Your request has been submitted.");
      form.reset();
    } else {
      setStatus("error");
      setMessage(result.error.message || "Submission failed.");
      if (result.error.errors?.length) {
        setMessage((m) => m + " " + result.error.errors!.map((e) => e.message).join(". "));
      }
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      encType="multipart/form-data"
      className="space-y-6"
      aria-label="Puja sponsorship form"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="puja-name" className="block text-sm font-medium text-text-primary mb-2">
            Your Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="puja-name"
            name="devoteeName"
            required
            aria-required="true"
            autoComplete="name"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="puja-email" className="block text-sm font-medium text-text-primary mb-2">
            Email <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            id="puja-email"
            name="email"
            required
            aria-required="true"
            autoComplete="email"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="your.email@example.com"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="puja-phone" className="block text-sm font-medium text-text-primary mb-2">
            Phone <span className="text-primary">*</span>
          </label>
          <input
            type="tel"
            id="puja-phone"
            name="phone"
            required
            aria-required="true"
            autoComplete="tel"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="(813) 555-1234"
          />
        </div>
        <div>
          <label htmlFor="puja-type" className="block text-sm font-medium text-text-primary mb-2">
            Puja to Sponsor <span className="text-primary">*</span>
          </label>
          <select
            id="puja-type"
            name="pujaId"
            required
            aria-required="true"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select puja</option>
            <option value="PUJ-DAILY-AARTI-01">Daily Aarti</option>
            <option value="PUJ-HAVAN-01">Havan (Fire Ritual)</option>
            <option value="PUJ-SATYANARAYAN-01">Satyanarayan Katha</option>
            <option value="PUJ-SPECIAL-DEITY-01">Special Deity Puja</option>
            <option value="PUJ-OTHER">Other</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="puja-date" className="block text-sm font-medium text-text-primary mb-2">
          Preferred Date <span className="text-primary">*</span>
        </label>
        <input
          type="date"
          id="puja-date"
          name="sponsorshipDate"
          required
          aria-required="true"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label htmlFor="puja-location" className="block text-sm font-medium text-text-primary mb-2">
          Location <span className="text-primary">*</span>
        </label>
        <select
          id="puja-location"
          name="location"
          required
          aria-required="true"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select location</option>
          <option value="temple">At Temple</option>
          <option value="offsite">Off-Site (My Location)</option>
        </select>
      </div>
      <div>
        <label htmlFor="puja-sankalpam" className="block text-sm font-medium text-text-primary mb-2">
          Names for Sankalpam
        </label>
        <textarea
          id="puja-sankalpam"
          name="specialInstructions"
          rows={3}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Names of family members or individuals to be included in the sankalpam (optional)"
        />
      </div>
      <div>
        <label htmlFor="puja-notes" className="block text-sm font-medium text-text-primary mb-2">
          Additional notes
        </label>
        <textarea
          id="puja-notes"
          name="additionalNotes"
          rows={2}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Occasion, purpose, or any special requests..."
        />
      </div>
      <div>
        <label htmlFor="puja-attachment" className="block text-sm font-medium text-text-primary mb-2">
          File upload (optional)
        </label>
        <input
          type="file"
          id="puja-attachment"
          name="attachment"
          accept=".pdf,image/jpeg,image/png,image/webp"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium"
          aria-describedby="puja-attachment-hint"
        />
        <p id="puja-attachment-hint" className="text-sm text-text-secondary mt-1">
          PDF or images (e.g. list of names, photos). Max 10MB.
        </p>
      </div>
      {status === "success" && (
        <div className="p-4 rounded-lg bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300" role="alert">
          {message}
        </div>
      )}
      {status === "error" && (
        <div className="p-4 rounded-lg bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300" role="alert">
          {message}
        </div>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70"
      >
        {status === "loading" ? "Submitting…" : "Submit Puja Sponsorship Request"}
      </button>
    </form>
  );
}
