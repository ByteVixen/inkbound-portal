// src/pages/CreativesPage.tsx
import React, { useState } from "react";
import VantaBackground from "../components/VantaBackground";

const sections = [
  { id: "welcome", title: "Welcome" },
  { id: "who", title: "Who It’s For" },
  { id: "benefits", title: "What You Get" },
  { id: "how", title: "How It Works" },
  { id: "apply", title: "Apply Free" },
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
  const [open, setOpen] = useState(id === "welcome"); // open Welcome by default
  return (
    <div id={id} className="mb-8 border-b border-amber-700 pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left text-xl font-semibold text-amber-400 hover:underline focus:outline-none"
      >
        {title} {open ? "▲" : "▼"}
      </button>
      {open && <div className="mt-4 text-base text-gray-300 space-y-4">{children}</div>}
    </div>
  );
};

const CreativesPage: React.FC = () => {
  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-xl p-8 flex flex-col md:flex-row border border-amber-700">
          {/* Sidebar Navigation */}
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
            <h1 className="text-4xl font-light text-amber-500 mb-10 text-glow text-center md:text-left">
              🎨 Creatives at Inkbound Society
            </h1>

            <CollapsibleSection id="welcome" title="Welcome">
              <p>
                Are you a cover artist, illustrator, editor, formatter, audiobook narrator,
                trailer maker, or book marketer? <strong>We want to showcase you</strong>.
              </p>
              <p className="text-emerald-300 font-semibold">
                This is a <u>free opportunity</u> to link up with indie authors and get your work seen.
              </p>
              <p>
                We feature creative professionals alongside our shelves, quests, and community, so the
                authors browsing our world can discover, bookmark, and <em>hire/contact you directly</em>.
                No platform fees. No middleman. Your rates, your links, your terms.
              </p>
            </CollapsibleSection>

            <CollapsibleSection id="who" title="Who It’s For">
              <ul className="list-disc list-inside space-y-2">
                <li>Cover Artists & Illustrators</li>
                <li>Audiobook Narrators & Producers</li>
                <li>Editors (Developmental, Line, Copy, Proof)</li>
                <li>Formatters & Interior/Exterior Book Designers</li>
                <li>Trailer / Motion Graphics & Social Video Editors</li>
                <li>Marketing, Launch & Street-Team Support</li>
                <li>Photographers, Calligraphers, Map Artists & more</li>
              </ul>
              <p className="text-sm text-gray-400">
                Not on the list but still bookish? If you help stories come to life, you belong here.
              </p>
            </CollapsibleSection>

            <CollapsibleSection id="benefits" title="What You Get">
              <ul className="list-disc list-inside space-y-3">
                <li>
                  <strong>Public profile</strong> on our site with your specialties, genres, and links.
                </li>
                <li>
                  <strong>Exposure to indie authors</strong> browsing our Virtual Shelf, Narrator Shelf, and quests.
                </li>
                <li>
                  <strong>Zero fees from us</strong> — authors contact you via your portfolio/site/socials.
                </li>
                <li>
                  <strong>Optional features</strong> in social posts, email highlights, or in-shop boards.
                </li>
              </ul>
              <p className="text-sm text-gray-400">
                You keep full control. Update or remove your listing anytime by emailing{" "}
                <a className="underline text-amber-300" href="mailto:summon@inkboundsociety.com">
                  summon@inkboundsociety.com
                </a>.
              </p>
            </CollapsibleSection>

            <CollapsibleSection id="how" title="How It Works">
              <ol className="list-decimal list-inside space-y-3">
                <li>
                  <strong>Apply (free):</strong> Tell us what you do and share portfolio links.
                </li>
                <li>
                  <strong>We review:</strong> Quick fit & safety check (clear links, family-friendly assets).
                </li>
                <li>
                  <strong>Get featured:</strong> Your card goes live; authors reach out to you directly.
                </li>
              </ol>
              <div className="rounded-lg border border-emerald-600 bg-emerald-900/20 p-4">
                <p className="text-emerald-300 text-sm">
                  We don’t mediate payments or rates. You own your process; we provide the stage.
                </p>
              </div>
            </CollapsibleSection>

            <CollapsibleSection id="apply" title="Apply Free">
              <p>
                Ready to showcase your craft? Apply now — it’s fast and free.
              </p>
              <div className="mt-2">
                <a
                  href="https://tally.so/r/3ybB1d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block relative px-8 py-3 rounded-full font-semibold text-white bg-amber-700 hover:bg-amber-600 shadow-[0_0_20px_rgba(245,158,11,0.6)] transition-all duration-300"
                >
                  Apply Free — Creatives Sign-Up
                </a>
              </div>
              <p className="text-sm text-gray-400">
                Include portfolio links, specialties, genres, typical turnaround, and how you prefer to be contacted.
              </p>
            </CollapsibleSection>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreativesPage;
