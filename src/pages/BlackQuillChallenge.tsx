// src/pages/BlackQuillChallenge.tsx

import React, { useEffect, useState } from "react";

const BlackQuillChallenge: React.FC = () => {
  // ✅ Set your campaign end date here (Cyber Monday / etc.)
  const challengeEnd = new Date("2025-12-01T23:59:59Z").getTime();

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date().getTime();
    const diff = challengeEnd - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      ended: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-[#050308] to-[#050308] text-slate-100">
      {/* Glow overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-40 mix-blend-screen">
        <div className="absolute -top-32 left-10 h-72 w-72 rounded-full bg-[#e1a730]/15 blur-3xl" />
        <div className="absolute top-40 right-0 h-72 w-72 rounded-full bg-[#76191e]/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#032b0f]/25 blur-3xl" />
      </div>

      {/* Content wrapper */}
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pt-16">

        {/* Top nav / breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.16em] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-px w-7 bg-slate-600" />
            <span>The Inkbound Society</span>
            <span className="text-slate-600">/</span>
            <span className="text-[#e1a730]">Black Quill Challenge</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => scrollToId("how-to-join")}
              className="hover:text-[#e1a730] transition-colors"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToId("prompts")}
              className="hover:text-[#e1a730] transition-colors"
            >
              Prompts
            </button>
            <button
              onClick={() => scrollToId("hall-of-fame")}
              className="hover:text-[#e1a730] transition-colors"
            >
              Hall of Fame
            </button>
          </div>
        </div>

        {/* HERO */}
        <section className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(260px,2fr)] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#76191e]/50 bg-black/40 px-4 py-1 text-[0.7rem] font-medium tracking-[0.18em] text-[#e1a730]">
              ✦ BFCM FEATURE • EXCLUSIVE AUTHOR PROMO • TIKTOK CHALLENGE
            </p>

            <h1 className="text-3xl font-semibold leading-tight text-slate-50 sm:text-4xl lg:text-5xl">
              The <span className="text-[#e1a730]">Black Quill</span> Challenge
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Four days. One sigil. A swarm of creators dragging their stories out
              of the dark and onto the For You Page. Join the Inkbound Bazaar BFCM
              event and put your books in front of readers who crave indie, dark,
              and dangerous tales.
            </p>

            {/* Countdown */}
            <div className="flex flex-wrap items-center gap-4">
              {!timeLeft.ended ? (
                <>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-black/40 px-4 py-3 text-xs sm:text-sm">
                    <span className="text-slate-400 uppercase tracking-[0.16em]">
                      Challenge ends in
                    </span>
                    <div className="flex gap-3 font-mono text-[#e1a730]">
                      <TimeBlock label="D" value={timeLeft.days} />
                      <TimeBlock label="H" value={timeLeft.hours} />
                      <TimeBlock label="M" value={timeLeft.minutes} />
                      <TimeBlock label="S" value={timeLeft.seconds} />
                    </div>
                  </div>
                  <span className="text-[0.7rem] text-slate-500">
                    Post on TikTok using{" "}
                    <span className="font-semibold text-[#e1a730]">
                      #BlackQuillChallenge
                    </span>{" "}
                    &{" "}
                    <span className="font-semibold text-[#e1a730]">
                      #TheInkboundSociety
                    </span>
                  </span>
                </>
              ) : (
                <div className="rounded-2xl border border-emerald-500/40 bg-black/40 px-4 py-3 text-xs text-emerald-300">
                  The first Black Quill Challenge has closed. Stay tuned — the
                  sigil will be raised again.
                </div>
              )}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => scrollToId("how-to-join")}
                className="rounded-full bg-[#e1a730] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-black shadow-[0_0_25px_rgba(225,167,48,0.45)] hover:bg-[#f0c25a] hover:shadow-[0_0_32px_rgba(225,167,48,0.7)] transition-all"
              >
                Author? Join the challenge
              </button>
              <button
                onClick={() => scrollToId("hall-of-fame")}
                className="rounded-full border border-slate-600/80 bg-black/40 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 hover:border-[#76191e] hover:text-[#e1a730] transition-all"
              >
                Discover featured authors
              </button>
            </div>
          </div>

          {/* Side panel / Lore card */}
          <aside className="relative rounded-3xl border border-[#76191e]/40 bg-black/60 p-5 shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur-md">
            <div className="absolute -top-3 right-6 h-6 w-6 rounded-full border border-[#e1a730]/60 bg-black/90 text-center text-[0.6rem] leading-6 text-[#e1a730] shadow-[0_0_18px_rgba(225,167,48,0.7)]">
              ✦
            </div>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#e1a730]">
              What is the Black Quill?
            </h2>
            <p className="mb-3 text-[0.8rem] leading-relaxed text-slate-300">
              A BFCM-only TikTok challenge, hosted by Inkbound, built to drag
              indie stories into the spotlight. No gimmicks. No cheapening your
              work. Just sharp visuals, strong hooks, and a shared sigil.
            </p>
            <ul className="mb-4 space-y-1.5 text-[0.75rem] text-slate-300">
              <li>• Open to indie authors & small press.</li>
              <li>• Centered on dark, emotional, or beautifully unhinged stories.</li>
              <li>• Selected videos featured on Inkbound’s site & socials.</li>
            </ul>
            <div className="rounded-2xl border border-slate-700/80 bg-gradient-to-br from-black/90 via-[#050308] to-[#110308] px-4 py-3 text-[0.7rem] text-slate-300">
              <p className="font-semibold text-[#e1a730] uppercase tracking-[0.16em] mb-1">
                Reward Highlights
              </p>
              <p>Hall of Fame feature • Homepage spotlight • Cross-promo to readers actively hunting new obsessions.</p>
            </div>
          </aside>
        </section>

        {/* HOW TO JOIN */}
        <section id="how-to-join" className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
              How to join the{" "}
              <span className="text-[#e1a730]">#BlackQuillChallenge</span>
            </h2>
            <span className="text-[0.65rem] text-slate-500">
              For indie authors, dark romantics, fantasy fiends & cozy creeps.
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <StepCard
              step="1"
              title="Summon the sigil"
              body={
                <>
                  Use:
                  <div className="mt-1 flex flex-wrap gap-2 text-[0.65rem]">
                    <span className="rounded-full bg-black/60 px-3 py-1 text-[#e1a730] border border-[#e1a730]/40">
                      #BlackQuillChallenge
                    </span>
                    <span className="rounded-full bg-black/60 px-3 py-1 text-slate-200 border border-slate-600/60">
                      #TheInkboundSociety
                    </span>
                    <span className="rounded-full bg-black/60 px-3 py-1 text-slate-300 border border-slate-600/40">
                      + your genre tags
                    </span>
                  </div>
                </>
              }
            />
            <StepCard
              step="2"
              title="Answer one prompt"
              body={
                <>
                  Film a TikTok (15–45s) responding to at least one Black Quill
                  prompt below. Aesthetic: candles, pages, shadow, vibe.
                  <span className="mt-1 block text-[0.65rem] text-slate-400">
                    Show your book. Show your face if you like. Make it feel like
                    a summon, not an ad.
                  </span>
                </>
              }
            />
            <StepCard
              step="3"
              title="Call your readers in"
              body={
                <>
                  Add a clear hook in text & speech:
                  <span className="block text-[0.65rem] text-slate-300 mt-1 italic">
                    “If you love morally ruined gods and cursed queens, this one’s
                    for you.”
                  </span>
                  Link your store / Inkbound listing / bio. We’ll scout from the
                  tag and feature standouts.
                </>
              }
            />
          </div>

          {/* Caption template */}
          <div className="mt-4 rounded-2xl border border-slate-700/80 bg-black/50 p-4 text-[0.7rem] text-slate-200">
            <div className="mb-2 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#e1a730]">
              <span className="text-base">✎</span> Suggested caption template
            </div>
            <p className="font-mono leading-relaxed text-[0.7rem] text-slate-300">
              This story wouldn&apos;t let me sleep until I wrote it.{" "}
              {"<"}1-line hook for your book{">"}.{" "}
              #BlackQuillChallenge #TheInkboundSociety #indieauthor #booktok
            </p>
          </div>
        </section>

        {/* PROMPTS */}
        <section id="prompts" className="space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
            Black Quill prompts
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <PromptCard
              label="Round I — The Summoning"
              prompt="What summoned your story into being?"
              desc="Show the object, place, or line that birthed your book. Overlay your opening line as text."
            />
            <PromptCard
              label="Round II — The Curse"
              prompt="Every story carries a curse. What’s yours?"
              desc="Share the emotional wound, obsession, or question at the heart of your book + one haunting quote."
            />
            <PromptCard
              label="Round III — The Ink"
              prompt="Show us what your world looks like."
              desc="Spill aesthetics: maps, covers, moodboards, weaponry, lovers, monsters. Quick cuts, strong hook."
            />
            <PromptCard
              label="Round IV — The Bargain"
              prompt="What would you trade to keep this story alive forever?"
              desc="Make it theatrical: candle, ink, whispered line. End on your cover + call-to-action."
            />
          </div>
        </section>

        {/* REWARDS */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
            What authors gain
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <RewardCard
              title="Hall of Black Quills"
              body="Top challenge videos embedded below with direct links to buy pages. Curated by Inkbound."
            />
            <RewardCard
              title="Homepage & Archive Features"
              body="Spotlights across The Inkbound Society site & socials during BFCM, with dark, premium visuals."
            />
            <RewardCard
              title="Signal Boost, Not Discount Pressure"
              body="You choose your pricing. The challenge sells your world, not just slashes your worth."
            />
          </div>
        </section>

        {/* HALL OF FAME / TIKTOK EMBEDS */}
        <section id="hall-of-fame" className="space-y-4">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
              Black Quill Hall of Fame
            </h2>
            <span className="text-[0.65rem] text-slate-500">
              Updated throughout the challenge.
            </span>
          </div>

          <p className="text-[0.8rem] text-slate-300">
            These creators answered the call. Discover their books, follow their pages,
            and claim your next obsession.
          </p>

          {/* 
            Replace placeholder `src` values with actual TikTok embed URLs.
            For each featured author, update:
            - name
            - book
            - TikTok link
          */}
          <div className="grid gap-4 md:grid-cols-3">
            <TikTokCard
              author="Featured Author Name"
              book="Book Title"
              tiktokUrl="https://www.tiktok.com/embed/0000000000"
            />
            <TikTokCard
              author="Featured Author Name"
              book="Book Title"
              tiktokUrl="https://www.tiktok.com/embed/0000000000"
            />
            <TikTokCard
              author="Featured Author Name"
              book="Book Title"
              tiktokUrl="https://www.tiktok.com/embed/0000000000"
            />
          </div>

          <div className="mt-3 text-[0.7rem] text-slate-400">
            Want to be featured here? Post your video with the required tags and
            make sure your link-in-bio leads straight to your book.
          </div>
        </section>
      </div>
    </div>
  );
};

const TimeBlock: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className="flex flex-col items-center">
    <div className="min-w-[2.1rem] rounded-md bg-black/80 px-1.5 py-1 text-center text-xs">
      {String(value).padStart(2, "0")}
    </div>
    <span className="mt-0.5 text-[0.55rem] text-slate-500">{label}</span>
  </div>
);

const StepCard: React.FC<{
  step: string;
  title: string;
  body: React.ReactNode;
}> = ({ step, title, body }) => (
  <div className="relative flex h-full flex-col gap-2 rounded-2xl border border-slate-700/80 bg-black/55 p-4 backdrop-blur-md">
    <div className="absolute -top-2 left-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#76191e] text-[0.65rem] font-semibold text-slate-50 shadow-[0_0_14px_rgba(118,25,30,0.9)]">
      {step}
    </div>
    <h3 className="pt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#e1a730]">
      {title}
    </h3>
    <div className="text-[0.75rem] text-slate-300 leading-relaxed">{body}</div>
  </div>
);

const PromptCard: React.FC<{
  label: string;
  prompt: string;
  desc: string;
}> = ({ label, prompt, desc }) => (
  <div className="flex h-full flex-col gap-2 rounded-2xl border border-slate-700/80 bg-black/60 p-4">
    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#76191e]">
      {label}
    </p>
    <p className="text-[0.85rem] font-semibold text-[#e1a730]">{prompt}</p>
    <p className="text-[0.75rem] text-slate-300 leading-relaxed">{desc}</p>
  </div>
);

const RewardCard: React.FC<{ title: string; body: string }> = ({
  title,
  body,
}) => (
  <div className="flex h-full flex-col gap-2 rounded-2xl border border-slate-700/80 bg-black/55 p-4">
    <h3 className="text-[0.8rem] font-semibold text-[#e1a730]">{title}</h3>
    <p className="text-[0.75rem] text-slate-300 leading-relaxed">{body}</p>
  </div>
);

const TikTokCard: React.FC<{
  author: string;
  book: string;
  tiktokUrl: string;
}> = ({ author, book, tiktokUrl }) => (
  <div className="flex h-full flex-col gap-2 rounded-2xl border border-slate-700/80 bg-black/60 p-3">
    <div className="text-[0.7rem] font-semibold text-[#e1a730]">
      {author}
    </div>
    <div className="text-[0.7rem] text-slate-300 italic mb-1">{book}</div>
    <div className="relative w-full overflow-hidden rounded-xl bg-black/70">
      <iframe
        src={tiktokUrl}
        title={`${author} - ${book} TikTok`}
        className="h-64 w-full"
        allow="encrypted-media; fullscreen"
        loading="lazy"
      />
    </div>
  </div>
);

export default BlackQuillChallenge;
