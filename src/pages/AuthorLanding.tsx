// src/pages/authors/AuthorLanding.tsx
import { Link } from "react-router-dom";
import VantaBackground from "../components/VantaBackground";
import {
  ArrowRight,
  BookOpen,
  Globe2,
  MapPinned,
  Package,
  Users,
} from "lucide-react";

export default function AuthorLanding() {
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
              Author Hub
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
              Whether you're new to the realm or already among the Inkbound,
              this is your gateway to get stocked, place your book in front of
              readers, and build your presence across the wider ecosystem.
            </p>
          </div>
        </section>

        {/* Pathway cards */}
        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Link
            to="/authors/consignment"
            className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
          >
            <div className="mx-auto inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
              <BookOpen className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-2xl text-white">Become Stocked</h2>

            <p className="mt-3 text-sm leading-7 text-white/62">
              Submit your books to appear on Inkbound shelves, both physical and
              visible to the wider community.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-[#f6dca0]">
              Apply now
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            to="/authors/ship-books"
            className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
          >
            <div className="mx-auto inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
              <Package className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-2xl text-white">Shipping Info</h2>

            <p className="mt-3 text-sm leading-7 text-white/62">
              Everything you need to know about sending physical stock safely to
              Inkbound Bookshop.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-[#f6dca0]">
              View shipping details
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            to="/virtual-shelfspace"
            className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
          >
            <div className="mx-auto inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
              <Globe2 className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-2xl text-white">Virtual Shelfspace</h2>

            <p className="mt-3 text-sm leading-7 text-white/62">
              No physical stock? No problem. Join the digital shelf and link
              readers directly to your preferred storefront.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-[#f6dca0]">
              Step onto the shelf
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            to="/author-map"
            className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
          >
            <div className="mx-auto inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
              <MapPinned className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-2xl text-white">Author Map</h2>

            <p className="mt-3 text-sm leading-7 text-white/62">
              Explore the growing map of Inkbound authors and see your place in
              the wider network.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-[#f6dca0]">
              View the map
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            to="/book-club"
            className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
          >
            <div className="mx-auto inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
              <Users className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-2xl text-white">Book Club Submission</h2>

            <p className="mt-3 text-sm leading-7 text-white/62">
              Submit your book for consideration in the Inkbound Indie Book Club
              and get it in front of active readers.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-[#f6dca0]">
              Submit your book
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
}