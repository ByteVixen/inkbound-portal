// src/pages/FeaturedBooksPage.tsx

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
      quote: "You had me right up to the point that you told me your dog taught you how to do magic.",
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
      quote: "“It is sweet and smooth”He couldn’t keep his eyes off of her lips as they puckered on the oo sound, and it seemed she had noticed.“So, it tastes like you”",
    },
    {
      title: "Fatebound",
      author: "Graham Fontaine",
      genre: "Young Adult Fantasy",
      cover: "/books/fatebound.jpeg",
      quote: "tbc.",
    },
  ];
  
  export default function FeaturedBooksPage() {
    return (
      <div className="min-h-screen py-20 px-6 text-center">
        <h1 className="text-5xl font-light mb-8 text-amber-500 text-glow">
          On Our Shelves Soon
        </h1>
  
        <p className="text-gray-400 max-w-3xl mx-auto mb-12 text-lg">
          A glimpse into the spellbound shelves of the Inkbound Bookshop.
          Want your story among them?{" "}
          <a
            href="/authors/consignment"
            className="text-amber-400 underline hover:text-amber-300"
          >
            Submit your book today.
          </a>
        </p>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
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
              <h3 className="text-xl font-semibold text-amber-400">{book.title}</h3>
              <p className="text-sm text-gray-300 italic mb-1">{book.author}</p>
              <p className="text-xs text-gray-500 mb-3">{book.genre}</p>
              {book.quote && (
                <blockquote className="text-sm text-gray-400 italic">
                  “{book.quote}”
                </blockquote>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  