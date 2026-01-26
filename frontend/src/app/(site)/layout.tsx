import { Header } from "@/components/layout/header/Header";
import { Footer } from "@/components/layout/footer/Footer";
import { OmAudioProvider } from "@/components/audio/OmAudioContext";

/**
 * Layout for public-facing pages, includes Header and Footer.
 * Wraps with OmAudioProvider for site-wide ambient Om sound and mute toggle.
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content
 * @returns {JSX.Element} The rendered layout
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OmAudioProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </OmAudioProvider>
  );
}
