// src/pages/AuthorHubPage.tsx
import { Link } from "react-router-dom";
import VantaBackground from "../components/VantaBackground";
import {
  ArrowRight,
  BookOpen,
  Mic2,
  Globe2,
  Handshake,
  MapPinned,
  Users,
} from "lucide-react";

export default function AuthorHubPage() {
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
              Author Pathway
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-tight text-white md:text-6xl">
              Welcome to the Author Hub
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
              Inkbound supports storytellers at every stage — whether you’re
              self-published, traditionally published, or just beginning to
              build your place in the wider ecosystem.
            </p>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/55">
              From physical shelves and digital placement to narrator discovery,
              reader-facing features, and future collaboration systems, this is
              your gateway into the author side of Inkbound.
            </p>
          </div>
        </section>

        {/* Main cards */}
        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Link
            to="/authors/consignment"
            className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
          >
            <div className="inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
              <BookOpen className="h-6 w-6" />
            </div>

            <div className="mt-5 text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
              Physical placement
            </div>

            <h2 className="mt-3 text-3xl text-white">Bookshop Consignment</h2>

            <p className="mt-4 text-sm leading-7 text-white/62">
              Apply to have your physical book stocked in Inkbound Bookshop in
              Gort and placed directly in front of readers.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-[#f6dca0]">
              Apply now
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            to="/virtual-shelfspace"
            className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
          >
            <div className="inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
              <Globe2 className="h-6 w-6" />
            </div>

            <div className="mt-5 text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
              Digital visibility
            </div>

            <h2 className="mt-3 text-3xl text-white">Virtual Shelfspace</h2>

            <p className="mt-4 text-sm leading-7 text-white/62">
              Place your book on the Inkbound Virtual Shelf and send readers
              directly to your chosen store or sales page.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-[#f6dca0]">
              Step onto the shelf
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            to="/author-map"
            className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
          >
            <div className="inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
              <MapPinned className="h-6 w-6" />
            </div>

            <div className="mt-5 text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
              Global visibility
            </div>

            <h2 className="mt-3 text-3xl text-white">Author Map</h2>

            <p className="mt-4 text-sm leading-7 text-white/62">
              Explore the growing map of Inkbound authors around the world and
              see your place within the wider network.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-[#f6dca0]">
              View the map
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            to="/book-club"
            className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
          >
            <div className="inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
              <Users className="h-6 w-6" />
            </div>

            <div className="mt-5 text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
              Reader discovery
            </div>

            <h2 className="mt-3 text-3xl text-white">Book Club Submission</h2>

            <p className="mt-4 text-sm leading-7 text-white/62">
              Submit your book for consideration in the Inkbound Indie Book Club
              and place it in front of engaged readers.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-[#f6dca0]">
              Submit your book
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            to="/narrator-shelf"
            className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
          >
            <div className="inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
              <Mic2 className="h-6 w-6" />
            </div>

            <div className="mt-5 text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
              Audio pathway
            </div>

            <h2 className="mt-3 text-3xl text-white">Narrator Shelf</h2>

            <p className="mt-4 text-sm leading-7 text-white/62">
              Explore audiobook narrators available for hire, collaboration, or
              future adaptation opportunities.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-[#f6dca0]">
              Explore narrators
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6 opacity-70 backdrop-blur-xl">
            <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-white/50">
              <Handshake className="h-6 w-6" />
            </div>

            <div className="mt-5 text-[0.72rem] uppercase tracking-[0.28em] text-white/40">
              Coming soon
            </div>

            <h2 className="mt-3 text-3xl text-white/80">Barter & Mentorship</h2>

            <p className="mt-4 text-sm leading-7 text-white/50">
              A future space for skill swaps, guided support, mentorship, and
              collaborative growth across the Inkbound network.
            </p>

            <div className="mt-6 text-sm uppercase tracking-[0.16em] text-white/35">
              Not yet open
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-10 text-center">
          <Link
            to="/featured-books"
            className="inline-flex items-center gap-2 rounded-full border border-[#c8a04e]/30 bg-[#c8a04e]/10 px-5 py-2.5 text-sm text-[#f6dca0] transition hover:border-[#c8a04e]/50 hover:bg-[#c8a04e]/15 hover:text-white"
          >
            See who’s on our shelves
          </Link>
        </section>
      </div>
    </div>
  );
}