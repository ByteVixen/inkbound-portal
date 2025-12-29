import React, { useEffect, useMemo, useState } from "react";
import { BOOKS } from "../books"; // ✅ adjust if your path differs

// Event start (Dublin is UTC+0 at that moment)
const EVENT_START_UTC = Date.parse("2026-01-01T00:00:00Z");

/* =========================
   Types (from generator shape)
   ========================= */
type BookLink = { label: "Amazon" | "Kobo" | "Other"; url: string };

type Book = {
  id: string;
  title: string;
  author: string;
  socials?: string;
  series?: string;

  genres: string[];
  otherGenre?: string;

  blurb?: string;
  hook?: string;

  reps?: string[];
  spice?: string;
  contentLevel?: string;
  warnings?: string;

  links: BookLink[];
};

/* =========================
   Helpers
   ========================= */

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

const GENRE_ORDER = [
  "Romance",
  "Dark Romance",
  "Fantasy",
  "Paranormal",
  "Horror",
  "Thriller",
  "Mystery",
  "Sci-Fi",
  "Contemporary",
  "Literary",
  "YA",
  "Other",
] as const;

function normGenre(g: string) {
  const s = (g || "").trim();
  if (!s) return "";
  if (s.toLowerCase() === "sci fi" || s.toLowerCase() === "sci-fi") return "Sci-Fi";
  if (s.toLowerCase() === "ya" || s.toLowerCase() === "young adult") return "YA";
  if (/^dark romance$/i.test(s)) return "Dark Romance";
  return s.replace(/\s+/g, " ");
}

function safeUrl(url?: string) {
  const u = (url || "").trim();
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  return `https://${u}`;
}

function escapeXml(str: string) {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function makeCoverPlaceholderDataUri(title: string, author?: string) {
  const t = (title || "").trim().slice(0, 48);
  const a = (author || "").trim().slice(0, 42);

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.22)"/>
        <stop offset="40%" stop-color="rgba(255,255,255,0.06)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0.14)"/>
      </linearGradient>
      <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="18" />
      </filter>
    </defs>

    <rect width="600" height="900" rx="42" ry="42" fill="rgba(0,0,0,0.38)" />
    <rect x="28" y="28" width="544" height="844" rx="34" ry="34" fill="url(#g)" />
    <circle cx="130" cy="170" r="120" fill="rgba(255,0,255,0.22)" filter="url(#blur)"/>
    <circle cx="520" cy="240" r="140" fill="rgba(0,255,255,0.18)" filter="url(#blur)"/>
    <circle cx="360" cy="760" r="180" fill="rgba(255,255,0,0.14)" filter="url(#blur)"/>

    <text x="70" y="330" font-size="44" font-family="Georgia, serif" fill="rgba(255,255,255,0.92)">
      ${escapeXml(t)}
    </text>

    <text x="70" y="395" font-size="22" font-family="ui-sans-serif, system-ui" fill="rgba(255,255,255,0.75)">
      ${escapeXml(a)}
    </text>

    <text x="70" y="830" font-size="16" font-family="ui-sans-serif, system-ui" fill="rgba(255,255,255,0.55)">
      Stuff Your Kindle • Jan 1, 2026
    </text>
  </svg>`.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}



/* =========================
   Page
   ========================= */
export default function StuffYourKindle() {
  // Ticking "now" to drive glow + day/night switching + clock
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 10_000); // ✅ 10s is plenty
    return () => window.clearInterval(t);
  }, []);

  const dublin = useMemo(() => getDublinParts(now), [now]);

  // Daytime celebration version only on Jan 1st (Dublin), between 06:00–18:00
  const isJan1Dublin = dublin.year === 2026 && dublin.month === 1 && dublin.day === 1;
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

  const isLive = msToLaunch <= 0;

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
      <div id="top" />

      {/* ===== Background ===== */}
      <div className="fixed inset-0 -z-0">
        {isDaytimeCelebration ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[#fff6ff] via-[#f3fbff] to-[#ffffff]" />
            <div className="absolute -top-40 -left-40 h-[760px] w-[760px] rounded-full bg-fuchsia-400/45 blur-[160px]" />
            <div className="absolute -top-48 right-[-280px] h-[820px] w-[820px] rounded-full bg-cyan-400/40 blur-[180px]" />
            <div className="absolute top-[25%] left-[20%] h-[720px] w-[720px] rounded-full bg-yellow-300/45 blur-[170px]" />
            <div className="absolute bottom-[-320px] right-[10%] h-[900px] w-[900px] rounded-full bg-emerald-300/40 blur-[190px]" />
          </>
        ) : (
          <>
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
      <div className="relative mx-auto flex max-w-9xl flex-col gap-10 px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">

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
              Launch in: <span className="font-mono font-semibold">{countdownLabel}</span>
            </span>
          </span>
        </div>

        {/* Logos + Hero */}
        <section className="flex flex-col items-center">
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

          <div className="text-center mt-5 space-y-4">
            <h1 className={`text-3xl font-semibold sm:text-4xl lg:text-5xl ${textTheme.heading}`}>
              A better way to start the year
            </h1>

            <p className={`mx-auto max-w-3xl text-sm sm:text-base leading-relaxed ${textTheme.muted}`}>
              Every January, people promise to read more. This year, we’re making it easy.
              On <span className="font-semibold">January 1st, 2026</span>, Inkbound is partnering with the{" "}
              <span className="font-semibold">Indie Author Advocate Community</span> &{" "}
              <span className="font-semibold">MommaD</span> to host a Stuff Your Kindle event
              dedicated entirely to indie and self-published authors — across all genres.{" "}
              <span className="font-semibold">Readers:</span> browse and download here on January 1st.
            </p>

            <div className={`mx-auto grid max-w-3xl gap-2 text-[0.95rem] ${textTheme.soft}`}>
              <p>• No algorithms. No gatekeeping.</p>
              <p>• Just great indie books made FREE for one day.</p>
              <p>• Start the year with new stories and new voices.</p>
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
              This event is about visibility, connection, and long-term readership — not quick sales.
              We’re committed to promoting participating authors and making the reader experience clean,
              transparent, and easy.
            </p>
          </div>

          <div className={`rounded-3xl border p-6 backdrop-blur ${textTheme.panel}`}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">
              The book list goes live on January 1st
            </h2>

            <p className={`mt-3 text-sm leading-relaxed ${textTheme.muted}`}>
              This page displays every participating indie ebook. On{" "}
              <span className="font-semibold">January 1st, 2026</span>, the links on each book will take you straight
              to the free download page on Amazon and/or Kobo.
            </p>

            <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-3 text-[0.85rem]">
              <span className={`rounded-full border px-3 py-1 ${textTheme.pill}`}>📚 All Genres</span>
              <span className={`rounded-full border px-3 py-1 ${textTheme.pill}`}>🌍 Worldwide</span>
              <span className={`rounded-full border px-3 py-1 ${textTheme.pill}`}>🖤 Content warnings included</span>
            </div>

            <div className={`mt-6 text-[0.95rem] leading-relaxed ${textTheme.muted}`}>
              <p className="font-semibold">How it works:</p>
              <ul className="mt-2 space-y-1">
                <li>• Search by author/title, or filter by genre.</li>
                <li>• Open a book to see blurb + warnings.</li>
                <li>• Download as many as you want — all day on Jan 1st.</li>
              </ul>
            </div>

            <div className={`mt-6 text-[1rem] font-semibold ${isDaytimeCelebration ? "text-slate-900" : "text-white"}`}>
              ✨ New year. New stories. Same indie heart.
            </div>

            <p className={`mt-3 text-[0.8rem] ${textTheme.muted}`}>
              Tip: if a link isn’t free yet, it will be on January 1st. Retailers sometimes update at slightly different times.
            </p>
          </div>
        </section>

        {/* Expectations */}
        <section className={`rounded-3xl border p-6 backdrop-blur ${textTheme.panelInner}`}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em]">
            What to expect
          </h2>
          <ul className={`mt-3 grid gap-2 text-[0.9rem] ${textTheme.muted} sm:grid-cols-2`}>
            <li>• All books listed here are indie or self-published</li>
            <li>• Ebooks will be FREE on January 1st, 2026</li>
            <li>• Links go to Amazon and/or Kobo</li>
            <li>• Content warnings are provided per book</li>
            <li>• Grab as many as you like — just one day</li>
          </ul>
        </section>

        {/* ===== NEW: Sidebar catalogue browse ===== */}
        <BrowseBooksSidebar
          books={BOOKS as unknown as Book[]}
          textTheme={textTheme}
          isDaytimeCelebration={isDaytimeCelebration}
          isLive={isLive}
        />
      </div>
    </div>
  );
}

/* =========================
   Sidebar Catalogue Browse (Option B)
   ========================= */

function BrowseBooksSidebar({
  books,
  textTheme,
  isDaytimeCelebration,
  isLive,
}: {
  books: Book[];
  textTheme: any;
  isDaytimeCelebration: boolean;
  isLive: boolean;
}) {
  const [query, setQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState<string>("All");
  const [showWarningsOnly, setShowWarningsOnly] = useState(false);

  const cleaned = useMemo(() => {
    return books
      .map((b) => ({
        ...b,
        genres: (b.genres || []).map(normGenre).filter(Boolean),
        links: (b.links || [])
          .map((l) => ({ ...l, url: safeUrl(l.url) }))
          .filter((l) => !!l.url),
      }))
      .map((b) => {
        if (!b.genres.length) return { ...b, genres: ["Other"] };
        return b;
      });
  }, [books]);

  const allGenres = useMemo(() => {
    const set = new Set<string>();
    cleaned.forEach((b) => (b.genres || ["Other"]).forEach((g) => set.add(g)));

    const known = GENRE_ORDER.filter((g) => set.has(g));
    const unknown = Array.from(set)
      .filter((g) => !(GENRE_ORDER as readonly string[]).includes(g))
      .sort();

    return ["All", ...known, ...unknown];
  }, [cleaned]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return cleaned.filter((b) => {
      const matchesQ =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        (b.series || "").toLowerCase().includes(q);

      const matchesGenre = activeGenre === "All" || (b.genres || []).includes(activeGenre);
      const matchesWarnings = !showWarningsOnly || !!b.warnings;

      return matchesQ && matchesGenre && matchesWarnings;
    });
  }, [cleaned, query, activeGenre, showWarningsOnly]);

  const countsByGenre = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((b) => {
      const gs = b.genres?.length ? b.genres : ["Other"];
      gs.forEach((g) => map.set(g, (map.get(g) || 0) + 1));
    });
    return map;
  }, [filtered]);

  const totalShown = filtered.length;

  const shell = isDaytimeCelebration ? "bg-white/70 border-white/55" : "bg-black/35 border-white/15";
  const inner = isDaytimeCelebration ? "bg-white/75 border-white/60" : "bg-black/25 border-white/15";

  const inputStyle = isDaytimeCelebration
    ? "bg-white/85 border-white/70 text-slate-900 placeholder:text-slate-500"
    : "bg-black/40 border-white/15 text-white placeholder:text-white/50";

  const sideChip = (active: boolean) =>
    `${isDaytimeCelebration ? "border-white/60" : "border-white/15"} ${
      active
        ? isDaytimeCelebration
          ? "bg-slate-900 text-white"
          : "bg-white/20 text-white"
        : isDaytimeCelebration
        ? "bg-white/70 text-slate-900 hover:bg-white/95"
        : "bg-white/10 text-white/85 hover:bg-white/15"
    }`;

  return (
    <section className={`rounded-3xl border p-5 sm:p-6 backdrop-blur ${shell}`}>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">
              Browse the free books
            </h2>
            <p className={`mt-2 text-sm ${textTheme.muted}`}>
              Search by title/author, then filter by genre. Open “details” for blurb + warnings.
            </p>
          </div>

          <div className={`text-[0.85rem] ${textTheme.muted}`}>
            Showing <span className="font-semibold">{totalShown}</span> book(s)
          </div>
        </div>

        {/* Controls */}
        <div className={`rounded-3xl border p-4 ${inner}`}>
          <div className="grid gap-3 lg:grid-cols-[1fr_240px]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title / author / series…"
              className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none ${inputStyle}`}
            />

            <div className="flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm">
              <label className={`flex items-center gap-2 ${textTheme.muted}`}>
                <input
                  type="checkbox"
                  checked={showWarningsOnly}
                  onChange={(e) => setShowWarningsOnly(e.target.checked)}
                />
                Warnings only
              </label>

              <button
                onClick={() => {
                  setQuery("");
                  setActiveGenre("All");
                  setShowWarningsOnly(false);
                }}
                className={`text-[0.8rem] ${textTheme.link}`}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Layout: sidebar + grid */}
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className={`rounded-3xl border p-4 ${inner} lg:sticky lg:top-6 h-fit`}>
            <div className="flex items-center justify-between gap-2">
              <h3 className={`text-xs font-semibold uppercase tracking-[0.18em] ${textTheme.accent}`}>
                Genres
              </h3>

              {/* Mobile quick dropdown (still uses same state) */}
              <select
                value={activeGenre}
                onChange={(e) => setActiveGenre(e.target.value)}
                className={`lg:hidden rounded-2xl border px-3 py-2 text-sm outline-none ${inputStyle}`}
              >
                {allGenres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop list */}
            <div className="mt-3 hidden lg:flex flex-col gap-2">
              {allGenres.map((g) => {
                const count = g === "All" ? totalShown : countsByGenre.get(g) || 0;
                const isActive = activeGenre === g;

                return (
                  <button
                    key={g}
                    onClick={() => setActiveGenre(g)}
                    className={`w-full rounded-2xl border px-3 py-2 text-left text-[0.85rem] transition ${sideChip(
                      isActive
                    )}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold">{g}</span>
                      <span className={isActive ? "opacity-90" : "opacity-70"}>{count}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className={`mt-4 text-[0.8rem] ${textTheme.muted}`}>
              Tip: use search for author names fast.
            </p>
          </aside>

          {/* Grid */}
          <div className="space-y-4">
            {/* Active filter pills */}
            <div className="flex flex-wrap gap-2">
              {activeGenre !== "All" && (
                <span className={`rounded-full border px-3 py-1 text-[0.75rem] ${textTheme.pill}`}>
                  Genre: <span className="font-semibold">{activeGenre}</span>
                </span>
              )}
              {query.trim() && (
                <span className={`rounded-full border px-3 py-1 text-[0.75rem] ${textTheme.pill}`}>
                  Search: <span className="font-semibold">{query.trim()}</span>
                </span>
              )}
              {showWarningsOnly && (
                <span className={`rounded-full border px-3 py-1 text-[0.75rem] ${textTheme.pill}`}>
                  Warnings only
                </span>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className={`rounded-3xl border p-6 ${inner}`}>
                <p className={textTheme.muted}>No matches. Try clearing filters.</p>
              </div>
            ) : (
              <div className="grid gap-6 xl:grid-cols-2">
                {filtered
                  .slice()
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((b) => (
                    <BookCardClean
                      key={b.id}
                      book={b}
                      textTheme={textTheme}
                      isDaytimeCelebration={isDaytimeCelebration}
                      isLive={isLive}
                    />
                  ))}
              </div>
            )}

            <div className="pt-2">
              <a
                href="#top"
                className={`text-[0.8rem] ${textTheme.link}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Back to top
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   Clean Book Card (compact, readable)
   ========================= */

   function BookCardClean({
    book,
    textTheme,
    isDaytimeCelebration,
    isLive,
  }: {
    book: Book;
    textTheme: any;
    isDaytimeCelebration: boolean;
    isLive: boolean;
  }) {
    const [open, setOpen] = useState(false);
    const [ext, setExt] = useState<"jpg" | "png" | "fallback">("jpg");
  
    const coverSrc =
      ext === "fallback"
        ? makeCoverPlaceholderDataUri(book.title, book.author)
        : `/syk-covers/${book.id}.${ext}`;
  
    const frame = isDaytimeCelebration
      ? "bg-white/80 border-white/60"
      : "bg-black/35 border-white/15";
  
    const inner = isDaytimeCelebration
      ? "bg-white/65 border-white/60"
      : "bg-black/25 border-white/15";
  
    const chip = isDaytimeCelebration
      ? "bg-slate-900/5 border-slate-900/10 text-slate-900"
      : "bg-white/10 border-white/15 text-white/85";
  
    const subtleBtn = isDaytimeCelebration
      ? "bg-white/70 border-white/60 text-slate-900 hover:bg-white/90"
      : "bg-white/10 border-white/15 text-white hover:bg-white/15";
  
    const btnEnabled = isDaytimeCelebration
      ? "bg-slate-900 text-white hover:bg-slate-800"
      : "bg-white/10 text-white border border-white/15 hover:bg-white/15";
  
    const btnDisabled = isDaytimeCelebration
      ? "bg-slate-200 text-slate-500 cursor-not-allowed"
      : "bg-white/10 text-white/40 cursor-not-allowed border border-white/10";
  
    const genres = (book.genres || ["Other"]).slice(0, 4);
    const hasWarnings = !!book.warnings?.trim();
    const spiceText = (book.spice || "").trim();
  
    // Shorter disabled labels so buttons don’t balloon
    const linkLabel = (label: string) => (isLive ? `${label} →` : label);
  
    return (
      <article className={`rounded-3xl border p-6 ${frame}`}>
        <div className="grid items-start gap-6 md:grid-cols-[156px_minmax(0,1fr)]">
          {/* COVER */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-3 rounded-[28px] blur-2xl bg-fuchsia-500/20" />
            <div className="pointer-events-none absolute -inset-3 rounded-[28px] blur-2xl bg-cyan-400/15" />
  
            <div className="group relative overflow-hidden rounded-2xl border border-white/15">
              {/* Ribbon (smaller + nicer) */}
              <div className="absolute left-[-56px] top-[14px] z-10 rotate-[-35deg]">
                <div
                  className={`px-12 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.18em] shadow-lg ${
                    isDaytimeCelebration ? "bg-slate-900 text-white" : "bg-white text-black"
                  }`}
                >
                  FREE JAN 1
                </div>
              </div>
  
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -left-1/2 top-0 h-full w-full rotate-12 bg-white/15 blur-md" />
              </div>
  
              <img
                src={coverSrc}
                alt={`${book.title} cover`}
                className="h-[220px] w-[156px] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
                onError={() => {
                  if (ext === "jpg") setExt("png");
                  else setExt("fallback");
                }}
              />
            </div>
  
            <div className="mt-3 flex justify-center">
              <span className={`rounded-full border px-3 py-1 text-[0.75rem] ${chip}`}>
                {isLive ? "Live now" : "Unlocks Jan 1"}
              </span>
            </div>
          </div>
  
          {/* CONTENT */}
          <div className="flex min-w-0 flex-col gap-4">
            {/* Header */}
            <div className="min-w-0">
            <h4 className={`text-[1.35rem] sm:text-[1.45rem] font-semibold leading-snug ${textTheme.heading} break-words`}>

                {book.title}
              </h4>
  
              <p className={`mt-1 text-sm ${textTheme.muted}`}>
                {book.author}
                {book.series ? <span className="opacity-70"> • {book.series}</span> : null}
              </p>
  
              {/* META BAR (tightened chips) */}
              <div className="mt-3 flex flex-wrap gap-2">
                {spiceText ? (
                  <span className={`rounded-full border px-3 py-1 text-[0.75rem] ${chip}`}>
                    🌶️ <span className="font-semibold">{spiceText}</span>
                  </span>
                ) : null}
  
                {book.contentLevel ? (
                  <span className={`rounded-full border px-3 py-1 text-[0.75rem] ${chip}`}>
                    🖤 <span className="font-semibold">{book.contentLevel}</span>
                  </span>
                ) : null}
  
                {hasWarnings ? (
                  <span className={`rounded-full border px-3 py-1 text-[0.75rem] ${chip}`} title="Content warnings available">
                    ⚠️ <span className="font-semibold">Warnings</span>
                  </span>
                ) : null}
              </div>
  
              {/* Genres */}
              <div className="mt-3 flex flex-wrap gap-2">
                {genres.map((g) => (
                  <span key={g} className={`rounded-full border px-3 py-1 text-[0.75rem] ${chip}`}>
                    {g}
                  </span>
                ))}
              </div>
  
              {/* Blurb preview (more room, less squish) */}
              {book.blurb ? (
                <p className={`mt-4 text-sm leading-relaxed ${textTheme.muted} line-clamp-6`}>
                  {book.blurb}
                </p>
              ) : null}
            </div>
  
            {/* ACTION ROW — ✅ THIS is the big fix */}
            <div className="mt-auto flex flex-wrap items-center gap-2">
              {book.links?.slice(0, 2).map((l) => (
                <a
                  key={l.label}
                  href={isLive ? l.url : undefined}
                  target={isLive ? "_blank" : undefined}
                  rel={isLive ? "noreferrer" : undefined}
                  onClick={(e) => !isLive && e.preventDefault()}
                  className={`inline-flex h-10 items-center justify-center rounded-full px-4 text-[0.85rem] font-semibold transition whitespace-nowrap ${
                    isLive ? btnEnabled : btnDisabled
                  }`}
                  title={!isLive ? "Links unlock on Jan 1" : undefined}
                >
                  {linkLabel(l.label)}
                  {!isLive ? <span className="ml-2 opacity-70">(Jan 1)</span> : null}
                </a>
              ))}
  
              {(book.hook || book.warnings || (book.reps?.length ?? 0) > 0) ? (
                <button
                  onClick={() => setOpen((v) => !v)}
                  className={`inline-flex h-10 items-center justify-center rounded-full border px-4 text-[0.85rem] font-semibold transition whitespace-nowrap ${subtleBtn}`}
                >
                  {open ? "Hide details" : "More details"}
                </button>
              ) : null}
            </div>
  
            {/* EXPANDED DETAILS */}
            {open && (
              <div className={`rounded-2xl border p-4 ${inner}`}>
                {book.hook ? (
                  <p className={`text-sm font-semibold ${textTheme.heading}`}>{book.hook}</p>
                ) : null}
  
                {book.reps && book.reps.length > 0 && (
                  <div className="mt-3">
                    <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${textTheme.accent}`}>
                      Representation
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {book.reps.slice(0, 12).map((r) => (
                        <span key={r} className={`rounded-full border px-3 py-1 text-[0.75rem] ${chip}`}>
                          ✦ {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
  
                {book.warnings ? (
                  <div className="mt-3">
                    <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${textTheme.accent}`}>
                      Content warnings
                    </p>
                    <p className={`mt-2 text-sm leading-relaxed ${textTheme.muted}`}>
                      {book.warnings}
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </article>
    );
  }
  