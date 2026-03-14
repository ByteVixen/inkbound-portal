import React from "react";

export default function BookClubPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.18),transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(118,25,30,0.15),transparent_40%)] pointer-events-none" />

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:px-10">
        {/* Hero */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#C8A04E]">
            Inkbound Society
          </p>

          <h1 className="font-serif text-4xl leading-tight md:text-6xl">
            Join the <span className="text-[#C8A04E]">Inkbound Indie Book Club</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
            A space for readers, authors, narrators, and bookish rebels to gather,
            read together, and help indie stories get the spotlight they deserve.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Book Club Discord */}
          <div className="rounded-3xl border border-[#C8A04E]/25 bg-white/5 p-8 shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-md">
            <div className="mb-4 inline-flex rounded-full border border-[#C8A04E]/30 bg-[#C8A04E]/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-[#C8A04E]">
              Monthly Read Space
            </div>

            <h2 className="mb-4 font-serif text-3xl text-white">
              Join the Inkbound Indie Book Club Discord
            </h2>

            <p className="mb-6 text-base leading-7 text-white/75">
              This is where the monthly read discussions happen and where readers
              talk about the selected book.
            </p>

            <a
              href="https://discord.gg/dUW7QYFHZE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#C8A04E] px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-[#d8b15a]"
            >
              Join the Book Club Discord
            </a>
          </div>

          {/* Main Inkbound Community */}
          <div className="rounded-3xl border border-[#C8A04E]/25 bg-white/5 p-8 shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-md">
            <div className="mb-4 inline-flex rounded-full border border-[#C8A04E]/30 bg-[#C8A04E]/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-[#C8A04E]">
              Main Community Hub
            </div>

            <h2 className="mb-4 font-serif text-3xl text-white">
              Join the Main Inkbound Community
            </h2>

            <p className="mb-6 text-base leading-7 text-white/75">
              The main Inkbound Discord is home to readers, authors, narrators,
              and bookish creators supporting indie stories.
            </p>

            <p className="mb-6 text-base leading-7 text-white/75">
              It’s where announcements, collaborations, and community conversations
              happen.
            </p>

            <a
              href="https://discord.gg/8xtwUCMMFg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#C8A04E] px-6 py-3 text-sm font-semibold text-[#C8A04E] transition hover:scale-[1.02] hover:bg-[#C8A04E] hover:text-black"
            >
              Join the Main Inkbound Discord
            </a>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md">
          <h3 className="font-serif text-2xl text-white md:text-3xl">
            Readers. Authors. Rebels.
          </h3>
          <p className="mt-4 text-base leading-7 text-white/75">
            Whether you’re here to read with the community or support indie authors,
            there’s a place for you inside Inkbound.
          </p>
        </div>
      </section>
    </main>
  );
}