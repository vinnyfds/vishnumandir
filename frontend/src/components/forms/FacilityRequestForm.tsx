"use client";

import { useState } from "react";
import { postJson } from "@/lib/api";

/**
 * Client-side Facility Request form. Submits JSON to /api/v1/forms/facility-request.
 */
export function FacilityRequestForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const body = {
      contactName: (form.querySelector('[name="contactName"]') as HTMLInputElement).value,
      email: (form.querySelector('[name="email"]') as HTMLInputElement).value,
      phone: (form.querySelector('[name="phone"]') as HTMLInputElement).value,
      eventType: (form.querySelector('[name="eventType"]') as HTMLSelectElement).value,
      requestedDate: (form.querySelector('[name="requestedDate"]') as HTMLInputElement).value,
      numberOfGuests: Number((form.querySelector('[name="numberOfGuests"]') as HTMLInputElement).value),
      startTime: (form.querySelector('[name="startTime"]') as HTMLInputElement).value || undefined,
      endTime: (form.querySelector('[name="endTime"]') as HTMLInputElement).value || undefined,
      details: (form.querySelector('[name="details"]') as HTMLTextAreaElement).value || undefined,
      requirements: (form.querySelector('[name="requirements"]') as HTMLTextAreaElement).value || undefined,
    };
    const result = await postJson("/forms/facility-request", body);
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
    <form onSubmit={onSubmit} className="space-y-6" aria-label="Facility rental request form">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="facility-name" className="block text-sm font-medium text-text-primary mb-2">
            Your Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="facility-name"
            name="contactName"
            required
            aria-required="true"
            autoComplete="name"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="facility-email" className="block text-sm font-medium text-text-primary mb-2">
            Email <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            id="facility-email"
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
          <label htmlFor="facility-phone" className="block text-sm font-medium text-text-primary mb-2">
            Phone <span className="text-primary">*</span>
          </label>
          <input
            type="tel"
            id="facility-phone"
            name="phone"
            required
            aria-required="true"
            autoComplete="tel"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="(813) 555-1234"
          />
        </div>
        <div>
          <label htmlFor="facility-event-type" className="block text-sm font-medium text-text-primary mb-2">
            Event Type <span className="text-primary">*</span>
          </label>
          <select
            id="facility-event-type"
            name="eventType"
            required
            aria-required="true"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select event type</option>
            <option value="religious">Religious Ceremony</option>
            <option value="cultural">Cultural Program</option>
            <option value="community">Community Gathering</option>
            <option value="educational">Educational Event</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="facility-date" className="block text-sm font-medium text-text-primary mb-2">
          Requested Date <span className="text-primary">*</span>
        </label>
        <input
          type="date"
          id="facility-date"
          name="requestedDate"
          required
          aria-required="true"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="facility-start-time" className="block text-sm font-medium text-text-primary mb-2">
            Start Time
          </label>
          <input
            type="time"
            id="facility-start-time"
            name="startTime"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="facility-end-time" className="block text-sm font-medium text-text-primary mb-2">
            End Time
          </label>
          <input
            type="time"
            id="facility-end-time"
            name="endTime"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div>
        <label htmlFor="facility-attendees" className="block text-sm font-medium text-text-primary mb-2">
          Number of Guests <span className="text-primary">*</span>
        </label>
        <input
          type="number"
          id="facility-attendees"
          name="numberOfGuests"
          min={1}
          required
          aria-required="true"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Approximate number"
        />
      </div>
      <div>
        <label htmlFor="facility-description" className="block text-sm font-medium text-text-primary mb-2">
          Event Description / Details <span className="text-primary">*</span>
        </label>
        <textarea
          id="facility-description"
          name="details"
          rows={4}
          required
          aria-required="true"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Please describe your event, its purpose, and any special requirements..."
        />
      </div>
      <div>
        <label htmlFor="facility-requirements" className="block text-sm font-medium text-text-primary mb-2">
          Special Requirements or Setup Needs
        </label>
        <textarea
          id="facility-requirements"
          name="requirements"
          rows={3}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Any special setup, equipment, or other requirements..."
        />
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
        {status === "loading" ? "Submitting…" : "Submit Facility Request"}
      </button>
    </form>
  );
}
