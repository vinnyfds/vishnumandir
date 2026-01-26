import Link from "next/link";

/**
 * Footer component for the public site with quick links and legal information.
 * Updated with new SSVT-aligned URL structure.
 * @returns {JSX.Element} The rendered footer element
 */
export function Footer() {
  return (
    <footer className="bg-text-primary text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/religious/puja-schedule"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Puja Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/calendar"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/about/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/forms/puja-sponsorships"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sponsor a Puja
                </Link>
              </li>
              <li>
                <Link
                  href="/forms/request-facility"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Facility Rental
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/calendar/newsletter"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Newsletter Archive
                </Link>
              </li>
              <li className="text-gray-300">
                {/* Social media icons placeholder */}
                <span>Follow us on social media</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Vishnu Mandir, Tampa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
