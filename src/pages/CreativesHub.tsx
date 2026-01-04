// src/pages/CreativesHub.tsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import VantaBackground from "../components/VantaBackground";

import { collection, getDocs, orderBy, query, where, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

type Creative = {
  id: string;
  name: string;
  businessName?: string;
  creativeType: string;
  shortDescription: string;
  offers: string;
  website?: string;
  socials?: string; // single text field
  exampleImageUrl: string;
  creditTag?: string;
  openToCollabs: boolean;
  featuredWhere: "website" | "discord" | "both";
  published: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

const CREATIVE_TYPES = [
  "Cover Artist",
  "Character Artist",
  "Illustrator",
  "Bookish Business",
  "Designer",
  "Other",
];

function normalizeUrl(v?: string) {
  if (!v) return "";
  const s = String(v).trim();
  if (!s) return "";
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
}

export default function CreativesPage() {
  const [loading, setLoading] = useState(true);
  const [creatives, setCreatives] = useState<Creative[]>([]);

  // filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [collabOnly, setCollabOnly] = useState(false);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      try {
        // Keep this query simple to avoid index pain:
        // - only filter published
        // - order by updatedAt if present (may require index if combined; fallback below)
        const q1 = query(
          collection(db, "creatives"),
          where("published", "==", true),
          orderBy("updatedAt", "desc")
        );

        const snap = await getDocs(q1);
        const rows = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as any[];

        const cleaned = rows
          .map((r) => ({
            id: r.id,
            name: r.name || "",
            businessName: r.businessName || "",
            creativeType: r.creativeType || "Other",
            shortDescription: r.shortDescription || "",
            offers: r.offers || "",
            website: r.website || "",
            socials: r.socials || "",
            exampleImageUrl: r.exampleImageUrl || "",
            creditTag: r.creditTag || "",
            openToCollabs: !!r.openToCollabs,
            featuredWhere: (r.featuredWhere || "website") as Creative["featuredWhere"],
            published: !!r.published,
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,
          }))
          // show only website/both
          .filter((c) => c.featuredWhere === "website" || c.featuredWhere === "both")
          // must have an example image to look good
          .filter((c) => !!c.exampleImageUrl);

        if (alive) setCreatives(cleaned);
      } catch (err) {
        console.warn("Creatives query failed; falling back to simpler fetch:", err);

        // fallback: fetch all and filter client-side
        const snap2 = await getDocs(collection(db, "creatives"));
        const rows2 = snap2.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as any[];

        const cleaned2 = rows2
          .filter((r) => r.published === true)
          .map((r) => ({
            id: r.id,
            name: r.name || "",
            businessName: r.businessName || "",
            creativeType: r.creativeType || "Other",
            shortDescription: r.shortDescription || "",
            offers: r.offers || "",
            website: r.website || "",
            socials: r.socials || "",
            exampleImageUrl: r.exampleImageUrl || "",
            creditTag: r.creditTag || "",
            openToCollabs: !!r.openToCollabs,
            featuredWhere: (r.featuredWhere || "website") as Creative["featuredWhere"],
            published: !!r.published,
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,
          }))
          .filter((c) => c.featuredWhere === "website" || c.featuredWhere === "both")
          .filter((c) => !!c.exampleImageUrl);

        if (alive) setCreatives(cleaned2);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return creatives.filter((c) => {
      if (typeFilter !== "All" && c.creativeType !== typeFilter) return false;
      if (collabOnly && !c.openToCollabs) return false;

      if (!q) return true;

      const hay = [
        c.name,
        c.businessName,
        c.creativeType,
        c.shortDescription,
        c.offers,
        c.socials,
        c.website,
        c.creditTag,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(q);
    });
  }, [creatives, search, typeFilter, collabOnly]);

  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300/90 mb-2">
            ✦ Creatives of Inkbound
          </p>
          <h1 className="text-4xl md:text-5xl text-amber-400 mb-3">Creators Directory</h1>
          <p className="text-gray-300 max-w-2xl mx-auto opacity-90">
            Browse cover artists, illustrators, designers, and bookish businesses — and reach out through their links.
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

        {/* Filters */}
        <div className="glass-panel border border-amber-700 rounded-xl p-5 md:p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm mb-1 text-gray-200/90" htmlFor="creative-search">
                Search
              </label>
              <input
                id="creative-search"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white placeholder:text-white/40"
                placeholder="Name, type, services…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-200/90" htmlFor="creative-type">
                Type
              </label>
              <select
                id="creative-type"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="All">All</option>
                {CREATIVE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 w-full">
                <input
                  type="checkbox"
                  checked={collabOnly}
                  onChange={(e) => setCollabOnly(e.target.checked)}
                />
                <span className="text-sm text-white/80">Open to collabs only</span>
              </label>
            </div>
          </div>

          <div className="mt-3 text-xs text-gray-400">
            {loading ? "Loading creatives…" : `Showing ${filtered.length} creative(s).`}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="glass-panel border border-white/10 rounded-xl p-6 text-gray-300">
            Loading…
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass-panel border border-white/10 rounded-xl p-6 text-gray-300">
            No creatives match that. Try widening filters.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-white/10 bg-black/30 overflow-hidden shadow-lg"
              >
                <div className="relative">
                  <img
                    src={c.exampleImageUrl}
                    alt={`${c.name} example work`}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/45 via-transparent to-black/10" />

                  <div className="absolute left-3 bottom-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-amber-500/30 bg-black/55 px-2.5 py-1 text-[11px] text-amber-200">
                      {c.creativeType}
                    </span>
                    {c.openToCollabs && (
                      <span className="rounded-full border border-emerald-500/30 bg-black/55 px-2.5 py-1 text-[11px] text-emerald-200">
                        Open to collabs
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-lg text-amber-200 font-semibold leading-tight">
                    {c.name}
                  </div>
                  {c.businessName && (
                    <div className="text-sm text-white/70">{c.businessName}</div>
                  )}

                  {c.shortDescription && (
                    <p className="mt-3 text-sm text-gray-200/90 leading-relaxed">
                      {c.shortDescription}
                    </p>
                  )}

                  {c.offers && (
                    <div className="mt-3 text-xs text-gray-300/90 whitespace-pre-wrap">
                      <span className="text-gray-400">Offers:</span> {c.offers}
                    </div>
                  )}

                  {c.creditTag && (
                    <div className="mt-3 text-xs text-gray-300/90">
                      <span className="text-gray-400">Credit:</span> {c.creditTag}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.website && (
                      <a
                        href={normalizeUrl(c.website)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-amber-700 hover:bg-amber-600 px-4 py-2 text-xs font-semibold text-white transition border border-amber-400/60"
                      >
                        Website →
                      </a>
                    )}

                    {c.socials && (
                      <button
                        type="button"
                        onClick={() => navigator.clipboard?.writeText(c.socials || "")}
                        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs text-white/80 transition"
                        title="Copy socials text"
                      >
                        Copy socials
                      </button>
                    )}
                  </div>

                  {c.socials && (
                    <div className="mt-3 text-[11px] text-gray-400 whitespace-pre-wrap break-words">
                      {c.socials}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center text-xs text-gray-400">
          Want to be listed? Reach out through your usual Inkbound channels.
        </div>
      </div>
    </div>
  );
}
