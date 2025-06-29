// src/pages/AuthorHubPage.tsx
import { Link } from "react-router-dom";
import VantaBackground from "../components/VantaBackground";

export default function AuthorHubPage() {
  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Vanta Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 px-4 flex items-center justify-center">
        <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-5xl w-full text-center">
          <h1 className="text-5xl font-light mb-6 text-amber-500 text-glow">
            Welcome to the Author Hub
          </h1>

          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            The Inkbound Society supports storytellers of all kinds — whether you're self-published, traditionally published, or just getting started.
          </p>

          <p className="text-lg text-gray-300 mb-10 leading-relaxed">
            From getting your book on our shelves to collaborating with narrators, bartering skills, or joining upcoming quests — this is your gateway into the Society’s author resources.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <Link
              to="/authors/consignment"
              className="bg-black/50 border border-amber-700 hover:bg-amber-700 hover:text-black text-white py-6 px-6 rounded-xl shadow transition block"
            >
              <h2 className="text-xl font-bold mb-1">📦 Bookshop Consignment</h2>
              <p className="text-sm text-gray-300">
                Apply to have your physical book stocked in the Inkbound Bookshop (Gort).
              </p>
            </Link>

            <Link
              to="/virtual-shelfspace"
              className="bg-black/50 border border-amber-700 hover:bg-amber-700 hover:text-black text-white py-6 px-6 rounded-xl shadow transition block"
            >
              <h2 className="text-xl font-bold mb-1">🌐 Virtual Shelfspace</h2>
              <p className="text-sm text-gray-300">
                Advertise your indie book digitally on our Virtual Shelf, linking to your preferred store.
              </p>
            </Link>

            <Link
              to="/narrator-shelf"
              className="bg-black/50 border border-amber-700 hover:bg-amber-700 hover:text-black text-white py-6 px-6 rounded-xl shadow transition block"
            >
              <h2 className="text-xl font-bold mb-1">🎙️ Narrator Shelf</h2>
              <p className="text-sm text-gray-300">
                Browse audiobook narrators available for hire or collaboration.
              </p>
            </Link>

            <button
              disabled
              className="bg-gray-800 text-white py-6 px-6 rounded-xl shadow opacity-50 cursor-not-allowed block text-left"
            >
              <h2 className="text-xl font-bold mb-1">🤝 Barter & Mentorship (Coming Soon)</h2>
              <p className="text-sm text-gray-400">
                A future space for skill swaps, mentorship, and collaboration.
              </p>
            </button>
          </div>

          <div className="mt-10">
            <Link
              to="/featured-books"
              className="text-amber-400 hover:text-amber-300 text-sm underline"
            >
              📚 See Who’s On Our Shelves
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
