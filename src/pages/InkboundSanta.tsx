// src/pages/InkboundSanta.tsx

import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase"; // or "../lib/firebase" if that's your path

type ChildInfo = {
  name: string;
  age: string;
  favouriteThings: string;
  christmasWish: string;
  secretForSanta: string;
};

type SantaSlot = {
  value: string; // "16:00" etc
  label: string; // "4:00 – 4:10 pm"
};

const SANTA_TIME_SLOTS: SantaSlot[] = [
  { value: "16:00", label: "4:00 – 4:10 pm" },
  { value: "16:10", label: "4:10 – 4:20 pm" },
  { value: "16:20", label: "4:20 – 4:30 pm" },
  { value: "16:30", label: "4:30 – 4:40 pm" },
  { value: "16:40", label: "4:40 – 4:50 pm" },
  { value: "16:50", label: "4:50 – 5:00 pm" },
  { value: "17:00", label: "5:00 – 5:10 pm" },
  { value: "17:10", label: "5:10 – 5:20 pm" },
  { value: "17:20", label: "5:20 – 5:30 pm" },
  { value: "17:30", label: "5:30 – 5:40 pm" },
  { value: "17:40", label: "5:40 – 5:50 pm" },
  { value: "17:50", label: "5:50 – 6:00 pm" },
  { value: "18:00", label: "6:00 – 6:10 pm" },
  { value: "18:10", label: "6:10 – 6:20 pm" },
  { value: "18:20", label: "6:20 – 6:30 pm" },
  { value: "18:30", label: "6:30 – 6:40 pm" },
  { value: "18:40", label: "6:40 – 6:50 pm" },
  { value: "18:50", label: "6:50 – 7:00 pm" },
];

const InkboundSanta: React.FC = () => {
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [children, setChildren] = useState<ChildInfo[]>([
    {
      name: "",
      age: "",
      favouriteThings: "",
      christmasWish: "",
      secretForSanta: "",
    },
  ]);
  const [preferredSlot, setPreferredSlot] = useState("");
  const [wantsPhoto, setWantsPhoto] = useState(false);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Map of slotId -> taken?
  const [slotTakenMap, setSlotTakenMap] = useState<Record<string, boolean>>({});

// 🔍 Listen to bookings and mark which slots are taken
useEffect(() => {
  const colRef = collection(db, "inkbound_santa_bookings");

  const unsubscribe = onSnapshot(
    colRef,
    (snapshot) => {
      const map: Record<string, boolean> = {};

      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as { preferredSlot?: string };
        if (data.preferredSlot) {
          // If any booking uses this slot, mark it as taken
          map[data.preferredSlot] = true;
        }
      });

      setSlotTakenMap(map);
    },
    (err) => {
      console.error("Error listening to santa bookings:", err);
    }
  );

  return () => unsubscribe();
}, []);





  const totalChildren = children.filter(
    (c) => c.name.trim() !== "" || c.age.trim() !== ""
  ).length;

  const totalCost = totalChildren * 5;

  const updateChild = (index: number, field: keyof ChildInfo, value: string) => {
    setChildren((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addChild = () => {
    setChildren((prev) => [
      ...prev,
      {
        name: "",
        age: "",
        favouriteThings: "",
        christmasWish: "",
        secretForSanta: "",
      },
    ]);
  };

  const removeChild = (index: number) => {
    setChildren((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!parentName.trim() || !email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }

    if (totalChildren === 0) {
      setError("Please add at least one child.");
      return;
    }

    if (!preferredSlot) {
      setError("Please choose a time slot.");
      return;
    }

    const slotIsTaken = slotTakenMap[preferredSlot];
    if (slotIsTaken) {
      setError("That time slot has just been taken. Please choose another.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        parentName,
        email,
        phone,
        children,
        preferredSlot,
        wantsPhoto,
        notes,
        totalChildren,
        totalCost,
        eventDate: "2025-12-16",
        status: "pending",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "inkbound_santa_bookings"), payload);

      setSubmitted(true);

      // Reset form
      setParentName("");
      setEmail("");
      setPhone("");
      setChildren([
        {
          name: "",
          age: "",
          favouriteThings: "",
          christmasWish: "",
          secretForSanta: "",
        },
      ]);
      setPreferredSlot("");
      setWantsPhoto(false);
      setNotes("");
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong submitting your booking. Please try again or contact the shop directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-[#050308] to-[#12020a] text-slate-100">
      {/* Glow overlay – a bit warmer & more festive */}
      <div className="pointer-events-none fixed inset-0 opacity-45 mix-blend-screen">
        <div className="absolute -top-32 left-0 h-72 w-72 rounded-full bg-[#e1a730]/18 blur-3xl" />
        <div className="absolute -top-10 right-4 h-64 w-64 rounded-full bg-[#76191e]/26 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-[#032b0f]/28 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 h-52 w-52 rounded-full bg-[#ffffff]/6 blur-3xl" />
      </div>

      {/* Content wrapper */}
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pt-16">
        {/* Top nav / breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.16em] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-px w-7 bg-slate-600" />
            <span>Inkbound Bookshop</span>
            <span className="text-slate-600">/</span>
            <span className="text-[#e1a730]">Inkbound Santa</span>
          </div>
          <div className="flex items-center gap-3 text-[0.7rem] text-slate-400">
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-600/70 bg-black/60 px-3 py-1">
              <span className="text-xs">🎄</span>
              <span>16 December • From 4pm • The Square, Gort</span>
            </span>
          </div>
        </div>

        {/* HERO */}
        <section className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(260px,2fr)] lg:items-start">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#76191e]/60 bg-black/60 px-4 py-1 text-[0.7rem] font-medium tracking-[0.18em] text-[#e1a730] shadow-[0_0_25px_rgba(118,25,30,0.55)]">
              ✦ HOLIDAY EVENT • INKBOUND SANTA • BOOKISH GIFTS 🎁
            </p>

            <h1 className="text-3xl font-semibold leading-tight text-slate-50 sm:text-4xl lg:text-5xl">
              Meet <span className="text-[#e1a730]">Inkbound Santa</span> beneath
              the fairy lights
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              The bookshop will be dressed in fairy lights, stories, and soft shadows. On{" "}
              <span className="font-semibold text-slate-100">
                Tuesday 16 December from 4pm
              </span>
              , Inkbound Santa will be waiting with time to listen, a cosy chair, and a{" "}
              <span className="font-semibold text-[#e1a730]">
                bookish gift for each child
              </span>
              . Booking keeps visits gentle, calm, and a world away from crowded grottos.
            </p>

            <div className="space-y-2 text-[0.8rem] text-slate-300">
              <p>
                • <span className="font-semibold">€5 per child</span> — includes a small
                bookish gift. <br />
                • A quieter, sensory-friendly Santa visit inside the bookshop. <br />
                • One booking per family — list all children attending below.
              </p>
            </div>

            {/* Festive tags */}
            <div className="flex flex-wrap gap-3 pt-2 text-[0.75rem] text-slate-300">
              <span className="rounded-full border border-slate-600/80 bg-black/60 px-3 py-1">
                ❄ Limited spaces • Booking required
              </span>
              <span className="rounded-full border border-[#e1a730]/70 bg-gradient-to-r from-[#76191e]/50 via-[#e1a730]/20 to-[#032b0f]/50 px-3 py-1 text-[#f6e7b7]">
                🎁 Includes bookish gift
              </span>
              <span className="rounded-full border border-slate-600/80 bg-black/60 px-3 py-1">
                📚 Cosy Christmas corner in-store
              </span>
            </div>

            {/* Little garland line */}
            <div className="flex items-center gap-1 text-[0.65rem] text-slate-500 pt-1">
              <span>✨</span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#76191e]/60 via-[#e1a730]/60 to-[#032b0f]/60" />
              <span>✨</span>
            </div>
          </div>

          {/* Side panel / info card */}
          <aside className="relative rounded-3xl border border-[#76191e]/60 bg-black/70 p-5 shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur-md">
            <div className="absolute -top-3 right-6 flex h-7 w-7 items-center justify-center rounded-full border border-[#e1a730]/80 bg-black/90 text-center text-[0.7rem] leading-none text-[#e1a730] shadow-[0_0_18px_rgba(225,167,48,0.9)]">
              ✦
            </div>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#e1a730]">
              What to expect
            </h2>
            <p className="mb-3 text-[0.8rem] leading-relaxed text-slate-300">
              Think fairy lights, stacked books, and a quiet corner away from the rush.
              Your child or children will have a few minutes to talk to Santa without
              pressure, noise, or a long queue watching. The details you share below help
              Santa greet them like he&apos;s been reading about them all year.
            </p>
            <ul className="mb-4 space-y-1.5 text-[0.75rem] text-slate-300">
              <li>• €5 per child — paid on booking.</li>
              <li>• Each child leaves with a small bookish gift.</li>
              <li>• Gentle, bookish atmosphere — no blaring music or big crowd.</li>
            </ul>
            <div className="rounded-2xl border border-slate-700/80 bg-gradient-to-br from-black/95 via-[#12020a] to-[#032b0f] px-4 py-3 text-[0.7rem] text-slate-200">
              <p className="font-semibold text-[#e1a730] uppercase tracking-[0.16em] mb-1 flex items-center gap-1">
                <span>📸</span> Photos & privacy
              </p>
              <p>
                We can take a quick photo during your visit and email it to you if
                requested. No images of children will ever be shared on our socials or
                website. Their moment stays theirs.
              </p>
            </div>
          </aside>
        </section>

        {/* FORM SECTION */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
            Book your visit with Inkbound Santa
          </h2>
          <p className="text-[0.8rem] text-slate-300 max-w-2xl">
            Please fill in the details below so we can prepare for your visit. The more
            you share, the easier it is for Santa to make each child feel seen, safe, and
            a little bit spellbound.
          </p>

          {submitted ? (
            <div className="max-w-3xl rounded-2xl border border-emerald-500/60 bg-black/60 px-6 py-5 text-sm text-emerald-100 shadow-[0_0_30px_rgba(3,43,15,0.7)]">
              <h3 className="mb-1 text-lg font-semibold flex items-center gap-2">
                <span>✅</span>
                <span>Your visit with Inkbound Santa is booked</span>
              </h3>
              <p className="text-[0.85rem] text-emerald-50/90">
                Thank you for booking. You should receive a confirmation shortly. If you
                need to change anything, please contact the bookshop and mention your
                Inkbound Santa booking for{" "}
                <span className="font-semibold text-emerald-200">16 December</span>.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-3xl rounded-2xl border border-[#e1a730]/35 bg-black/70 backdrop-blur p-6 md:p-8 space-y-8 shadow-[0_0_35px_rgba(0,0,0,0.85)]"
            >
              {error && (
                <div className="rounded-xl border border-red-500/70 bg-red-500/15 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              )}

              {/* Parent / Guardian */}
              <section className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 flex items-center gap-2">
                  <span className="text-sm">👪</span>
                  <span>Parent / Guardian details</span>
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-200">
                      Name <span className="text-[#e1a730]">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/80"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-200">
                      Email address <span className="text-[#e1a730]">*</span>
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/80"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-medium text-slate-200">
                      Phone number (optional)
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/80"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </section>

              {/* Children */}
              <section className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 flex items-center gap-2">
                    <span className="text-sm">🎅</span>
                    <span>Child / children attending</span>
                  </h3>
                  <button
                    type="button"
                    onClick={addChild}
                    className="text-[0.7rem] px-3 py-1.5 rounded-full border border-amber-400/70 bg-amber-400/10 hover:bg-amber-400/25 transition"
                  >
                    + Add another child
                  </button>
                </div>
                <p className="text-[0.7rem] text-slate-400">
                  Add details for each child attending. Santa will use this to greet them
                  by name and pick up on the little things that make them light up.
                </p>

                <div className="space-y-6">
                  {children.map((child, index) => (
                    <div
                      key={index}
                      className="relative rounded-2xl border border-white/12 bg-black/55 px-4 py-4 space-y-4"
                    >
                      {children.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeChild(index)}
                          className="absolute right-3 top-3 text-[0.65rem] px-2 py-0.5 rounded-full border border-white/25 text-white/70 hover:bg-white/10"
                        >
                          Remove
                        </button>
                      )}
                      <h4 className="flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[#e1a730]">
                        <span className="text-xs">⭐</span>
                        <span>Child {index + 1}</span>
                      </h4>

                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-1">
                          <label className="text-[0.7rem] font-medium text-slate-200">
                            Name
                          </label>
                          <input
                            type="text"
                            className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/80"
                            value={child.name}
                            onChange={(e) =>
                              updateChild(index, "name", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[0.7rem] font-medium text-slate-200">
                            Age
                          </label>
                          <input
                            type="number"
                            min="0"
                            className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/80"
                            value={child.age}
                            onChange={(e) =>
                              updateChild(index, "age", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[0.7rem] font-medium text-slate-200">
                          Favourite things
                        </label>
                        <textarea
                          className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/80"
                          rows={2}
                          placeholder="Favourite book or character, favourite animal, hobbies, or something they’re obsessed with right now."
                          value={child.favouriteThings}
                          onChange={(e) =>
                            updateChild(index, "favouriteThings", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[0.7rem] font-medium text-slate-200">
                          Christmas wish
                        </label>
                        <textarea
                          className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/80"
                          rows={2}
                          placeholder="What they’re hoping for this year. This stays strictly between Santa and the elves."
                          value={child.christmasWish}
                          onChange={(e) =>
                            updateChild(index, "christmasWish", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[0.7rem] font-medium text-slate-200">
                          A secret for Santa
                        </label>
                        <textarea
                          className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/80"
                          rows={2}
                          placeholder="Something only Santa would know — a nickname, bedtime ritual, or funny habit."
                          value={child.secretForSanta}
                          onChange={(e) =>
                            updateChild(index, "secretForSanta", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Booking details */}
              <section className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 flex items-center gap-2">
                  <span className="text-sm">🕯</span>
                  <span>Booking details</span>
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[0.7rem] font-medium text-slate-200">
                      Preferred time slot <span className="text-[#e1a730]">*</span>
                    </label>
                    <select
                      className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/80"
                      value={preferredSlot}
                      onChange={(e) => setPreferredSlot(e.target.value)}
                      required
                    >
                      <option value="">Select a time</option>
                      {SANTA_TIME_SLOTS.map((slot) => {
                        const isTaken = slotTakenMap[slot.value];
                        return (
                          <option
                            key={slot.value}
                            value={slot.value}
                            disabled={isTaken}
                          >
                            {slot.label} {isTaken ? "— FULL" : ""}
                          </option>
                        );
                      })}
                    </select>
                    <p className="text-[0.65rem] text-slate-500 mt-1">
                      We&apos;ll confirm your exact time by email. Slots marked FULL are no
                      longer available.
                    </p>
                  </div>
                  <div className="space-y-1 text-sm rounded-2xl border border-slate-700/70 bg-black/60 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Number of children</span>
                      <span className="font-mono text-[#e1a730]">
                        {totalChildren}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Total (€5 per child)</span>
                      <span className="font-mono text-[#e1a730]">
                        €{totalCost}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Photography & notes */}
              <section className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 flex items-center gap-2">
                    <span className="text-sm">📸</span>
                    <span>Photography & memories</span>
                  </h3>
                  <p className="text-[0.75rem] text-slate-300">
                    Photos may be taken during your child&apos;s visit with Inkbound
                    Santa. These are for families only and are never shared publicly.
                  </p>
                  <label className="flex items-start gap-2 text-[0.8rem] text-slate-200">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-white/30 bg-black/70"
                      checked={wantsPhoto}
                      onChange={(e) => setWantsPhoto(e.target.checked)}
                    />
                    <span>
                      I would like a digital Santa photo emailed to me after the visit.
                    </span>
                  </label>
                  <p className="text-[0.7rem] text-slate-400">
                    No images of children will be shared on our social media or website.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 flex items-center gap-2">
                    <span className="text-sm">✨</span>
                    <span>Anything Santa should be aware of</span>
                  </h3>
                  <textarea
                    className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/80"
                    rows={3}
                    placeholder="Optional — shyness, sensory needs, allergies, or anything that will help Santa make the moment special."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </section>

              {/* Submit row */}
              <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-[0.8rem] text-slate-300">
                  <div>
                    <span className="font-medium text-slate-100">
                      Total due on booking:
                    </span>{" "}
                    <span className="font-semibold text-[#e1a730]">
                      €{totalCost}
                    </span>
                  </div>
                  <div className="text-[0.7rem] text-slate-400">
                    €5 per child — includes a small bookish gift to take home.
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] border border-amber-400/90 bg-gradient-to-r from-[#76191e]/70 via-[#e1a730]/30 to-[#032b0f]/80 hover:from-[#8b2228]/80 hover:via-[#f0c25a]/40 hover:to-[#064221]/90 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-[0_0_24px_rgba(225,167,48,0.55)]"
                >
                  {submitting ? "Submitting..." : "Confirm booking"}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default InkboundSanta;
