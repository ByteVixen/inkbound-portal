import React, { useEffect, useMemo, useState } from "react";

const TALLY_FORM_URL = "https://tally.so/r/aQ9XY9";

// Event start (Dublin is UTC+0 at that moment)
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

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatCountdown(ms: number) {
  if (ms <= 0) return "LIVE NOW";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export default function StuffYourKindle() {
  // Ticking "now" to drive glow + day/night switching + clock
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000); // 1s tick for a real clock
    return () => window.clearInterval(t);
  }, []);

  const dublin = useMemo(() => getDublinParts(now), [now]);

  // Daytime celebration version only on Jan 1st (Dublin), between 06:00–18:00
  const isJan1Dublin =
    dublin.year === 2026 && dublin.month === 1 && dublin.day === 1;

  const isDaytimeCelebration = isJan1Dublin && dublin.hour >= 6 && dublin.hour < 18;

  // Countdown glow ramps up as we approach midnight Jan 1 (UTC == Dublin at that moment)
  const glowOpacity = useMemo(() => {
    const diffMs = EVENT_START_UTC - now.getTime();
    if (diffMs <= 0) return 0.18; // after midnight: calm down

    const diffHrs = diffMs / (1000 * 60 * 60);

    // Start ramping within 24h, spicy within 6h, peak within 1h
    if (diffHrs > 24) return 0.18;
    if (diffHrs > 6) {
      const t = (24 - diffHrs) / (24 - 6);
      return 0.18 + t * 0.2; // 0.18 -> 0.38
    }
    if (diffHrs > 1) {
      const t = (6 - diffHrs) / (6 - 1);
      return 0.38 + t * 0.24; // 0.38 -> 0.62
    }
    const t = Math.max(0, Math.min(1, (1 - diffHrs) / 1));
    return 0.62 + t * 0.16; // 0.62 -> 0.78
  }, [now]);

  const msToLaunch = useMemo(() => EVENT_START_UTC - now.getTime(), [now]);
  const countdownLabel = useMemo(() => formatCountdown(msToLaunch), [msToLaunch]);

  // Text colors tuned for both background modes
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
        accent: "text-fuchsia-700",
        divider: "bg-slate-400",
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
        accent: "text-cyan-200",
        divider: "bg-white/30",
      };

  return (
    <div
      className={`relative min-h-screen w-full ${textTheme.pageText} overflow-hidden`}
      style={
        {
          ["--sykeGlowOpacity" as any]: glowOpacity,
        } as React.CSSProperties
      }
    >
      {/* ===== Background (MUST sit behind body) ===== */}
      <div className="fixed inset-0 -z-0">
        {isDaytimeCelebration ? (
          <>
            {/* Day celebration */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#fff6ff] via-[#f3fbff] to-[#ffffff]" />
            <div className="absolute -top-40 -left-40 h-[760px] w-[760px] rounded-full bg-fuchsia-400/45 blur-[160px]" />
            <div className="absolute -top-48 right-[-280px] h-[820px] w-[820px] rounded-full bg-cyan-400/40 blur-[180px]" />
            <div className="absolute top-[25%] left-[20%] h-[720px] w-[720px] rounded-full bg-yellow-300/45 blur-[170px]" />
            <div className="absolute bottom-[-320px] right-[10%] h-[900px] w-[900px] rounded-full bg-emerald-300/40 blur-[190px]" />
          </>
        ) : (
          <>
            {/* Night fireworks (not black) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#14002b] via-[#1c0457] to-[#090015]" />
            <div className="absolute -top-40 -left-40 h-[720px] w-[720px] rounded-full bg-fuchsia-500/50 blur-[170px]" />
            <div className="absolute -top-40 right-[-260px] h-[820px] w-[820px] rounded-full bg-cyan-400/45 blur-[190px]" />
            <div className="absolute top-[30%] left-[25%] h-[720px] w-[720px] rounded-full bg-yellow-300/38 blur-[170px]" />
            <div className="absolute bottom-[-320px] left-[10%] h-[900px] w-[900px] rounded-full bg-emerald-400/40 blur-[200px]" />
            <div className="absolute bottom-[-300px] right-[10%] h-[860px] w-[860px] rounded-full bg-rose-500/40 blur-[195px]" />
          </>
        )}

        {/* Sparkles overlay (CSS only) */}
        <div className="syke-sparkles syke-sparkles--back" />
<div className="syke-sparkles syke-sparkles--mid" />
<div className="syke-sparkles syke-sparkles--front" />


        {/* Countdown glow overlay */}
        <div className="syke-countdown-glow" />
      </div>

      {/* ===== Content ===== */}
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.16em]">
          <div className={`flex items-center gap-2 ${isDaytimeCelebration ? "text-slate-600" : "text-slate-300/80"}`}>
            <span className={`h-px w-7 ${textTheme.divider}`} />
            <span>Inkbound</span>
            <span className={`${isDaytimeCelebration ? "text-slate-400" : "text-white/30"}`}>/</span>
            <span className={textTheme.accent}>Stuff Your Kindle</span>
          </div>

          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.7rem] ${textTheme.pill}`}>
            <span>📅</span>
            <span>January 1st, 2026 • Free Indie Ebooks • Worldwide</span>
          </span>
        </div>

        {/* Tiny clock + countdown */}
        <div className="flex flex-wrap items-center justify-center gap-3 -mt-6">
          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.75rem] ${textTheme.pill}`}>
            <span>🕰️</span>
            <span>
              Dublin time:{" "}
              <span className="font-mono font-semibold">
                {pad2(dublin.hour)}:{pad2(dublin.minute)}:{pad2(dublin.second)}
              </span>
            </span>
          </span>

          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.75rem] ${textTheme.pill}`}
            title="This is based on 2026-01-01 00:00:00 (Dublin/UTC)."
          >
            <span>⏳</span>
            <span>
              Launch in:{" "}
              <span className="font-mono font-semibold">{countdownLabel}</span>
            </span>
          </span>
        </div>

        {/* Logos + Hero (tightened) */}
        <section className="flex flex-col items-center">
          {/* Tight logo stack (this is the real fix) */}
          <div className="flex flex-col items-center -space-y-8">
            <img
              src="/images/inkxiaac.png"
              alt="Inkbound x Indie Author Advocate Community"
              className="w-full max-w-4xl h-auto drop-shadow-[0_20px_70px_rgba(0,0,0,0.25)]"
            />

            <img
              src="/images/stuffyourkindle.png"
              alt="Stuff Your Kindle"
              className="w-1/3 min-w-[300px] max-w-[440px] h-auto drop-shadow-[0_25px_80px_rgba(0,0,0,0.28)]"
            />
          </div>

          {/* Hero tag */}
          <div className="flex justify-center mt-3">
            <p
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-[0.72rem] font-semibold tracking-[0.18em]
                ${
                  isDaytimeCelebration
                    ? "bg-white/70 border-white/60 text-slate-800"
                    : "bg-black/40 border-white/15 text-white/90"
                }`}
            >
              ✦ STUFF YOUR KINDLE • NEW YEAR’S RESOLUTION EDITION
            </p>
          </div>

          {/* Headline + copy */}
          <div className="text-center mt-5 space-y-4">
            <h1 className={`text-3xl font-semibold sm:text-4xl lg:text-5xl ${textTheme.heading}`}>
              A better way to start the year
            </h1>

            <p className={`mx-auto max-w-3xl text-sm sm:text-base leading-relaxed ${textTheme.muted}`}>
              Every January, people promise to read more. This year, we’re making it easy.
              On <span className="font-semibold">January 1st, 2026</span>, Inkbound is partnering with the{" "}
              <span className="font-semibold">Indie Author Advocate Community</span> & {" "}
              <span className="font-semibold">MommaD</span> to host a Stuff Your Kindle event
              dedicated entirely to indie and self-published authors — across all genres.
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

            <h3 className={`mt-5 text-xs font-semibold uppercase tracking-[0.18em] ${textTheme.accent}`}>
              For readers
            </h3>
            <ul className={`mt-2 space-y-1 text-[0.9rem] ${textTheme.muted}`}>
              <li>• Discover new authors</li>
              <li>• Explore genres you might not usually try</li>
              <li>• Fill your Kindle without spending a cent</li>
            </ul>

            <h3 className={`mt-5 text-xs font-semibold uppercase tracking-[0.18em] ${textTheme.accent}`}>
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
              Authors: submit your eligible book(s) using the application form. Readers: check back on January 1st to
              stuff your Kindle.
            </p>

            <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-3 text-[0.85rem]">
              <span className={`rounded-full border px-3 py-1 ${textTheme.pill}`}>🌍 All Genres • Worldwide</span>
              <span className={`rounded-full border px-3 py-1 ${textTheme.pill}`}>📚 Free Indie Ebooks</span>
              <span className={`rounded-full border px-3 py-1 ${textTheme.pill}`}>🖤 Content warnings included</span>
            </div>

            <div className={`mt-6 text-[1rem] font-semibold ${isDaytimeCelebration ? "text-slate-900" : "text-white"}`}>
              ✨ New year. New stories. Same indie heart.
            </div>

            {/* Link button */}
            <div className="mt-6">
              <a
                href={TALLY_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em]
                  shadow-[0_0_30px_rgba(255,255,255,0.15)] transition
                  ${
                    isDaytimeCelebration
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

        {/* Requirements */}
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
