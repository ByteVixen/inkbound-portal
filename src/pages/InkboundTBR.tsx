// src/pages/InkboundTBR.tsx
import { useState } from "react";
import VantaBackground from "../components/VantaBackground";
import { FaHeart, FaSort } from "react-icons/fa";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  likes: number;
}

const initialBooks: Book[] = [
  { id: 1, title: "The Hollow King", author: "A. Rowan", genre: "Fantasy", likes: 10 },
  { id: 2, title: "Echoes of the Deep", author: "K. Vale", genre: "Sci-Fi", likes: 7 },
  { id: 3, title: "Whispers in the Fog", author: "M. Quinn", genre: "Mystery", likes: 4 },
];

export default function InkboundTBR() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [filter, setFilter] = useState<string>("All");
  const [sortLikes, setSortLikes] = useState<boolean>(false);
  const [newBook, setNewBook] = useState({ title: "", author: "", genre: "" });

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
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl mb-6 text-center text-amber-500 text-glow">
          The Inkbound TBR
        </h1>

        {/* Add Book Form */}
        <form onSubmit={handleAddBook} className="mb-10 grid gap-4 md:grid-cols-4">
          <input
            type="text"
            placeholder="Book Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="p-2 rounded bg-white/10 text-white placeholder:text-gray-400"
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="p-2 rounded bg-white/10 text-white placeholder:text-gray-400"
          />
          <input
            type="text"
            placeholder="Genre"
            value={newBook.genre}
            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
            className="p-2 rounded bg-white/10 text-white placeholder:text-gray-400"
          />
          <button type="submit" className="bg-amber-600 hover:bg-amber-700 rounded p-2">
            Add Book
          </button>
        </form>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setFilter(g)}
                className={`px-4 py-1 rounded-full border border-amber-400 hover:bg-amber-500 hover:text-black transition ${
                  filter === g ? "bg-amber-400 text-black" : ""
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSortLikes(!sortLikes)}
            className="flex items-center gap-2 text-amber-300 hover:text-amber-500 transition"
          >
            <FaSort /> Sort by Likes
          </button>
        </div>

        {/* Book List */}
        <div className="grid gap-6">
          {sortedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white/10 p-4 rounded-lg shadow-lg border border-amber-700 flex justify-between items-center"
            >
              <div>
                <h2 className="text-2xl text-amber-300">{book.title}</h2>
                <p className="text-sm text-gray-300">by {book.author}</p>
                <p className="text-sm text-gray-400 italic">{book.genre}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleLike(book.id)}>
                  <FaHeart className="text-red-400 hover:text-red-500 text-xl transition-transform transform hover:scale-110" />
                </button>
                <span className="text-white text-sm">{book.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
