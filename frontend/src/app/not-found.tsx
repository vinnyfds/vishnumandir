import type { Metadata } from "next";
import Link from "next/link";
import { Home, ArrowLeft, Info, Calendar, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found - Vishnu Mandir, Tampa",
  description: "The page you are looking for could not be found.",
};

/**
 * Custom 404 Not Found page.
 * Provides spiritual, serene design with helpful navigation back to main sections.
 * @returns {JSX.Element} The rendered 404 page
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" aria-hidden />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" aria-hidden />
        </div>

        {/* Main content */}
        <div className="space-y-8">
          {/* 404 Number */}
          <div className="space-y-4">
            <h1 className="font-display text-9xl md:text-[12rem] font-bold text-primary/20 leading-none">
              404
            </h1>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary">
              Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-md mx-auto">
              The page you are looking for may have been moved, removed, or does not exist.
            </p>
          </div>

          {/* Navigation links */}
          <div className="pt-8 space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Home className="w-5 h-5" />
              Return to Home
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
              <Link
                href="/about"
                className="flex flex-col items-center gap-2 p-6 bg-white rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
              >
                <Info className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-serif text-lg font-semibold text-text-primary">About Us</span>
                <span className="text-sm text-text-secondary">Learn about our temple</span>
              </Link>

              <Link
                href="/calendar"
                className="flex flex-col items-center gap-2 p-6 bg-white rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
              >
                <Calendar className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-serif text-lg font-semibold text-text-primary">Events</span>
                <span className="text-sm text-text-secondary">View our calendar</span>
              </Link>

              <Link
                href="/support/donate"
                className="flex flex-col items-center gap-2 p-6 bg-white rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
              >
                <Heart className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-serif text-lg font-semibold text-text-primary">Support</span>
                <span className="text-sm text-text-secondary">Make a donation</span>
              </Link>
            </div>

            {/* Additional helpful links */}
            <div className="pt-4">
              <p className="text-sm text-text-secondary mb-4">You may also be looking for:</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link href="/religious" className="text-primary hover:underline">
                  Religious Services
                </Link>
                <Link href="/deities" className="text-primary hover:underline">
                  Deities
                </Link>
                <Link href="/forms" className="text-primary hover:underline">
                  Forms
                </Link>
                <Link href="/about/contact" className="text-primary hover:underline">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
