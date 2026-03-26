// src/pages/InkboundTBR.tsx
import { useState } from "react";
import { FaHeart, FaSort } from "react-icons/fa";
import VantaBackground from "../components/VantaBackground";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  likes: number;
}

const initialBooks: Book[] = [
  {
    id: 1,
    title: "The Hollow King",
    author: "A. Rowan",
    genre: "Fantasy",
    likes: 10,
  },
  {
    id: 2,
    title: "Echoes of the Deep",
    author: "K. Vale",
    genre: "Sci-Fi",
    likes: 7,
  },
  {
    id: 3,
    title: "Whispers in the Fog",
    author: "M. Quinn",
    genre: "Mystery",
    likes: 4,
  },
];

export default function InkboundTBR() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [filter, setFilter] = useState<string>("All");
  const [sortLikes, setSortLikes] = useState<boolean>(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
  });

  const filteredBooks = books.filter(
    (book) => filter === "All" || book.genre === filter
  );

  const sortedBooks = [...filteredBooks].sort((a, b) =>
    sortLikes ? b.likes - a.likes : a.id - b.id
  );

  const handleLike = (id: number) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, likes: book.likes + 1 } : book
      )
    );
  };

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.genre) return;

    const id = books.length + 1;
    setBooks([...books, { ...newBook, id, likes: 0 }]);
    setNewBook({ title: "", author: "", genre: "" });
  };

  const genres = ["All", ...Array.from(new Set(books.map((b) => b.genre)))];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050506] font-marcellus text-[#f5efe3]">
      {/* Vanta Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Atmospheric overlays */}
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(82,58,133,0.08),transparent_24%),radial-gradient(circle_at_20%_80%,rgba(13,30,66,0.10),transparent_26%)]" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#c8a04e]/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-10 lg:px-10">
        {/* Hero */}
        <section className="mb-8">
          <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/25 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl">
            <div className="relative px-6 py-10 md:px-10 md:py-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.10),transparent_34%)]" />

              <div className="relative text-center">
                <div className="text-xs uppercase tracking-[0.34em] text-[#c8a04e]">
                  Inkbound Reader Space
                </div>

                <h1 className="mt-4 text-4xl font-light leading-tight text-white md:text-6xl">
                  The Inkbound TBR
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
                  A shared shelf of wanted reads, future obsessions, and books
                  the community refuses to forget.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Add Book */}
        <section className="mb-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl md:p-8">
          <div className="mb-6">
            <div className="text-xs uppercase tracking-[0.28em] text-[#c8a04e]">
              Add to the pile
            </div>
            <h2 className="mt-3 text-2xl text-white md:text-3xl">
              Add a book to the community TBR
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
              Feed the ever-growing stack. Add the books you want the Society to
              know about.
            </p>
          </div>

          <form
            onSubmit={handleAddBook}
            className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          >
            <input
              type="text"
              placeholder="Book title"
              value={newBook.title}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
              className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#c8a04e]/40 focus:bg-black/35"
            />

            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
              className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#c8a04e]/40 focus:bg-black/35"
            />

            <input
              type="text"
              placeholder="Genre"
              value={newBook.genre}
              onChange={(e) =>
                setNewBook({ ...newBook, genre: e.target.value })
              }
              className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#c8a04e]/40 focus:bg-black/35"
            />

            <button
              type="submit"
              className="rounded-2xl border border-[#c8a04e]/40 bg-[#c8a04e] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(200,160,78,0.16)]"
            >
              Add Book
            </button>
          </form>
        </section>

        {/* Filters + Sort */}
        <section className="mb-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl md:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-[#c8a04e]">
                Refine the shelf
              </div>
              <h2 className="mt-3 text-2xl text-white md:text-3xl">
                Browse by genre or sort by love
              </h2>
            </div>

            <button
              onClick={() => setSortLikes(!sortLikes)}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-black/20 px-4 py-3 text-sm uppercase tracking-[0.14em] text-[#f6dca0] transition hover:border-[#c8a04e]/30 hover:bg-white/5"
            >
              <FaSort />
              {sortLikes ? "Showing most liked" : "Sort by likes"}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setFilter(g)}
                className={`rounded-full border px-4 py-2 text-sm uppercase tracking-[0.14em] transition ${
                  filter === g
                    ? "border-[#c8a04e]/40 bg-[#c8a04e] text-black"
                    : "border-white/12 bg-black/20 text-white/70 hover:border-[#c8a04e]/30 hover:bg-white/5 hover:text-white"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </section>

        {/* Book List */}
        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-[#c8a04e]">
                Community shelf
              </div>
              <h2 className="mt-3 text-2xl text-white md:text-3xl">
                Books on the Inkbound TBR
              </h2>
            </div>

            <div className="text-sm text-white/45">
              {sortedBooks.length} {sortedBooks.length === 1 ? "book" : "books"}
            </div>
          </div>

          <div className="grid gap-5">
            {sortedBooks.map((book) => (
              <div
                key={book.id}
                className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-[2px] hover:border-[#c8a04e]/30 hover:bg-white/[0.07] md:p-6"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-[0.72rem] uppercase tracking-[0.26em] text-[#c8a04e]">
                      {book.genre}
                    </div>

                    <h3 className="mt-3 text-2xl leading-tight text-white">
                      {book.title}
                    </h3>

                    <p className="mt-2 text-sm text-white/65 md:text-base">
                      by {book.author}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-start md:self-center">
                    <button
                      onClick={() => handleLike(book.id)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/25 text-[#f6dca0] transition hover:scale-105 hover:border-[#c8a04e]/30 hover:bg-white/5"
                      aria-label={`Like ${book.title}`}
                    >
                      <FaHeart className="text-lg" />
                    </button>

                    <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/80">
                      {book.likes} {book.likes === 1 ? "like" : "likes"}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {sortedBooks.length === 0 && (
              <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-8 text-center text-white/55 backdrop-blur-xl">
                Nothing on this shelf yet. Add the first one.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}