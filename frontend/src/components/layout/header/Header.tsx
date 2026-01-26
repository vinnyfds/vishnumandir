"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DropdownMenu } from "@/components/ui/DropdownMenu";
import { AudioToggle } from "@/components/audio/AudioToggle";

/**
 * Header component for the public site, displaying logo, tagline, and navigation.
 * Features dropdown menus aligned with SSVT reference website structure.
 * @returns {JSX.Element} The rendered header element
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = {
    religious: [
      { href: "/religious/puja-schedule", label: "Puja Schedule" },
      { href: "/religious/puja-services", label: "Puja Services" },
      { href: "/religious/prayer-books", label: "Prayer Books" },
      { href: "/religious/festivals", label: "Festivals" },
      { href: "/religious/priests", label: "Priests" },
    ],
    cultural: [{ href: "/cultural/media", label: "Media" }],
    education: [
      { href: "/education/classes", label: "Classes" },
      { href: "/education/events", label: "Events" },
      { href: "/education/resources", label: "Resources" },
    ],
    calendar: [
      { href: "/calendar/current-events", label: "Current Events" },
      { href: "/calendar/newsletter", label: "Newsletter" },
      { href: "/calendar/annual-calendar", label: "Annual Calendar" },
    ],
    forms: [
      { href: "/forms/puja-sponsorships", label: "Puja Sponsorships" },
      { href: "/forms/request-facility", label: "Request Facility" },
      { href: "/forms/donation-statement", label: "Donation Statement" },
      { href: "/forms/change-of-address", label: "Change of Address" },
      { href: "/forms/email-subscription", label: "Email Subscription" },
      { href: "/forms/all-other-forms", label: "All Other Forms" },
    ],
    about: [
      { href: "/about/contact", label: "Contact" },
      { href: "/about/location", label: "Location" },
      { href: "/about/volunteer", label: "Volunteer" },
      { href: "/about/virtual-visit", label: "Virtual Visit" },
      { href: "/about/feedback", label: "Feedback" },
      { href: "/about/faq", label: "FAQ" },
      { href: "/about/about", label: "About" },
    ],
  };

  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="relative h-12 md:h-14 w-36 md:w-44 shrink-0">
            <Link href="/" className="block relative h-full w-full">
              <Image
                src="/images/VISHNUMANDIR%20LOGO%20(3).png"
                alt="Vishnu Mandir, Tampa - Hindu Temple & Community Center"
                fill
                priority
                sizes="(max-width: 768px) 144px, 176px"
                className="object-contain object-left"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 flex-wrap justify-end">
            <Link
              href="/deities"
              className="text-text-primary hover:text-primary font-medium transition-colors"
            >
              Deities
            </Link>
            <DropdownMenu
              label="Religious"
              items={menuItems.religious}
              href="/religious"
            />
            <DropdownMenu
              label="Cultural"
              items={menuItems.cultural}
              href="/cultural"
            />
            <DropdownMenu
              label="Education"
              items={menuItems.education}
              href="/education"
            />
            <DropdownMenu
              label="Calendar"
              items={menuItems.calendar}
              href="/calendar"
            />
            <DropdownMenu
              label="Forms"
              items={menuItems.forms}
              href="/forms"
            />
            <Link
              href="/recurring-donation"
              className="text-text-primary hover:text-primary font-medium transition-colors"
            >
              Recurring-Donation
            </Link>
            <Link
              href="/online-puja"
              className="text-text-primary hover:text-primary font-medium transition-colors"
            >
              Online-Puja
            </Link>
            <DropdownMenu
              label="About"
              items={menuItems.about}
              href="/about"
            />
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-border">
              <AudioToggle />
              <Link
                href="/support/donate"
                className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Donate
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden text-text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/deities"
                className="text-text-primary hover:text-primary font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Deities
              </Link>
              <div>
                <Link
                  href="/religious"
                  className="text-text-primary hover:text-primary font-medium transition-colors block mb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Religious
                </Link>
                <div className="pl-4 flex flex-col gap-2">
                  {menuItems.religious.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-text-secondary hover:text-primary text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <Link
                  href="/cultural"
                  className="text-text-primary hover:text-primary font-medium transition-colors block mb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cultural
                </Link>
                <div className="pl-4 flex flex-col gap-2">
                  {menuItems.cultural.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-text-secondary hover:text-primary text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <Link
                  href="/education"
                  className="text-text-primary hover:text-primary font-medium transition-colors block mb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Education
                </Link>
                <div className="pl-4 flex flex-col gap-2">
                  {menuItems.education.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-text-secondary hover:text-primary text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <Link
                  href="/calendar"
                  className="text-text-primary hover:text-primary font-medium transition-colors block mb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Calendar
                </Link>
                <div className="pl-4 flex flex-col gap-2">
                  {menuItems.calendar.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-text-secondary hover:text-primary text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <Link
                  href="/forms"
                  className="text-text-primary hover:text-primary font-medium transition-colors block mb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Forms
                </Link>
                <div className="pl-4 flex flex-col gap-2">
                  {menuItems.forms.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-text-secondary hover:text-primary text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/recurring-donation"
                className="text-text-primary hover:text-primary font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Recurring-Donation
              </Link>
              <Link
                href="/online-puja"
                className="text-text-primary hover:text-primary font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Online-Puja
              </Link>
              <div>
                <Link
                  href="/about"
                  className="text-text-primary hover:text-primary font-medium transition-colors block mb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <div className="pl-4 flex flex-col gap-2">
                  {menuItems.about.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-text-secondary hover:text-primary text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <AudioToggle />
                <Link
                  href="/support/donate"
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Donate
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
