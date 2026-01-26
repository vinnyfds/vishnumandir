import type { Metadata } from "next";
import { generateWebPageSchema } from "@/lib/seo";
import { Heart, Users, Calendar, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Volunteer Opportunities | Vishnu Mandir, Tampa - Get Involved",
  description:
    "Volunteer at Vishnu Mandir, Tampa and serve the Hindu community. Join our volunteer programs for festivals, events, education, and temple operations.",
  keywords: [
    "volunteer Hindu temple Tampa",
    "Tampa temple volunteer opportunities",
    "Hindu community service Tampa",
    "Vishnu Mandir volunteer",
  ],
  openGraph: {
    title: "Volunteer Opportunities | Vishnu Mandir, Tampa",
    description: "Get involved and serve the Hindu community through volunteer opportunities at Vishnu Mandir, Tampa.",
    type: "website",
  },
};

/**
 * Volunteer page - Volunteer opportunities.
 * @returns {JSX.Element} The rendered volunteer page
 */
export default function VolunteerPage() {
  const structuredData = generateWebPageSchema({
    name: "Volunteer Opportunities",
    description:
      "Volunteer opportunities at Vishnu Mandir, Tampa - serving the Hindu community",
    url: "/about/volunteer",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Volunteer at Vishnu Mandir, Tampa
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Join us in serving the Hindu community through meaningful volunteer
          opportunities.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Why Volunteer?
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Volunteering at Vishnu Mandir, Tampa is a wonderful way to serve
                the community, connect with fellow devotees, and contribute to
                the preservation and growth of Hindu culture and spirituality.
                Your time and effort help make our temple a vibrant center for
                worship, education, and community.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Whether you can commit to regular service or help during special
                events, every contribution makes a difference. We welcome
                volunteers of all ages and backgrounds.
              </p>
            </div>
          </div>
        </section>

        {/* Volunteer Opportunities */}
        <section className="mb-12">
          <h2 className="font-serif text-3xl font-semibold text-text-primary mb-8">
            Volunteer Opportunities
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Festival & Events */}
            <div className="bg-white rounded-xl p-6 border-2 border-primary/5 shadow-warm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-text-primary">
                  Festival & Events
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Help organize and manage festivals, cultural events, and special
                celebrations. Tasks include event setup, decoration, food service,
                and coordination.
              </p>
              <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm ml-4">
                <li>Event planning and coordination</li>
                <li>Setup and decoration</li>
                <li>Food preparation and service</li>
                <li>Guest assistance</li>
              </ul>
            </div>

            {/* Education Programs */}
            <div className="bg-white rounded-xl p-6 border-2 border-primary/5 shadow-warm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-text-primary">
                  Education Programs
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Assist with educational classes, workshops, and youth programs.
                Help teach Sanskrit, Hindu scriptures, music, or cultural arts.
              </p>
              <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm ml-4">
                <li>Teaching and tutoring</li>
                <li>Classroom assistance</li>
                <li>Curriculum development</li>
                <li>Youth program coordination</li>
              </ul>
            </div>

            {/* Temple Operations */}
            <div className="bg-white rounded-xl p-6 border-2 border-primary/5 shadow-warm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-text-primary">
                  Temple Operations
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Support daily temple operations including reception, visitor
                assistance, maintenance, and administrative tasks.
              </p>
              <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm ml-4">
                <li>Reception and visitor services</li>
                <li>Maintenance and cleaning</li>
                <li>Administrative support</li>
                <li>Communication and outreach</li>
              </ul>
            </div>

            {/* Special Projects */}
            <div className="bg-white rounded-xl p-6 border-2 border-primary/5 shadow-warm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-text-primary">
                  Special Projects
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Contribute to special initiatives such as community outreach,
                fundraising, newsletter production, website maintenance, and
                cultural preservation projects.
              </p>
              <ul className="list-disc list-inside space-y-1 text-text-secondary text-sm ml-4">
                <li>Community outreach</li>
                <li>Fundraising and development</li>
                <li>Media and communications</li>
                <li>Technology and digital services</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How to Get Started */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5 mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            How to Get Started
          </h2>
          <div className="space-y-4 text-text-secondary">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  Contact Us
                </h3>
                <p>
                  Reach out to us via phone at (813) 269-7262 or email at
                  sakeemj@live.com to express your interest in volunteering.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  Discuss Opportunities
                </h3>
                <p>
                  We&apos;ll discuss your interests, skills, and availability to find
                  the best volunteer opportunity for you.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  Begin Volunteering
                </h3>
                <p>
                  Once matched with an opportunity, you&apos;ll receive orientation
                  and training to get started.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Interest Form */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Volunteer Interest Form
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Fill out the form below to express your interest in volunteering.
            We&apos;ll contact you to discuss available opportunities.
          </p>
          <form
            action="#"
            method="post"
            className="space-y-4"
            aria-label="Volunteer interest form"
          >
            <div>
              <label
                htmlFor="volunteer-name"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="volunteer-name"
                name="name"
                required
                aria-required="true"
                autoComplete="name"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="volunteer-email"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Email <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                id="volunteer-email"
                name="email"
                required
                aria-required="true"
                autoComplete="email"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="volunteer-phone"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Phone <span className="text-primary">*</span>
              </label>
              <input
                type="tel"
                id="volunteer-phone"
                name="phone"
                required
                aria-required="true"
                autoComplete="tel"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="(813) 555-1234"
              />
            </div>
            <div>
              <label
                htmlFor="volunteer-area"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Area of Interest <span className="text-primary">*</span>
              </label>
              <select
                id="volunteer-area"
                name="areaOfInterest"
                required
                aria-required="true"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select area of interest</option>
                <option value="festivals-events">Festivals &amp; Events</option>
                <option value="education">Education Programs</option>
                <option value="temple-operations">Temple Operations</option>
                <option value="special-projects">Special Projects</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="volunteer-availability"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Availability
              </label>
              <select
                id="volunteer-availability"
                name="availability"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select availability</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="both">Both</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="volunteer-skills"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Skills, experience, or interests
              </label>
              <textarea
                id="volunteer-skills"
                name="skills"
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tell us about your skills, experience, or interests..."
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Submit Volunteer Interest
            </button>
          </form>
          <p className="text-sm text-text-secondary mt-4">
            Note: This form is currently a placeholder. For immediate
            assistance, please call us at (813) 269-7262.
          </p>
        </section>
      </main>
    </>
  );
}
