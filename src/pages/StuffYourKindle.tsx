// src/pages/StuffYourKindle.tsx
import { useEffect, useMemo, useState } from "react";

// ✅ Interest form (public page)
const TALLY_URL = "https://tally.so/forms/aQ9XY9";

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

/* =========================
   Page
   ========================= */
export default function StuffYourKindle() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 10_000);
    return () => window.clearInterval(t);
  }, []);

  const dublin = useMemo(() => getDublinParts(now), [now]);
  const isDaytime = dublin.hour >= 7 && dublin.hour < 18;

  const textTheme = isDaytime
    ? {
        pageText: "text-slate-900",
        muted: "text-slate-700",
        soft: "text-slate-800",
        heading: "text-slate-950",
        accent: "text-fuchsia-700",
        divider: "bg-slate-400",
        link: "text-blue-700 underline",
        btnPrimary: "bg-slate-900 text-white hover:bg-slate-800",
        btnGhost: "bg-white/70 border-white/60 text-slate-900 hover:bg-white/90",
        // ✅ glass readability
        glass: "bg-white/70 border-white/55",
        glassInner: "bg-white/72 border-white/60",
        pill: "bg-white/70 border-white/60 text-slate-800",
      }
    : {
        pageText: "text-white",
        muted: "text-slate-200/90",
        soft: "text-slate-100/90",
        heading: "text-white",
        accent: "text-cyan-200",
        divider: "bg-white/30",
        link: "text-cyan-200 underline",
        btnPrimary: "bg-white/10 text-white border border-white/15 hover:bg-white/15",
        btnGhost: "bg-white/10 border-white/15 text-white hover:bg-white/15",
        // ✅ darker glass for night mode so text pops
        glass: "bg-black/55 border-white/15",
        glassInner: "bg-black/45 border-white/15",
        pill: "bg-black/45 border-white/15 text-white/90",
      };

  // Reusable glass panel wrapper (stronger blur + better contrast)
  const Glass = ({
    className = "",
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => (
    <div
      className={`rounded-3xl border backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.25)] ${textTheme.glass} ${className}`}
    >
      {children}
    </div>
  );

  const GlassInner = ({
    className = "",
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => (
    <div className={`rounded-2xl border ${textTheme.glassInner} ${className}`}>{children}</div>
  );

  return (
    <div className={`relative min-h-screen w-full ${textTheme.pageText} overflow-hidden`}>
      <div id="top" />

      {/* ===== Background ===== */}
      <div className="fixed inset-0 -z-0">
        {isDaytime ? (
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

        {/* Sparkles overlay (keep your existing CSS if you have it) */}
        <div className="syke-sparkles syke-sparkles--back" />
        <div className="syke-sparkles syke-sparkles--mid" />
        <div className="syke-sparkles syke-sparkles--front" />
      </div>

      {/* ===== Content ===== */}
      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-24 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.16em]">
          <div className={`flex items-center gap-2 ${isDaytime ? "text-slate-600" : "text-slate-300/80"}`}>
            <span className={`h-px w-7 ${textTheme.divider}`} />
            <span>Inkbound</span>
            <span className={`${isDaytime ? "text-slate-400" : "text-white/30"}`}>/</span>
            <span className={textTheme.accent}>Next Stuff Your Kindle</span>
          </div>

          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.7rem] ${textTheme.pill}`}>
            <span>🕰️</span>
            <span>
              Dublin time:{" "}
              <span className="font-mono font-semibold">
                {pad2(dublin.hour)}:{pad2(dublin.minute)}:{pad2(dublin.second)}
              </span>
            </span>
          </span>
        </div>

        {/* Hero (now on glass so it's readable) */}
        <Glass className="p-6 sm:p-8">
          <section className="flex flex-col items-center text-center">
            <div className="flex flex-col items-center gap-4">
              <img
                src="/images/inkxiaac.png"
                alt="Inkbound x Indie Author Advocate Community"
                className="w-full max-w-3xl h-auto drop-shadow-[0_20px_70px_rgba(0,0,0,0.25)]"
              />
            </div>

            <div className="mt-6 space-y-5">
              <p
                className={`mx-auto inline-flex items-center gap-2 rounded-full border px-4 py-1 text-[0.72rem] font-semibold tracking-[0.18em] ${textTheme.pill}`}
              >
                ✦ NEXT EVENT • INTEREST LIST OPEN
              </p>

              <h1 className={`text-3xl font-semibold sm:text-4xl lg:text-5xl ${textTheme.heading}`}>
                Want in on the next Stuff Your Kindle?
              </h1>

              <p className={`mx-auto max-w-3xl text-sm sm:text-base leading-relaxed ${textTheme.muted}`}>
                The last one was absolute mayhem (the good kind). We’re building the next drop now.
                If you’re an <span className="font-semibold">author</span> who wants to participate, or a{" "}
                <span className="font-semibold">reader</span> who wants first access to the list, add your name to the interest form.
              </p>

              <div className="mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={TALLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex h-11 items-center justify-center rounded-full px-6 text-[0.95rem] font-semibold transition ${textTheme.btnPrimary}`}
                >
                  Join the interest list →
                </a>

                <a
                  href={TALLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex h-11 items-center justify-center rounded-full border px-6 text-[0.95rem] font-semibold transition ${textTheme.btnGhost}`}
                >
                  Open form in a new tab
                </a>
              </div>

              <div className={`mx-auto grid max-w-3xl gap-2 text-[0.95rem] ${textTheme.soft}`}>
                <p>• Date will be announced once the lineup + promo plan is locked.</p>
                <p>• Interest list gets the first email before we go public.</p>
                <p>• Quick form. No spam. No nonsense.</p>
              </div>

              <div className={`pt-1 text-[0.85rem] ${textTheme.muted}`}>
                Direct link:{" "}
                <a className={textTheme.link} href={TALLY_URL} target="_blank" rel="noreferrer">
                  {TALLY_URL}
                </a>
              </div>
            </div>
          </section>
        </Glass>

        {/* Panels (both on glass) */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Glass className="p-5 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">For Authors</h2>
            <p className={`mt-3 text-sm leading-relaxed ${textTheme.muted}`}>
              This is the “raise your hand” list — not the submission form yet.
              When submissions open, the interest list gets the official link first.
            </p>

            <GlassInner className="mt-4 p-4">
              <ul className={`space-y-2 text-[0.92rem] ${textTheme.muted}`}>
                <li>• Indie / self-published focus</li>
                <li>• Genre-based browsing for readers</li>
                <li>• Clear expectations + promo assets</li>
              </ul>
            </GlassInner>

            <div className="mt-5">
              <a
                href={TALLY_URL}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex h-11 items-center justify-center rounded-full px-6 text-[0.95rem] font-semibold transition ${textTheme.btnPrimary}`}
              >
                I’m an author — add me →
              </a>
            </div>
          </Glass>

          <Glass className="p-5 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">For Readers</h2>
            <p className={`mt-3 text-sm leading-relaxed ${textTheme.muted}`}>
              Want the list the second it drops? Add your email and we’ll send the date + live link as soon as it’s ready.
            </p>

            <GlassInner className="mt-4 p-4">
              <p className={`text-[0.95rem] ${textTheme.muted}`}>
                You’ll get:
              </p>
              <ul className={`mt-2 space-y-1 text-[0.92rem] ${textTheme.muted}`}>
                <li>• First announcement of the date</li>
                <li>• Early access link to the live book list</li>
                <li>• Genre highlights + featured recs</li>
              </ul>
            </GlassInner>

            <div className="mt-5">
              <a
                href={TALLY_URL}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex h-11 items-center justify-center rounded-full px-6 text-[0.95rem] font-semibold transition ${textTheme.btnPrimary}`}
              >
                I’m a reader — add me →
              </a>
            </div>
          </Glass>
        </div>

        {/* FAQ on glass */}
        <Glass className="p-5 sm:p-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em]">Quick FAQ</h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <GlassInner className="p-4">
              <p className={`text-sm font-semibold ${textTheme.heading}`}>Is this the submission form?</p>
              <p className={`mt-2 text-sm leading-relaxed ${textTheme.muted}`}>
                Not yet. This is the interest list. When submissions open, you’ll get the link first.
              </p>
            </GlassInner>

            <GlassInner className="p-4">
              <p className={`text-sm font-semibold ${textTheme.heading}`}>When is the next event?</p>
              <p className={`mt-2 text-sm leading-relaxed ${textTheme.muted}`}>
                Date is being planned. We’re measuring demand and building the cleanest reader experience before announcing it.
              </p>
            </GlassInner>

            <GlassInner className="p-4">
              <p className={`text-sm font-semibold ${textTheme.heading}`}>Can I join as both author + reader?</p>
              <p className={`mt-2 text-sm leading-relaxed ${textTheme.muted}`}>
                Yep. If you write and read, you’re exactly the vibe.
              </p>
            </GlassInner>

            <GlassInner className="p-4">
              <p className={`text-sm font-semibold ${textTheme.heading}`}>Will there be content warnings?</p>
              <p className={`mt-2 text-sm leading-relaxed ${textTheme.muted}`}>
                That’s the goal — so readers can browse confidently across darker genres too.
              </p>
            </GlassInner>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className={`text-[0.85rem] ${textTheme.muted}`}>
              Link again (because I know you’ll want it handy):{" "}
              <a className={textTheme.link} href={TALLY_URL} target="_blank" rel="noreferrer">
                {TALLY_URL}
              </a>
            </p>

            <a
              href="#top"
              className={`text-[0.85rem] ${textTheme.link}`}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Back to top
            </a>
          </div>
        </Glass>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:hidden">
        <div className={`rounded-3xl border p-3 backdrop-blur-xl ${textTheme.glass}`}>
          <a
            href={TALLY_URL}
            target="_blank"
            rel="noreferrer"
            className={`flex h-11 items-center justify-center rounded-full px-6 text-[0.95rem] font-semibold transition ${textTheme.btnPrimary}`}
          >
            Join the interest list →
          </a>
        </div>
      </div>
    </div>
  );
}
