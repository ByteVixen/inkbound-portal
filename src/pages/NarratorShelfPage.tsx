import React, { useState } from 'react';
import VantaBackground from '../components/VantaBackground';

interface NarratorProfile {
  name: string;
  pronouns?: string;
  image: string;
  genres: string[];
  voice: string;
  link: string;
}

const allNarrators: NarratorProfile[] = [
  {
    name: "Christifer D. Ewing",
    pronouns: undefined,
    image: "/images/narrators/christifer.jpg",
    genres: [
      "Fantasy",
      "Romance",
      "Sci-Fi",
      "Horror",
      "Thriller",
      "LGBTQ+",
      "Mystery",
      "Historical",
    ],
    voice: "Resonating, Sonorous, Baritone, Flexible",
    link: "https://www.tiktok.com/@authordewingva?_t=ZP-8xadNbYvepi&_r=1",
  },
  // Add more narrators as needed
];

const allGenres = Array.from(new Set(allNarrators.flatMap((n) => n.genres))).sort();

const NarratorShelfPage: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const clearFilters = () => setSelectedGenres([]);

  const filteredNarrators =
    selectedGenres.length === 0
      ? allNarrators
      : allNarrators.filter((n) =>
          selectedGenres.every((g) => n.genres.includes(g))
        );

  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Vanta Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-xl p-10">
          <h1 className="text-4xl font-light mb-4 text-amber-500 text-glow">🎙️ Narrator Shelf</h1>
          <p className="mb-10 text-lg text-gray-300">
            Browse audiobook narrators available for hire. Filter by genre to find your perfect voice.
          </p>

          {/* Filters */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-2 text-amber-400">Filter by Genre</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {allGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-4 py-1 border rounded-full text-sm transition ${
                    selectedGenres.includes(genre)
                      ? 'bg-amber-500 text-black border-amber-500'
                      : 'bg-transparent border-white hover:bg-white hover:text-black'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
            {selectedGenres.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm underline text-gray-400 hover:text-white"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Narrator Cards */}
          {filteredNarrators.length === 0 ? (
            <p className="text-gray-400 italic">No narrators match the selected genres.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNarrators.map((n, index) => (
                <div
                  key={index}
                  className="bg-black/50 border border-amber-700 rounded-lg p-4 shadow hover:shadow-amber-500/30 transition"
                >
                  <img
                    src={n.image}
                    alt={`${n.name}'s headshot`}
                    className="w-full h-64 object-cover rounded mb-4"
                  />
                  <h2 className="text-xl font-semibold text-amber-400">
                    {n.name}{' '}
                    {n.pronouns && (
                      <span className="text-sm text-gray-300">({n.pronouns})</span>
                    )}
                  </h2>
                  <p className="text-sm mb-2 italic text-gray-300">{n.voice}</p>
                  <p className="text-sm text-gray-400 mb-4">
                    Genres: {n.genres.join(', ')}
                  </p>
                  <a
                    href={n.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-amber-600 text-black font-semibold px-4 py-2 rounded hover:bg-amber-500 transition"
                  >
                    Listen / Visit
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NarratorShelfPage;
