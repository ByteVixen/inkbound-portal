// src/pages/authors/AuthorLanding.tsx
import { Link } from "react-router-dom";
import VantaBackground from '../components/VantaBackground';

export default function AuthorLanding() {
  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-400 animate-fade-in">
          Author Hub
        </h1>
        <p className="text-lg text-gray-300 mb-8 max-w-3xl animate-fade-in">
          Whether you're new to the realm or already among the Inkbound, this is your gateway to get stocked, submit books, and guide readers to your shelves.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/authors/consignment"
            className="glass-card p-6 rounded-xl border border-amber-700 hover:scale-105 transition text-center"
          >
            <img
              src="/images/author-hub.png"
              alt="Become Stocked"
              className="mx-auto w-20 h-20 object-contain mb-4"
            />
            <h2 className="text-xl text-amber-400 mb-1">Become Stocked</h2>
            <p className="text-sm text-gray-400">
              Submit your books to appear on our shelves (in-person or virtual).
            </p>
          </Link>

          <Link
            to="/authors/ship-books"
            className="glass-card p-6 rounded-xl border border-amber-700 hover:scale-105 transition text-center"
          >
            <img
              src="/images/stocked-on-our-bookshelf.png"
              alt="Shipping Info"
              className="mx-auto w-20 h-20 object-contain mb-4"
            />
            <h2 className="text-xl text-amber-400 mb-1">Shipping Info</h2>
            <p className="text-sm text-gray-400">
              All you need to know about sending physical stock to us safely.
            </p>
          </Link>

          <Link
            to="/virtual-shelfspace"
            className="glass-card p-6 rounded-xl border border-amber-700 hover:scale-105 transition text-center"
          >
            <img
              src="/images/on-our-virtual shelf.png"
              alt="Virtual Shelfspace"
              className="mx-auto w-20 h-20 object-contain mb-4"
            />
            <h2 className="text-xl text-amber-400 mb-1">Virtual Shelfspace</h2>
            <p className="text-sm text-gray-400">
              No stock? No problem. Join our digital shelf with your links.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
