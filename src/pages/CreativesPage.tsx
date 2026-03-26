import React, { useState } from "react";
import VantaBackground from "../components/VantaBackground";
import { ArrowRight, ScrollText } from "lucide-react";

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
  const [open, setOpen] = useState(id === "welcome");

  return (
    <div
      id={id}
      className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:p-6"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left focus:outline-none"
      >
        <span className="font-serif text-2xl text-white md:text-3xl">
          {title}
        </span>
        <span className="text-[#c8a04e] text-sm">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="mt-4 space-y-4 text-base leading-8 text-white/65">
          {children}
        </div>
      )}
    </div>
  );
};

const CreativesPage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050506] font-marcellus text-[#f5efe3]">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(82,58,133,0.08),transparent_20%),radial-gradient(circle_at_20%_80%,rgba(13,30,66,0.10),transparent_24%)]" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#c8a04e]/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {/* Hero */}
        <section className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/25 px-6 py-10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl md:px-10 md:py-14">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-xs uppercase tracking-[0.34em] text-[#c8a04e]">
              Creative Pathway
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-tight text-white md:text-6xl">
              Creatives at Inkbound Society
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
              A space for artists, designers, editors, narrators, and bookish
              businesses to be seen by the authors and readers moving through
              the Inkbound ecosystem.
            </p>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="lg:w-[260px] lg:shrink-0">
            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl lg:sticky lg:top-24">
              <div className="mb-4 text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
                On this page
              </div>

              <nav className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-xl px-3 py-2 text-sm text-white/62 transition hover:bg-white/8 hover:text-white"
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
                Are you a cover artist, illustrator, editor, formatter,
                audiobook narrator, trailer maker, or book marketer? This is
                your place to be seen.
              </p>
              <p className="text-[#f6dca0]">
                This is a free opportunity to connect with indie authors and
                showcase your work.
              </p>
              <p>
                We feature creative professionals alongside our shelves, quests,
                and community spaces so authors can discover, bookmark, and
                contact you directly.
              </p>
            </CollapsibleSection>

            <CollapsibleSection id="who" title="Who It’s For">
              <ul className="list-disc pl-5 space-y-2">
                <li>Cover Artists & Illustrators</li>
                <li>Audiobook Narrators & Producers</li>
                <li>Editors — developmental, line, copy, proof</li>
                <li>Formatters & Book Designers</li>
                <li>Trailer / Motion Graphics & Social Video Editors</li>
                <li>Marketing, Launch & Street-Team Support</li>
                <li>Photographers, Calligraphers, Map Artists & more</li>
              </ul>
              <p className="text-sm text-white/45">
                Not on the list but still bookish? If you help stories come to
                life, you belong here.
              </p>
            </CollapsibleSection>

            <CollapsibleSection id="benefits" title="What You Get">
              <ul className="list-disc pl-5 space-y-3">
                <li>A public profile on our site with your specialties and links</li>
                <li>Exposure to indie authors browsing Inkbound</li>
                <li>Zero fees from us — your rates, your links, your terms</li>
                <li>Optional features in social posts and highlights</li>
              </ul>
              <p className="text-sm text-white/45">
                You keep full control. Update or remove your listing anytime by
                emailing{" "}
                <a
                  className="text-[#f6dca0] underline decoration-[#c8a04e]/40 underline-offset-4"
                  href="mailto:summon@inkboundsociety.com"
                >
                  summon@inkboundsociety.com
                </a>
                .
              </p>
            </CollapsibleSection>

            <CollapsibleSection id="how" title="How It Works">
              <ol className="list-decimal pl-5 space-y-3">
                <li>Apply and tell us what you do</li>
                <li>We review for fit, clarity, and safe presentation</li>
                <li>Your card goes live and authors reach out to you directly</li>
              </ol>

              <div className="rounded-[1.2rem] border border-[#c8a04e]/25 bg-[#c8a04e]/10 p-4">
                <p className="text-sm text-white/75">
                  We don’t mediate payments or rates. You own your process — we
                  provide the stage.
                </p>
              </div>
            </CollapsibleSection>

            <CollapsibleSection id="apply" title="Apply Free">
              <p>
                Ready to showcase your craft? Apply now. It’s fast, direct, and
                free.
              </p>

              <div className="pt-2">
                <a
                  href="https://tally.so/r/3ybB1d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#c8a04e]/40 bg-[#c8a04e] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(200,160,78,0.2)]"
                >
                  <ScrollText className="h-4 w-4" />
                  Apply Free
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <p className="text-sm text-white/45">
                Include portfolio links, specialties, genres, turnaround, and
                how you prefer to be contacted.
              </p>
            </CollapsibleSection>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreativesPage;