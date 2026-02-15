import React, { useMemo, useRef, useState } from "react";

type Author = {
  name: string;
  fairytale?: string;
  role?: string;
  lore?: string;
  socialHandle?: string;
  socialUrl?: string;
  status?: "Drafting" | "Editing" | "Revising" | "Coming Soon";
};

const RELEASE_DATE = "Halloween 2026";

const OCEAN_LINE =
  "Somewhere deep in the ocean, locked in a chest surrounded by gold and jewels, a piece of the diadem disappears with every new princess it marks.";

const authors: Author[] = [
  {
    name: "Amanda Kilkenny",
    role: "Author",
    fairytale: "Rumpelstiltskin",
    status: "Drafting",
    socialHandle: "@the.inkbound.society",
    socialUrl: "https://www.tiktok.com/@the.inkbound.society?lang=en-GB",
  },
  {
    name: "G.M. Parrillo",
    role: "Author",
    fairytale: "Little Red Riding Hood",
    status: "Drafting",
    socialHandle: "@ginaparrillo",
    socialUrl:
      "https://www.tiktok.com/@ginaparrillo?is_from_webapp=1&sender_device=pc",
  },
  {
    name: "Jen Xant",
    role: "Author",
    fairytale: "Cinderella",
    status: "Drafting",
    socialHandle: "@yourgenxaunt2",
    socialUrl: "https://www.tiktok.com/@yourgenxaunt2?lang=en-GB",
  },
  {
    name: "Emily Shilling",
    role: "Author",
    fairytale: "Beauty and the Beast",
    status: "Drafting",
    socialHandle: "@e_shilling_author",
    socialUrl: "https://www.tiktok.com/@e_shilling_author?lang=en-GB",
  },
  {
    name: "Ashe Grayson",
    role: "Author",
    fairytale: "Rapunzel",
    status: "Drafting",
    socialHandle: "@bourbonandbadbooks",
    socialUrl: "https://www.tiktok.com/@bourbonandbadbooks?lang=en-GB",
  },
  {
    name: "Blair Reed",
    role: "Author",
    fairytale: "Alice in Wonderland",
    status: "Drafting",
    socialHandle: "@authorblairreed",
    socialUrl: "https://www.tiktok.com/@authorblairreed?lang=en-GB",
  },
  {
    name: "Terrah Faire",
    role: "Author",
    fairytale: "Hansel and Gretel",
    status: "Drafting",
    socialHandle: "@terrah.faire",
    socialUrl: "https://www.tiktok.com/@terrah.faire?lang=en-GB",
  },
  {
    name: "NJ Colle — Nikki Reads Spice",
    role: "Author",
    fairytale: "Sleeping Beauty",
    status: "Drafting",
    socialHandle: "@njcolle_nikkireadsspice",
    socialUrl: "https://www.tiktok.com/@njcolle_nikkireadsspice?lang=en-GB",
  },
  {
    name: "Ria Kilkenny",
    role: "Author",
    fairytale: "Snow White",
    status: "Drafting",
    socialHandle: "@riak233",
    socialUrl: "https://www.tiktok.com/@riak233?lang=en-GB",
  },
  {
    name: "LeAnne Hart",
    role: "Author",
    fairytale: "The Snow Queen",
    status: "Drafting",
    socialHandle: "@leannehart.author",
    socialUrl: "https://www.tiktok.com/@leannehart.author?lang=en-GB",
  },
  {
    name: "Alyssa Romeo",
    role: "Author",
    fairytale: "The Swan Princess",
    status: "Drafting",
    socialHandle: "@alyssaromeoauthor",
    socialUrl: "https://www.tiktok.com/@alyssaromeoauthor?lang=en-GB",
  },
  {
    name: "Ash B",
    role: "Author",
    fairytale: "The Ugly Duckling",
    status: "Drafting",
    socialHandle: "@reptilesandreads",
    socialUrl: "https://www.tiktok.com/@reptilesandreads?lang=en-GB",
  },
  {
    name: "B. Smith",
    role: "Author",
    fairytale: "The Frog Prince",
    status: "Drafting",
    socialHandle: "@b..smith6",
    socialUrl: "https://www.tiktok.com/@b..smith6?lang=en-GB",
  },
  {
    name: "AcVisk",
    role: "Author",
    fairytale: "The Little Mermaid",
    status: "Drafting",
    socialHandle: "@acvisk",
    socialUrl: "https://www.tiktok.com/@acvisk?lang=en-GB",
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-gray-200 backdrop-blur">
      {children}
    </span>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur-xl",
        "card-glow",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function CrownDivider() {
  return (
    <div className="relative my-10">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/25 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-full border border-amber-400/25 bg-black/30 backdrop-blur px-5 py-3 shadow-[0_0_22px_rgba(239,173,0,0.25)]">
          <svg
            width="44"
            height="22"
            viewBox="0 0 88 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-90"
          >
            <path
              d="M10 34L18 12L32 26L44 8L56 26L70 12L78 34"
              stroke="rgba(239,173,0,0.85)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 34H74"
              stroke="rgba(239,173,0,0.55)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="18" cy="12" r="3" fill="rgba(239,173,0,0.75)" />
            <circle cx="44" cy="8" r="3" fill="rgba(239,173,0,0.75)" />
            <circle cx="70" cy="12" r="3" fill="rgba(239,173,0,0.75)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function statusClass(status?: Author["status"]) {
  switch (status) {
    case "Drafting":
      return "border-amber-400/25 bg-amber-500/10 text-amber-200";
    case "Editing":
      return "border-sky-400/25 bg-sky-500/10 text-sky-200";
    case "Revising":
      return "border-violet-400/25 bg-violet-500/10 text-violet-200";
    case "Coming Soon":
      return "border-emerald-400/25 bg-emerald-500/10 text-emerald-200";
    default:
      return "border-white/10 bg-white/10 text-gray-200";
  }
}

export default function BlackDiademSeries() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Author["status"] | "All">(
    "All"
  );
  const [sortBy, setSortBy] = useState<"name" | "fairytale" | "status">("name");
  const [showRitual, setShowRitual] = useState(false);
  const [copied, setCopied] = useState(false);

  const courtRef = useRef<HTMLElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [summonedTick, setSummonedTick] = useState(0);

  const totalSeats = 14;
  const filledSeats = authors.length;

  const summonCourt = () => {
    setShowRitual(true);
    setSummonedTick((n) => n + 1);

    window.setTimeout(() => {
      courtRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);

    window.setTimeout(() => {
      searchRef.current?.focus();
    }, 280);

    window.setTimeout(() => {
      const el = courtRef.current;
      if (!el) return;

      el.classList.remove("diadem-summoned");
      void el.offsetWidth;
      el.classList.add("diadem-summoned");

      window.setTimeout(() => el.classList.remove("diadem-summoned"), 950);
    }, 140);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = authors.filter((a) => {
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        (a.fairytale || "").toLowerCase().includes(q) ||
        (a.socialHandle || "").toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "All" ? true : a.status === statusFilter;

      return matchesQuery && matchesStatus;
    });

    list = list.sort((a, b) => {
      const av = (a[sortBy] || "").toString().toLowerCase();
      const bv = (b[sortBy] || "").toString().toLowerCase();
      return av.localeCompare(bv);
    });

    return list;
  }, [query, statusFilter, sortBy]);

  const shardDots = useMemo(() => {
    return Array.from({ length: totalSeats }, (_, i) => i < filledSeats);
  }, [filledSeats]);

  const copyLine = async () => {
    try {
      await navigator.clipboard.writeText(OCEAN_LINE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // clipboard may fail in some contexts (http / iframe). Ignore quietly.
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute left-1/4 top-1/3 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-[520px] w-[520px] translate-x-1/3 -translate-y-1/3 rounded-full bg-violet-400/10 blur-3xl" />
          <div className="syke-sparkles" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/20" />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-18 md:py-24 relative">
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap gap-2">
              <Pill>Connected Novella Series</Pill>
              <Pill>Standalone Retellings</Pill>
              <Pill>Release: {RELEASE_DATE}</Pill>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl leading-tight text-glow">
              The Black Diadem Series
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed">
              Standalone retellings. One shared curse.
              <br />
              Each novella begins with the same prologue and ends with the
              diadem missing another piece.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#court"
                className="rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium hover:bg-white/15 transition"
              >
                Meet the Court
              </a>

              <a
                href="#myth"
                className="rounded-xl border border-white/15 bg-transparent px-5 py-3 text-sm font-medium hover:bg-white/5 transition"
              >
                Read the Myth
              </a>

              <button
                type="button"
                onClick={() => {
                  if (showRitual) {
                    setShowRitual(false);
                    return;
                  }
                  summonCourt();
                }}
                className="rounded-xl border border-amber-400/25 bg-amber-500/10 px-5 py-3 text-sm font-medium text-amber-100 hover:bg-amber-500/15 transition"
              >
                {showRitual ? "Close the Ritual" : "Summon the Court"}
              </button>
            </div>

            <CrownDivider />

            {/* Shard Meter */}
            <div className="border-animated rounded-2xl bg-white/5 backdrop-blur-xl p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-amber-200/80">
                Diadem Fragments
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {shardDots.map((filled, i) => (
                  <span
                    key={i}
                    className={[
                      "h-3 w-3 rounded-full border",
                      filled
                        ? "border-amber-300/50 bg-amber-300/40 shadow-[0_0_14px_rgba(239,173,0,0.25)]"
                        : "border-white/10 bg-white/5",
                    ].join(" ")}
                    title={filled ? "Marked" : "Unmarked"}
                  />
                ))}
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-sm text-gray-300">
                  Court seats filled:{" "}
                  <span className="text-amber-200">{filledSeats}</span> /{" "}
                  {totalSeats}
                </p>
                <p className="text-sm text-gray-400">
                  Missing fragments:{" "}
                  <span className="text-gray-200">
                    {Math.max(0, totalSeats - filledSeats)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MYTH / EXPLAINER */}
      <section id="myth" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="border-animated">
              <h2 className="font-serif text-2xl md:text-3xl">
                What is The Black Diadem?
              </h2>

              <p className="mt-4 text-gray-300 leading-relaxed">
                The Black Diadem Series is a connected set of dark retelling
                novellas. Every story stands on its own, but together they form
                a single, threaded mythology, the mark, the missing fragments,
                and the crown that keeps choosing new princesses.
              </p>

              <div className="mt-6 relative rounded-2xl border border-amber-400/20 bg-gradient-to-b from-white/8 to-white/0 p-6 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 syke-sparkles opacity-40" />

                <p className="text-xs uppercase tracking-[0.22em] text-amber-200/80 relative">
                  The Line (used at the end of each novella)
                </p>

                <p className="mt-4 text-lg italic text-gray-100 leading-relaxed relative">
                  “{OCEAN_LINE}”
                </p>

                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-amber-400/20 to-transparent relative" />

                <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 relative">
                  <p className="text-sm text-gray-300">
                    Every ending confirms it. The diadem does not forgive.
                  </p>

                  <button
                    type="button"
                    onClick={copyLine}
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 hover:bg-white/10 transition"
                  >
                    {copied ? "Copied ✨" : "Copy the line"}
                  </button>
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="font-serif text-xl">How to read</h3>
            <ul className="mt-4 space-y-3 text-gray-300">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber-300/60" />
                <span>Read any novella as a standalone retelling.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber-300/60" />
                <span>Read them all to uncover the full diadem mythology.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber-300/60" />
                <span>
                  Same prologue across all books. Same curse, different princess.
                </span>
              </li>
            </ul>

            <div className="mt-6 border-t border-white/10 pt-5 text-sm text-gray-400">
              Release target:{" "}
              <span className="text-gray-200">{RELEASE_DATE}</span>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-gray-400">
                Series promise
              </p>
              <p className="mt-2 text-sm text-gray-200 leading-relaxed">
                Grimm bones. Velvet violence. Crowned curses. Each princess is a
                blade.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* COURT / AUTHORS */}
      <section
        id="court"
        ref={(el) => {
          courtRef.current = el;
        }}
        className="border-t border-white/10 relative overflow-hidden scroll-mt-28"
      >
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/8 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-glow">
                Meet the Court
              </h2>
              <p className="mt-3 text-gray-300 max-w-2xl leading-relaxed">
                A collection of authors crafting standalone retellings that
                interlock into one curse-bound series.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Pill>{totalSeats} Seats</Pill>
              <Pill>Retellings</Pill>
              <Pill>One Myth</Pill>
            </div>
          </div>

          {showRitual && (
            <div className="mt-8 border-animated rounded-2xl bg-white/5 backdrop-blur-xl p-5 diadem-panel-breath">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:justify-between">
                <p className="text-xs uppercase tracking-[0.22em] text-amber-200/80">
                  ✦ Summoning Ritual ✦
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <div className="relative">
                    <input
                      ref={searchRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search author or fairytale…"
                      className="w-full sm:w-[260px] rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 placeholder:text-gray-400 outline-none focus:border-amber-400/40 focus:ring-2 focus:ring-amber-400/10"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                      ⌕
                    </div>
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200 outline-none focus:border-amber-400/40"
                  >
                    <option value="All">All statuses</option>
                    <option value="Drafting">Drafting</option>
                    <option value="Editing">Editing</option>
                    <option value="Revising">Revising</option>
                    <option value="Coming Soon">Coming Soon</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200 outline-none focus:border-amber-400/40"
                  >
                    <option value="name">Sort: Name</option>
                    <option value="fairytale">Sort: Fairytale</option>
                    <option value="status">Sort: Status</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setStatusFilter("All");
                      setSortBy("name");
                    }}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 hover:bg-white/10 transition"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-gray-300">
              No matches. Try a different search or clear filters.
            </div>
          ) : (
            <div
              key={summonedTick}
              className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 diadem-rise"
            >
              {filtered.map((a) => (
                <div key={a.name} className="card-glow rounded-2xl">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{a.name}</h3>
                        {a.fairytale && (
                          <p className="mt-1 text-sm text-gray-400">
                            {a.fairytale}
                          </p>
                        )}
                        {a.role && (
                          <p className="mt-1 text-xs text-gray-500">{a.role}</p>
                        )}
                      </div>

                      {a.status && (
                        <span
                          className={[
                            "rounded-full border px-3 py-1 text-xs",
                            statusClass(a.status),
                          ].join(" ")}
                        >
                          {a.status}
                        </span>
                      )}
                    </div>

                    {a.lore && (
                      <p className="mt-4 text-gray-300 leading-relaxed">
                        {a.lore}
                      </p>
                    )}

                    {(a.socialHandle || a.socialUrl) && (
                      <div className="mt-5 border-t border-white/10 pt-4 text-sm flex items-center justify-between">
                        <span className="text-gray-400">Summon:</span>
                        {a.socialUrl ? (
                          <a
                            href={a.socialUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-amber-200 hover:text-amber-100 underline underline-offset-4"
                          >
                            {a.socialHandle || "TikTok"} →
                          </a>
                        ) : (
                          <span className="text-gray-200">{a.socialHandle}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <CrownDivider />

          <div className="border-animated rounded-2xl bg-white/5 backdrop-blur-xl p-7">
            <p className="text-xs uppercase tracking-[0.22em] text-amber-200/80">
              ✦ Court Oath ✦
            </p>
            <p className="mt-3 text-gray-200 leading-relaxed">
              This is not an open door. The Court is chosen. The diadem marks
              who it wants. When the last shard disappears, the crown returns
              and every princess learns what she was made for.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} The Tiara Court - The Black Diadem Series
      </footer>
    </div>
  );
}
