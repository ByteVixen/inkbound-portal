import React, { useState } from "react";
import VantaBackground from "../components/VantaBackground";

const sections = [
  { id: "welcome", title: "Welcome" },
  { id: "collab-types", title: "What We’re Open To" },
  { id: "pitch", title: "Pitch Us Something" },
];

const CollapsibleSection = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(id === "welcome"); // open the welcome section by default
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

const BusinessCollaborationsPage: React.FC = () => {
  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-xl p-8 flex flex-col md:flex-row">
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
            <h1 className="text-4xl font-light text-amber-500 mb-10 text-glow">
              🔮 Let’s Create Magic Together
            </h1>

            <CollapsibleSection id="welcome" title="Welcome">
              <p>
                Do you run a bookish brand, make magical things, or craft something that feels like it belongs in the dark corners of a fairytale?
              </p>
              <p>
                We’re always open to meaningful collaborations that align with the spirit of <strong>The Inkbound Society</strong> and our physical home, <strong>Inkbound Bookshop</strong> in Gort, Ireland.
              </p>
              <p>
                We believe in community over competition, slow magic, and supporting creators who care deeply about storytelling, craft, and a little bit of chaos.
              </p>
            </CollapsibleSection>

            <CollapsibleSection id="collab-types" title="What We’re Open To">
              <ul className="list-disc list-inside space-y-3">
                <li>
                  <strong>Bookish Brand Collabs:</strong> Book boxes, journals, bookmarks, apparel—anything that belongs beside a stack of well-loved pages.
                </li>
                <li>
                  <strong>Candle & Craft Artisans:</strong> Wax, wood, thread, spell jars, curiosities—if it smells, glows, protects, or enchants, we want to see it.
                </li>
                <li>
                  <strong>Indie Author & Narrator Features:</strong> All fiction genres welcome. Bold, immersive stories and unique voices thrive here.
                </li>
                <li>
                  <strong>Event or Live Partnerships:</strong> TikTok Lives, IG takeovers, IRL events, or seasonal bookshop magic—we’re listening.
                </li>
                <li>
                  <strong>Cross-Promotions & Giveaways:</strong> Launching something new or just want to stir the cauldron? We’re into it.
                </li>
                <li>
                  <strong>Affiliate or Consignment Inquiries:</strong> Limited shop space available for handmade or secondhand treasures.
                </li>
                <li>
                  <strong>Custom Quest or Perk Add-Ons:</strong> Want your product featured in a digital quest or subscriber perk? Yes. A thousand times yes.
                </li>
              </ul>
            </CollapsibleSection>

            <CollapsibleSection id="pitch" title="Pitch Us Something">
              <p>
                Got something brewing? Email us at{" "}
                <a
                  href="mailto:summon@inkboundsociety.com"
                  className="underline text-amber-400"
                >
                  summon@inkboundsociety.com
                </a>{" "}
                with the subject line:
              </p>
              <p>
                <strong>“Collaboration Summons – [Your Brand Name]”</strong>
              </p>
              <p>
                Tell us who you are, what you make, and how you’d like to work together. Be bold. Be weird. Be detailed.
              </p>
              <p className="italic mt-2">We can’t wait to see what you’re conjuring.</p>
            </CollapsibleSection>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BusinessCollaborationsPage;
