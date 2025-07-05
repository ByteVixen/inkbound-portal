// src/pages/ReaderQuests.tsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import VantaBackground from "../components/VantaBackground";

export default function ReaderQuests() {
  const [nickname, setNickname] = useState("");
  const [book, setBook] = useState("");
  const [quote, setQuote] = useState("");
  const [emoji, setEmoji] = useState("✨");
  const [completed, setCompleted] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "completed_quests"), (snapshot) => {
      const entries = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCompleted(entries);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname || !book || !quote) return;
    await addDoc(collection(db, "completed_quests"), {
      nickname,
      book,
      quote,
      emoji,
      likes: 0,
      timestamp: serverTimestamp(),
    });
    setNickname("");
    setBook("");
    setQuote("");
    setEmoji("✨");
    downloadImage();
  };

  const handleLike = async (id: string, currentLikes: number) => {
    try {
      const ref = doc(db, "completed_quests", id);
      await updateDoc(ref, { likes: currentLikes + 1 });
    } catch (err) {
      console.error("Error updating likes:", err);
    }
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = "/images/july-quest-complete.png";
    link.download = "Inkbound-July-Quest.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl text-glow text-center mb-8">
          📜 Reader Quests
        </h1>

        {/* Quest Section */}
        <section className="mb-12">
          <div className="glass-panel border border-amber-700 p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl text-amber-400 mb-4">
              July Quest — The Marked Ones
            </h2>
            <p className="text-gray-300 mb-4">
              This month, you must prove you are one of the Marked. Locate a book that altered your path — a story that branded itself on your soul. Choose a quote from it. Whisper it to us below. Bonus: Tag <strong>@theinkboundsociety</strong> when sharing on social media for a realm-exclusive reward.
            </p>

            {/* Coin Flip */}
            <div className="flip-container mx-auto w-32 h-32 mb-6 group">
              <div className="flip-inner w-full h-full">
                <img
                  src="/images/the-marked-one-july.png"
                  alt="Coin Front"
                  className="flip-front object-contain w-full h-full rounded-lg"
                />
                <img
                  src="/images/the-marked-one-july.png"
                  alt="Coin Back"
                  className="flip-back object-contain w-full h-full rounded-lg"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
  <input
    id="nickname"
    name="nickname"
    type="text"
    value={nickname}
    onChange={(e) => setNickname(e.target.value)}
    placeholder="Nickname"
    className="w-full px-4 py-2 rounded bg-black/60 border border-white/30 text-white placeholder-gray-400"
  />

  <input
    id="book"
    name="book"
    type="text"
    value={book}
    onChange={(e) => setBook(e.target.value)}
    placeholder="Book Title"
    className="w-full px-4 py-2 rounded bg-black/60 border border-white/30 text-white placeholder-gray-400"
  />

  <textarea
    id="quote"
    name="quote"
    value={quote}
    onChange={(e) => setQuote(e.target.value)}
    placeholder="Favourite quote from the book"
    className="w-full px-4 py-2 rounded bg-black/60 border border-white/30 text-white placeholder-gray-400"
  />

  <select
    id="emoji"
    name="emoji"
    value={emoji}
    onChange={(e) => setEmoji(e.target.value)}
    className="w-full px-4 py-2 rounded bg-black/60 border border-white/30 text-white"
  >
    <option value="✨">✨ Sparkle</option>
    <option value="🔥">🔥 Fire</option>
    <option value="🌙">🌙 Moon</option>
    <option value="🖤">🖤 Heart</option>
    <option value="🦊">🦊 Fox</option>
  </select>

  <p className="text-gray-300 mb-4">
    Tap submit to unlock your completed quest badge—perfect for sharing your mark on social media.
  </p>

  <button
    type="submit"
    className="w-full py-2 bg-amber-700 hover:bg-amber-600 rounded text-white"
  >
    Submit Entry
  </button>
</form>
          </div>
        </section>

        {/* Completed Entries */}
        <div className="glass-panel p-6 border border-amber-700 rounded-xl shadow-md">
          <h3 className="text-2xl text-amber-400 mb-4">
            ✅ Completed by {completed.length} Marked Ones
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {completed.length > 0 ? (
              completed.map((entry, index) => (
                <div
                  key={entry.id || index}
                  className="bg-white/5 border border-white/10 rounded p-4 relative card-glow"
                >
                  <div className="text-xl mb-1">
                    {entry.emoji} {entry.nickname}
                  </div>
                  <div className="text-sm italic text-amber-300 mb-1">
                    {entry.book}
                  </div>
                  <blockquote className="text-sm text-gray-300 mb-2">
                    “{entry.quote}”
                  </blockquote>
                  <button
                    onClick={() => handleLike(entry.id, entry.likes || 0)}
                    className="absolute top-2 right-2 text-amber-400 hover:text-amber-300 text-sm"
                  >
                    ❤️ {entry.likes || 0}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No entries yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
