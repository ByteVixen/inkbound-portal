// src/pages/TikTokathon.tsx
import { useEffect, useMemo, useState } from "react";
import VantaBackground from "../components/VantaBackground";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
} from "firebase/firestore";
import { db } from "../firebase";

type Slot = {
  id: string;
  index: number;

  // Preferred (new schema)
  startUtc?: string;     // ISO timestamp of slot start
  durationMin?: number;  // should be 20

  // Legacy fallback labels (if startUtc not present)
  labelIST?: string;
  labelEST?: string;
  labelCST?: string;

  taken: boolean;
  takenByName?: string;
  bookTitle?: string;
  email?: string | null;
  claimedAt?: any;
};

type FilterKind = "all" | "available";

// Timezones
const TZ_IE = "Europe/Dublin";     // Irish time
const TZ_ET = "America/New_York";  // Eastern (US)
const TZ_CT = "America/Chicago";   // Central (US)

export default function TikTokathon() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState<FilterKind>("all");
  const [selected, setSelected] = useState<Slot | null>(null);
  const [form, setForm] = useState({ name: "", book: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  // ---------- Load slots ----------
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "tiktokathon_slots"), orderBy("index", "asc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const rows = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Slot[];
        setSlots(rows);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load slots:", err);
        setSlots([]);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  // ---------- Time formatting helpers ----------
  const fmt = (d: Date, tz: string, opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { timeZone: tz, ...opts }).format(d);

  const hhmm = (d: Date, tz: string) =>
    fmt(d, tz, { hour12: false, hour: "2-digit", minute: "2-digit" });

  const ymd = (d: Date, tz: string) =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d); // YYYY-MM-DD

  const niceDay = (d: Date, tz: string) =>
    fmt(d, tz, { weekday: "short", day: "2-digit", month: "short" }); // e.g. Sat, 04 Oct

  const safeDate = (iso?: string): Date | null => {
    if (!iso) return null;
    const d = new Date(iso);
    return isNaN(d.getTime()) ? null : d;
  };

  const getLabels = (s: Slot) => {
    const d = safeDate(s.startUtc);
    if (d) {
      return { d, IE: hhmm(d, TZ_IE), ET: hhmm(d, TZ_ET), CT: hhmm(d, TZ_CT) };
    }
    return {
      d: null as unknown as Date,
      IE: s.labelIST ?? "—",
      ET: s.labelEST ?? "—",
      CT: s.labelCST ?? "—",
    };
  };

  // ---------- Filter + Group (by Irish date+hour) ----------
  const filtered = useMemo(
    () => (filter === "available" ? slots.filter((s) => !s.taken) : slots),
    [slots, filter]
  );

  type Group = { key: string; header: string; items: Slot[] };
  const groups: Group[] = useMemo(() => {
    const map = new Map<string, Group>();

    filtered.forEach((s) => {
      const L = getLabels(s);

      let key: string;
      let header: string;

      if (L.d) {
        const date = ymd(L.d, TZ_IE); // YYYY-MM-DD (IE)
        const hour = fmt(L.d, TZ_IE, { hour12: false, hour: "2-digit" }); // HH
        key = `${date} ${hour}:00`;
        header = `IE ${niceDay(L.d, TZ_IE)} • ${hour}:00`;
      } else {
        // Legacy grouping by IE hour
        const hour = (L.IE && L.IE.includes(":")) ? L.IE.slice(0, 2) : "??";
        key = `legacy ${hour}:00`;
        header = `IE ${hour}:00`;
      }

      if (!map.has(key)) map.set(key, { key, header, items: [] });
      map.get(key)!.items.push(s);
    });

    return Array.from(map.values()).sort((a, b) => a.key.localeCompare(b.key));
  }, [filtered]);

  // ---------- Claim flow ----------
  const open = (slot: Slot) => {
    if (slot.taken) return;
    setSelected(slot);
    setForm({ name: "", book: "", email: "" });
    setFlash(null);
  };

  const claim = async () => {
    if (!selected) return;
    if (!form.name.trim() || !form.book.trim()) {
      setFlash("Please enter your name and book title.");
      return;
    }
    setSaving(true);
    setFlash(null);

    try {
      await runTransaction(db, async (tx) => {
        const ref = doc(db, "tiktokathon_slots", selected.id);
        const snap = await tx.get(ref);
        if (!snap.exists()) throw new Error("Slot not found.");
        const cur = snap.data() as Slot;
        if (cur.taken) throw new Error("Sorry, this slot was just taken.");

        tx.update(ref, {
          taken: true,
          takenByName: form.name.trim(),
          bookTitle: form.book.trim(),
          email: form.email.trim() || null,
          claimedAt: new Date(),
        });
      });

      setSelected(null);
      setFlash("🎉 Slot claimed! Watch for an email from us with details.");
      setTimeout(() => setFlash(null), 6000);
    } catch (e: any) {
      console.error(e);
      setFlash(e?.message || "Failed to claim slot.");
    } finally {
      setSaving(false);
    }
  };

  const total = slots.length;
  const openCount = slots.filter((s) => !s.taken).length;

  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-xl p-8 border border-amber-700">
          <h1 className="text-4xl font-light text-amber-500 text-glow mb-3 text-center">
            Inkbound TikTokathon — Book a Slot
          </h1>

          {/* 🌟 Donation blurb */}
          <div className="mb-6 text-center bg-amber-900/20 border border-amber-700 rounded-lg p-4">
            <p className="text-amber-200">
              This community live is free to join. If you’re able, please make a small donation to help
              launch the Inkbound Bookshop & online portal—<span className="font-semibold">any amount helps</span>.
            </p>
            <a
              href="https://www.gofundme.com/f/help-launch-inkbound-an-indie-fiction-bookshop-online"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 px-5 py-2 rounded-full bg-amber-700 hover:bg-amber-600 text-black font-semibold shadow transition"
            >
              Donate on GoFundMe
            </a>
            <p className="text-xs text-amber-200/80 mt-2 italic">
              If you can, donate before booking—thank you for supporting indie stories. 🖤
            </p>
          </div>

          <p className="text-center text-gray-300 mb-6">
            Running <span className="text-amber-300">24 hours</span> from{" "}
            <span className="text-amber-300">Oct 4, 12:00 (IE)</span> to{" "}
            <span className="text-amber-300">Oct 5, 12:00 (IE)</span>. All slots are{" "}
            <span className="text-amber-300">20 minutes</span>. Times show IE · ET · CT.
          </p>

          {/* Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Show:</span>
              <button
                className={`px-3 py-1 rounded border ${
                  filter === "all"
                    ? "border-amber-600 bg-amber-900/30 text-amber-200"
                    : "border-white/20 text-gray-300 hover:bg-white/5"
                }`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`px-3 py-1 rounded border ${
                  filter === "available"
                    ? "border-emerald-600 bg-emerald-900/30 text-emerald-200"
                    : "border-white/20 text-gray-300 hover:bg-white/5"
                }`}
                onClick={() => setFilter("available")}
              >
                Available Only
              </button>
            </div>

            <div className="text-sm text-gray-400">
              <span className="inline-block align-middle w-3 h-3 bg-emerald-700 rounded mr-1" />
              Available &nbsp;|&nbsp;
              <span className="inline-block align-middle w-3 h-3 bg-gray-700 rounded mr-1" />
              Taken &nbsp;•&nbsp; {openCount} / {total} open
            </div>
          </div>

          {/* Slots */}
          {loading ? (
            <p className="text-amber-300 text-center">Loading slots…</p>
          ) : groups.length === 0 ? (
            <p className="text-amber-300 text-center italic">No slots available.</p>
          ) : (
            <div className="space-y-8">
              {groups.map((g) => (
                <section key={g.key}>
                  {/* Sticky hour header */}
                  <div className="sticky top-20 z-10 -mx-8 px-8 py-2 bg-black/70 backdrop-blur border-l border-r border-amber-700">
                    <h2 className="text-amber-400 text-xl">{g.header}</h2>
                  </div>

                  {/* Hour grid */}
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {g.items.map((s) => {
                      const L = getLabels(s);
                      const isTaken = s.taken;
                      return (
                        <button
                          key={s.id}
                          onClick={() => open(s)}
                          disabled={isTaken}
                          className={`p-4 rounded-lg border text-left transition ${
                            isTaken
                              ? "border-gray-700 bg-black/30 text-gray-500 cursor-not-allowed"
                              : "border-emerald-600 bg-emerald-900/20 hover:bg-emerald-900/30"
                          }`}
                          title={
                            isTaken ? `Taken by ${s.takenByName ?? "—"}` : "Click to claim"
                          }
                        >
                          <div className="flex items-baseline justify-between">
                            <div className="font-semibold">
                              Slot #{s.index} —{" "}
                              <span className="text-amber-300">IE {L.IE}</span>
                            </div>
                            <span
                              className={`text-xs px-2 py-0.5 rounded ${
                                isTaken
                                  ? "bg-gray-700 text-gray-300"
                                  : "bg-emerald-700 text-emerald-100"
                              }`}
                            >
                              {isTaken ? "Taken" : "Available"}
                            </span>
                          </div>

                          <div className="text-xs text-gray-400 mt-1">
                            ET {L.ET} · CT {L.CT}
                          </div>

                          {isTaken && (
                            <div className="mt-2 text-sm text-gray-400">
                              by {s.takenByName ?? "—"}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* Flash message */}
          {flash && (
            <div className="mt-6 p-3 rounded border border-amber-700 bg-amber-900/20 text-amber-200">
              {flash}
            </div>
          )}
        </div>
      </div>

      {/* Claim modal */}
      {selected && (
        <div className="fixed inset-0 z-20 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-black/80 border border-amber-700 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl text-amber-400 mb-2">
              Claim Slot #{selected.index}
            </h2>
            {(() => {
              const L = getLabels(selected);
              return (
                <p className="text-sm text-gray-300 mb-4">
                  IE {L.IE} · ET {L.ET} · CT {L.CT}
                </p>
              );
            })()}

            <div className="space-y-3">
              <input
                className="w-full px-3 py-2 rounded bg-black/60 border border-white/20"
                placeholder="Your Name (shown publicly)"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="w-full px-3 py-2 rounded bg-black/60 border border-white/20"
                placeholder="Book Title"
                value={form.book}
                onChange={(e) => setForm({ ...form, book: e.target.value })}
              />
              <input
                className="w-full px-3 py-2 rounded bg-black/60 border border-white/20"
                placeholder="Email (optional, for reminders)"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="mt-4 flex gap-2 justify-end">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={claim}
                disabled={saving}
                className="px-4 py-2 bg-amber-700 hover:bg-amber-600 rounded"
              >
                {saving ? "Claiming…" : "Claim Slot"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
