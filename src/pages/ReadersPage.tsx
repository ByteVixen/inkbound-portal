// src/pages/ReadersPage.tsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import VantaBackground from "../components/VantaBackground";
import {
  ArrowRight,
  BookOpen,
  ScrollText,
  Sparkles,
  Users,
} from "lucide-react";

export default function ReadersPage() {
  const [readerCount, setReaderCount] = useState(0);

  useEffect(() => {
    const fetchReaders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "completed_quests"));
        setReaderCount(querySnapshot.size);
      } catch (error) {
        console.error("Error fetching reader completions:", error);
      }
    };

    fetchReaders();
  }, []);

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
              Reader Pathway
            </div>

            <h1 className="mt-5 text-4xl font-light leading-tight text-white md:text-6xl">
              Welcome, Reader.
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
              Join live quests, track your reads, step into the book club, and
              wander deeper into the Inkbound world through the stories the
              Society is discovering.
            </p>

            <p className="mt-4 text-sm italic text-[#f6dca0]/90">
              “Whispers of the Hollow Moon await...”
            </p>
          </div>
        </section>

        {/* Reader cards */}
        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Link
            to="/quests"
            className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
          >
            <div className="inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
              <ScrollText className="h-6 w-6" />
            </div>

            <div className="mt-5 text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
              Live challenge
            </div>

            <h2 className="mt-3 text-2xl text-white">Current Quest</h2>

            <p className="mt-4 text-sm leading-7 text-white/62">
              Take on this month’s lore challenge and earn your place among the whispers.
            </p>

            <p className="mt-5 text-sm uppercase tracking-[0.14em] text-[#f6dca0]">
              {readerCount} reader{readerCount !== 1 && "s"} completed the quest
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-[#f6dca0]">
              Enter the quest
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            to="/inkbound-tbr"
            className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
          >
            <div className="inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
              <BookOpen className="h-6 w-6" />
            </div>

            <div className="mt-5 text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
              Community reading
            </div>

            <h2 className="mt-3 text-2xl text-white">Inkbound TBR</h2>

            <p className="mt-4 text-sm leading-7 text-white/62">
              Explore what the Society is reading and find the next story pulling you in.
            </p>

            <p className="mt-5 text-sm uppercase tracking-[0.14em] text-[#f6dca0]">
              Your next favourite read may already be waiting
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-[#f6dca0]">
              Explore the TBR
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
              Monthly read space
            </div>

            <h2 className="mt-3 text-2xl text-white">Book Club</h2>

            <p className="mt-4 text-sm leading-7 text-white/62">
              Join the Inkbound Indie Book Club, read alongside the community,
              and take part in discussions built around indie stories.
            </p>

            <p className="mt-5 text-sm uppercase tracking-[0.14em] text-[#f6dca0]">
              Readers. authors. rebels.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-[#f6dca0]">
              Enter the book club
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            to="/readers/fortune"
            className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
          >
            <div className="inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
              <Sparkles className="h-6 w-6" />
            </div>

            <div className="mt-5 text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
              A little magic
            </div>

            <h2 className="mt-3 text-2xl text-white">Bookish Fortune</h2>

            <p className="mt-4 text-sm leading-7 text-white/62">
              Pull a whisper from the deck and see what strange little omen the
              Inkbound world has waiting for you.
            </p>

            <p className="mt-5 text-sm uppercase tracking-[0.14em] text-[#f6dca0]">
              Fate looks better in gold
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-[#f6dca0]">
              Draw your fortune
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>
        </section>

        {/* Secondary panel */}
        <section className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl md:p-8">
          <div className="text-xs uppercase tracking-[0.28em] text-[#c8a04e]">
            For the reader entering the gate
          </div>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/58">
            Inkbound is built for discovery. Quests, book club spaces, shared
            shelves, and reader features are all designed to make indie stories
            easier to find and harder to forget.
          </p>
        </section>

        {/* Footer CTA */}
        <section className="mt-10 text-center">
          <p className="text-sm text-white/45">
            Not part of the wider world yet?{" "}
            <Link
              to="/contact"
              className="text-[#f6dca0] underline decoration-[#c8a04e]/40 underline-offset-4 transition hover:text-white"
            >
              Summon the Society
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}