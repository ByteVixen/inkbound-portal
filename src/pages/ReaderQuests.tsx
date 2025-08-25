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
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";
import VantaBackground from "../components/VantaBackground";

type CompletedEntry = {
  id: string;
  nickname: string;
  book: string;
  quote: string;
  emoji: string;
  likes: number;
  timestamp?: any; // Firestore Timestamp
};

type QuestDoc = {
  title?: string;
  description?: string; // you can put markdown/plain text here
  startDate?: string;   // yyyy-mm-dd
  // add other fields in future if you like
};

export default function ReaderQuests() {
  const [nickname, setNickname] = useState("");
  const [book, setBook] = useState("");
  const [quote, setQuote] = useState("");
  const [emoji, setEmoji] = useState("✨");
  const [completed, setCompleted] = useState<CompletedEntry[]>([]);
  const [quest, setQuest] = useState<QuestDoc | null>(null);
  const [loadingQuest, setLoadingQuest] = useState(true);
  const [sortBy, setSortBy] = useState<"newest" | "top">("newest");
  const [loadingEntries, setLoadingEntries] = useState(true);

  // 🔮 Fetch current quest once on mount
  useEffect(() => {
    const loadQuest = async () => {
      try {
        const snap = await getDoc(doc(db, "site_content", "current_quest"));
        if (snap.exists()) {
          setQuest(snap.data() as QuestDoc);
        } else {
          setQuest(null);
        }
      } catch (e) {
        console.error("Failed to load current quest:", e);
        setQuest(null);
      } finally {
        setLoadingQuest(false);
      }
    };
    loadQuest();
  }, []);

  // 🔁 Stream completed quests with sorting
  useEffect(() => {
    setLoadingEntries(true);
    const q =
      sortBy === "top"
        ? query(collection(db, "completed_quests"), orderBy("likes", "desc"))
        : query(collection(db, "completed_quests"), orderBy("timestamp", "desc"));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const entries = snapshot.docs.map((d) => {
          const data = d.data() as any;
          return {
            id: d.id,
            nickname: data.nickname,
            book: data.book,
            quote: data.quote,
            emoji: data.emoji,
            likes: typeof data.likes === "number" ? data.likes : 0,
            timestamp: data.timestamp,
          } as CompletedEntry;
        });
        setCompleted(entries);
        setLoadingEntries(false);
      },
      (err) => {
        console.error("Failed to stream completed quests:", err);
        setCompleted([]);
        setLoadingEntries(false);
      }
    );
    return () => unsub();
  }, [sortBy]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !book.trim() || !quote.trim()) return;
    try {
      await addDoc(collection(db, "completed_quests"), {
        nickname: nickname.trim(),
        book: book.trim(),
        quote: quote.trim(),
        emoji,
        likes: 0,
        timestamp: serverTimestamp(),
      });
      // reset form
      setNickname("");
      setBook("");
      setQuote("");
      setEmoji("✨");
      // optional badge download
      downloadImage();
    } catch (e) {
      console.error("Error adding completion:", e);
    }
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
    link.href = "/images/july-quest-complete.png"; // change this per month if you like
    link.download = "Inkbound-Quest.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl text-glow text-center mb-8">📜 Reader Quests</h1>

        {/* Quest Section */}
        <section className="mb-12">
          <div className="glass-panel border border-amber-700 p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl text-amber-400 mb-2">
              {loadingQuest ? "Loading quest…" : quest?.title || "Current Quest"}
            </h2>
            <p className="text-gray-300 mb-4 whitespace-pre-line">
              {loadingQuest
                ? "Please wait…"
                : quest?.description || "The next quest will be revealed soon…"}
            </p>

            {/* Coin Flip (static image for now) */}
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

            {/* Submit Form */}
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
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="text-2xl text-amber-400">
              ✅ Completed by {completed.length} Marked Ones
            </h3>

            {/* Sort control */}
            <label className="text-sm text-gray-300 flex items-center gap-2">
              Sort:
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "newest" | "top")}
                className="bg-black/60 border border-white/30 text-white px-2 py-1 rounded"
              >
                <option value="newest">Newest</option>
                <option value="top">Top (likes)</option>
              </select>
            </label>
          </div>

          {loadingEntries ? (
            <p className="text-gray-400 italic">Loading entries…</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {completed.length > 0 ? (
                completed.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white/5 border border-white/10 rounded p-4 relative card-glow"
                  >
                    <div className="text-xl mb-1">
                      {entry.emoji} {entry.nickname}
                    </div>
                    <div className="text-sm italic text-amber-300 mb-1">{entry.book}</div>
                    <blockquote className="text-sm text-gray-300 mb-2">“{entry.quote}”</blockquote>
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
          )}
        </div>
      </div>
    </div>
  );
}
