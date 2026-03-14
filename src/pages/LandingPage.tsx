// src/pages/LandingPage.tsx
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VantaBackground from "../components/VantaBackground";
import CountdownBanner from "../components/CountdownBanner";
import GuestBook from "../components/GuestBook";
import { newsletterIssues } from "../data/newsletterIssues";

const TALLY_CLAIM_URL = "https://tally.so/r/PdD1ZV";
const HUNT_CODE = "MUG-GLINT-01"; // change whenever you want

export default function LandingPage() {
  const [showGuidebook, setShowGuidebook] = useState(false);
  const [showHuntModal, setShowHuntModal] = useState(false);
  const [showDecoyModal, setShowDecoyModal] = useState(false);

  const guidebookRef = useRef<HTMLDivElement>(null);
  const fakeUserCount = Math.floor(Math.random() * 12) + 5;
  const latestIssue = newsletterIssues[0];
  const handleGuidebookToggle = () => {
    setShowGuidebook(!showGuidebook);
    setTimeout(() => {
      guidebookRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  // Load Tally embed script once (safe even if it fails)
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://tally.so/widgets/embed.js"]'
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(HUNT_CODE);
    } catch {
      // fallback: do nothing (user can manually copy from the code block)
    }
  };

  const IMPRINT_CREDIT_LINE =
    "Inkbound Publishing (community imprint) - all rights retained by the author.";

  const copyImprintLine = async () => {
    try {
      await navigator.clipboard.writeText(IMPRINT_CREDIT_LINE);
    } catch {
      // no-op
    }
  };

  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Vanta Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Countdown Banner */}
      <CountdownBanner />

      {/* Logo */}
      <div className="relative z-10 text-center pt-10 animate-fade-in">
        <div className="mx-auto inline-block relative">
          <img
            src="/logo.png"
            alt="Inkbound Society Logo"
            className="w-48 sm:w-56 md:w-64 h-auto drop-shadow-xl"
          />

          {/* 🕵️ REAL hidden hotspot (opens claim modal) */}
          <button
            type="button"
            onClick={() => setShowHuntModal(true)}
            aria-label="Hidden Inkbound sigil"
            title="…"
            className="
              absolute
              top-[14%]
              right-[45%]
              h-4
              w-4
              rounded-full
              opacity-0
              cursor-pointer
              focus:opacity-100
              focus:outline-none
              focus:ring-2
              focus:ring-amber-300
              focus:ring-offset-2
              focus:ring-offset-transparent
            "
          />

          {/* 😈 DECOY hidden hotspot (opens decoy modal) */}
          <button
            type="button"
            onClick={() => setShowDecoyModal(true)}
            aria-label="Hidden decoy sigil"
            title="…"
            className="
              absolute
              top-[30%]
              left-[30%]
              h-4
              w-4
              rounded-full
              opacity-0
              cursor-pointer
              focus:opacity-100
              focus:outline-none
              focus:ring-2
              focus:ring-fuchsia-300
              focus:ring-offset-2
              focus:ring-offset-transparent
            "
          />
        </div>
      </div>

      {/* Hero */}
      <div className="relative z-10 text-center px-6 pb-10 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl font-light mb-4 text-glow">
          Some stories find you.
        </h1>
        <p className="text-lg text-gray-300 mb-4 opacity-80">
          Whisper your name. Join the Society.
        </p>
        <div className="text-sm text-gray-400 mb-6">
          {fakeUserCount} readers browsing right now...
        </div>
      </div>

      
{/* ✦ BLACK DIADEM FEATURE SECTION ✦ */}
<section className="relative py-24 border-t border-white/10 overflow-hidden">

  {/* Ambient golden aura — transparent */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/12 blur-3xl" />
    <div className="absolute left-1/3 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/10 blur-3xl" />
  </div>

  <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

    {/* Image Side */}
    <div className="relative flex justify-center">
      <div className="absolute inset-0 flex justify-center">
        <div className="h-[340px] w-[340px] rounded-full bg-amber-500/15 blur-3xl" />
      </div>

      <div className="glass-panel border border-amber-700/40 rounded-2xl p-6 md:p-7 bg-white/5 backdrop-blur-xl">
        <img
          src="/images/blackdiadem.png"
          alt="The Tiara Court – The Black Diadem Series"
          className="w-full max-w-md mx-auto drop-shadow-[0_0_30px_rgba(225,167,48,0.25)]"
          loading="lazy"
        />
      </div>
    </div>

    {/* Text Side */}
    <div className="glass-panel border border-amber-700/30 rounded-2xl p-8 md:p-10 bg-white/5 backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.22em] text-amber-300/90 mb-3">
        ✦ Collaborative Series ✦
      </p>

      <h2 className="text-4xl md:text-5xl font-serif mb-5 text-amber-400">
        The Tiara Court
      </h2>

      <p className="text-lg text-gray-200/90 leading-relaxed mb-6">
        A connected 14 book series of dark fairytale retelling novellas.
        Each story stands alone, yet every princess bears the same mark.
        And with every tale told, the Black Diadem loses another piece.
      </p>

      <p className="text-gray-300 mb-8">
        Release: <span className="text-amber-200">Halloween 2026</span>
      </p>

      <a
        href="/black-diadem"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-700 hover:bg-amber-600 text-white font-semibold uppercase tracking-[0.18em] shadow-[0_0_18px_rgba(225,167,48,0.55)] border border-amber-400/70 transition"
      >
        See the Court →
      </a>
    </div>
  </div>
</section>

{/* 📰 Inkbound Times */}
<section className="relative z-10 max-w-6xl mx-auto px-6 mb-16 animate-fade-in">
  <div className="glass-panel border border-amber-700/40 rounded-2xl p-6 md:p-8 bg-white/5 backdrop-blur-xl overflow-hidden">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
      <div className="lg:col-span-2">
        <div className="relative rounded-xl overflow-hidden border border-amber-700/40 bg-black/40">
          <img
            src={latestIssue.coverImage}
            alt={`${latestIssue.title} ${latestIssue.issueNumber}`}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-black/10" />
        </div>
      </div>

      <div className="lg:col-span-3">
        <p className="text-xs uppercase tracking-[0.18em] text-amber-300/90 mb-2">
          ✦ Fresh from the press ✦
        </p>

        <h2 className="text-3xl md:text-4xl text-amber-400 mb-3">
          The Inkbound Times
        </h2>

        <p className="text-sm uppercase tracking-[0.18em] text-gray-400 mb-3">
          {latestIssue.issueNumber} • {latestIssue.dateLabel}
        </p>

        <p className="text-gray-300 mb-5 opacity-90 leading-relaxed">
          {latestIssue.description}
        </p>

        <p className="text-gray-400 mb-6">
          Open the latest issue as a digital edition with flippable pages, or
          step into the full archive to explore every release.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            to={`/newsletter/${latestIssue.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-700 hover:bg-amber-600 text-white font-semibold uppercase tracking-[0.18em] shadow-[0_0_18px_rgba(225,167,48,0.55)] border border-amber-400/70 transition"
          >
            Read latest issue →
          </Link>

          <Link
            to="/newsletter"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 text-white font-semibold uppercase tracking-[0.18em] transition"
          >
            View archive
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* Creators Map (static preview image) */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-12 animate-fade-in">
        <div className="glass-panel border border-amber-700 rounded-xl p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-3xl text-amber-400 mb-2">🌍 Creators Map</h2>
              <p className="text-gray-300 mb-4">
                A living peek at where our community lives. Every thread leads
                back to our little shop in Gort, Ireland.
              </p>
              <Link
                to="/author-map"
                className="inline-block px-4 py-2 rounded bg-amber-700 hover:bg-amber-600 text-white font-medium transition shadow-md"
              >
                View Full Globe →
              </Link>
            </div>
            <div className="lg:col-span-3">
              <Link to="/author-map" className="block group">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-amber-700 bg-black/50">
                  <img
                    src="/globe.png"
                    alt="Inkbound Creators Map preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-black/10" />
                  <div className="absolute right-3 bottom-3 text-xs text-gray-300 bg-black/50 rounded px-2 py-1 border border-white/10">
                    Open interactive globe →
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center max-w-6xl mx-auto px-6 mb-12 animate-fade-in">
        {[
          {
            to: "/virtual-shelf",
            img: "on-our-virtual shelf.png",
            title: "On the Virtual Shelf",
            desc: "Browse digital listings from Inkbound authors around the world",
          },
          {
            to: "/authors",
            img: "author-hub.png",
            title: "Author Hub",
            desc: "Get stocked, submit quests, connect",
          },
          {
            to: "/narrators",
            img: "narrator-spotlight.png",
            title: "Narrator Spotlight",
            desc: "Browse our featured voice talents and sample their work",
          },
          {
            to: "/readers",
            img: "readers-and-quests.png",
            title: "Readers & Quests",
            desc: "Join challenges, unlock badges, and explore the world of Inkbound",
          },
          {
            to: "/new-releases",
            img: "new-releases.png",
            title: "New Releases",
            desc: "See what’s dropping this month — and what’s coming next",
          },
          {
            to: "/CreativesHub",
            img: "creatives-logo.png",
            title: "Creatives",
            desc: "Cover artist? Editors? Merch creation? We have it all",
          },
          {
            to: "/book-club",
            img: "crowd-writing.png",
            title: "Inkbound Indie Book Club",
            desc: "Become part of the Inkbound Indie Book Club",
          },
          {
            to: "/inkbound-tbr",
            img: "inkbound-tbr.png",
            title: "The Inkbound TBR",
            desc: "Add your favorite books to our community TBR and discover more",
          },
          {
            to: "/about",
            img: "about-the-society.png",
            title: "About the Society",
            desc: "The story behind the shelves",
          },
        ].map((item, idx) => (
          <Link
            key={idx}
            to={item.to}
            className="glass-card p-6 hover:shadow-xl transition hover:scale-105 border border-amber-700 rounded-xl transform hover:-translate-y-1 duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-xl pointer-events-none" />
            <img
              src={`/images/${item.img}`}
              alt={item.title}
              className="w-20 h-20 mx-auto mb-4 drop-shadow-lg animate-float"
            />
            <h2 className="text-xl font-semibold text-amber-400">{item.title}</h2>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </Link>
        ))}
      </div>

      {/* ✨ Inkbound Events */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 mb-14 animate-fade-in">
        {/* Soft magical glow */}
        <div className="pointer-events-none absolute -inset-6 opacity-70">
          <div className="absolute -top-10 left-10 h-56 w-56 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="absolute top-0 right-10 h-64 w-64 rounded-full bg-red-700/20 blur-3xl" />
          <div className="absolute -bottom-10 left-1/3 h-64 w-64 rounded-full bg-emerald-700/20 blur-3xl" />
        </div>

        <div className="relative glass-panel border border-amber-700 rounded-xl p-6 md:p-8 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-amber-500/10 via-transparent to-emerald-500/10 opacity-70" />

          {/* Logos */}
          <div className="relative flex flex-wrap justify-center items-center gap-4 mb-4">
            <img
              src="/images/inkxiaac.png"
              alt="Inkbound x Indie Author Advocate Community"
              className="h-16 w-auto rounded-lg border border-amber-700/50 bg-black/30 p-2"
            />
          </div>

          {/* Eyebrow */}
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300/90 mb-2">
            ✦ Inkbound Events
          </p>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl text-amber-400 mb-3">
            Community-Driven Bookish Events
          </h2>

          {/* Description */}
          <p className="text-gray-300 max-w-2xl mx-auto mb-4 opacity-90">
            Inkbound hosts a rotating lineup of indie-focused events - from{" "}
            <span className="text-amber-200 font-semibold">Stuff Your Kindle days</span>{" "}
            and reader challenges to author collaborations, live launches, and special community drops.
            Every event is built to spotlight indie voices and make discovering books easy, fun,
            and genuinely human.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-5 text-[0.8rem]">
            <span className="rounded-full border border-amber-500/40 bg-black/30 px-3 py-1 text-amber-200/90">
              📚 Indie-first
            </span>
            <span className="rounded-full border border-amber-500/40 bg-black/30 px-3 py-1 text-amber-200/90">
              🌍 Global community
            </span>
            <span className="rounded-full border border-amber-500/40 bg-black/30 px-3 py-1 text-amber-200/90">
              ✨ Limited-time events
            </span>
            <span className="rounded-full border border-amber-500/40 bg-black/30 px-3 py-1 text-amber-200/90">
              🖤 Clear content guidance
            </span>
          </div>

          {/* CTA */}
          <Link
            to="/stuff-your-kindle"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-700 hover:bg-amber-600 text-white font-semibold uppercase tracking-[0.18em] shadow-[0_0_18px_rgba(225,167,48,0.6)] border border-amber-400/70 transition"
          >
            ✨ View upcoming events →
          </Link>

          {/* Helper note */}
          <p className="mt-3 text-xs text-gray-400 opacity-90">
            New events are announced regularly - check back or join the mailing list to stay in the loop.
          </p>
        </div>
      </section>

      {/* ✦ Inkbound Publishing */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-14 animate-fade-in">
        {/* soft glow */}
        <div className="pointer-events-none absolute -inset-6 opacity-70">
          <div className="absolute -top-10 left-10 h-56 w-56 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="absolute top-0 right-10 h-64 w-64 rounded-full bg-emerald-700/20 blur-3xl" />
          <div className="absolute -bottom-10 left-1/3 h-64 w-64 rounded-full bg-fuchsia-700/15 blur-3xl" />
        </div>

        <div className="relative glass-panel border border-amber-700 rounded-xl p-6 md:p-8 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-amber-500/10 via-transparent to-emerald-500/10 opacity-70" />

          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            {/* Image */}
            <div className="lg:col-span-2">
              <div className="relative rounded-xl overflow-hidden border border-amber-700 bg-black/40">
                <img
                  src="/images/inkboundpublishing.png"
                  alt="Inkbound Publishing"
                  className="w-full h-full object-cover opacity-95"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/25 via-transparent to-black/10" />
              </div>
            </div>

            {/* Copy */}
            <div className="lg:col-span-3">
              <p className="text-xs uppercase tracking-[0.18em] text-amber-300/90 mb-2">
                ✦ Inkbound Publishing
              </p>

              <h2 className="text-3xl md:text-4xl text-amber-400 mb-3">
                A Community Imprint - Not a Traditional Publisher
              </h2>

              <p className="text-gray-300 mb-4 opacity-90">
                Inkbound Publishing is a{" "}
                <span className="text-amber-200 font-semibold">
                  community - led imprint credit
                </span>{" "}
                used by authors affiliated with the Inkbound Society. It exists to
                signal connection, support, and visibility - not ownership.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5 text-sm">
                <div className="rounded-xl border border-amber-500/30 bg-black/30 p-4">
                  <p className="text-amber-200 font-semibold mb-1">✅ What it is</p>
                  <ul className="text-gray-300 space-y-1 list-disc pl-5">
                    <li>Affiliation / community imprint credit</li>
                    <li>Optional visibility + support via Inkbound channels</li>
                    <li>A signal you’re part of the Inkbound world</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-red-500/30 bg-black/30 p-4">
                  <p className="text-red-200 font-semibold mb-1">🚫 What it is NOT</p>
                  <ul className="text-gray-300 space-y-1 list-disc pl-5">
                    <li>No rights or ownership claimed</li>
                    <li>No royalties, fees, or payments owed</li>
                    <li>No editorial control or publishing obligations</li>
                    <li>No responsibility for printing/distribution</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-black/40 p-4">
                <p className="text-sm text-gray-200 mb-2">
                  If you’d like to credit it, use this exact line:
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <code className="text-amber-200 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm overflow-x-auto">
                    {IMPRINT_CREDIT_LINE}
                  </code>
                  <button
                    type="button"
                    onClick={copyImprintLine}
                    className="rounded-full bg-amber-700 hover:bg-amber-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white border border-amber-400/70 transition"
                  >
                    Copy
                  </button>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  This keeps the meaning clear and protects both the author and Inkbound.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 flex justify-center my-10 animate-fade-in">
        <div className="w-2/3 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent blur-sm animate-pulse" />
      </div>

  
      {/* Guest Book */}
      <GuestBook />

      {/* Coming Soon: BookTok Unhinged + InkSprouts */}
      <section className="relative z-10 animate-fade-in px-4 mt-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BookTok Unhinged (Coming Soon) */}
          <div className="bg-black/30 backdrop-blur-md rounded-xl border border-purple-700 shadow-xl p-6 text-center hover:shadow-purple-600 transition">
            <img
              src="/images/booktok-unhinged.png"
              alt="BookTok Unhinged"
              className="w-64 mx-auto mb-4 drop-shadow-lg"
            />
            <p className="text-purple-400 font-semibold text-xl mb-1 tracking-wide">
              BookTok Unhinged
            </p>
            <p className="text-sm text-purple-200 italic mb-3">
              Where spice goes to die and tropes go to sin.
            </p>
            <span className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider bg-purple-700/30 border border-purple-700 text-purple-200">
              Coming Soon
            </span>
          </div>

          {/* InkSprouts (Coming Soon) */}
          <div className="bg-black/30 backdrop-blur-md rounded-xl border border-emerald-700 shadow-xl p-6 text-center hover:shadow-emerald-600 transition">
            <img
              src="/images/inksprouts.png"
              alt="InkSprouts — Kids of the Inkbound Society"
              className="w-64 mx-auto mb-4 drop-shadow-lg"
            />
            <p className="text-emerald-400 font-semibold text-xl mb-1 tracking-wide">
              InkSprouts
            </p>
            <p className="text-sm text-emerald-200 italic mb-3">
              The kids’ corner of the Inkbound Society - stories for little sprouts.
            </p>
            <span className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider bg-emerald-700/30 border border-emerald-700 text-emerald-200">
              Coming Soon
            </span>
          </div>
          {/* Inkbound Studios */}
<div className="bg-black/30 backdrop-blur-md rounded-xl border border-yellow-700 shadow-xl p-6 text-center hover:shadow-yellow-600 transition">
  <img
    src="/images/inkbound-studios.png"
    alt="Inkbound Studios — Film and Media"
    className="w-80 mx-auto mb-4 drop-shadow-lg"
  />
  <p className="text-yellow-400 font-semibold text-xl mb-1 tracking-wide">
    Inkbound Studios
  </p>
  <p className="text-sm text-yellow-200 italic mb-3">
    Film, media, and storytelling beyond the page.
  </p>
  <span className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider bg-yellow-700/30 border border-yellow-700 text-yellow-200">
    Coming Soon
  </span>
</div>
{/* Inkbound After Dark */}
<div className="bg-black/30 backdrop-blur-md rounded-xl border border-rose-700 shadow-xl p-6 text-center hover:shadow-rose-600 transition">
  <img
    src="/images/inkbound-after-dark.png"
    alt="Inkbound After Dark Podcast"
    className="w-80 mx-auto mb-4 drop-shadow-lg"
  />
  <p className="text-rose-400 font-semibold text-xl mb-1 tracking-wide">
    Inkbound After Dark
  </p>
  <p className="text-sm text-rose-200 italic mb-3">
    The Inkbound podcast exploring books, stories, and the darker corners of storytelling.
  </p>
  <span className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider bg-rose-700/30 border border-rose-700 text-rose-200">
    Coming Soon
  </span>
</div>
        </div>
      </section>

      {/* Magical Glow Divider */}
      <div className="relative z-20 flex justify-center mb-4 mt-24">
        <div className="w-2/3 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent blur-sm animate-pulse" />
      </div>

      {/* Partnership Logos */}
      <div className="relative z-20 flex flex-wrap justify-center items-center gap-12 my-12 px-6">
        <a
          href="https://libro.fm/inkboundsociety"
          target="_blank"
          rel="noopener noreferrer"
          className="transform hover:scale-105 transition"
        >
          <img
            src="/images/Librofm-Logo.png"
            alt="Libro.fm logo"
            className="w-40 md:w-56 opacity-90 hover:opacity-100 transition"
          />
        </a>
        <img
          src="/images/proudindie.png"
          alt="Proudly Supporting Independent Authors"
          className="w-40 md:w-56 opacity-90 hover:opacity-100 transition"
        />
        <a
          href="https://discord.gg/BkHyN6hDwJ"
          target="_blank"
          rel="noopener noreferrer"
          className="transform hover:scale-105 transition"
        >
          <img
            src="/images/InkboundDiscord.png"
            alt="Join us on Discord"
            className="w-40 md:w-56 opacity-90 hover:opacity-100 transition"
          />
        </a>
      </div>

      {/* ✅ REAL Treasure Hunt Modal */}
      {showHuntModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowHuntModal(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl border border-amber-500/40 bg-black/70 p-6 shadow-2xl">
            <button
              onClick={() => setShowHuntModal(false)}
              className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
            >
              ✕
            </button>

            <p className="text-xs uppercase tracking-[0.18em] text-amber-300/90 mb-2">
              You found it.
            </p>

            <h3 className="text-2xl text-amber-400 mb-3 font-marcellus">
              Inkbound Treasure Sigil
            </h3>

            <p className="text-gray-200 mb-3">Your redemption phrase:</p>

            <div className="flex items-center justify-between gap-3 rounded-xl border border-amber-500/30 bg-black/40 px-4 py-3">
              <code className="text-amber-200 font-semibold tracking-widest">
                {HUNT_CODE}
              </code>

              <button
                onClick={copyCode}
                className="rounded-full bg-amber-700 hover:bg-amber-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white"
              >
                Copy
              </button>
            </div>

            <p className="text-sm text-gray-300 mt-4">
              Put this into the claim form so I can verify you.
            </p>

            <a
              href={TALLY_CLAIM_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-700 hover:bg-amber-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_18px_rgba(225,167,48,0.6)] border border-amber-400/70 transition"
            >
              Claim prize →
            </a>

            <p className="mt-3 text-[0.75rem] text-gray-400">
              One entry per person. First 5 valid entries win.
            </p>
          </div>
        </div>
      )}

      {/* 😈 DECOY Modal */}
      {showDecoyModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowDecoyModal(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl border border-fuchsia-500/40 bg-black/70 p-6 shadow-2xl">
            <button
              onClick={() => setShowDecoyModal(false)}
              className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
            >
              ✕
            </button>

            <p className="text-xs uppercase tracking-[0.18em] text-fuchsia-300/90 mb-2">
              Nice try.
            </p>

            <h3 className="text-2xl text-fuchsia-200 mb-3 font-marcellus">
              Wrong Sigil
            </h3>

            <p className="text-gray-200">
              This one’s a decoy. The real treasure is still hiding on this page.
            </p>

            <p className="text-sm text-gray-400 mt-4">
              Tip: it’s closer to the “cold” part of the logo than the “bright” part.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
