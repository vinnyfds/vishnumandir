"use client";

import React from "react";

interface ZeffyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  formLink: string;
  children: React.ReactNode;
}

/**
 * Client Component wrapper for Zeffy form buttons
 * Handles opening Zeffy forms in a modal/popup window
 * @param {ZeffyButtonProps} props - Button props including formLink URL
 * @returns {JSX.Element} The rendered button element
 */
export function ZeffyButton({ 
  formLink, 
  children, 
  className = "", 
  ...props 
}: ZeffyButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!formLink) {
      console.error('Zeffy form URL is required');
      return;
    }

    // Popup dimensions
    const width = 600;
    const height = 800;

    // Calculate centered position
    const screenWidth = typeof window !== 'undefined' ? window.screen.width : 1024;
    const screenHeight = typeof window !== 'undefined' ? window.screen.height : 768;
    const left = (screenWidth - width) / 2;
    const top = (screenHeight - height) / 2;

    // Create popup features string
    const features = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`;

    // Open popup
    window.open(formLink, 'zeffy-form', features);
  };

  return (
    <button
      type="button"
      data-zeffy-form-link={formLink}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
