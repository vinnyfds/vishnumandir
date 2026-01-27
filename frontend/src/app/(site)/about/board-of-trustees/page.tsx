import type { Metadata } from "next";
import { generateWebPageSchema } from "@/lib/seo";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Board of Trustees | Vishnu Mandir, Tampa - Leadership",
  description:
    "Meet the Board of Directors and Executive Committee of Vishnu Mandir, Tampa. Our leadership guides the temple's mission and vision.",
  keywords: [
    "Vishnu Mandir board",
    "temple leadership",
    "board of directors",
    "executive committee",
  ],
  openGraph: {
    title: "Board of Trustees | Vishnu Mandir, Tampa",
    description: "Meet the leadership of Vishnu Mandir, Tampa",
    type: "website",
  },
};

/**
 * Board of Trustees page - Leadership structure and members.
 * @returns {JSX.Element} The rendered board of trustees page
 */
export default function BoardOfTrusteesPage() {
  const structuredData = generateWebPageSchema({
    name: "Board of Trustees",
    description:
      "Board of Directors and Executive Committee of Vishnu Mandir, Tampa",
    url: "/about/board-of-trustees",
  });

  const boardOfDirectors = [
    "Shantia Singh",
    "Tara Dindial",
    "Ramesh Maharana",
    "Narie Persad",
    "Lettie Naraine",
    "Jonah Bajnath",
    "Dr. Ram Ramcharran",
    "Mado Jaimangal",
    "Ramesh Sayroo",
    "Omardeo Ramdhani",
    "Raj Samlall",
    "Harry K. Lekhram",
  ];

  const executiveCommittee = [
    { name: "Kishore Ramdhani", role: "President" },
    { name: "Jonah Bajnath", role: "Treasurer" },
    { name: "Dr. Ram P. Ramcharran", role: "Secretary" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Board of Trustees
        </h1>
        <p className="text-xl text-text-secondary mb-8 font-serif">
          Meet the dedicated individuals who lead Vishnu Mandir, Tampa with
          vision, commitment, and service to our community.
        </p>

        {/* Introduction */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
                Leadership & Governance
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Our Board of Trustees provides strategic direction and governance
                for Vishnu Mandir, Tampa. Their dedication ensures that our temple
                continues to serve the Hindu community with integrity, spiritual
                guidance, and operational excellence.
              </p>
              <p className="text-text-secondary leading-relaxed">
                The board is composed of community leaders and devoted members who
                volunteer their time and expertise to advance the temple&apos;s
                mission of spiritual growth, cultural preservation, and community
                service.
              </p>
            </div>
          </div>
        </section>

        {/* Executive Committee */}
        <section className="mb-12">
          <h2 className="font-serif text-3xl font-semibold text-text-primary mb-8">
            Executive Committee
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {executiveCommittee.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border-2 border-primary/5 shadow-warm hover:shadow-md transition-shadow"
              >
                <div className="text-center">
                  <h3 className="font-serif text-xl font-semibold text-text-primary mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Board of Directors */}
        <section className="mb-12">
          <h2 className="font-serif text-3xl font-semibold text-text-primary mb-8">
            Board of Directors
          </h2>
          <div className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm">
            <div className="grid md:grid-cols-2 gap-6">
              {boardOfDirectors.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 pb-4 border-b border-border last:border-b-0"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                  </div>
                  <p className="text-text-primary font-medium">{member}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="bg-white rounded-xl p-8 border-2 border-primary/5 shadow-warm mb-8">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Our Commitment
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            The Board of Trustees of Vishnu Mandir, Tampa is committed to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
            <li>
              <strong>Spiritual Leadership:</strong> Fostering a deep spiritual
              environment where devotees can grow in their faith
            </li>
            <li>
              <strong>Community Service:</strong> Serving the broader Hindu
              community and promoting interfaith understanding
            </li>
            <li>
              <strong>Cultural Preservation:</strong> Preserving and promoting
              Hindu traditions, festivals, and values
            </li>
            <li>
              <strong>Educational Excellence:</strong> Providing quality
              educational programs for all ages
            </li>
            <li>
              <strong>Transparent Governance:</strong> Managing temple resources
              with accountability and integrity
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-2 border-primary/5">
          <h2 className="font-serif text-2xl font-semibold text-text-primary mb-4">
            Get in Touch
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            For inquiries, suggestions, or to learn more about Vishnu Mandir,
            Tampa&apos;s leadership and initiatives, please don&apos;t hesitate
            to reach out.
          </p>
          <div className="space-y-2 text-text-secondary mb-6">
            <p>
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+18132697262"
                className="text-primary hover:text-primary/80"
              >
                (813) 269-7262
              </a>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@vishnumandirtampa.com"
                className="text-primary hover:text-primary/80"
              >
                info@vishnumandirtampa.com
              </a>
            </p>
            <p>
              <strong>Address:</strong> 5803 Lynn Road, Tampa, FL 33624
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
