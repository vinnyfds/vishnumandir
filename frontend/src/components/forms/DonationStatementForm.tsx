"use client";

import { useState } from "react";
import { postJson } from "@/lib/api";

const currentYear = new Date().getFullYear();
const previousYear = currentYear - 1;

/**
 * Client-side Donation Statement form. Submits to /api/v1/forms/donation-statement.
 */
export function DonationStatementForm() {
  const [period, setPeriod] = useState("");
  const [delivery, setDelivery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const showCustomPeriod = period === "custom";
  const requireAddress = delivery === "mail";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const get = (n: string) => (form.querySelector(`[name="${n}"]`) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value ?? "";
    const body: Record<string, unknown> = {
      name: get("name"),
      email: get("email"),
      period: get("period"),
      delivery: get("delivery"),
    };
    if (period === "custom") {
      body.startDate = get("startDate");
      body.endDate = get("endDate");
    }
    if (delivery === "mail") body.address = get("address");
    const result = await postJson("/forms/donation-statement", body);
    if (result.ok) {
      setStatus("success");
      setMessage(result.data.message || "Your request has been submitted.");
      form.reset();
      setPeriod("");
      setDelivery("");
    } else {
      setStatus("error");
      setMessage(result.error.message || "Submission failed.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
      aria-label="Request donation statement"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="statement-name"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            Your Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="statement-name"
            name="name"
            required
            aria-required="true"
            autoComplete="name"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label
            htmlFor="statement-email"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            Email <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            id="statement-email"
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
        <label
          htmlFor="statement-period"
          className="block text-sm font-medium text-text-primary mb-2"
        >
          Statement Period <span className="text-primary">*</span>
        </label>
        <select
          id="statement-period"
          name="period"
          required
          aria-required="true"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select period</option>
          <option value="current-year">
            Current Year ({currentYear})
          </option>
          <option value="previous-year">
            Previous Year ({previousYear})
          </option>
          <option value="custom">Custom Period</option>
        </select>
      </div>
      {showCustomPeriod && (
        <div className="grid md:grid-cols-2 gap-6" data-testid="custom-period">
          <div>
            <label
              htmlFor="statement-start"
              className="block text-sm font-medium text-text-primary mb-2"
            >
              Start Date <span className="text-primary">*</span>
            </label>
            <input
              type="date"
              id="statement-start"
              name="startDate"
              required={showCustomPeriod}
              aria-required={showCustomPeriod}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="statement-end"
              className="block text-sm font-medium text-text-primary mb-2"
            >
              End Date <span className="text-primary">*</span>
            </label>
            <input
              type="date"
              id="statement-end"
              name="endDate"
              required={showCustomPeriod}
              aria-required={showCustomPeriod}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      )}
      <div>
        <label
          htmlFor="statement-delivery"
          className="block text-sm font-medium text-text-primary mb-2"
        >
          Delivery Method <span className="text-primary">*</span>
        </label>
        <select
          id="statement-delivery"
          name="delivery"
          required
          aria-required="true"
          value={delivery}
          onChange={(e) => setDelivery(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select delivery method</option>
          <option value="email">Email (PDF)</option>
          <option value="mail">US Mail</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="statement-address"
          className="block text-sm font-medium text-text-primary mb-2"
        >
          Mailing Address
          {requireAddress ? (
            <>
              {" "}
              <span className="text-primary">*</span> (required for US Mail)
            </>
          ) : (
            " (if requesting US Mail)"
          )}
        </label>
        <textarea
          id="statement-address"
          name="address"
          rows={3}
          required={requireAddress}
          aria-required={requireAddress}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Street address, city, state, ZIP code"
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
        {status === "loading" ? "Submitting…" : "Request Donation Statement"}
      </button>
    </form>
  );
}
