import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

// Define type for a guestbook entry
interface GuestBookEntry {
  id: string;
  name: string;
  message: string;
  createdAt?: any;
}

export default function GuestBook() {
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const mapped: GuestBookEntry[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<GuestBookEntry, "id">),
      }));
      setEntries(mapped);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    await addDoc(collection(db, "guestbook"), {
      name: name.trim() || "Anonymous",
      message: message.trim(),
      createdAt: serverTimestamp(),
    });

    setName("");
    setMessage("");
  };

  return (
    <div className="relative z-10 max-w-2xl mx-auto mt-16 px-4 animate-fade-in">
      <div className="bg-black/30 backdrop-blur-md border border-amber-500 rounded-xl p-6 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
        <h2 className="text-2xl text-amber-400 font-bold text-center mb-6 tracking-wide">
          📖 Guest Book of the Inkbound
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="guestbook-name" className="block text-sm text-amber-200 mb-1">
              Name (optional)
            </label>
            <input
              id="guestbook-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name or nickname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-white/10 text-white placeholder-white/40 border border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label htmlFor="guestbook-message" className="block text-sm text-amber-200 mb-1">
              Message
            </label>
            <textarea
              id="guestbook-message"
              name="message"
              placeholder="Your message or wish for the launch..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 rounded bg-white/10 text-white placeholder-white/40 border border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              rows={3}
              autoComplete="off"
              required
            />
          </div>

          <button
            type="submit"
            className="relative inline-block w-full text-white font-bold py-2 px-4 rounded-full bg-amber-600 hover:bg-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.6)] transition-all duration-300 group"
          >
            <span className="relative z-10">🔮 Sign the Guest Book</span>
            <span className="absolute inset-0 rounded-full animate-pulse-glow bg-amber-600 opacity-20 blur-sm group-hover:opacity-30" />
          </button>
        </form>

        <div className="max-h-64 overflow-y-auto space-y-3 border-t border-amber-700 pt-4 mt-6">
          {entries.length === 0 && (
            <p className="text-amber-200 text-sm italic text-center">No entries yet... Be the first to sign ✨</p>
          )}
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white/5 p-3 rounded border border-amber-700 transition-all duration-300 hover:shadow-md"
            >
              <p className="text-white text-sm italic leading-snug">"{entry.message}"</p>
              <p className="text-right text-xs text-amber-300 mt-1">– {entry.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
