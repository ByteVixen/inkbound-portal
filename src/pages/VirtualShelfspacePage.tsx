import React from "react";
import VantaBackground from "../components/VantaBackground";
import { ArrowRight, ScrollText } from "lucide-react";

const VirtualShelfspacePage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050506] font-marcellus text-[#f5efe3]">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(82,58,133,0.08),transparent_20%),radial-gradient(circle_at_20%_80%,rgba(13,30,66,0.10),transparent_24%)]" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#c8a04e]/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 lg:px-10">
        <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/25 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-xs uppercase tracking-[0.34em] text-[#c8a04e]">
              Author Pathway
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-tight text-white md:text-6xl">
              Virtual Shelfspace Submission
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
              Showcase your book to Inkbound readers through the virtual shelf.
              Read the terms and visibility guidelines before submitting.
            </p>
          </div>

          <div className="mt-10 rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
            <div className="inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
              <ScrollText className="h-6 w-6" />
            </div>

            <h2 className="mt-5 font-serif text-3xl text-white">
              Terms & Visibility Guidelines
            </h2>

            <ul className="mt-6 space-y-3 text-sm leading-7 text-white/65">
              <li>
                <span className="text-[#f6dca0]">Submission Review:</span> All
                entries are reviewed before acceptance.
              </li>
              <li>
                <span className="text-[#f6dca0]">Listing Duration:</span> Books
                remain listed until the author updates or removes them.
              </li>
              <li>
                <span className="text-[#f6dca0]">Content Standards:</span> A
                valid link and cover image are required. Harmful or offensive
                content will not be accepted.
              </li>
              <li>
                <span className="text-[#f6dca0]">Featured Slots:</span> Premium
                positioning may be offered in future.
              </li>
              <li>
                <span className="text-[#f6dca0]">Author Responsibility:</span>{" "}
                You confirm that you hold all rights to the submitted content.
              </li>
              <li>
                <span className="text-[#f6dca0]">Visibility:</span> Books may
                be promoted on site and across Inkbound social platforms.
              </li>
            </ul>

            <p className="mt-6 text-sm italic text-white/45">
              Questions? Contact us at{" "}
              <a
                href="mailto:summon@inkboundsociety.com"
                className="text-[#f6dca0] underline decoration-[#c8a04e]/40 underline-offset-4 transition hover:text-white"
              >
                summon@inkboundsociety.com
              </a>
            </p>

            <div className="mt-8 text-center">
              <a
                href="https://forms.gle/91LXeerXVE6Ni3JU7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#c8a04e]/40 bg-[#c8a04e] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(200,160,78,0.2)]"
              >
                Submit via Google Form
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualShelfspacePage;