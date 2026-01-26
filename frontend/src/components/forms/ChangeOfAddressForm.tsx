"use client";

import { useState } from "react";
import { postJson } from "@/lib/api";

/**
 * Client-side Change of Address form. Submits to /api/v1/forms/change-of-address.
 */
export function ChangeOfAddressForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const get = (n: string) => (form.querySelector(`[name="${n}"]`) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value ?? "";
    const street = get("street");
    const city = get("city");
    const state = get("state");
    const zip = get("zip");
    const newAddress = [street, city, state, zip].filter(Boolean).join(", ");
    const body = { name: get("name"), email: get("email"), phone: get("phone") || undefined, newAddress };
    const result = await postJson("/forms/change-of-address", body);
    if (result.ok) {
      setStatus("success");
      setMessage(result.data.message || "Your request has been submitted.");
      form.reset();
    } else {
      setStatus("error");
      setMessage(result.error.message || "Submission failed.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Change of address form">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="update-name" className="block text-sm font-medium text-text-primary mb-2">
            Your Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="update-name"
            name="name"
            required
            aria-required="true"
            autoComplete="name"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="update-email" className="block text-sm font-medium text-text-primary mb-2">
            Email <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            id="update-email"
            name="email"
            required
            aria-required="true"
            autoComplete="email"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="your.email@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="update-phone" className="block text-sm font-medium text-text-primary mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="update-phone"
          name="phone"
          autoComplete="tel"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="(813) 555-1234"
        />
      </div>
      <div>
        <label htmlFor="update-street" className="block text-sm font-medium text-text-primary mb-2">
          New Street Address <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="update-street"
          name="street"
          required
          aria-required="true"
          autoComplete="street-address"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="123 Main St"
        />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="update-city" className="block text-sm font-medium text-text-primary mb-2">
            City <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="update-city"
            name="city"
            required
            aria-required="true"
            autoComplete="address-level2"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Tampa"
          />
        </div>
        <div>
          <label htmlFor="update-state" className="block text-sm font-medium text-text-primary mb-2">
            State <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="update-state"
            name="state"
            required
            aria-required="true"
            autoComplete="address-level1"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="FL"
          />
        </div>
        <div>
          <label htmlFor="update-zip" className="block text-sm font-medium text-text-primary mb-2">
            ZIP <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="update-zip"
            name="zip"
            required
            aria-required="true"
            autoComplete="postal-code"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="33612"
          />
        </div>
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
        {status === "loading" ? "Submitting…" : "Update Contact Information"}
      </button>
    </form>
  );
}
