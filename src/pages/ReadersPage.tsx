// src/pages/ReadersPage.tsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import VantaBackground from "../components/VantaBackground";

export default function ReadersPage() {
  const [readerCount, setReaderCount] = useState(0);

  useEffect(() => {
    const fetchReaders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "completed_quests"));
        setReaderCount(querySnapshot.size);
      } catch (error) {
        console.error("Error fetching reader completions:", error);
      }
    };

    fetchReaders();
  }, []);

  return (
    <div className="relative min-h-screen font-marcellus text-white bg-inkblack overflow-hidden">
      {/* Vanta Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-400 animate-fade-in">
          Welcome, Reader.
        </h1>
        <p className="text-lg text-gray-300 mb-4 max-w-3xl animate-fade-in">
          Join live quests, collect magical badges, and explore a world built just for you. Every whisper brings you closer to the Inkbound Society.
        </p>
        <p className="text-sm italic text-gray-400 mb-10 animate-fade-in">
          “Whispers of the Hollow Moon await...”
        </p>

        {/* Quest + TBR CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quest Card */}
          <Link
            to="/quests"
            className="glass-card p-6 rounded-xl border border-amber-700 hover:scale-105 transition"
          >
            <h2 className="text-2xl text-amber-300 mb-2">📜 Current Quest</h2>
            <p className="text-gray-400 mb-2">
              Take on this month’s lore challenge to earn a Whisper of Recognition.
            </p>
            <p className="text-sm text-amber-400">
              {readerCount} reader{readerCount !== 1 && 's'} have completed the quest.
            </p>
          </Link>

          {/* TBR Card */}
          <Link
            to="/inkbound-tbr"
            className="glass-card p-6 rounded-xl border border-amber-700 hover:scale-105 transition"
          >
            <h2 className="text-2xl text-amber-300 mb-2">📚 Inkbound TBR</h2>
            <p className="text-gray-400 mb-2">
              Add books to the community TBR, explore trending titles, and track what the Society is reading.
            </p>
            <p className="text-sm text-amber-400">Your next favorite read might be waiting...</p>
          </Link>
        </div>

        <hr className="my-12 border-amber-700/30" />

        <p className="text-center text-sm text-gray-500">
          Not a member yet?{' '}
          <Link to="/contact" className="underline hover:text-amber-400">
            Summon the Society
          </Link>
        </p>
      </div>
    </div>
  );
}
