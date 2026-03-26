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
    <div className="relative z-10 mx-auto max-w-2xl animate-fade-in">
      <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl md:p-8">
        <div className="mb-6 text-center">
          <div className="text-xs uppercase tracking-[0.28em] text-[#c8a04e]">
            Leave a whisper
          </div>
          <h2 className="mt-3 text-2xl text-white md:text-3xl">
            The Inkbound Guest Book
          </h2>
          <p className="mt-3 text-sm leading-7 text-white/60">
            Leave a note, a blessing, or a small mark at the gate.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="guestbook-name"
              className="mb-2 block text-xs uppercase tracking-[0.18em] text-[#c8a04e]"
            >
              Name
            </label>
            <input
              id="guestbook-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name or nickname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#c8a04e]/40 focus:bg-white/10"
            />
          </div>

          <div>
            <label
              htmlFor="guestbook-message"
              className="mb-2 block text-xs uppercase tracking-[0.18em] text-[#c8a04e]"
            >
              Message
            </label>
            <textarea
              id="guestbook-message"
              name="message"
              placeholder="Your message or wish for the launch..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#c8a04e]/40 focus:bg-white/10"
              rows={4}
              autoComplete="off"
              required
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#c8a04e]/40 bg-[#c8a04e] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(200,160,78,0.2)]"
          >
            Sign the Guest Book
          </button>
        </form>

        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="mb-4 text-xs uppercase tracking-[0.22em] text-[#c8a04e]">
            Recent entries
          </div>

          <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
            {entries.length === 0 ? (
              <p className="text-center text-sm italic text-white/45">
                No entries yet... be the first to leave your mark.
              </p>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:border-[#c8a04e]/20 hover:bg-white/[0.06]"
                >
                  <p className="text-sm leading-7 text-white/82">
                    “{entry.message}”
                  </p>
                  <p className="mt-2 text-right text-xs uppercase tracking-[0.14em] text-[#c8a04e]">
                    — {entry.name}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}