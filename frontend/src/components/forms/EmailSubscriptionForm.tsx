"use client";

import { useState } from "react";
import { postJson } from "@/lib/api";

/**
 * Client-side Email Subscription form. Submits to /api/v1/forms/email-subscription.
 */
export function EmailSubscriptionForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const get = (n: string) => (form.querySelector(`[name="${n}"]`) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value ?? "";
    const body = { name: get("name"), email: get("email"), subscribe: true };
    const result = await postJson("/forms/email-subscription", body);
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
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Subscribe or update preferences">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email-sub-name" className="block text-sm font-medium text-text-primary mb-2">
            Your Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="email-sub-name"
            name="name"
            required
            aria-required="true"
            autoComplete="name"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email-sub-email" className="block text-sm font-medium text-text-primary mb-2">
            Email Address <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            id="email-sub-email"
            name="email"
            required
            aria-required="true"
            autoComplete="email"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="your.email@example.com"
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
        className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70"
      >
        {status === "loading" ? "Submitting…" : "Update Subscription Preferences"}
      </button>
    </form>
  );
}
