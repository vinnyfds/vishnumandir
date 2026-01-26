import Image from "next/image";
import { Sparkles, MapPin, DollarSign } from "lucide-react";
import { getStrapiImageUrl } from "@/lib/strapi-utils";
import type { StrapiPujaService } from "@/types/strapi";

interface PujaServiceCardProps {
  service: StrapiPujaService;
}

/**
 * PujaServiceCard component - Displays a puja service in a card format.
 * @param {PujaServiceCardProps} props - Component props
 * @returns {JSX.Element} The rendered puja service card
 */
export function PujaServiceCard({ service }: PujaServiceCardProps) {
  // Guard against undefined attributes
  if (!service?.attributes) {
    return null;
  }

  const { attributes } = service;
  const imageUrl = getStrapiImageUrl(attributes.image);

  // Format price
  const formattedPrice =
    attributes.price > 0
      ? `$${attributes.price.toFixed(2)}`
      : "Contact for pricing";

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-primary/5 shadow-warm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
      {imageUrl && (
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={attributes.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-serif text-xl font-semibold text-text-primary dark:text-gray-100">
          {attributes.name}
        </h3>
      </div>

      {attributes.description && (
        <div className="text-text-secondary text-sm leading-relaxed mb-4 dark:text-gray-400">
          {typeof attributes.description === "string" &&
          attributes.description.startsWith("<") ? (
            <div
              dangerouslySetInnerHTML={{
                __html: attributes.description,
              }}
            />
          ) : (
            <p>{String(attributes.description)}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-text-secondary dark:text-gray-400">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm">{attributes.location}</span>
        </div>
        <div className="flex items-center gap-2 text-text-secondary dark:text-gray-400">
          <DollarSign className="w-4 h-4 text-primary" />
          <span className="text-sm">{formattedPrice}</span>
        </div>
        {attributes.notes && (
          <p className="text-text-secondary text-xs mt-2 italic dark:text-gray-400">
            {attributes.notes}
          </p>
        )}
      </div>
    </div>
  );
}
