// src/pages/ReaderAdventure.tsx
import { useEffect, useMemo, useState } from "react";
import VantaBackground from "../components/VantaBackground";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  runTransaction,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

// ─────────────────────────────────────────────────────────────
// Story data (edit/extend freely)
// Each node has options; each option points to next node by id.
// End nodes have options: [].
// ─────────────────────────────────────────────────────────────
type Option = { id: string; label: string; nextId: string | null };
type Node = { id: string; title: string; text: string; options: Option[] };

const ADVENTURE: Record<string, Node> = {
  start: {
    id: "start",
    title: "The Door of Ink",
    text:
      "In the heart of the stacks, a door ripples like wet ink. A brass plaque reads: SOME STORIES FIND YOU.",
    options: [
      { id: "A", label: "Push the door", nextId: "hall" },
      { id: "B", label: "Knock three times", nextId: "keys" },
    ],
  },
  hall: {
    id: "hall",
    title: "Whispering Hall",
    text:
      "Shelves lean inward. Book spines murmur maps and names. A silver thread hums under your fingers.",
    options: [
      { id: "A", label: "Follow the thread", nextId: "thread" },
      { id: "B", label: "Climb the ladder", nextId: "sky" },
    ],
  },
  keys: {
    id: "keys",
    title: "A Ring of Keys",
    text:
      "The door hands you keys that are also commas that are also moons. One is warm. One is weightless.",
    options: [
      { id: "A", label: "Warm key", nextId: "hearth" },
      { id: "B", label: "Weightless key", nextId: "void" },
    ],
  },
  thread: {
    id: "thread",
    title: "Thread of Names",
    text:
      "The thread knots around a name you haven't yet earned. It pulls toward a locked reading desk.",
    options: [
      { id: "A", label: "Cut the thread", nextId: "cut" },
      { id: "B", label: "Trust it", nextId: "trust" },
    ],
  },
  sky: {
    id: "sky",
    title: "Attic of Weathered Stars",
    text:
      "A skylight blooms with constellations. One blinks like a cursor waiting. It winks back.",
    options: [
      { id: "A", label: "Trace the constellation", nextId: "sigil" },
      { id: "B", label: "Open the skylight", nextId: "glide" },
    ],
  },
  hearth: {
    id: "hearth",
    title: "Hearth of First Lines",
    text:
      "A fire made of first sentences. Your breath adds one more. The room hushes to listen.",
    options: [
      { id: "A", label: "Whisper your name", nextId: "sigil" },
      { id: "B", label: "Whisper a wish", nextId: "wish" },
    ],
  },
  void: {
    id: "void",
    title: "The Kindly Void",
    text:
      "Weightless shelves drift like jellyfish. A book opens itself. The pages smell like rain.",
    options: [
      { id: "A", label: "Step inside the book", nextId: "glide" },
      { id: "B", label: "Close it gently", nextId: "trust" },
    ],
  },
  cut: {
    id: "cut",
    title: "A Clean Sever",
    text:
      "You cut the thread. It becomes a line of poetry and follows you anyway.",
    options: [
      { id: "A", label: "Pocket the line", nextId: "wish" },
      { id: "B", label: "Tie it to your wrist", nextId: "sigil" },
    ],
  },
  trust: {
    id: "trust",
    title: "The Thread Bears You",
    text:
      "It tugs through the stacks to a sunlit table. A cup of tea is already cooling.",
    options: [
      { id: "A", label: "Sip and read", nextId: "ending_haven" },
      { id: "B", label: "Leave it for someone else", nextId: "ending_pass" },
    ],
  },
  sigil: {
    id: "sigil",
    title: "Sigil of Your Path",
    text:
      "The globe of the shop spins in the glass. Lines connect the choices you made. A shape glows.",
    options: [
      { id: "A", label: "Keep the sigil", nextId: "ending_haven" },
      { id: "B", label: "Cast it skyward", nextId: "ending_sky" },
    ],
  },
  glide: {
    id: "glide",
    title: "Glide Between Stacks",
    text:
      "For a moment you are paper, then wind, then you again—lighter, and somehow truer.",
    options: [
      { id: "A", label: "Land by the door", nextId: "ending_pass" },
      { id: "B", label: "Land by the fire", nextId: "ending_haven" },
    ],
  },
  wish: {
    id: "wish",
    title: "Wish Carefully",
    text:
      "Ink glows like constellations in a shallow bowl. Your wish takes the shape of a bookmark.",
    options: [
      { id: "A", label: "Place it in a book", nextId: "ending_haven" },
      { id: "B", label: "Tuck it behind your ear", nextId: "ending_sky" },
    ],
  },
  ending_haven: {
    id: "ending_haven",
    title: "Haven Found",
    text:
      "You leave with a page that knows your name. Outside, the town smells like rain on stone.",
    options: [],
  },
  ending_pass: {
    id: "ending_pass",
    title: "Pass It On",
    text:
      "You leave the table set for someone else. The door of ink sighs, content.",
    options: [],
  },
  ending_sky: {
    id: "ending_sky",
    title: "Skyletter",
    text:
      "Your sigil joins the sky over Gort. Somewhere, a reader sees it and smiles.",
    options: [],
  },
};

// ─────────────────────────────────────────────────────────────
// Firestore helpers
// Votes live in collection "reader_adventure_votes"
// docId = `${nodeId}_${optionId}` with fields: { nodeId, optionId, count }
// ─────────────────────────────────────────────────────────────
type VoteDoc = { nodeId: string; optionId: string; count: number };

function voteDocRef(nodeId: string, optionId: string) {
  return doc(db, "reader_adventure_votes", `${nodeId}_${optionId}`);
}

export default function ReaderAdventure() {
  const [currentId, setCurrentId] = useState<string>("start");
  const [path, setPath] = useState<string[]>([]); // sequence of optionIds (A/B/etc)
  const node = ADVENTURE[currentId];

  // Live vote counts for current node
  const [counts, setCounts] = useState<Record<string, number>>({}); // optionId -> count
  const totalVotes = useMemo(
    () => Object.values(counts).reduce((a, b) => a + b, 0),
    [counts]
  );

  // Listen to live vote counts for current node
  useEffect(() => {
    if (!node || node.options.length === 0) {
      setCounts({});
      return;
    }
    const qRef = query(
      collection(db, "reader_adventure_votes"),
      where("nodeId", "==", node.id)
    );
    const unsub = onSnapshot(qRef, (snap) => {
      const next: Record<string, number> = {};
      snap.forEach((d) => {
        const v = d.data() as VoteDoc;
        next[v.optionId] = v.count ?? 0;
      });
      // Ensure 0s exist for options not yet voted
      node.options.forEach((opt) => {
        if (!(opt.id in next)) next[opt.id] = 0;
      });
      setCounts(next);
    });
    return () => unsub();
  }, [currentId]);

  // Cast a vote (transaction-safe)
  const castVote = async (option: Option) => {
    try {
      await runTransaction(db, async (tx) => {
        const ref = voteDocRef(node.id, option.id);
        const snap = await tx.get(ref);
        if (!snap.exists()) {
          tx.set(ref, { nodeId: node.id, optionId: option.id, count: 1 } as VoteDoc);
        } else {
          const cur = (snap.data() as VoteDoc).count || 0;
          tx.update(ref, { count: cur + 1 });
        }
      });

      // Advance story locally
      setPath((p) => [...p, option.id]);
      if (option.nextId) setCurrentId(option.nextId);
    } catch (e) {
      console.error("Failed to cast vote:", e);
      // allow local advance anyway
      setPath((p) => [...p, option.id]);
      if (option.nextId) setCurrentId(option.nextId);
    }
  };

  const restart = () => {
    setCurrentId("start");
    setPath([]);
  };

  // Pretty sigil code (e.g., A-B-A → “A•B•A”)
  const sigil = useMemo(() => (path.length ? path.join("•") : "—"), [path]);

  // Neon progress width per option
  const pct = (optId: string) =>
    totalVotes === 0 ? 0 : Math.round(((counts[optId] || 0) / totalVotes) * 100);

  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-8 border border-amber-700">
          <header className="mb-6">
            <h1 className="text-4xl font-light text-amber-500 text-glow">
              The Crowd-Woven Tale
            </h1>
            <p className="text-gray-300 mt-2">
              Choose at each fork. Your vote updates the glowing bars in real time. No two paths feel quite the same.
            </p>
          </header>

          {/* Neon timeline rail */}
          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/60 via-amber-500/25 to-transparent pointer-events-none" />

            {/* Node card */}
            <div className="relative pl-8">
              {/* Pin */}
              <div className="absolute left-2 top-4">
                <span className="block w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)]">
                </span>
              </div>

              <div className="rounded-lg border border-amber-700/50 bg-black/30 p-5">
                <h2 className="text-2xl text-amber-300">{node.title}</h2>
                <p className="text-gray-200 mt-2">{node.text}</p>

                {/* If end node */}
                {node.options.length === 0 ? (
                  <div className="mt-6">
                    <div className="rounded-lg border border-emerald-700 bg-emerald-900/20 p-4">
                      <div className="text-emerald-200 text-sm">Your sigil (path):</div>
                      <div className="text-2xl text-emerald-300 tracking-widest mt-1">{sigil}</div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        className="px-4 py-2 rounded bg-amber-700 hover:bg-amber-600 text-black font-semibold"
                        onClick={restart}
                      >
                        Begin Again
                      </button>
                    </div>
                  </div>
                ) : (
                  <> 
                    {/* Live bars */}
                    <div className="mt-5 space-y-3">
                      {node.options.map((opt) => (
                        <div key={opt.id}>
                          <div className="flex items-baseline justify-between">
                            <div className="text-sm text-amber-200">
                              Choice {opt.id}: <span className="text-white/90">{opt.label}</span>
                            </div>
                            <div className="text-xs text-gray-400">{pct(opt.id)}%</div>
                          </div>
                          <div className="h-2 rounded bg-white/10 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.5)] transition-all duration-500"
                              style={{ width: `${pct(opt.id)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {node.options.map((opt) => (
                        <button
                          key={`btn-${opt.id}`}
                          onClick={() => castVote(opt)}
                          className="relative p-4 rounded-lg border border-amber-700 bg-amber-900/10 hover:bg-amber-900/25 text-left group transition"
                        >
                          <div className="text-sm tracking-wide text-amber-200">
                            CAST CHOICE {opt.id}
                          </div>
                          <div className="text-lg">{opt.label}</div>
                          <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                        </button>
                      ))}
                    </div>

                    {/* Path crumbs */}
                    {path.length > 0 && (
                      <div className="mt-6 text-sm text-gray-400">
                        Your path so far:&nbsp;
                        <span className="text-amber-300 tracking-wider">{sigil}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 text-xs text-gray-400">
            Tip: Refresh to see global votes shift as more readers choose.
          </div>
        </div>
      </div>
    </div>
  );
}
