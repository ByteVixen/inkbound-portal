import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import VantaBackground from "../components/VantaBackground";

interface NarratorProfile {
  id: string;
  name: string;
  pronouns?: string;
  image?: string;
  genres: string[];
  voice?: string;
  link?: string;
}

type FirestoreNarrator = {
  name?: string;
  pronouns?: string;
  image?: string;
  genre?: string | string[];
  style?: string;
  link?: string;
  published?: boolean;
  updatedAt?: any;
};

const splitGenres = (g?: string | string[]) => {
  if (!g) return [] as string[];
  if (Array.isArray(g)) return g.map((x) => String(x).trim()).filter(Boolean);
  return g
    .split(/[,;|]/g)
    .map((s) => s.trim())
    .filter(Boolean);
};

const NarratorShelfPage: React.FC = () => {
  const [narrators, setNarrators] = useState<NarratorProfile[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNarrators = async () => {
      setLoading(true);
      try {
        const q1 = query(
          collection(db, "narrators"),
          where("published", "==", true),
          orderBy("updatedAt", "desc")
        );
        const snap1 = await getDocs(q1);

        const data: NarratorProfile[] = snap1.docs.map((doc) => {
          const d = doc.data() as FirestoreNarrator;
          return {
            id: doc.id,
            name: d.name ?? "Unknown",
            pronouns: d.pronouns,
            image: d.image,
            genres: splitGenres(d.genre),
            voice: d.style,
            link: d.link,
          };
        });

        setNarrators(data);
      } catch (err) {
        console.warn("Narrators index missing; falling back without orderBy.", err);
        try {
          const q2 = query(
            collection(db, "narrators"),
            where("published", "==", true)
          );
          const snap2 = await getDocs(q2);

          const mapped = snap2.docs.map((doc) => {
            const d = doc.data() as FirestoreNarrator;
            const ts =
              d.updatedAt && typeof d.updatedAt.toMillis === "function"
                ? d.updatedAt.toMillis()
                : 0;

            return {
              id: doc.id,
              name: d.name ?? "Unknown",
              pronouns: d.pronouns,
              image: d.image,
              genres: splitGenres(d.genre),
              voice: d.style,
              link: d.link,
              _ts: ts,
            };
          });

          mapped.sort((a, b) => b._ts - a._ts);
          setNarrators(mapped.map(({ _ts, ...rest }) => rest as NarratorProfile));
        } catch (fallbackErr) {
          console.error("Error fetching narrators (fallback):", fallbackErr);
          setNarrators([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNarrators();
  }, []);

  const allGenres = Array.from(new Set(narrators.flatMap((n) => n.genres))).sort();

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const clearFilters = () => setSelectedGenres([]);

  const filteredNarrators =
    selectedGenres.length === 0
      ? narrators
      : narrators.filter((n) => selectedGenres.every((g) => n.genres.includes(g)));

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050506] font-marcellus text-[#f5efe3]">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(82,58,133,0.08),transparent_20%),radial-gradient(circle_at_20%_80%,rgba(13,30,66,0.10),transparent_24%)]" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#c8a04e]/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {/* Hero */}
        <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/25 px-6 py-10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl md:px-10 md:py-14">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-xs uppercase tracking-[0.34em] text-[#c8a04e]">
              Narrator Directory
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-tight text-white md:text-6xl">
              Narrator Shelf
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
              Browse audiobook narrators available for hire and filter by genre
              to find the right voice for your story.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:p-6">
          <div className="text-xs uppercase tracking-[0.28em] text-[#c8a04e]">
            Filter by genre
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {allGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  selectedGenres.includes(genre)
                    ? "border-[#c8a04e]/50 bg-[#c8a04e] text-black"
                    : "border-white/10 bg-black/25 text-white/75 hover:border-[#c8a04e]/30 hover:bg-white/10 hover:text-white"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {selectedGenres.length > 0 && (
            <button
              onClick={clearFilters}
              className="mt-4 text-sm text-[#f6dca0] underline decoration-[#c8a04e]/40 underline-offset-4 transition hover:text-white"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Cards */}
        <div className="mt-10">
          {loading ? (
            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur-xl">
              <p className="text-base text-[#f6dca0]">Loading narrators…</p>
            </div>
          ) : filteredNarrators.length === 0 ? (
            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur-xl">
              <p className="text-base italic text-white/55">
                No narrators match the selected genres.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredNarrators.map((n) => (
                <div
                  key={n.id}
                  className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
                >
                  <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/35">
                    {n.image ? (
                      <img
                        src={n.image}
                        alt={`${n.name}'s headshot`}
                        className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.015]"
                      />
                    ) : (
                      <div className="flex h-72 w-full items-center justify-center px-6 text-center text-sm text-white/35">
                        No image available
                      </div>
                    )}
                  </div>

                  <div className="mt-5">
                    <div className="text-[0.68rem] uppercase tracking-[0.24em] text-[#c8a04e]">
                      Narrator
                    </div>

                    <h2 className="mt-2 text-2xl text-white">
                      {n.name}
                      {n.pronouns && (
                        <span className="ml-2 text-sm text-white/45">
                          ({n.pronouns})
                        </span>
                      )}
                    </h2>

                    {n.voice && (
                      <p className="mt-2 text-sm italic text-white/58">
                        {n.voice}
                      </p>
                    )}

                    <p className="mt-3 text-sm leading-7 text-white/55">
                      Genres: {n.genres.join(", ")}
                    </p>

                    {n.link && (
                      <a
                        href={n.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex rounded-full border border-[#c8a04e]/30 bg-[#c8a04e]/10 px-4 py-2 text-sm text-[#f6dca0] transition hover:border-[#c8a04e]/50 hover:bg-[#c8a04e]/15 hover:text-white"
                      >
                        Listen / Visit
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NarratorShelfPage;