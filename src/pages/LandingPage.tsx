
import { Link } from "react-router-dom";
import VantaBackground from "../components/VantaBackground";
// Trigger deploy
export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between font-marcellus text-white overflow-hidden">
      {/* Vanta Background */}
      <VantaBackground />

      {/* Hero Content */}
      <div className="flex flex-col items-center text-center px-6 py-24 z-10">
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

        {/* CTA Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-4xl w-full">
          <Link
            to="/authors"
            className="bg-black/50 border border-amber-700 rounded-xl p-6 hover:shadow-xl transition hover:scale-105"
          >
            <div className="text-4xl mb-2">🖋️</div>
            <h2 className="text-xl font-semibold text-amber-400">Author Hub</h2>
            <p className="text-sm text-gray-400">
              Get stocked, submit quests, connect
            </p>
          </Link>

          <Link
            to="/about"
            className="bg-black/50 border border-amber-700 rounded-xl p-6 hover:shadow-xl transition hover:scale-105"
          >
            <div className="text-4xl mb-2">🕯️</div>
            <h2 className="text-xl font-semibold text-amber-400">
              About the Society
            </h2>
            <p className="text-sm text-gray-400">
              The story behind the shelves
            </p>
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
      </div>

      {/* Newsletter Signup */}
      <div className="bg-black/70 py-12 text-center border-t border-amber-700 z-10 px-4">
        <p className="text-xl mb-4">
          📍 Inkbound Bookshop is opening soon in Gort!
        </p>
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
