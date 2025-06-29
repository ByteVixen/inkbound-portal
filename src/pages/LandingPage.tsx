import { Link } from "react-router-dom";
import VantaBackground from "../components/VantaBackground";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Vanta Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-24 max-w-7xl mx-auto">
        {/* Logo */}
        <img
          src="/logo.png"
          alt="Inkbound Logo"
          className="w-64 md:w-80 mb-6 animate-fade-in"
        />

        <h1 className="text-5xl font-light mb-4 animate-fade-in text-glow">
          Some stories find you.
        </h1>

        <p className="text-lg text-gray-300 mb-10 animate-fade-in opacity-80">
          Stock your book. Join the Society.
        </p>

        {/* Explore Our Shelves */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center max-w-4xl w-full mb-16">
          <Link
            to="/featured-books"
            className="bg-black/50 border border-amber-700 rounded-xl p-6 hover:shadow-xl transition hover:scale-105"
          >
            <div className="text-4xl mb-2">🏪</div>
            <h2 className="text-xl font-semibold text-amber-400">Stocked in Our Bookshop</h2>
            <p className="text-sm text-gray-400">
              Discover books physically shelved at the Inkbound Bookshop in Gort
            </p>
          </Link>

          <Link
            to="/virtual-shelf"
            className="bg-black/50 border border-amber-700 rounded-xl p-6 hover:shadow-xl transition hover:scale-105"
          >
            <div className="text-4xl mb-2">🌐</div>
            <h2 className="text-xl font-semibold text-amber-400">On the Virtual Shelf</h2>
            <p className="text-sm text-gray-400">
              Browse digital listings from Inkbound authors around the world
            </p>
          </Link>
        </div>

        {/* CTA Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-6xl w-full">
          <Link
            to="/authors"
            className="bg-black/50 border border-amber-700 rounded-xl p-6 hover:shadow-xl transition hover:scale-105"
          >
            <div className="text-4xl mb-2">🖋️</div>
            <h2 className="text-xl font-semibold text-amber-400">Author Hub</h2>
            <p className="text-sm text-gray-400">Get stocked, submit quests, connect</p>
          </Link>

          <Link
            to="/about"
            className="bg-black/50 border border-amber-700 rounded-xl p-6 hover:shadow-xl transition hover:scale-105"
          >
            <div className="text-4xl mb-2">🕯️</div>
            <h2 className="text-xl font-semibold text-amber-400">About the Society</h2>
            <p className="text-sm text-gray-400">The story behind the shelves</p>
          </Link>

          <Link
            to="/contact"
            className="bg-black/50 border border-amber-700 rounded-xl p-6 hover:shadow-xl transition hover:scale-105"
          >
            <div className="text-4xl mb-2">📮</div>
            <h2 className="text-xl font-semibold text-amber-400">Contact</h2>
            <p className="text-sm text-gray-400">Summon the Society</p>
          </Link>
        </div>

        {/* Featured Books Teaser */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl text-amber-400 mb-2">📚 On Our Shelves Soon</h2>
          <p className="text-base text-gray-400 mb-4 max-w-md mx-auto">
            Discover what’s coming to Inkbound — and imagine your story among them.
          </p>
          <Link
            to="/featured-books"
            className="inline-block bg-black/50 border border-amber-700 px-6 py-3 rounded-full text-white hover:bg-amber-700 transition"
          >
            See Featured Books
          </Link>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="relative z-10 bg-black/70 py-12 text-center border-t border-amber-700 px-4">
        <p className="text-xl mb-4">📍 Inkbound Bookshop is opening soon in Gort!</p>
        <p className="text-base text-gray-400 mb-8">
          Join our community and be first to hear about shelves, events & quests.
        </p>

        <div className="w-full max-w-xl h-[220px] mx-auto rounded-lg overflow-hidden shadow-lg border border-amber-700">
          <iframe
            title="Zoho Signup Form"
            src="https://zcv2-zcmp.maillist-manage.eu/ua/Optin?od=12ba7efe1fcd&zx=14ae65caa7&tD=1341293d90db9159&sD=1341293d90dc6447"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: "none", background: "transparent" }}
          />
        </div>
      </div>
    </div>
  );
}
