// src/pages/StuffYourKindle.tsx
import { useEffect, useMemo, useState } from "react";

// ✅ Interest form (public page)
const TALLY_PUBLIC_URL = "https://tally.so/forms/aQ9XY9";
// ✅ Embed/submit URL (Tally usually uses /r/ for the live form)
const TALLY_EMBED_URL = "https://tally.so/r/aQ9XY9";

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
  // Tick "now" for ambient theme + tiny clock
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 10_000);
    return () => window.clearInterval(t);
  }, []);

  const dublin = useMemo(() => getDublinParts(now), [now]);

  // Gentle day/night vibe (Dublin) — keeps the page feeling “alive”
  const isDaytime = dublin.hour >= 7 && dublin.hour < 18;

  const textTheme = isDaytime
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
        btnPrimary: "bg-slate-900 text-white hover:bg-slate-800",
        btnGhost: "bg-white/70 border-white/60 text-slate-900 hover:bg-white/90",
      }
    : {
        pageText: "text-white",
        muted: "text-slate-200/90",
        soft: "text-slate-100/90",
        pill: "bg-black/40 border-white/15 text-white/90",
        panel: "bg-black/40 border-white/15",
        panelInner: "bg-black/25 border-white/15",
        link: "text-cyan-200 underline",
        heading: "text-white",
        accent: "text-cyan-200",
        divider: "bg-white/30",
        btnPrimary: "bg-white/10 text-white border border-white/15 hover:bg-white/15",
        btnGhost: "bg-white/10 border-white/15 text-white hover:bg-white/15",
      };

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

        {/* Sparkles overlay (keep your existing CSS classes if you already had them) */}
        <div className="syke-sparkles syke-sparkles--back" />
        <div className="syke-sparkles syke-sparkles--mid" />
        <div className="syke-sparkles syke-sparkles--front" />

        {/* Soft ambient glow (no countdown now) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[20%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-500/15 blur-[120px]" />
          <div className="absolute left-1/2 top-[45%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[140px]" />
        </div>
      </div>

      {/* ===== Content ===== */}
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-24 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        {/* Breadcrumb + tiny clock */}
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

        {/* Hero */}
        <section className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center gap-4">
            {/* Optional: keep your logos if you want */}
            <img
              src="/images/inkxiaac.png"
              alt="Inkbound x Indie Author Advocate Community"
              className="w-full max-w-3xl h-auto drop-shadow-[0_20px_70px_rgba(0,0,0,0.25)]"
            />
          </div>

          <div className="mt-6 space-y-5">
            <p
              className={`mx-auto inline-flex items-center gap-2 rounded-full border px-4 py-1 text-[0.72rem] font-semibold tracking-[0.18em] ${
                isDaytime ? "bg-white/70 border-white/60 text-slate-800" : "bg-black/40 border-white/15 text-white/90"
              }`}
            >
              ✦ NEXT EVENT • INTEREST LIST OPEN
            </p>

            <h1 className={`text-3xl font-semibold sm:text-4xl lg:text-5xl ${textTheme.heading}`}>
              Want in on the next Stuff Your Kindle?
            </h1>

            <p className={`mx-auto max-w-3xl text-sm sm:text-base leading-relaxed ${textTheme.muted}`}>
              The last one was chaos in the best way — and now we’re building the next drop.
              If you’re an <span className="font-semibold">author</span> who wants to participate, or a{" "}
              <span className="font-semibold">reader</span> who wants first access to the list, add your name to the interest form.
            </p>

            <div className="mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={TALLY_PUBLIC_URL}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex h-11 items-center justify-center rounded-full px-6 text-[0.95rem] font-semibold transition ${textTheme.btnPrimary}`}
              >
                Join the interest list →
              </a>

              <a
                href="#form"
                className={`inline-flex h-11 items-center justify-center rounded-full border px-6 text-[0.95rem] font-semibold transition ${textTheme.btnGhost}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("form")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Fill it in here ↓
              </a>
            </div>

            <div className={`mx-auto grid max-w-3xl gap-2 text-[0.95rem] ${textTheme.soft}`}>
              <p>• Date will be announced once the lineup + promo plan is locked.</p>
              <p>• We’ll email the people on this list first — before it goes public.</p>
              <p>• Quick form. No spam. Just the good stuff.</p>
            </div>
          </div>
        </section>

        {/* Info panels */}
        <section className="grid gap-8 lg:grid-cols-2">
          <div className={`rounded-3xl border p-6 backdrop-blur ${textTheme.panel}`}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">For Authors</h2>
            <p className={`mt-3 text-sm leading-relaxed ${textTheme.muted}`}>
              If you want to be considered for the next event, this is where you raise your hand.
              We’ll use the interest list to estimate genre spread, regions, and promo needs — and to contact you when submissions open.
            </p>

            <ul className={`mt-4 space-y-2 text-[0.92rem] ${textTheme.muted}`}>
              <li>• Indie / self-published focus</li>
              <li>• Genre-based browsing for readers</li>
              <li>• Clear expectations + promo assets when it’s go-time</li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className={`rounded-full border px-3 py-1 text-[0.75rem] ${textTheme.pill}`}>📚 Indies first</span>
              <span className={`rounded-full border px-3 py-1 text-[0.75rem] ${textTheme.pill}`}>🖤 Warnings-friendly</span>
              <span className={`rounded-full border px-3 py-1 text-[0.75rem] ${textTheme.pill}`}>🌍 Global readers</span>
            </div>
          </div>

          <div className={`rounded-3xl border p-6 backdrop-blur ${textTheme.panel}`}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">For Readers</h2>
            <p className={`mt-3 text-sm leading-relaxed ${textTheme.muted}`}>
              Want the list the second it drops? Add your email.
              When the event goes live, you’ll get the link, the “how it works,” and the best way to grab books fast.
            </p>

            <div className={`mt-5 text-[0.95rem] leading-relaxed ${textTheme.muted}`}>
              <p className="font-semibold">You’ll get:</p>
              <ul className="mt-2 space-y-1">
                <li>• First announcement of the date</li>
                <li>• Early access link to the live book list</li>
                <li>• Genre highlights + featured recs</li>
              </ul>
            </div>

            <p className={`mt-5 text-[0.8rem] ${textTheme.muted}`}>
              No nonsense emails. If it’s not useful, it doesn’t get sent.
            </p>
          </div>
        </section>

        {/* FAQ / expectations */}
        <section className={`rounded-3xl border p-6 backdrop-blur ${textTheme.panelInner}`}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em]">Quick FAQ</h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <details className={`rounded-2xl border p-4 ${isDaytime ? "bg-white/70 border-white/60" : "bg-black/25 border-white/15"}`}>
              <summary className={`cursor-pointer text-sm font-semibold ${textTheme.heading}`}>Is this the submission form?</summary>
              <p className={`mt-2 text-sm leading-relaxed ${textTheme.muted}`}>
                Not yet — this is the interest list. When submissions open, we’ll contact the interest list first with the official submission link.
              </p>
            </details>

            <details className={`rounded-2xl border p-4 ${isDaytime ? "bg-white/70 border-white/60" : "bg-black/25 border-white/15"}`}>
              <summary className={`cursor-pointer text-sm font-semibold ${textTheme.heading}`}>When is the next event?</summary>
              <p className={`mt-2 text-sm leading-relaxed ${textTheme.muted}`}>
                Date is being planned. The point of this list is to measure demand and build the cleanest possible reader experience before we announce it.
              </p>
            </details>

            <details className={`rounded-2xl border p-4 ${isDaytime ? "bg-white/70 border-white/60" : "bg-black/25 border-white/15"}`}>
              <summary className={`cursor-pointer text-sm font-semibold ${textTheme.heading}`}>Can I join as both author + reader?</summary>
              <p className={`mt-2 text-sm leading-relaxed ${textTheme.muted}`}>
                Yep. If you’re an author who also reads, you’re exactly the energy we want in here.
              </p>
            </details>

            <details className={`rounded-2xl border p-4 ${isDaytime ? "bg-white/70 border-white/60" : "bg-black/25 border-white/15"}`}>
              <summary className={`cursor-pointer text-sm font-semibold ${textTheme.heading}`}>Will there be content warnings?</summary>
              <p className={`mt-2 text-sm leading-relaxed ${textTheme.muted}`}>
                That’s the plan. We’re building it so readers can browse confidently — especially across darker genres.
              </p>
            </details>
          </div>
        </section>

        {/* Embedded Form */}
        <section id="form" className={`rounded-3xl border p-6 backdrop-blur ${textTheme.panel}`}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Interest Form</h2>
              <p className={`mt-2 text-sm ${textTheme.muted}`}>
                Prefer a new tab? Use this link:{" "}
                <a className={`${textTheme.link}`} href={TALLY_PUBLIC_URL} target="_blank" rel="noreferrer">
                  {TALLY_PUBLIC_URL}
                </a>
              </p>
            </div>

            <a
              href={TALLY_PUBLIC_URL}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex h-10 items-center justify-center rounded-full px-5 text-[0.9rem] font-semibold transition ${textTheme.btnPrimary}`}
            >
              Open form →
            </a>
          </div>

          <div className={`mt-5 overflow-hidden rounded-2xl border ${isDaytime ? "border-white/60" : "border-white/15"}`}>
            <iframe
              title="Inkbound - Next Stuff Your Kindle Interest Form"
              src={TALLY_EMBED_URL}
              loading="lazy"
              className="h-[980px] w-full"
              style={{ border: 0 }}
            />
          </div>

          <p className={`mt-3 text-[0.8rem] ${textTheme.muted}`}>
            If the embed ever acts up, the “Open form” button above will always work.
          </p>
        </section>

        {/* Footer */}
        <div className="flex items-center justify-center pt-2">
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
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:hidden">
        <div
          className={`rounded-3xl border p-3 backdrop-blur ${
            isDaytime ? "bg-white/70 border-white/60" : "bg-black/40 border-white/15"
          }`}
        >
          <a
            href={TALLY_PUBLIC_URL}
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

  
