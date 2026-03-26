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
  releaseDate: string | Timestamp;
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
  const js = d.getDay();
  return (js + 6) % 7;
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

  useEffect(() => {
    animate(".nr-enter", {
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 650,
      easing: "easeOutQuad",
      delay: (_el, i) => i * 90,
    });

    animate(".nr-scrollFloat", {
      translateY: [0, -10],
      duration: 1,
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
      className="relative min-h-screen overflow-hidden bg-[#050506] font-marcellus text-[#f5efe3]"
    >
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(82,58,133,0.08),transparent_20%),radial-gradient(circle_at_20%_80%,rgba(13,30,66,0.10),transparent_24%)]" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#c8a04e]/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-16">
        {/* Hero */}
        <section className="nr-enter overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/25 px-6 py-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl md:px-10 md:py-14">
          <div className="mx-auto max-w-4xl">
            <div className="text-xs uppercase tracking-[0.34em] text-[#c8a04e]">
              Inkbound Shelf Watch
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-tight text-white md:text-6xl">
              New Releases
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
              Track new drops, preorder dates, and fresh releases across the
              Inkbound world. Tap a date to reveal what’s landing.
            </p>

            <div className="mt-5">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-[#f6dca0] underline decoration-[#c8a04e]/40 underline-offset-4 transition hover:text-white"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </section>

        {/* Calendar */}
        <section className="nr-enter nr-scrollFloat mt-8 rounded-[1.8rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:p-6">
          <div className="mb-5 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-[#c8a04e]">
                Calendar view
              </div>
              <h2 className="mt-2 text-2xl text-white md:text-3xl">
                {monthLabel(viewYear, viewMonth0)}
              </h2>
              <p className="mt-2 text-sm text-white/50">
                Dots mark release days. Select a date to reveal the details.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMonthOffset((v) => v - 1)}
                className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/75 transition hover:bg-black/45 hover:text-white"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => setMonthOffset(0)}
                className="rounded-full border border-[#c8a04e]/30 bg-[#c8a04e]/10 px-4 py-2 text-sm text-[#f6dca0] transition hover:border-[#c8a04e]/50 hover:bg-[#c8a04e]/15 hover:text-white"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setMonthOffset((v) => v + 1)}
                className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/75 transition hover:bg-black/45 hover:text-white"
              >
                Next →
              </button>
            </div>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-2 text-xs text-white/40">
            {weekdays.map((w) => (
              <div key={w} className="text-center">
                {w}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((cell, idx) => {
              if (!cell.date || !cell.key) {
                return <div key={idx} className="h-14 rounded-xl" />;
              }

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
                    "relative h-14 rounded-xl border text-sm transition",
                    "bg-black/25 hover:bg-black/40",
                    isSelected
                      ? "border-[#c8a04e]/70 ring-2 ring-[#c8a04e]/15"
                      : "border-white/10",
                    isToday && !isSelected ? "border-emerald-400/40" : "",
                  ].join(" ")}
                >
                  <span className="absolute left-2.5 top-2 text-white/85">
                    {dayNumber}
                  </span>

                  {hasRelease && (
                    <span className="absolute bottom-2.5 right-2.5 h-2.5 w-2.5 rounded-full bg-[#f6dca0] shadow-[0_0_12px_rgba(200,160,78,0.75)]" />
                  )}

                  {isToday && (
                    <span className="absolute bottom-2 left-2.5 text-[10px] text-emerald-200/80">
                      today
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 text-xs text-white/40">
            {loading ? (
              <span>Loading releases…</span>
            ) : (
              <span>
                Loaded <span className="text-[#f6dca0]">{releases.length}</span> release(s).
              </span>
            )}
          </div>
        </section>

        {/* Details */}
        <section ref={detailsRef} className="nr-enter mt-8">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:p-6">
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.28em] text-[#c8a04e]">
                  Selected date
                </div>
                <h3 className="mt-2 text-2xl text-white md:text-3xl">
                  Releases on <span className="text-[#f6dca0]">{selectedKey}</span>
                </h3>
                <p className="mt-2 text-sm text-white/50">
                  {selectedReleases.length
                    ? "Use the link on a card to preorder or buy."
                    : "No releases found for this date."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedKey(dublinTodayKey)}
                className="shrink-0 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/75 transition hover:bg-black/45 hover:text-white"
              >
                Jump to today
              </button>
            </div>

            {selectedReleases.length === 0 ? (
              <div className="rounded-[1.4rem] border border-white/10 bg-black/25 p-5 text-white/55">
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
                      className="rounded-[1.6rem] border border-white/10 bg-black/25 p-4 transition duration-300 hover:border-[#c8a04e]/20 hover:bg-black/35 md:p-5"
                    >
                      <div className="flex gap-4">
                        {r.cover ? (
                          <img
                            src={r.cover}
                            alt={`${r.title} cover`}
                            className="h-40 w-28 rounded-[1rem] border border-white/10 object-cover"
                          />
                        ) : (
                          <div className="flex h-40 w-28 items-center justify-center rounded-[1rem] border border-white/10 bg-black/40 text-center text-xs text-white/35">
                            No cover
                          </div>
                        )}

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="text-xl leading-tight text-white">
                                {r.title}
                              </div>
                              <div className="mt-1 text-sm text-white/65">
                                {r.author}
                              </div>
                              {r.series && (
                                <div className="mt-1 text-xs text-white/40">
                                  Series: <span className="text-white/60">{r.series}</span>
                                </div>
                              )}
                            </div>

                            {r.preorder && (
                              <span className="shrink-0 rounded-full border border-[#c8a04e]/30 bg-[#c8a04e]/10 px-2.5 py-1 text-xs text-[#f6dca0]">
                                Preorder
                              </span>
                            )}
                          </div>

                          {(formats.length || genres.length) && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {formats.slice(0, 4).map((f) => (
                                <span
                                  key={`f-${f}`}
                                  className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/65"
                                >
                                  {f}
                                </span>
                              ))}
                              {genres.slice(0, 4).map((g) => (
                                <span
                                  key={`g-${g}`}
                                  className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/65"
                                >
                                  {g}
                                </span>
                              ))}
                            </div>
                          )}

                          {r.blurb && (
                            <p className="mt-3 text-sm leading-relaxed text-white/70">
                              {r.blurb}
                            </p>
                          )}

                          <div className="mt-4">
                            {r.link ? (
                              <a
                                href={r.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-[#c8a04e]/30 bg-[#c8a04e]/10 px-4 py-2 text-sm text-[#f6dca0] transition hover:border-[#c8a04e]/50 hover:bg-[#c8a04e]/15 hover:text-white"
                              >
                                View link →
                              </a>
                            ) : (
                              <span className="text-xs text-white/35">No link added.</span>
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
        </section>

        <div className="nr-enter mt-10 text-center text-xs text-white/40">
          Want your release added? Send it through your usual Inkbound channels and it’ll land here.
        </div>
      </div>
    </div>
  );
}