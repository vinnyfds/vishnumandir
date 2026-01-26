import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.vishnumandirtampa.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      // Worship to Religious redirects
      {
        source: "/worship",
        destination: "/religious",
        permanent: true,
      },
      {
        source: "/worship/schedule",
        destination: "/religious/puja-schedule",
        permanent: true,
      },
      {
        source: "/worship/puja-services",
        destination: "/religious/puja-services",
        permanent: true,
      },
      {
        source: "/worship/festivals",
        destination: "/religious/festivals",
        permanent: true,
      },
      {
        source: "/worship/resources",
        destination: "/religious/prayer-books",
        permanent: true,
      },
      // Temple section redirects
      {
        source: "/temple/deities",
        destination: "/deities",
        permanent: true,
      },
      {
        source: "/temple/priests",
        destination: "/religious/priests",
        permanent: true,
      },
      {
        source: "/temple/about-us",
        destination: "/about/about",
        permanent: true,
      },
      {
        source: "/temple/contact",
        destination: "/about/contact",
        permanent: true,
      },
      // Community section redirects
      {
        source: "/community/education",
        destination: "/education/classes",
        permanent: true,
      },
      {
        source: "/community/volunteer",
        destination: "/about/volunteer",
        permanent: true,
      },
      {
        source: "/community/newsletter-archive",
        destination: "/calendar/newsletter",
        permanent: true,
      },
      // Support/Forms redirects
      {
        source: "/support/sponsor-a-puja",
        destination: "/forms/puja-sponsorships",
        permanent: true,
      },
      {
        source: "/support/facility-rental",
        destination: "/forms/request-facility",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
