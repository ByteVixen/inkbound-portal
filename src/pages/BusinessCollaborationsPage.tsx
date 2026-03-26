import React, { useState } from "react";
import VantaBackground from "../components/VantaBackground";


const sections = [
  { id: "welcome", title: "Welcome" },
  { id: "collab-types", title: "What We’re Open To" },
  { id: "pitch", title: "Pitch Us Something" },
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
  const [open, setOpen] = useState(id === "welcome");

  return (
    <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-serif text-2xl text-white md:text-3xl">
          {title}
        </span>
        <span className="text-[#c8a04e] text-sm">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="mt-5 space-y-4 text-base leading-8 text-white/65">
          {children}
        </div>
      )}
    </div>
  );
};

const BusinessCollaborationsPage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050506] font-marcellus text-[#f5efe3]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Glow layers */}
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(82,58,133,0.08),transparent_20%)]" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#c8a04e]/8 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {/* Hero */}
        <section className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/25 px-6 py-10 backdrop-blur-xl md:px-10 md:py-14">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-xs uppercase tracking-[0.34em] text-[#c8a04e]">
              Collaboration Channel
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-tight text-white md:text-6xl">
              Let’s Create Something Dangerous
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
              Inkbound isn’t built on transactions. It’s built on aligned chaos,
              shared vision, and creators who understand the power of story.
            </p>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="lg:w-[260px] lg:shrink-0">
            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl lg:sticky lg:top-24">
              <div className="mb-4 text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
                Navigation
              </div>

              <nav className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-xl px-3 py-2 text-sm text-white/60 transition hover:bg-white/8 hover:text-white"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 space-y-6">
            <CollapsibleSection id="welcome" title="Welcome">
              <p>
                Do you make something that feels like it belongs in the dark
                corners of a fairytale?
              </p>
              <p>
                Then you already understand what this is.
              </p>
              <p>
                Inkbound isn’t looking for noise. We’re looking for alignment.
                Story-first creators. People who build with intention.
              </p>
            </CollapsibleSection>

            <CollapsibleSection id="collab-types" title="What We’re Open To">
              <ul className="list-disc pl-5 space-y-3">
                <li>Bookish brands, boxes, journals, apparel</li>
                <li>Candle makers, artisans, and handcrafted goods</li>
                <li>Indie authors and narrators with strong identity</li>
                <li>Events, live takeovers, and shared audience moments</li>
                <li>Giveaways, launches, and cross-promotions</li>
                <li>Consignment and physical shop placements</li>
                <li>Quest integrations and digital perks</li>
              </ul>
            </CollapsibleSection>

            <CollapsibleSection id="pitch" title="Pitch Us Something">
              <p>
                If you’re reaching out, don’t be safe. Safe gets ignored.
              </p>

              <p>
                Email{" "}
                <a
                  href="mailto:summon@inkboundsociety.com"
                  className="text-[#f6dca0] underline decoration-[#c8a04e]/40"
                >
                  summon@inkboundsociety.com
                </a>{" "}
                with:
              </p>

              <p className="text-[#f6dca0] font-semibold">
                “Collaboration Summons — [Your Name]”
              </p>

              <p>
                Tell us what you’re building. Tell us why it matters. Tell us why
                it fits here.
              </p>

              <p className="italic text-white/50">
                We don’t want everything. We want the right things.
              </p>
            </CollapsibleSection>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BusinessCollaborationsPage;