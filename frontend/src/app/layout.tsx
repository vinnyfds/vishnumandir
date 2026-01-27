import type { Metadata } from "next";
import Script from "next/script";
import { Lato, Cinzel, Playfair_Display } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_URL || "https://vishnumandirtampa.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Vishnu Mandir, Tampa - Hindu Temple & Community Center",
  description:
    "Welcome to Vishnu Mandir, Tampa. View puja schedules, events, and make donations.",
  openGraph: {
    images: [{ url: "/images/og/og-default.webp", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${cinzel.variable} ${playfair.variable}`}
    >
      <head>
        <Script
          src="https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js"
          strategy="afterInteractive"
          onLoad={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new Event('zeffy-script-loaded'));
            }
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
