// src/pages/NewReleasesPage.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import VantaBackground from "../components/VantaBackground";

import { collection, getDocs, orderBy, query, where, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

// Anime.js v4
import { animate, onScroll } from "animejs";

type Release = {
  id: string;
  title: string;
  author: string;
  releaseDate: string | Timestamp; // allow either
  link?: string;
  cover?: string;
  preorder?: boolean;
  genres?: string[] | string;
  formats?: string[] | string;
  blurb?: string;
  series?: string;
  published?: boolean;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * ✅ Always returns YYYY-MM-DD for Europe/Dublin (avoids timezone drift).
 */
function toDublinKey(d: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Dublin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);

  const get = (t: string) => parts.find((p) => p.type === t)?.value || "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/**
 * ✅ Convert Firestore stored releaseDate into the same YYYY-MM-DD key.
 */
function releaseToKey(v: any) {
  if (!v) return "";

  if (typeof v === "string") {
    const s = v.trim();
    const [y, m, d] = s.split("-");
    if (!y || !m || !d) return s;
    return `${y}-${pad2(Number(m))}-${pad2(Number(d))}`;
  }

  if (v instanceof Timestamp) return toDublinKey(v.toDate());
  if (v instanceof Date) return toDublinKey(v);

  return "";
}

function monthLabel(year: number, monthIndex0: number) {
  const d = new Date(year, monthIndex0, 1);
  return d.toLocaleString("en-GB", { month: "long", year: "numeric" });
}

function startOfMonth(year: number, monthIndex0: number) {
  return new Date(year, monthIndex0, 1);
}

function daysInMonth(year: number, monthIndex0: number) {
  return new Date(year, monthIndex0 + 1, 0).getDate();
}

function weekdayIndexMondayFirst(d: Date) {
  const js = d.getDay(); // Sun=0..Sat=6
  return (js + 6) % 7; // Mon=0..Sun=6
}

function asArray(v: any): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.filter(Boolean).map(String);
  return String(v)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function NewReleasesPage() {
  const now = new Date();
  const dublinTodayKey = toDublinKey(now);

  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string>(dublinTodayKey);

  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);

  const pageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const viewDate = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + monthOffset);
    return d;
  }, [monthOffset]);

  const viewYear = viewDate.getFullYear();
  const viewMonth0 = viewDate.getMonth();

  const calendarDays = useMemo(() => {
    const first = startOfMonth(viewYear, viewMonth0);
    const leadingBlanks = weekdayIndexMondayFirst(first);
    const total = daysInMonth(viewYear, viewMonth0);

    const cells: Array<{ date: Date | null; key: string | null }> = [];

    for (let i = 0; i < leadingBlanks; i++) cells.push({ date: null, key: null });

    for (let day = 1; day <= total; day++) {
      const d = new Date(viewYear, viewMonth0, day);
      cells.push({ date: d, key: toDublinKey(d) });
    }

    while (cells.length % 7 !== 0) cells.push({ date: null, key: null });

    return cells;
  }, [viewYear, viewMonth0]);

  // Fetch releases
  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "new_releases"),
          where("published", "==", true),
          orderBy("releaseDate", "asc")
        );

        const snap = await getDocs(q);
        const rows = snap.docs.map((d) => {
          const data = d.data() as any;
          return {
            id: d.id,
            title: data.title || "",
            author: data.author || "",
            releaseDate: data.releaseDate,
            link: data.link || "",
            cover: data.cover || data.image || "",
            preorder: !!data.preorder,
            genres: data.genres ?? data.genre ?? [],
            formats: data.formats ?? data.format ?? [],
            blurb: data.blurb || "",
            series: data.series || "",
            published: !!data.published,
          } as Release;
        });

        if (alive) setReleases(rows);
      } catch (err: any) {
        console.error("New releases query failed, using fallback:", err);

        const q2 = query(collection(db, "new_releases"), orderBy("releaseDate", "asc"));
        const snap2 = await getDocs(q2);
        const all = snap2.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as any[];

        const rows = all
          .filter((r) => r.published === true)
          .map((r) => ({
            id: r.id,
            title: r.title || "",
            author: r.author || "",
            releaseDate: r.releaseDate,
            link: r.link || "",
            cover: r.cover || r.image || "",
            preorder: !!r.preorder,
            genres: r.genres ?? r.genre ?? [],
            formats: r.formats ?? r.format ?? [],
            blurb: r.blurb || "",
            series: r.series || "",
            published: !!r.published,
          })) as Release[];

        if (alive) setReleases(rows);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  // ✅ Map releases by canonical YYYY-MM-DD key
  const releasesByDate = useMemo(() => {
    const map = new Map<string, Release[]>();
    for (const r of releases) {
      const key = releaseToKey(r.releaseDate);
      if (!key) continue;
      const arr = map.get(key) || [];
      arr.push(r);
      map.set(key, arr);
    }
    return map;
  }, [releases]);

  const selectedReleases = useMemo(() => {
    return releasesByDate.get(selectedKey) || [];
  }, [selectedKey, releasesByDate]);

  const handlePickDate = (key: string) => {
    setSelectedKey(key);
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  // ✅ SAFE animations:
  // - normal fade-in on mount (never hides everything behind scroll)
  // - onScroll used only for subtle motion
  useEffect(() => {
    // 1) Immediate fade-in for core sections
    animate(".nr-enter", {
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 650,
      easing: "easeOutQuad",
      delay: (_el, i) => i * 90,
    });

    // 2) onScroll: gentle float / parallax (doesn't set opacity to 0)
    animate(".nr-scrollFloat", {
      translateY: [0, -10],
      duration: 1, // scroll-synced
      easing: "linear",
      autoplay: onScroll({
        target: pageRef.current || undefined,
      }),
    });
  }, []);

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen font-marcellus text-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <div className="nr-enter text-center mb-10">
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300/90 mb-2">
            ✦ Inkbound Shelf Watch
          </p>
          <h1 className="text-4xl md:text-5xl text-amber-400 mb-3">
            New Releases
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto opacity-90">
            Tap a date to reveal what’s dropping. Preorders, launch days, and fresh
            ink — all in one place.
          </p>

          <div className="mt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-amber-300/90 hover:text-amber-200 underline"
            >
              ← Back to home
            </Link>
          </div>
        </div>

        {/* Calendar */}
        <div className="nr-enter nr-scrollFloat glass-panel border border-amber-700 rounded-xl p-5 md:p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-2xl text-amber-300">
                {monthLabel(viewYear, viewMonth0)}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Dots mark release days. Click a date to reveal details.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMonthOffset((v) => v - 1)}
                className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm hover:bg-black/55"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => setMonthOffset(0)}
                className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-200 hover:bg-amber-500/15"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setMonthOffset((v) => v + 1)}
                className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm hover:bg-black/55"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-2 text-xs text-gray-400 mb-2">
            {weekdays.map((w) => (
              <div key={w} className="text-center">
                {w}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((cell, idx) => {
              if (!cell.date || !cell.key) return <div key={idx} className="h-12 rounded-lg" />;

              const key = cell.key;
              const dayNumber = cell.date.getDate();

              const hasRelease = releasesByDate.has(key);
              const isSelected = selectedKey === key;
              const isToday = key === dublinTodayKey;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handlePickDate(key)}
                  className={[
                    "relative h-12 rounded-lg border text-sm transition",
                    "bg-black/30 hover:bg-black/45",
                    isSelected
                      ? "border-amber-400/80 ring-2 ring-amber-400/20"
                      : "border-white/10",
                    isToday && !isSelected ? "border-emerald-400/50" : "",
                  ].join(" ")}
                >
                  <span className="absolute left-2 top-2 text-white/85">
                    {dayNumber}
                  </span>

                  {hasRelease && (
                    <span className="absolute right-2 bottom-2 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(225,167,48,0.75)]" />
                  )}

                  {isToday && (
                    <span className="absolute left-2 bottom-2 text-[10px] text-emerald-200/80">
                      today
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 text-xs text-gray-400">
            {loading ? (
              <span>Loading releases…</span>
            ) : (
              <span>
                Loaded <span className="text-amber-200">{releases.length}</span>{" "}
                release(s).
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div ref={detailsRef} className="nr-enter mt-8">
          <div className="glass-panel border border-amber-700 rounded-xl p-5 md:p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="text-2xl text-amber-300">
                  Releases on{" "}
                  <span className="text-amber-200">{selectedKey}</span>
                </h3>
                <p className="text-sm text-gray-300/90 mt-1">
                  {selectedReleases.length
                    ? "Click a link to preorder / buy."
                    : "No releases found for this date."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedKey(dublinTodayKey)}
                className="shrink-0 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm hover:bg-black/55"
              >
                Jump to today
              </button>
            </div>

            {selectedReleases.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-gray-300">
                Nothing scheduled here. Try a date with a dot.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {selectedReleases.map((r) => {
                  const formats = asArray(r.formats);
                  const genres = asArray(r.genres);

                  return (
                    <div
                      key={r.id}
                      className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-5"
                    >
                      <div className="flex gap-4">
                        {r.cover ? (
                          <img
                            src={r.cover}
                            alt={`${r.title} cover`}
                            className="w-24 h-36 object-cover rounded-xl border border-white/10"
                          />
                        ) : (
                          <div className="w-24 h-36 rounded-xl border border-white/10 bg-black/40 flex items-center justify-center text-xs text-gray-400">
                            No cover
                          </div>
                        )}

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="text-amber-200 font-semibold text-lg leading-tight">
                                {r.title}
                              </div>
                              <div className="text-white/70 text-sm">
                                {r.author}
                              </div>
                              {r.series && (
                                <div className="text-xs text-gray-400 mt-1">
                                  Series:{" "}
                                  <span className="text-gray-300">
                                    {r.series}
                                  </span>
                                </div>
                              )}
                            </div>

                            {r.preorder && (
                              <span className="shrink-0 text-xs px-2 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-200">
                                Preorder
                              </span>
                            )}
                          </div>

                          {(formats.length || genres.length) && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {formats.slice(0, 4).map((f) => (
                                <span
                                  key={`f-${f}`}
                                  className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/70"
                                >
                                  {f}
                                </span>
                              ))}
                              {genres.slice(0, 4).map((g) => (
                                <span
                                  key={`g-${g}`}
                                  className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/70"
                                >
                                  {g}
                                </span>
                              ))}
                            </div>
                          )}

                          {r.blurb && (
                            <p className="mt-3 text-sm text-gray-300/90 leading-relaxed">
                              {r.blurb}
                            </p>
                          )}

                          <div className="mt-4 flex items-center gap-3">
                            {r.link ? (
                              <a
                                href={r.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-amber-700 hover:bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition border border-amber-400/60 shadow-[0_0_18px_rgba(225,167,48,0.35)]"
                              >
                                View link →
                              </a>
                            ) : (
                              <span className="text-xs text-gray-400">
                                No link added.
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="nr-enter mt-10 text-center text-xs text-gray-400">
          Want your release added? Send it through your usual Inkbound channels
          and it’ll land here.
        </div>
      </div>
    </div>
  );
}
