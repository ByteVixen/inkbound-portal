// src/pages/NarratorShelfPage.tsx
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
  updatedAt?: any; // Firestore Timestamp
};

const splitGenres = (g?: string | string[]) => {
  if (!g) return [] as string[];
  if (Array.isArray(g)) return g.map((x) => String(x).trim()).filter(Boolean);
  // support commas, semicolons, pipes
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
        // Preferred (needs composite index: published ASC, updatedAt DESC)
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
        // Index missing → fallback to no orderBy, then sort locally by updatedAt desc
        console.warn("Narrators index missing; falling back without orderBy.", err);
        try {
          const q2 = query(collection(db, "narrators"), where("published", "==", true));
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
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Vanta Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-xl p-10">
          <h1 className="text-4xl font-light mb-4 text-amber-500 text-glow">🎙️ Narrator Shelf</h1>
          <p className="mb-10 text-lg text-gray-300">
            Browse audiobook narrators available for hire. Filter by genre to find your perfect voice.
          </p>

          {/* Filters */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-2 text-amber-400">Filter by Genre</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {allGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-4 py-1 border rounded-full text-sm transition ${
                    selectedGenres.includes(genre)
                      ? "bg-amber-500 text-black border-amber-500"
                      : "bg-transparent border-white hover:bg-white hover:text-black"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
            {selectedGenres.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm underline text-gray-400 hover:text-white"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Narrator Cards */}
          {loading ? (
            <p className="text-gray-400 italic">Loading narrators…</p>
          ) : filteredNarrators.length === 0 ? (
            <p className="text-gray-400 italic">No narrators match the selected genres.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNarrators.map((n) => (
                <div
                  key={n.id}
                  className="bg-black/50 border border-amber-700 rounded-lg p-4 shadow hover:shadow-amber-500/30 transition"
                >
                  {n.image ? (
                    <img
                      src={n.image}
                      alt={`${n.name}'s headshot`}
                      className="w-full h-64 object-cover rounded mb-4"
                    />
                  ) : (
                    <div className="w-full h-64 flex items-center justify-center text-gray-500 border rounded mb-4">
                      No Image
                    </div>
                  )}
                  <h2 className="text-xl font-semibold text-amber-400">
                    {n.name}{" "}
                    {n.pronouns && (
                      <span className="text-sm text-gray-300">({n.pronouns})</span>
                    )}
                  </h2>
                  <p className="text-sm mb-2 italic text-gray-300">{n.voice}</p>
                  <p className="text-sm text-gray-400 mb-4">
                    Genres: {n.genres.join(", ")}
                  </p>
                  {n.link && (
                    <a
                      href={n.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-amber-600 text-black font-semibold px-4 py-2 rounded hover:bg-amber-500 transition"
                    >
                      Listen / Visit
                    </a>
                  )}
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
