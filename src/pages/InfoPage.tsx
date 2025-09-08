// src/pages/InfoPage.tsx
import { useState } from "react";
import VantaBackground from "../components/VantaBackground";

const sections = [
  { id: "virtual", title: "Virtual Shelf (Free for Now)" },
  { id: "consignment", title: "Consignment Policy" },
  { id: "narrator", title: "Narrator Terms" },
  { id: "promotion", title: "How We Promote Listings" },
  { id: "faq", title: "FAQs" },
  { id: "contact", title: "Contact" },
];

const CollapsibleSection = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div id={id} className="mb-8 border-b border-amber-700 pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left text-xl font-semibold text-amber-400 hover:underline focus:outline-none"
      >
        {title} {open ? "▲" : "▼"}
      </button>
      {open && <div className="mt-4 text-base text-gray-300 space-y-3">{children}</div>}
    </div>
  );
};

export default function InfoPage() {
  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-xl p-8 flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="md:w-1/4 mb-8 md:mb-0 sticky top-24 self-start pr-6 border-r border-amber-700">
            <nav className="space-y-4 text-lg">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block hover:underline text-amber-400"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="md:w-3/4 md:pl-8">
            <h1 className="text-4xl font-light text-amber-500 mb-10 text-glow">
              Information & Guidelines
            </h1>

            {/* Virtual Shelf — Free */}
            <CollapsibleSection id="virtual" title="Virtual Shelf (Free for Now)">
              <p className="text-emerald-200">
                🎉 <strong>Launch special:</strong> Virtual Shelfspace is <strong>free</strong> right now.
              </p>
              <p>
                Your listing can include a cover image, title, author name, genres/tropes, a short
                tagline/quote, and up to two links (e.g., purchase or website).
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>All submissions are reviewed for quality and fit.</li>
                <li>No harmful or illegal content; we curate at our discretion.</li>
                <li>Listings rotate and remain visible for a minimum of 30 days.</li>
                <li>
                  If pricing ever changes in the future, we’ll announce it in advance — and existing
                  free listings will get at least 30 days’ notice.
                </li>
              </ul>
              <p>
                Ready to join the shelf? Apply on the{" "}
                <a href="/virtual-shelfspace" className="underline text-amber-400">
                  Virtual Shelf Application
                </a>
                .
              </p>
            </CollapsibleSection>

            {/* Consignment */}
            <CollapsibleSection id="consignment" title="Consignment Policy">
              <p>We accept indie books for physical display in the Gort bookshop:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>3-month term minimum</li>
                <li>70/30 revenue split (author/bookshop)</li>
                <li>Author handles delivery/shipping</li>
                <li>Returns or donations at end of term</li>
              </ul>
              <p>
                Submit on the{" "}
                <a href="/authors/consignment" className="underline text-amber-400">
                  Become Stocked page
                </a>
                .
              </p>
            </CollapsibleSection>

            {/* Narrators */}
            <CollapsibleSection id="narrator" title="Narrator Terms">
              <p>
                All narrator submissions are reviewed. Public listing includes name, genres, voice
                style, and optional links to samples/hire pages. We reserve the right to curate.
              </p>
              <p>
                Apply via the{" "}
                <a href="/narrator-hub" className="underline text-amber-400">
                  Narrator Hub
                </a>
                .
              </p>
            </CollapsibleSection>

            {/* Promotion */}
            <CollapsibleSection id="promotion" title="How We Promote Listings">
              <ul className="list-disc list-inside space-y-1">
                <li>Instagram stories & reels</li>
                <li>Inkbound TikTok features</li>
                <li>Front window & in-store table displays</li>
                <li>“Shelf Tour” videos and lives</li>
              </ul>
            </CollapsibleSection>

            {/* FAQs */}
            <CollapsibleSection id="faq" title="FAQs">
              <p>
                <strong>Is Virtual Shelfspace really free?</strong> Yes — during our launch period.
                If that changes, we’ll give clear notice, and current free listings will remain free
                for at least 30 days after the announcement.
              </p>
              <p>
                <strong>Can I submit more than one book?</strong> Yes. Please submit one form per
                title so we can review them individually.
              </p>
              <p>
                <strong>What if my book is rejected?</strong> We’ll try to explain why (when
                possible) so you can revise and resubmit.
              </p>
            </CollapsibleSection>

            {/* Contact */}
            <CollapsibleSection id="contact" title="Contact">
              <p>
                Still have questions? Email{" "}
                <a href="mailto:summon@inkboundsociety.com" className="underline text-amber-400">
                  summon@inkboundsociety.com
                </a>
              </p>
            </CollapsibleSection>
          </main>
        </div>
      </div>
    </div>
  );
}
