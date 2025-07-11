// src/pages/FeaturedBooksPage.tsx

import VantaBackground from "../components/VantaBackground";

type Book = {
  title: string;
  author: string;
  genre?: string;
  cover: string;
  quote?: string;
};

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
    cover: "/books/fatebound.jpeg",
    quote: "The woman’s smile was all teeth, her eyes far too pale. “Everything grows from something. Some things bloom better in the dark.”",
  },
];

export default function FeaturedBooksPage() {
  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Vanta background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 px-4 flex items-center justify-center">
        <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-7xl text-center">
          <h1 className="text-5xl font-light mb-8 text-amber-500 text-glow">
            On Our Shelves Soon
          </h1>

          <p className="text-gray-300 max-w-3xl mx-auto mb-12 text-lg">
            A glimpse into the spellbound shelves of the Inkbound Bookshop.
            Want your story among them?{" "}
            <a
              href="/authors/consignment"
              className="text-amber-400 underline hover:text-amber-300"
            >
              Submit your book today.
            </a>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {books.map((book, idx) => (
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
        </div>
      </div>
    </div>
  );
}
