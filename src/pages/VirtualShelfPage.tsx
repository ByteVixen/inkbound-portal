import { useState } from "react";
import VantaBackground from "../components/VantaBackground";

type Book = {
  title: string;
  author: string;
  genre: string;
  format: "ebook" | "audiobook";
  cover: string;
  link: string;
};

const books: Book[] = [
  {
    title: "Where Nightmares Walk",
    author: "Phineas Delgado",
    genre: "Urban Fantasy",
    format: "ebook",
    cover: "/books/where-nightmares-walk.jpg",
    link: "https://phineasdelgado.com/",
  },
  {
    title: "Toxic Lullabies",
    author: "Tullie Summers",
    genre: "Dark Romance",
    format: "audiobook",
    cover: "/books/toxic-lullabies.jpg",
    link: "https://tulliesummers.wixsite.com/tulliesummers",
  },
  {
    title: "A Fall for Grace",
    author: "G.M Parrillo",
    genre: "Contemporary Romance",
    format: "ebook",
    cover: "/books/a-fall-for-grace.jpeg",
    link: "https://www.gmparrillo.net/",
  },
  {
    title: "Fatebound",
    author: "Graham Fontaine",
    genre: "Young Adult Fantasy",
    format: "audiobook",
    cover: "/books/fatebound.jpeg",
    link: "https://www.grahamfontaine.com/home",
  },
];

export default function VirtualShelfPage() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const genres = ["All", ...Array.from(new Set(books.map((b) => b.genre)))];

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {filteredBooks.map((book, idx) => (
              <div
                key={idx}
                className="bg-black/50 border border-amber-700 rounded-lg overflow-hidden shadow-lg p-4 flex flex-col hover:shadow-amber-500/30 transition"
              >
                <div className="w-full aspect-[2/3] overflow-hidden rounded mb-4">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-amber-400">{book.title}</h3>
                <p className="text-sm text-gray-300 italic mb-1">{book.author}</p>
                <p className="text-xs text-gray-500 mb-1">{book.genre}</p>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-sm text-amber-400 underline hover:text-amber-300"
                >
                  Visit Website
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
