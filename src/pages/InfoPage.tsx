// src/pages/InfoPage.tsx
import { useState } from "react";
import VantaBackground from "../components/VantaBackground";

const sections = [
  { id: "virtual", title: "Virtual Shelf" },
  { id: "consignment", title: "Consignment" },
  { id: "narrator", title: "Narrator Listings" },
  { id: "promotion", title: "Promotion" },
  { id: "faq", title: "FAQs" },
  { id: "contact", title: "Contact" },
];

const CollapsibleSection = ({
  id,
  title,
  children,
  defaultOpen = false,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      id={id}
      className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-serif text-2xl text-white md:text-3xl">
          {title}
        </span>
        <span className="text-sm text-[#c8a04e]">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="mt-5 space-y-4 text-base leading-8 text-white/65">
          {children}
        </div>
      )}
    </div>
  );
};

export default function InfoPage() {
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
              Information & FAQs
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-tight text-white md:text-6xl">
              Inkbound Information Guide
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
              A quick overview of how the main Inkbound pathways work. For full
              details, use the dedicated submission and policy pages linked
              throughout the site.
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

          {/* Main content */}
          <main className="flex-1 space-y-6">
            <CollapsibleSection
              id="virtual"
              title="Virtual Shelf (Free for Now)"
              defaultOpen
            >
              <p className="text-[#f6dca0]">
                Virtual Shelfspace is currently <strong>free</strong>.
              </p>

              <p>
                Listings can include a cover image, title, author name, genre or
                tropes, a short description or quote, and links to your chosen
                sales page, website, or platform.
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>All submissions are reviewed before going live.</li>
                <li>We curate for quality, clarity, and fit.</li>
                <li>Listings may be rotated and featured across the site.</li>
                <li>
                  If this offering changes in future, clear notice will be given
                  in advance.
                </li>
              </ul>

              <p>
                Apply through the{" "}
                <a
                  href="/virtual-shelfspace"
                  className="text-[#f6dca0] underline decoration-[#c8a04e]/40 underline-offset-4 transition hover:text-white"
                >
                  Virtual Shelfspace page
                </a>
                .
              </p>
            </CollapsibleSection>

            <CollapsibleSection id="consignment" title="Consignment Overview">
              <p>
                Inkbound accepts fiction titles for physical consignment in the
                bookshop.
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Consignment split: <strong>70% author / 30% bookshop</strong></li>
                <li>Authors are responsible for sending stock to the shop</li>
                <li>Books remain the property of the author until sold</li>
                <li>
                  Payouts are issued <strong>every 6 months</strong>, with a
                  sales report included
                </li>
                <li>
                  Unsold books after the term may be returned or donated, depending
                  on agreement and practicality
                </li>
              </ul>

              <p>
                Full details live on the{" "}
                <a
                  href="/authors/consignment"
                  className="text-[#f6dca0] underline decoration-[#c8a04e]/40 underline-offset-4 transition hover:text-white"
                >
                  Consignment page
                </a>
                .
              </p>
            </CollapsibleSection>

            <CollapsibleSection id="narrator" title="Narrator Listings">
              <p>
                Narrator listings are curated and reviewed before publication.
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Profiles may include genres, voice style, image, and links</li>
                <li>A working portfolio or sample link is strongly recommended</li>
                <li>Listings are reviewed for clarity, professionalism, and fit</li>
                <li>Inkbound reserves the right to curate what appears on site</li>
              </ul>

              <p>
                Apply through the{" "}
                <a
                  href="/narrator-hub"
                  className="text-[#f6dca0] underline decoration-[#c8a04e]/40 underline-offset-4 transition hover:text-white"
                >
                  Narrator Hub
                </a>
                .
              </p>
            </CollapsibleSection>

            <CollapsibleSection id="promotion" title="How Listings May Be Promoted">
              <p>
                Depending on fit, timing, and availability, listings may be
                featured through:
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Inkbound TikTok content</li>
                <li>Instagram stories, reels, and spotlights</li>
                <li>In-store displays and shelf highlights</li>
                <li>Reader-facing features or themed content</li>
                <li>Directory pages across the wider site</li>
              </ul>
            </CollapsibleSection>

            <CollapsibleSection id="faq" title="FAQs">
              <p>
                <strong>Is Virtual Shelfspace really free?</strong> Yes, at the
                moment.
              </p>

              <p>
                <strong>How often are consignment payments made?</strong> Every
                6 months, with reporting included alongside payout.
              </p>

              <p>
                <strong>Can I submit more than one book?</strong> Yes. Submit one
                title at a time where needed so each can be reviewed properly.
              </p>

              <p>
                <strong>Can narrators or creatives be removed later?</strong> Yes.
                Listings can be updated, curated, or removed as needed.
              </p>

              <p>
                <strong>Where should I go for the full rules?</strong> Use this
                page as the overview, then follow through to the dedicated pathway
                pages for full details.
              </p>
            </CollapsibleSection>

            <CollapsibleSection id="contact" title="Contact">
              <p>
                Still need help? Email{" "}
                <a
                  href="mailto:summon@inkboundsociety.com"
                  className="text-[#f6dca0] underline decoration-[#c8a04e]/40 underline-offset-4 transition hover:text-white"
                >
                  summon@inkboundsociety.com
                </a>
                .
              </p>
            </CollapsibleSection>
          </main>
        </div>
      </div>
    </div>
  );
}