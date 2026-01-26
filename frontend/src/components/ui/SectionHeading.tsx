import React from "react";
import { Sparkles } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeading = ({
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-4 font-serif italic">
          {subtitle}
        </p>
      )}
      <div className="flex items-center justify-center gap-4 text-accent/60">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent" />
        <Sparkles className="w-5 h-5 text-accent" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent" />
      </div>
    </div>
  );
};
