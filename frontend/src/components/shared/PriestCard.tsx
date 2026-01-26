import Image from "next/image";
import { Users } from "lucide-react";
import { getStrapiImageUrl } from "@/lib/strapi-utils";
import type { StrapiPriest } from "@/types/strapi";

interface PriestCardProps {
  priest: StrapiPriest;
}

/**
 * PriestCard component - Displays a priest profile in a card format.
 * @param {PriestCardProps} props - Component props
 * @returns {JSX.Element} The rendered priest card
 */
export function PriestCard({ priest }: PriestCardProps) {
  // Guard against undefined attributes
  if (!priest?.attributes) {
    return null;
  }

  const { attributes } = priest;
  const imageUrl = getStrapiImageUrl(attributes.profileImage);

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-primary/5 shadow-warm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col md:flex-row gap-6">
        {imageUrl ? (
          <div className="relative w-full md:w-32 h-32 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={imageUrl}
              alt={attributes.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 128px"
            />
          </div>
        ) : (
          <div className="w-full md:w-32 h-32 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Users className="w-12 h-12 text-primary/40" />
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-start gap-3 mb-3">
            <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-serif text-xl font-semibold text-text-primary dark:text-gray-100">
                {attributes.name}
              </h3>
              {attributes.title && (
                <p className="text-primary text-sm font-medium mt-1">
                  {attributes.title}
                </p>
              )}
            </div>
          </div>

          {attributes.bio && (
            <div className="text-text-secondary text-sm leading-relaxed dark:text-gray-400">
              {typeof attributes.bio === "string" &&
              attributes.bio.startsWith("<") ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: attributes.bio,
                  }}
                />
              ) : (
                <p>{String(attributes.bio)}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
