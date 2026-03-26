import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import VantaBackground from "../components/VantaBackground";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

type Creative = {
  id: string;
  name: string;
  businessName?: string;
  creativeType: string;
  shortDescription: string;
  offers: string;
  website?: string;
  socials?: string;
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

export default function CreativesHub() {
  const [loading, setLoading] = useState(true);
  const [creatives, setCreatives] = useState<Creative[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [collabOnly, setCollabOnly] = useState(false);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      try {
        const q1 = query(
          collection(db, "creatives"),
          where("published", "==", true),
          orderBy("updatedAt", "desc")
        );

        const snap = await getDocs(q1);
        const rows = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
        })) as any[];

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
          .filter((c) => c.featuredWhere === "website" || c.featuredWhere === "both")
          .filter((c) => !!c.exampleImageUrl);

        if (alive) setCreatives(cleaned);
      } catch (err) {
        console.warn("Creatives query failed; falling back to simpler fetch:", err);

        const snap2 = await getDocs(collection(db, "creatives"));
        const rows2 = snap2.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
        })) as any[];

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
    <div className="relative min-h-screen overflow-hidden bg-[#050506] font-marcellus text-[#f5efe3]">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(82,58,133,0.08),transparent_20%),radial-gradient(circle_at_20%_80%,rgba(13,30,66,0.10),transparent_24%)]" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#c8a04e]/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-16">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-[0.34em] text-[#c8a04e]">
            Creatives Directory
          </div>

          <h1 className="mt-4 font-serif text-4xl text-white md:text-6xl">
            Creatives of Inkbound
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/65">
            Browse cover artists, illustrators, designers, and bookish
            businesses — and reach out through their links.
          </p>

          <div className="mt-4">
            <Link
              to="/creatives"
              className="inline-flex items-center gap-2 text-sm text-[#f6dca0] underline decoration-[#c8a04e]/40 underline-offset-4 transition hover:text-white"
            >
              ← Back to creative submissions
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-[#c8a04e]" htmlFor="creative-search">
                Search
              </label>
              <input
                id="creative-search"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#c8a04e]/40 focus:bg-black/40"
                placeholder="Name, type, services…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-[#c8a04e]" htmlFor="creative-type">
                Type
              </label>
              <select
                id="creative-type"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#c8a04e]/40 focus:bg-black/40"
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
              <label className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                <input
                  type="checkbox"
                  checked={collabOnly}
                  onChange={(e) => setCollabOnly(e.target.checked)}
                />
                <span className="text-sm text-white/75">Open to collabs only</span>
              </label>
            </div>
          </div>

          <div className="mt-3 text-xs text-white/45">
            {loading ? "Loading creatives…" : `Showing ${filtered.length} creative(s).`}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-white/60 backdrop-blur-xl">
            Loading…
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-white/60 backdrop-blur-xl">
            No creatives match that. Try widening your filters.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <div
                key={c.id}
                className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
              >
                <div className="relative">
                  <img
                    src={c.exampleImageUrl}
                    alt={`${c.name} example work`}
                      className="aspect-[3/4] w-full object-cover object-top"
    loading="lazy"
  />
  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/45 via-transparent to-black/10" />

  <div className="absolute left-3 bottom-3 flex flex-wrap gap-2">
    <span className="rounded-full border border-[#c8a04e]/30 bg-black/55 px-2.5 py-1 text-[11px] text-[#f6dca0]">
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
                  <div className="text-lg font-semibold leading-tight text-white">
                    {c.name}
                  </div>

                  {c.businessName && (
                    <div className="text-sm text-white/65">{c.businessName}</div>
                  )}

                  {c.shortDescription && (
                    <p className="mt-3 text-sm leading-relaxed text-white/75">
                      {c.shortDescription}
                    </p>
                  )}

                  {c.offers && (
                    <div className="mt-3 text-xs whitespace-pre-wrap text-white/65">
                      <span className="text-white/40">Offers:</span> {c.offers}
                    </div>
                  )}

                  {c.creditTag && (
                    <div className="mt-3 text-xs text-white/65">
                      <span className="text-white/40">Credit:</span> {c.creditTag}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.website && (
                      <a
                        href={normalizeUrl(c.website)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-[#c8a04e]/30 bg-[#c8a04e]/10 px-4 py-2 text-xs font-semibold text-[#f6dca0] transition hover:border-[#c8a04e]/50 hover:bg-[#c8a04e]/15 hover:text-white"
                      >
                        Website →
                      </a>
                    )}

                    {c.socials && (
                      <button
                        type="button"
                        onClick={() => navigator.clipboard?.writeText(c.socials || "")}
                        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 transition hover:bg-white/10"
                        title="Copy socials text"
                      >
                        Copy socials
                      </button>
                    )}
                  </div>

                  {c.socials && (
                    <div className="mt-3 break-words whitespace-pre-wrap text-[11px] text-white/40">
                      {c.socials}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center text-xs text-white/40">
          Want to be listed? Apply through the Inkbound creatives submission page.
        </div>
      </div>
    </div>
  );
}