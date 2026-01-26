import Link from "next/link";

/**
 * About section hub page.
 * @returns {JSX.Element} The rendered about hub page
 */
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-serif text-4xl font-bold text-text-primary mb-6">
        About
      </h1>
      <p className="text-lg text-text-secondary mb-8">
        Learn more about Vishnu Mandir, Tampa, and how to get involved.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/about/contact"
          className="bg-white rounded-lg shadow-md p-6 border border-border hover:border-primary transition-colors"
        >
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2">
            Contact
          </h2>
          <p className="text-text-secondary">
            Get in touch with us
          </p>
        </Link>
        <Link
          href="/about/location"
          className="bg-white rounded-lg shadow-md p-6 border border-border hover:border-primary transition-colors"
        >
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2">
            Location
          </h2>
          <p className="text-text-secondary">
            Find us and get directions
          </p>
        </Link>
        <Link
          href="/about/volunteer"
          className="bg-white rounded-lg shadow-md p-6 border border-border hover:border-primary transition-colors"
        >
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2">
            Volunteer
          </h2>
          <p className="text-text-secondary">
            Volunteer opportunities
          </p>
        </Link>
        <Link
          href="/about/virtual-visit"
          className="bg-white rounded-lg shadow-md p-6 border border-border hover:border-primary transition-colors"
        >
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2">
            Virtual Visit
          </h2>
          <p className="text-text-secondary">
            Take a virtual tour
          </p>
        </Link>
        <Link
          href="/about/feedback"
          className="bg-white rounded-lg shadow-md p-6 border border-border hover:border-primary transition-colors"
        >
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2">
            Feedback
          </h2>
          <p className="text-text-secondary">
            Share your feedback
          </p>
        </Link>
        <Link
          href="/about/faq"
          className="bg-white rounded-lg shadow-md p-6 border border-border hover:border-primary transition-colors"
        >
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2">
            FAQ
          </h2>
          <p className="text-text-secondary">
            Frequently asked questions
          </p>
        </Link>
        <Link
          href="/about/about"
          className="bg-white rounded-lg shadow-md p-6 border border-border hover:border-primary transition-colors"
        >
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2">
            About
          </h2>
          <p className="text-text-secondary">
            Learn about our temple
          </p>
        </Link>
      </div>
    </div>
  );
}
