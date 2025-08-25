// src/pages/FeaturedBooksPage.tsx
import { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import VantaBackground from "../components/VantaBackground";

type FirestoreFeatured = {
  name?: string;        // author (from admin)
  bookTitle?: string;   // title  (from admin)
  genre?: string;
  quote?: string;
  image?: string;       // cover  (from admin)
  published?: boolean;
  updatedAt?: any;      // Firestore Timestamp
};

interface Book {
  id: string;
  title: string;
  author: string;
  genre?: string;
  cover?: string;
  quote?: string;
}

export default function FeaturedBooksPage() {
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        // Preferred query (needs composite index: published ASC, updatedAt DESC)
        const q1 = query(
          collection(db, "featured_authors"),
          where("published", "==", true),
          orderBy("updatedAt", "desc")
        );
        const snapshot = await getDocs(q1);

        const data = snapshot.docs.map((doc) => {
          const d = doc.data() as FirestoreFeatured;
          return {
            id: doc.id,
            title: d.bookTitle ?? "(Untitled)",
            author: d.name ?? "Unknown",
            genre: d.genre,
            cover: d.image,
            quote: d.quote,
          } as Book;
        });

        setBooks(data);
      } catch (e) {
        // Index missing → fallback without orderBy; sort locally by updatedAt desc
        console.warn("Featured index missing; falling back without orderBy.", e);
        try {
          const q2 = query(
            collection(db, "featured_authors"),
            where("published", "==", true)
          );
          const snapshot = await getDocs(q2);

          const mapped = snapshot.docs.map((doc) => {
            const d = doc.data() as FirestoreFeatured;
            const ts =
              d.updatedAt && typeof d.updatedAt.toMillis === "function"
                ? d.updatedAt.toMillis()
                : 0;

            return {
              id: doc.id,
              title: d.bookTitle ?? "(Untitled)",
              author: d.name ?? "Unknown",
              genre: d.genre,
              cover: d.image,
              quote: d.quote,
              _ts: ts,
            };
          });

          mapped.sort((a, b) => b._ts - a._ts);
          setBooks(mapped.map(({ _ts, ...rest }) => rest as Book));
        } catch (fallbackErr) {
          console.error("Failed to load featured books (fallback):", fallbackErr);
          setBooks([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const genres = ["All", ...Array.from(new Set(books.map((b) => b.genre).filter(Boolean)))];
  const filteredBooks =
    selectedGenre === "All" ? books : books.filter((b) => b.genre === selectedGenre);

  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="relative z-10 py-20 px-4 flex items-center justify-center">
        <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-7xl text-center">
          <h1 className="text-5xl font-light mb-8 text-amber-500 text-glow">
            On Our Shelves Soon
          </h1>

          <p className="text-gray-300 max-w-3xl mx-auto mb-8 text-lg">
            A glimpse into the spellbound shelves of the Inkbound Bookshop.
            Want your story among them?{" "}
            <a
              href="/authors/consignment"
              className="text-amber-400 underline hover:text-amber-300"
            >
              Submit your book today.
            </a>
          </p>

          {/* Genre filter */}
          <div className="mb-10">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-black/40 border border-amber-500 text-white py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Loading / Empty states */}
          {loading ? (
            <p className="text-amber-300">Loading featured books…</p>
          ) : filteredBooks.length === 0 ? (
            <p className="text-amber-300 italic">No featured books yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-black/50 border border-amber-700 rounded-lg overflow-hidden shadow-lg p-4 hover:shadow-amber-500/30 transition"
                >
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-80 object-contain bg-black rounded mb-4"
                    />
                  ) : (
                    <div className="w-full h-80 flex items-center justify-center bg-black/60 rounded mb-4 text-gray-500 text-sm">
                      No cover
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-amber-400">{book.title}</h3>
                  <p className="text-sm text-gray-300 italic mb-1">{book.author}</p>
                  <p className="text-xs text-gray-400 mb-3">{book.genre}</p>
                  {book.quote && (
                    <blockquote className="text-sm text-gray-400 italic">“{book.quote}”</blockquote>
                  )}
                </div>
              ))}
            </div>
          )}

          <p className="mt-12 text-sm text-amber-300 italic">
            📚 This list is being updated daily — check back often to see who’s joining the shelf.
          </p>
        </div>
      </div>
    </div>
  );
}
