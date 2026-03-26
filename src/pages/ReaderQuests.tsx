// src/pages/ReaderQuests.tsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import VantaBackground from "../components/VantaBackground";
import { ScrollText, Heart, Sparkles } from "lucide-react";

type CompletedEntry = {
  id: string;
  nickname: string;
  book: string;
  quote: string;
  emoji: string;
  likes: number;
  timestamp?: any;
};

const currentQuest = {
  title: "The Whisper Hunt",
  description:
    "Choose a book that has been sitting on your TBR for too long and finally begin it.\n\n" +
    "Read at least three chapters, find one line that lingers, and bring that quote back here.\n\n" +
    "To complete the quest, leave your nickname, the book title, your chosen quote, and the mark you want to leave beside it.\n\n" +
    "This is not about finishing fast. It is about following the pull of a story and returning with proof that it found you.",
};

export default function ReaderQuests() {
  const [nickname, setNickname] = useState("");
  const [book, setBook] = useState("");
  const [quote, setQuote] = useState("");
  const [emoji, setEmoji] = useState("✨");
  const [completed, setCompleted] = useState<CompletedEntry[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "top">("newest");
  const [loadingEntries, setLoadingEntries] = useState(true);

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

      setNickname("");
      setBook("");
      setQuote("");
      setEmoji("✨");

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
    link.href = "/images/july-quest-complete.png";
    link.download = "Inkbound-Quest.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050506] font-marcellus text-[#f5efe3]">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(82,58,133,0.08),transparent_20%),radial-gradient(circle_at_20%_80%,rgba(13,30,66,0.10),transparent_24%)]" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#c8a04e]/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {/* Hero */}
        <section className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/25 px-6 py-10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl md:px-10 md:py-14">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-xs uppercase tracking-[0.34em] text-[#c8a04e]">
              Reader Quest Board
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-tight text-white md:text-6xl">
              Reader Quests
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
              Step into the challenge, leave your mark, and join the readers
              already moving through the Inkbound world.
            </p>
          </div>
        </section>

        {/* Quest + Form */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
            <div className="inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
              <ScrollText className="h-6 w-6" />
            </div>

            <div className="mt-5 text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
              Current quest
            </div>

            <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
              {currentQuest.title}
            </h2>

            <p className="mt-4 whitespace-pre-line text-base leading-8 text-white/62">
              {currentQuest.description}
            </p>

            <div className="mt-8 flex justify-center">
              <div className="group relative h-36 w-36">
                <div className="absolute inset-0 rounded-full bg-[#c8a04e]/10 blur-2xl transition duration-500 group-hover:bg-[#c8a04e]/15" />
                <div className="relative h-full w-full overflow-hidden rounded-full border border-[#c8a04e]/20 bg-black/30 p-3">
                  <img
                    src="/images/the-marked-one-july.png"
                    alt="Quest sigil"
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
            <div className="text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
              Submit your mark
            </div>

            <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
              Complete the quest
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/60">
              Share the book, the line that stayed with you, and the mark you
              want to leave behind.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                id="nickname"
                name="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Nickname"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#c8a04e]/40 focus:bg-black/40"
              />

              <input
                id="book"
                name="book"
                type="text"
                value={book}
                onChange={(e) => setBook(e.target.value)}
                placeholder="Book title"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#c8a04e]/40 focus:bg-black/40"
              />

              <textarea
                id="quote"
                name="quote"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Favourite quote from the book"
                rows={4}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-[#c8a04e]/40 focus:bg-black/40"
              />

              <select
                id="emoji"
                name="emoji"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#c8a04e]/40 focus:bg-black/40"
              >
                <option value="✨">✨ Sparkle</option>
                <option value="🔥">🔥 Fire</option>
                <option value="🌙">🌙 Moon</option>
                <option value="🖤">🖤 Heart</option>
                <option value="🦊">🦊 Fox</option>
              </select>

              <p className="text-sm leading-7 text-white/50">
                Submit to unlock your completed quest badge and carry your mark
                back out into the wider world.
              </p>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#c8a04e]/40 bg-[#c8a04e] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(200,160,78,0.2)]"
              >
                <Sparkles className="h-4 w-4" />
                Submit Entry
              </button>
            </form>
          </div>
        </section>

        {/* Completed entries */}
        <section className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
                Completed entries
              </div>
              <h3 className="mt-2 font-serif text-3xl text-white md:text-4xl">
                Marked by {completed.length} reader{completed.length !== 1 && "s"}
              </h3>
            </div>

            <label className="flex items-center gap-3 text-sm text-white/60">
              Sort
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "newest" | "top")}
                className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none transition focus:border-[#c8a04e]/40"
              >
                <option value="newest">Newest</option>
                <option value="top">Top (likes)</option>
              </select>
            </label>
          </div>

          {loadingEntries ? (
            <p className="text-sm italic text-white/45">Loading entries…</p>
          ) : completed.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {completed.map((entry) => (
                <div
                  key={entry.id}
                  className="relative rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:border-[#c8a04e]/20 hover:bg-white/[0.06]"
                >
                  <div className="pr-16">
                    <div className="text-lg text-white">
                      {entry.emoji} {entry.nickname}
                    </div>
                    <div className="mt-1 text-sm italic text-[#f6dca0]">
                      {entry.book}
                    </div>
                    <blockquote className="mt-3 text-sm leading-7 text-white/62 italic">
                      “{entry.quote}”
                    </blockquote>
                  </div>

                  <button
                    onClick={() => handleLike(entry.id, entry.likes || 0)}
                    className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-sm text-[#f6dca0] transition hover:border-[#c8a04e]/30 hover:bg-black/35"
                  >
                    <Heart className="h-4 w-4" />
                    {entry.likes || 0}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-white/40">No entries yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}