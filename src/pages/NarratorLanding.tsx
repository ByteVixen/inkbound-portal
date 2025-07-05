// src/pages/narrators/NarratorLanding.tsx
import { Link } from "react-router-dom";
import VantaBackground from '../components/VantaBackground';

export default function NarratorLanding() {
  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-400 animate-fade-in">
          Narrator Portal
        </h1>
        <p className="text-lg text-gray-300 mb-8 max-w-3xl animate-fade-in">
          Submit your samples, showcase your voice, and connect with authors seeking sound. This is your realm to shine.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/narrator-shelf"
            className="glass-card p-6 rounded-xl border border-amber-700 hover:scale-105 transition text-center"
          >
            <img
              src="/images/narrator-spotlight.png"
              alt="Narrator Shelf"
              className="mx-auto w-20 h-20 object-contain mb-4"
            />
            <h2 className="text-xl text-amber-400 mb-1">Narrator Shelf</h2>
            <p className="text-sm text-gray-400">
              Explore featured narrators and hear their voices.
            </p>
          </Link>

          <Link
            to="/narrator-hub"
            className="glass-card p-6 rounded-xl border border-amber-700 hover:scale-105 transition text-center"
          >
            <img
              src="/images/narrator-spotlight.png"
              alt="Narrator Hub"
              className="mx-auto w-20 h-20 object-contain mb-4"
            />
            <h2 className="text-xl text-amber-400 mb-1">Narrator Hub</h2>
            <p className="text-sm text-gray-400">
              Submit samples and manage your listing with us.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
