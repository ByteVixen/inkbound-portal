// src/pages/AudiobookShelfPage.tsx
import React from "react";
import VantaBackground from "../components/VantaBackground";
import books from "../data/books.json";

const AudiobookShelfPage: React.FC = () => {
  const audiobooks = books.filter((book) => book.format === "audiobook");

  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Vanta Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 px-4 flex items-center justify-center">
        <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-7xl w-full text-center">
          <h1 className="text-4xl font-light mb-6 text-amber-400">
            🎧 Audiobook Shelf
          </h1>
          <p className="text-lg text-gray-300 mb-12">
            Explore indie audiobooks brought to life by talented narrators. Each
            listing links directly to where you can listen or buy.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
            {audiobooks.map((book) => (
              <a
                key={book.title}
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/50 border border-amber-700 p-4 rounded-xl hover:shadow-xl hover:scale-105 transition duration-300"
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <h2 className="text-xl text-amber-300 font-semibold mb-1">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-400 italic">
                  by {book.author}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudiobookShelfPage;
