"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { handleZeffyClick } from "@/lib/zeffy";

interface DropdownItem {
  href: string;
  label: string;
  isButton?: boolean;
  zeffyLink?: string;
}

interface DropdownMenuProps {
  label: string;
  items: DropdownItem[];
  href?: string;
  className?: string;
}

/**
 * Reusable dropdown menu component with hover and click support.
 * Accessible with keyboard navigation and mobile-responsive.
 * @param {DropdownMenuProps} props - Component props
 * @returns {JSX.Element} The rendered dropdown menu
 */
export function DropdownMenu({
  label,
  items,
  href,
  className = "",
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="text-text-primary hover:text-primary font-medium transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {href ? (
          <Link href={href} className="hover:text-primary">
            {label}
          </Link>
        ) : (
          <span>{label}</span>
        )}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 pt-2 w-56 bg-white rounded-lg shadow-lg border border-border z-50 py-2"
          role="menu"
          aria-orientation="vertical"
        >
          {items.map((item, index) =>
            item.isButton ? (
              <button
                key={index}
                type="button"
                data-zeffy-form-link={item.zeffyLink}
                onClick={(e) => {
                  handleZeffyClick(e as React.MouseEvent<HTMLButtonElement>);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-text-primary hover:bg-primary/10 hover:text-primary transition-colors focus:outline-none focus:bg-primary/10 focus:text-primary"
                role="menuitem"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={index}
                href={item.href}
                className="block px-4 py-2 text-text-primary hover:bg-primary/10 hover:text-primary transition-colors focus:outline-none focus:bg-primary/10 focus:text-primary"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}
