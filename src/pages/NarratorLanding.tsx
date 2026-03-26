import { Link } from "react-router-dom";
import VantaBackground from "../components/VantaBackground";
import { ArrowRight, Mic2, Radio } from "lucide-react";

export default function NarratorLanding() {
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
        <section className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/25 px-6 py-10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl md:px-10 md:py-14">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-xs uppercase tracking-[0.34em] text-[#c8a04e]">
              Narrator Pathway
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-tight text-white md:text-6xl">
              Narrator Portal
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
              Submit your samples, showcase your voice, and connect with authors
              seeking the right sound for their stories.
            </p>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Link
            to="/narrator-shelf"
            className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
          >
            <div className="mx-auto inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
              <Radio className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-3xl text-white">Narrator Shelf</h2>

            <p className="mt-3 text-sm leading-7 text-white/62">
              Explore featured narrators, hear their style, and find the voice
              that fits your project.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-[#f6dca0]">
              Explore the shelf
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            to="/narrator-hub"
            className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
          >
            <div className="mx-auto inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
              <Mic2 className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-3xl text-white">Narrator Submission</h2>

            <p className="mt-3 text-sm leading-7 text-white/62">
              Submit your samples, portfolio, and details to be considered for
              the Inkbound narrator directory.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-[#f6dca0]">
              Submit your voice
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
}