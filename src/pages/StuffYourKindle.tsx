import React, { useEffect, useMemo, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TALLY_FORM_URL = "https://tally.so/r/aQ9XY9";

// Event moments (Dublin is UTC+0 on Jan 1)
const EVENT_START_UTC = Date.parse("2026-01-01T00:00:00Z");

// Helper: get Dublin parts without any libraries
function getDublinParts(now = new Date()) {
  const dtf = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Dublin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = dtf.formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
    second: Number(get("second")),
  };
}

export default function StuffYourKindle() {
  // Keep a ticking "now" to drive glow + day/night switching
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 15000); // every 15s is plenty
    return () => window.clearInterval(t);
  }, []);

  const dublin = useMemo(() => getDublinParts(now), [now]);

  // Daytime celebration version only on Jan 1st (Dublin), between 06:00–18:00
  const isJan1Dublin =
    dublin.year === 2026 && dublin.month === 1 && dublin.day === 1;

  const isDaytimeCelebration = isJan1Dublin && dublin.hour >= 6 && dublin.hour < 18;

  // Countdown glow: ramps up as we approach midnight Jan 1 (UTC == Dublin at that moment)
  const glowOpacity = useMemo(() => {
    const diffMs = EVENT_START_UTC - now.getTime();
    if (diffMs <= 0) return 0.18; // after midnight: calm down

    const diffHrs = diffMs / (1000 * 60 * 60);

    // Start ramping within 24h, get spicy within 6h, peak within 1h
    if (diffHrs > 24) return 0.18;
    if (diffHrs > 6) {
      // 24h -> 6h : 0.18 -> 0.38
      const t = (24 - diffHrs) / (24 - 6);
      return 0.18 + t * 0.2;
    }
    if (diffHrs > 1) {
      // 6h -> 1h : 0.38 -> 0.62
      const t = (6 - diffHrs) / (6 - 1);
      return 0.38 + t * 0.24;
    }
    // 1h -> 0 : 0.62 -> 0.78
    const t = Math.max(0, Math.min(1, (1 - diffHrs) / 1));
    return 0.62 + t * 0.16;
  }, [now]);

  // Text colours tuned for both backgrounds
  const textTheme = isDaytimeCelebration
    ? {
        pageText: "text-slate-900",
        muted: "text-slate-700",
        soft: "text-slate-800",
        pill: "bg-white/70 border-white/60 text-slate-800",
        panel: "bg-white/70 border-white/50",
        panelInner: "bg-white/70 border-white/60",
        link: "text-blue-700 underline",
        heading: "text-slate-950",
      }
    : {
        pageText: "text-white",
        muted: "text-slate-200/90",
        soft: "text-slate-100/90",
        pill: "bg-black/40 border-white/15 text-white/90",
        panel: "bg-black/40 border-white/15",
        panelInner: "bg-black/30 border-white/15",
        link: "text-cyan-200 underline",
        heading: "text-white",
      };

  return (
    <div
      className={`relative min-h-screen w-full ${textTheme.pageText} overflow-hidden`}
      style={
        {
          // driven by React
          ["--sykeGlowOpacity" as any]: glowOpacity,
        } as React.CSSProperties
      }
    >
      {/* ===== Background (Night fireworks vs Day confetti) ===== */}
      <div className="fixed inset-0 z-0">
        {isDaytimeCelebration ? (
          <>
            {/* Daytime celebration */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#fff6ff] via-[#f3fbff] to-[#ffffff]" />

            {/* Big candy blooms */}
            <div className="absolute -top-40 -left-40 h-[760px] w-[760px] rounded-full bg-fuchsia-400/45 blur-[160px]" />
            <div className="absolute -top-48 right-[-280px] h-[820px] w-[820px] rounded-full bg-cyan-400/40 blur-[180px]" />
            <div className="absolute top-[25%] left-[20%] h-[720px] w-[720px] rounded-full bg-yellow-300/45 blur-[170px]" />
            <div className="absolute bottom-[-320px] right-[10%] h-[900px] w-[900px] rounded-full bg-emerald-300/40 blur-[190px]" />
          </>
        ) : (
          <>
            {/* Night fireworks sky (not black) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#14002b] via-[#1c0457] to-[#090015]" />
            <div className="absolute -top-40 -left-40 h-[720px] w-[720px] rounded-full bg-fuchsia-500/50 blur-[170px]" />
            <div className="absolute -top-40 right-[-260px] h-[820px] w-[820px] rounded-full bg-cyan-400/45 blur-[190px]" />
            <div className="absolute top-[30%] left-[25%] h-[720px] w-[720px] rounded-full bg-yellow-300/38 blur-[170px]" />
            <div className="absolute bottom-[-320px] left-[10%] h-[900px] w-[900px] rounded-full bg-emerald-400/40 blur-[200px]" />
            <div className="absolute bottom-[-300px] right-[10%] h-[860px] w-[860px] rounded-full bg-rose-500/40 blur-[195px]" />
          </>
        )}

        {/* Sparkles overlay (CSS only) */}
        <div className="syke-sparkles" />

        {/* Countdown glow overlay (intensifies near midnight) */}
        <div className="syke-countdown-glow" />
      </div>

      {/* ===== Content ===== */}
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pt-16">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.16em]">
          <div className={`flex items-center gap-2 ${isDaytimeCelebration ? "text-slate-600" : "text-slate-300/80"}`}>
            <span className={`h-px w-7 ${isDaytimeCelebration ? "bg-slate-400" : "bg-white/30"}`} />
            <span>Inkbound</span>
            <span className={`${isDaytimeCelebration ? "text-slate-400" : "text-white/30"}`}>/</span>
            <span className={`${isDaytimeCelebration ? "text-fuchsia-700" : "text-cyan-200"}`}>
              Stuff Your Kindle
            </span>
          </div>

          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.7rem] ${textTheme.pill}`}>
            <span>📅</span>
            <span>January 1st, 2026 • Free Indie Ebooks • Worldwide</span>
          </span>
        </div>

        {/* Logos layout request:
            - inkxiaac big at top
            - stuffyourkindle centred in middle, full width
            - stuffyourkindle image quarter size (you asked this) */}
        <section className="space-y-8">
          {/* Big top logo */}
          <div className="flex justify-center">
            <img
              src="/images/inkxiaac.png"
              alt="Inkbound x Indie Author Advocate Community"
              className="w-full max-w-3xl h-auto drop-shadow-[0_20px_70px_rgba(0,0,0,0.25)]"
            />
          </div>

          {/* Hero tag */}
          <div className="flex justify-center">
            <p
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-[0.72rem] font-semibold tracking-[0.18em]
                ${isDaytimeCelebration ? "bg-white/70 border-white/60 text-slate-800" : "bg-black/40 border-white/15 text-white/90"}`}
            >
              ✦ STUFF YOUR KINDLE • NEW YEAR’S RESOLUTION EDITION
            </p>
          </div>

          {/* Quarter-size SYK image (centered) */}
          <div className="flex justify-center">
            <img
              src="/images/stuffyourkindle.png"
              alt="Stuff Your Kindle"
              className="w-1/4 min-w-[160px] max-w-[260px] h-auto drop-shadow-[0_18px_60px_rgba(0,0,0,0.22)]"
            />
          </div>

          {/* Headline + copy */}
          <div className="text-center space-y-4">
            <h1 className={`text-3xl font-semibold sm:text-4xl lg:text-5xl ${textTheme.heading}`}>
              A better way to start the year
            </h1>

            <p className={`mx-auto max-w-3xl text-sm sm:text-base leading-relaxed ${textTheme.muted}`}>
              Every January, people promise to read more. This year, we’re making it easy.
              On{" "}
              <span className="font-semibold">
                January 1st, 2026
              </span>
              , Inkbound is partnering with the{" "}
              <span className="font-semibold">
                Indie Author Advocate Community
              </span>{" "}
              to host a Stuff Your Kindle event dedicated entirely to indie and self-published
              authors — across all genres.
            </p>

            <div className={`mx-auto grid max-w-3xl gap-2 text-[0.95rem] ${textTheme.soft}`}>
              <p>• No algorithms. No gatekeeping.</p>
              <p>• Just great indie books made FREE for one day.</p>
              <p>• Readers start the year with new stories and new voices.</p>
            </div>
          </div>
        </section>

        {/* Panels */}
        <section className="grid gap-8 lg:grid-cols-2">
          <div className={`rounded-3xl border p-6 backdrop-blur ${textTheme.panel}`}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">
              What is Stuff Your Kindle?
            </h2>
            <p className={`mt-3 text-sm leading-relaxed ${textTheme.muted}`}>
              Stuff Your Kindle events allow readers to download free ebooks from indie authors for a limited time.
            </p>

            <h3 className={`mt-5 text-xs font-semibold uppercase tracking-[0.18em] ${isDaytimeCelebration ? "text-fuchsia-700" : "text-cyan-200"}`}>
              For readers
            </h3>
            <ul className={`mt-2 space-y-1 text-[0.9rem] ${textTheme.muted}`}>
              <li>• Discover new authors</li>
              <li>• Explore genres you might not usually try</li>
              <li>• Fill your Kindle without spending a cent</li>
            </ul>

            <h3 className={`mt-5 text-xs font-semibold uppercase tracking-[0.18em] ${isDaytimeCelebration ? "text-fuchsia-700" : "text-cyan-200"}`}>
              For authors
            </h3>
            <p className={`mt-2 text-[0.9rem] leading-relaxed ${textTheme.muted}`}>
              This is about visibility, connection, and long-term readership — not quick sales.
              While downloads or reviews can’t be guaranteed, we’re committed to promoting participating authors
              and making the reader experience clean, transparent, and easy.
            </p>
          </div>

          <div className={`rounded-3xl border p-6 backdrop-blur ${textTheme.panel}`}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">
              Ready to take part?
            </h2>
            <p className={`mt-3 text-sm leading-relaxed ${textTheme.muted}`}>
              Authors: submit your eligible book(s) using the application form.
              Readers: check back on January 1st to stuff your Kindle.
            </p>

            <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-3 text-[0.85rem]">
              <span className={`rounded-full border px-3 py-1 ${textTheme.pill}`}>🌍 All Genres • Worldwide</span>
              <span
                className={`rounded-full border px-3 py-1
                  ${isDaytimeCelebration
                    ? "bg-white/70 border-white/60 text-slate-800"
                    : "bg-black/40 border-white/15 text-white/90"
                  }`}
              >
                📚 Free Indie Ebooks
              </span>
              <span className={`rounded-full border px-3 py-1 ${textTheme.pill}`}>🖤 Content warnings included</span>
            </div>

            <div className={`mt-6 text-[1rem] font-semibold ${isDaytimeCelebration ? "text-slate-900" : "text-white"}`}>
              ✨ New year. New stories. Same indie heart.
            </div>

            {/* Link button (no embed) */}
            <div className="mt-6">
              <a
                href={TALLY_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em]
                  shadow-[0_0_30px_rgba(255,255,255,0.15)] transition
                  ${isDaytimeCelebration
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/15"
                  }`}
              >
                Apply to submit a book →
              </a>

              <p className={`mt-3 text-[0.8rem] ${textTheme.muted}`}>
                If the button doesn’t open, use this link:{" "}
                <a className={textTheme.link} href={TALLY_FORM_URL} target="_blank" rel="noreferrer">
                  {TALLY_FORM_URL}
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Requirements card (optional but useful) */}
        <section className={`rounded-3xl border p-6 backdrop-blur ${textTheme.panelInner}`}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em]">
            Requirements
          </h2>
          <ul className={`mt-3 grid gap-2 text-[0.9rem] ${textTheme.muted} sm:grid-cols-2`}>
            <li>• Indie or self-published only</li>
            <li>• Ebook must be FREE on January 1st, 2026</li>
            <li>• Universal Amazon and/or Kobo links</li>
            <li>• One submission per book (submit multiple books separately)</li>
            <li>• Clear content warnings + spice levels</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
