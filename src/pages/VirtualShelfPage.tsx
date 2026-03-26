import { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import VantaBackground from "../components/VantaBackground";

type FirestoreBook = {
  bookTitle?: string;
  name?: string;
  genre?: string;
  image?: string;
  link?: string;
  published?: boolean;
  updatedAt?: any;
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
        console.warn("Index missing or query failed. Falling back without orderBy.", err);
        try {
          const q2 = query(
            collection(db, "virtual_shelf_books"),
            where("published", "==", true)
          );
          const snap2 = await getDocs(q2);

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

          mapped.sort((a, b) => b._ts - a._ts);
          setBooks(mapped.map(({ _ts, ...rest }) => rest as Book));
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

  const genres = [
    "All",
    ...Array.from(new Set(books.map((b) => b.genre).filter(Boolean))),
  ];

  const filteredBooks =
    selectedGenre === "All"
      ? books
      : books.filter((book) => book.genre === selectedGenre);

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
              Virtual Shelf
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-tight text-white md:text-6xl">
              The Virtual Bookshelf
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
              Indie spotlights from around the world — a living shelf of bold,
              brilliant, and unforgettable books.
            </p>
          </div>
        </div>

        {/* Filter panel */}
        <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-[#c8a04e]">
                Browse the shelf
              </div>
              <p className="mt-2 text-sm leading-7 text-white/58">
                Filter by genre and explore the books currently featured in the
                Inkbound virtual space.
              </p>
            </div>

            <div className="w-full md:w-auto">
              <label
                htmlFor="genre-filter"
                className="mb-2 block text-xs uppercase tracking-[0.18em] text-[#c8a04e]"
              >
                Genre
              </label>
              <select
                id="genre-filter"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#c8a04e]/40 focus:bg-black/40 md:min-w-[230px]"
              >
                {genres.map((g) => (
                  <option key={g} value={g} className="bg-[#0b0b0d] text-white">
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Books */}
        <div className="mt-10">
          {loading ? (
            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur-xl">
              <p className="text-base text-[#f6dca0]">Loading books…</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur-xl">
              <p className="text-base italic text-white/55">
                No books on the shelf yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredBooks.map((book) => (
                <article
                  key={book.id}
                  className="group flex flex-col overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
                >
                  <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/35">
                    {book.cover ? (
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-[1.015]"
                      />
                    ) : (
                      <div className="flex aspect-[2/3] w-full items-center justify-center px-6 text-center text-sm text-white/35">
                        No cover available
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex flex-1 flex-col">
                    <div className="text-[0.68rem] uppercase tracking-[0.24em] text-[#c8a04e]">
                      {book.genre || "Featured title"}
                    </div>

                    <h2 className="mt-2 text-2xl leading-tight text-white">
                      {book.title}
                    </h2>

                    <p className="mt-2 text-sm italic text-white/58">
                      {book.author}
                    </p>

                    {book.link && (
                      <a
                        href={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex w-fit items-center rounded-full border border-[#c8a04e]/30 bg-[#c8a04e]/10 px-4 py-2 text-sm text-[#f6dca0] transition hover:border-[#c8a04e]/50 hover:bg-[#c8a04e]/15 hover:text-white"
                      >
                        Visit Website
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}