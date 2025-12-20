import React from "react";

const TALLY_CLAIM_URL = "https://tally.so/r/PdD1ZV"; // <-- paste yours

export default function TreasureClaim() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-[#050308] to-[#12020a] text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-semibold mb-4 text-amber-300 drop-shadow">
          🏆 Inkbound Treasure Claim
        </h1>

        <p className="text-gray-300 mb-6">
          You found something you weren’t supposed to find… cheeky.
          <br />
          <span className="text-amber-200 font-semibold">
            First 5 valid claims win a free Inkbound mug.
          </span>
        </p>

        <div className="rounded-2xl border border-amber-400/40 bg-black/50 p-6 mb-8">
          <h2 className="text-sm uppercase tracking-[0.18em] text-amber-200 mb-2">
            Rules (simple, no drama)
          </h2>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• One claim per person.</li>
            <li>• You must enter the exact secret phrase you found.</li>
            <li>• Winners are the first 5 valid submissions.</li>
            <li>• If you’re a winner, you’ll get an email from Inkbound.</li>
          </ul>
        </div>

        <a
          href={TALLY_CLAIM_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em]
                     bg-amber-500/90 hover:bg-amber-400 text-black shadow-[0_0_18px_rgba(245,158,11,0.55)]
                     transition border border-amber-200/60"
        >
          Claim your prize →
        </a>

        <p className="text-xs text-gray-400 mt-4">
          If the button doesn’t open, copy/paste this:{" "}
          <span className="text-amber-300">{TALLY_CLAIM_URL}</span>
        </p>
      </div>
    </div>
  );
}

