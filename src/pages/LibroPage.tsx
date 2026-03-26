import React from "react";
import VantaBackground from "../components/VantaBackground";
import { ArrowRight, Headphones, Gift, Repeat } from "lucide-react";

const LibroPage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050506] font-marcellus text-[#f5efe3]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Ambient overlays */}
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(82,58,133,0.08),transparent_20%),radial-gradient(circle_at_20%_80%,rgba(13,30,66,0.10),transparent_24%)]" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#c8a04e]/8 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Hero */}
          <section className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/25 px-6 py-10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl md:px-10 md:py-14">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <div className="text-xs uppercase tracking-[0.34em] text-[#c8a04e]">
                  Audiobook Pathway
                </div>

                <h1 className="mt-5 font-serif text-4xl leading-tight text-white md:text-6xl">
                  Discover Audiobooks
                </h1>

                <p className="mt-5 text-base leading-8 text-white/68 md:text-lg">
                  We’ve partnered with Libro.fm so you can buy audiobooks while
                  supporting Inkbound. Explore a huge catalogue of titles and
                  keep your listening indie with every purchase.
                </p>

                <a
                  href="https://libro.fm/inkboundsociety"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-[#c8a04e]/40 bg-[#c8a04e] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(200,160,78,0.2)]"
                >
                  Browse Audiobooks
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <img
                  src="/images/Screen - Welcome.png"
                  alt="Audiobook app screen"
                  className="w-full rounded-[1.3rem] shadow-lg"
                />
              </div>
            </div>
          </section>

          {/* Listening Options */}
          <section className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]">
              <div className="mx-auto inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
                <Headphones className="h-6 w-6" />
              </div>

              <h2 className="mt-5 text-2xl text-white">Monthly Membership</h2>

              <p className="mt-4 text-sm leading-7 text-white/62">
                One or two audiobooks per month. A strong option for regular
                listeners who want a steady flow of new stories.
              </p>

              <a
                href="https://libro.fm/membership/new?bookstore=inkboundsociety"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-full border border-[#c8a04e]/30 bg-[#c8a04e]/10 px-4 py-2 text-sm text-[#f6dca0] transition hover:border-[#c8a04e]/50 hover:bg-[#c8a04e]/15 hover:text-white"
              >
                Get Started
              </a>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]">
              <div className="mx-auto inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
                <ArrowRight className="h-6 w-6" />
              </div>

              <h2 className="mt-5 text-2xl text-white">On Demand</h2>

              <p className="mt-4 text-sm leading-7 text-white/62">
                Buy audiobooks one by one whenever you want. No subscription, no
                pressure, just direct access.
              </p>

              <a
                href="https://libro.fm/explore?bookstore=inkboundsociety"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-full border border-[#c8a04e]/30 bg-[#c8a04e]/10 px-4 py-2 text-sm text-[#f6dca0] transition hover:border-[#c8a04e]/50 hover:bg-[#c8a04e]/15 hover:text-white"
              >
                Start Exploring
              </a>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]">
              <div className="mx-auto inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
                <Gift className="h-6 w-6" />
              </div>

              <h2 className="mt-5 text-2xl text-white">Gift Audiobooks</h2>

              <p className="mt-4 text-sm leading-7 text-white/62">
                Send audiobook credits to someone else and let them choose their
                next listen for themselves.
              </p>

              <a
                href="https://libro.fm/gift?bookshop=inkboundsociety"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-full border border-[#c8a04e]/30 bg-[#c8a04e]/10 px-4 py-2 text-sm text-[#f6dca0] transition hover:border-[#c8a04e]/50 hover:bg-[#c8a04e]/15 hover:text-white"
              >
                Start Gifting
              </a>
            </div>
          </section>

          {/* Switch Promo */}
          <section className="mt-10 rounded-[2rem] border border-[#c8a04e]/20 bg-[linear-gradient(145deg,rgba(200,160,78,0.10),rgba(255,255,255,0.04),rgba(0,0,0,0.35))] p-[1px]">
            <div className="rounded-[1.95rem] bg-[radial-gradient(circle_at_top_left,rgba(200,160,78,0.06),rgba(9,9,11,0.96))] px-6 py-10 text-center backdrop-blur-xl md:px-10">
              <div className="mx-auto inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
                <Repeat className="h-6 w-6" />
              </div>

              <img
                src="/images/Device - Switch.png"
                alt="Libro.fm Switch"
                className="mx-auto mt-6 w-52 md:w-60"
              />

              <h2 className="mt-6 font-serif text-3xl text-white md:text-4xl">
                Get Two Free Audiobooks
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/68">
                Switching from another service? Start a membership through
                Libro.fm using promo code <strong>SWITCH</strong> and get two
                bonus credits.
              </p>

              <a
                href="https://libro.fm/switch?bookshop=inkboundsociety"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex rounded-full border border-[#c8a04e]/30 bg-[#c8a04e]/10 px-5 py-2.5 text-sm text-[#f6dca0] transition hover:border-[#c8a04e]/50 hover:bg-[#c8a04e]/15 hover:text-white"
              >
                Make the Switch
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LibroPage;