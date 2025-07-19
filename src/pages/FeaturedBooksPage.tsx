// src/pages/FeaturedBooksPage.tsx

import { useState } from "react";
import VantaBackground from "../components/VantaBackground";

interface Book {
  title: string;
  author: string;
  genre?: string;
  cover: string;
  quote?: string;
}

const books: Book[] = [
  {
    title: "Where Nightmares Walk",
    author: "Phineas Delgado",
    genre: "Urban Fantasy",
    cover: "/books/where-nightmares-walk.jpg",
    quote:
      "You had me right up to the point that you told me your dog taught you how to do magic.",
  },
  {
    title: "Toxic Lullabies",
    author: "Tullie Summers",
    genre: "Dark Romance",
    cover: "/books/toxic-lullabies.jpg",
    quote:
      "I’ve never related more to a stupid plate than in that moment, because I know I’ll never be the same after Austin.",
  },
  {
    title: "A Fall for Grace",
    author: "G.M Parrillo",
    genre: "Contemporary Romance",
    cover: "/books/a-fall-for-grace.jpeg",
    quote:
      "“It is sweet and smooth”He couldn’t keep his eyes off of her lips as they puckered on the oo sound, and it seemed she had noticed.“So, it tastes like you”",
  },
  {
    title: "Fatebound",
    author: "Graham Fontaine",
    genre: "Young Adult Fantasy",
    cover: "/books/fatebound.JPG",
    quote:
      "The woman’s smile was all teeth, her eyes far too pale. “Everything grows from something. Some things bloom better in the dark.”",
  },
  {
    title: "A Cosy Airport Read",
    author: "Leanne Alyse",
    genre: "Dark Romance",
    cover: "/books/a-cosy-airport-read.jpg",
    quote: "Sometimes the best departures are the ones you never planned.",
  },
  {
    title: "A Minor Fall",
    author: "Kayla M. Martell",
    genre: "Romantasy",
    cover: "/books/a-minor-fall.jpg",
    quote: "Even music breaks when the silence is too loud.",
  },
  {
    title: "The Coach",
    author: "Alexandra Shaw",
    genre: "Sports Romance",
    cover: "/books/the-coach.jpg",
    quote: "She wasn’t just playing the game—she was rewriting the rules.",
  },
  {
    title: "Surrender to Love",
    author: "Hadley Grey",
    genre: "Romance",
    cover: "/books/surrender-to-love.avif",
    quote: "To surrender is not to lose—it's to choose the fire.",
  },
  {
    title: "Under the Horn of Hearth",
    author: "S.P. Rowe",
    genre: "Mythological Fantasy",
    cover: "/books/under-the-horn-of-hearth.jpg",
    quote: "Legends rise where the fire never dies.",
  },
  {
    title: "The Placement",
    author: "Ruth Osgood",
    genre: "YA Thriller",
    cover: "/books/the-placement.jpg",
    quote: "Every assignment comes at a cost—even the perfect ones.",
  },
  {
    title: "The Siren's Call",
    author: "C.M. Harte",
    genre: "Contemporary Romance",
    cover: "/books/the-sirens-call.jpg",
    quote: "The sea always sings to those who dare to listen.",
  },
  {
    title: "Will It Be Us?",
    author: "Matthew Castle",
    genre: "Contemporary Romance",
    cover: "/books/will-it-be-us.jpeg",
    quote: "Two hearts. One chance. A million reasons to walk away.",
  },
  {
    title: "The Cursed Prophecy",
    author: "Johnathon Axel Carr",
    genre: "Dark Fantasy",
    cover: "/books/the-cursed-prophecy.jpg",
    quote: "Fate doesn’t wait. It hunts.",
  },
  {
    title: "Magic Bites",
    author: "Eris Marriott",
    genre: "Romantasy",
    cover: "/books/magic-bites.jpg",
    quote: "Magic always leaves a mark. Sometimes it’s a scar.",
  },
  {
    title: "Bewitched Souls",
    author: "Drako",
    genre: "MM Romance",
    cover: "/books/bewitched-souls.jpg",
    quote: "Even cursed hearts can burn for something real.",
  },
  {
    title: "The Witch Queen",
    author: "Alexandria Arden",
    genre: "Fantasy Romance",
    cover: "/books/the-witch-queen.jpg",
    quote: "To rule the magic, she must first claim her crown.",
  },
  {
    title: "Brave Little Witch",
    author: "Blynn Cole",
    genre: "Dark Fantasy Romance",
    cover: "/books/brave-little-witch.jpg",
    quote: "He was meant to kill her. She was never supposed to matter.",
  },
];

export default function FeaturedBooksPage() {
  const [selectedGenre, setSelectedGenre] = useState<string>("All");

  const genres = ["All", ...Array.from(new Set(books.map((book) => book.genre).filter(Boolean)))];
  const filteredBooks = selectedGenre === "All" ? books : books.filter((b) => b.genre === selectedGenre);

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
            Want your story among them?{' '}
            <a
              href="/authors/consignment"
              className="text-amber-400 underline hover:text-amber-300"
            >
              Submit your book today.
            </a>
          </p>

          <div className="mb-10">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-black/40 border border-amber-500 text-white py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {filteredBooks.map((book, idx) => (
              <div
                key={idx}
                className="bg-black/50 border border-amber-700 rounded-lg overflow-hidden shadow-lg p-4 hover:shadow-amber-500/30 transition"
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-80 object-contain bg-black rounded mb-4"
                />
                <h3 className="text-xl font-semibold text-amber-400">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-300 italic mb-1">
                  {book.author}
                </p>
                <p className="text-xs text-gray-400 mb-3">{book.genre}</p>
                {book.quote && (
                  <blockquote className="text-sm text-gray-400 italic">
                    “{book.quote}”
                  </blockquote>
                )}
              </div>
            ))}
          </div>

          <p className="mt-12 text-sm text-amber-300 italic">
            📚 This list is being updated daily — check back often to see who’s joining the shelf.
          </p>
        </div>
      </div>
    </div>
  );
}
