import Link from "next/link";
import { FileText, Download } from "lucide-react";
import { getStrapiFileUrl, formatDate } from "@/lib/strapi-utils";
import type { StrapiNewsletter } from "@/types/strapi";

interface NewsletterCardProps {
  newsletter: StrapiNewsletter;
}

/**
 * NewsletterCard component - Displays a newsletter with PDF download link.
 * @param {NewsletterCardProps} props - Component props
 * @returns {JSX.Element} The rendered newsletter card
 */
export function NewsletterCard({ newsletter }: NewsletterCardProps) {
  const { attributes } = newsletter;
  const fileUrl = getStrapiFileUrl(attributes.file);
  const publicationDate = formatDate(attributes.publicationDate);

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-primary/5 shadow-warm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-full text-primary flex-shrink-0">
          <FileText className="w-6 h-6" />
        </div>

        <div className="flex-1">
          <h3 className="font-serif text-xl font-semibold text-text-primary mb-2 dark:text-gray-100">
            {attributes.title}
          </h3>
          <p className="text-text-secondary text-sm mb-4 dark:text-gray-400">
            Published: {publicationDate}
          </p>

          {fileUrl ? (
            <Link
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Link>
          ) : (
            <p className="text-text-secondary text-sm italic dark:text-gray-400">
              PDF not available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
