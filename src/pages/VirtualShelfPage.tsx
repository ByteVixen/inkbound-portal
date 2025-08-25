// src/pages/VirtualShelfPage.tsx
import { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import VantaBackground from "../components/VantaBackground";

type FirestoreBook = {
  bookTitle?: string;
  name?: string;   // author
  genre?: string;
  image?: string;
  link?: string;
  published?: boolean;
  updatedAt?: any; // Firestore Timestamp (optional)
};

type Book = {
  id: string;
  title: string;
  author: string;
  genre?: string;
  cover?: string;
  link?: string;
};

export default function VirtualShelfPage() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        // Try the preferred indexed query first (requires composite index)
        const q1 = query(
          collection(db, "virtual_shelf_books"),
          where("published", "==", true),
          orderBy("updatedAt", "desc")
        );
        const snap1 = await getDocs(q1);

        const data = snap1.docs.map((doc) => {
          const d = doc.data() as FirestoreBook;
          return {
            id: doc.id,
            title: d.bookTitle ?? "(Untitled)",
            author: d.name ?? "Unknown",
            genre: d.genre,
            cover: d.image,
            link: d.link,
          } as Book;
        });

        setBooks(data);
      } catch (err) {
        // Missing index → fall back gracefully (no orderBy), then sort locally.
        console.warn("Index missing or query failed. Falling back without orderBy.", err);
        try {
          const q2 = query(
            collection(db, "virtual_shelf_books"),
            where("published", "==", true)
          );
          const snap2 = await getDocs(q2);

          // Map + collect timestamps for client-side sort
          const mapped = snap2.docs.map((doc) => {
            const d = doc.data() as FirestoreBook;
            const ts =
              (d.updatedAt &&
                typeof d.updatedAt.toMillis === "function" &&
                d.updatedAt.toMillis()) ||
              0;

            return {
              id: doc.id,
              title: d.bookTitle ?? "(Untitled)",
              author: d.name ?? "Unknown",
              genre: d.genre,
              cover: d.image,
              link: d.link,
              _ts: ts,
            };
          });

          // Sort by updatedAt desc (newest first)
          mapped.sort((a, b) => b._ts - a._ts);

          // Strip helper field
          setBooks(
            mapped.map(({ _ts, ...rest }) => rest as Book)
          );
        } catch (fallbackErr) {
          console.error("Error fetching virtual shelf books (fallback):", fallbackErr);
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
    selectedGenre === "All"
      ? books
      : books.filter((book) => book.genre === selectedGenre);

  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Vanta Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-xl p-10">
          <h1 className="text-5xl font-light mb-8 text-amber-500 text-glow text-center">
            The Virtual Bookshelf
          </h1>

          <p className="text-gray-300 max-w-3xl mx-auto mb-10 text-lg text-center">
            Indie spotlights from around the world — a living shelf of the bold and the brave.
          </p>

          {/* Genre Filter */}
          <div className="mb-12 text-center">
            <label className="text-white mr-2 text-lg font-semibold">Filter by genre:</label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-2 rounded-md bg-black border border-amber-700 text-white"
            >
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Book Grid */}
          {loading ? (
            <p className="text-center text-amber-300">Loading books…</p>
          ) : filteredBooks.length === 0 ? (
            <p className="text-center text-amber-300 italic">No books on the shelf yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-black/50 border border-amber-700 rounded-lg overflow-hidden shadow-lg p-4 flex flex-col hover:shadow-amber-500/30 transition"
                >
                  <div className="w-full aspect-[2/3] overflow-hidden rounded mb-4">
                    {book.cover ? (
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No cover
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-amber-400">{book.title}</h3>
                  <p className="text-sm text-gray-300 italic mb-1">{book.author}</p>
                  <p className="text-xs text-gray-500 mb-1">{book.genre}</p>
                  {book.link && (
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 text-sm text-amber-400 underline hover:text-amber-300"
                    >
                      Visit Website
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
}
