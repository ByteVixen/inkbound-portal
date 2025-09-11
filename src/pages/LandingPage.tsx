// src/pages/LandingPage.tsx
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import VantaBackground from "../components/VantaBackground";
import CountdownBanner from "../components/CountdownBanner";
import GuestBook from "../components/GuestBook";

export default function LandingPage() {
  const [showGuidebook, setShowGuidebook] = useState(false);
  const guidebookRef = useRef<HTMLDivElement>(null);
  const fakeUserCount = Math.floor(Math.random() * 12) + 5;

  const handleGuidebookToggle = () => {
    setShowGuidebook(!showGuidebook);
    setTimeout(() => {
      guidebookRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
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
        <img
          src="/logo.png"
          alt="Inkbound Society Logo"
          className="mx-auto w-48 h-auto mb-6 drop-shadow-xl"
        />
      </div>

      {/* Hero */}
      <div className="relative z-10 text-center px-6 pb-10 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl font-light mb-4 text-glow">Some stories find you.</h1>
        <p className="text-lg text-gray-300 mb-8 opacity-80">
          Whisper your name. Join the Society.
        </p>
        <div className="text-sm text-gray-400">
          {fakeUserCount} readers browsing right now...
        </div>
      </div>

      {/* Guidebook Cover (click to open) */}
      <div className="relative z-10 flex justify-center mb-10 animate-fade-in">
        <div
          onClick={handleGuidebookToggle}
          className="cursor-pointer transform transition hover:scale-105 text-center relative group"
        >
          <img
            src="/images/inkbound-guidebook.png"
            alt="Inkbound Guidebook"
            className="w-48 h-auto mx-auto mb-2 drop-shadow-lg rounded-lg border border-amber-700 group-hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] transition-shadow duration-500"
          />
          <div className="absolute inset-0 rounded-lg pointer-events-none group-hover:animate-pulse-sparkle" />
          <p className="text-amber-300 text-sm italic mt-2">
            Click to open the Inkbound Guidebook
          </p>
        </div>
      </div>

      {/* Collapsible Guidebook Panel */}
      {showGuidebook && (
        <section
          ref={guidebookRef}
          className="relative z-10 max-w-4xl mx-auto px-6 mb-16 animate-fade-in"
        >
          <div className="glass-panel border border-amber-700 rounded-xl p-6">
            <h2 className="text-3xl text-amber-400 mb-4">
              📖 Welcome to The Inkbound Society: Your Guidebook
            </h2>
            <p className="text-gray-300 mb-6">
              Your gateway to getting involved in our magical literary world—whether
              you're an author, narrator, or reader. Here’s how you can step inside…
            </p>

            <details className="mb-4">
              <summary className="cursor-pointer text-lg text-amber-300">
                🖋️ For Authors
              </summary>
              <div className="pl-4 mt-2 text-gray-300 space-y-2">
                <p>
                  <strong>📚 Stock Your Book with Us:</strong> Apply to consign your
                  book at the Inkbound Bookshop in Galway, Ireland.
                </p>
                <Link to="/authors/consignment" className="text-amber-400 underline">
                  Consignment Sign-Up →
                </Link>
                <p>
                  <strong>🌐 Join the Virtual Shelf:</strong> Prefer to stay digital?
                  Add your book to our Virtual Shelf with buy links.
                </p>
                <Link to="/virtual-shelfspace" className="text-amber-400 underline">
                  Virtual Shelf Application →
                </Link>
                <p>
                  <strong>✨ Monthly Book Quests (Coming Soon):</strong> Submit your
                  book or series to be featured in our community quests.
                </p>
              </div>
            </details>

            <details className="mb-4">
              <summary className="cursor-pointer text-lg text-amber-300">
                🎙️ For Narrators
              </summary>
              <div className="pl-4 mt-2 text-gray-300 space-y-2">
                <p>
                  <strong>🎧 Claim a Virtual Shelfspace:</strong> Voice artists can
                  showcase samples, genres, and links to hire or collaborate.
                </p>
                <Link to="/narrator-hub" className="text-amber-400 underline">
                  Narrator Application →
                </Link>
              </div>
            </details>

            <details className="mb-4">
              <summary className="cursor-pointer text-lg text-amber-300">
                🌙 For Readers
              </summary>
              <div className="pl-4 mt-2 text-gray-300 space-y-2">
                <p>
                  <strong>📖 Join Monthly Quests:</strong> Themed reading prompts,
                  discussion threads, and magical rewards.
                </p>
                <Link to="/quests" className="text-amber-400 underline">
                  See Current Quest →
                </Link>
                <p>
                  <strong>📚 Your Virtual Inkbound TBR:</strong> Track your reads,
                  share your shelf, and connect with others.
                </p>
                <Link to="/inkbound-tbr" className="text-amber-400 underline">
                  Start Your TBR →
                </Link>
              </div>
            </details>

            <p className="text-sm text-gray-400 mt-6">
              Questions or ideas? Reach out at{" "}
              <a href="mailto:summon@inkboundsociety.com" className="underline">
                summon@inkboundsociety.com
              </a>
            </p>
          </div>
        </section>
      )}

      {/* Creators Map (static preview image) */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-12 animate-fade-in">
        <div className="glass-panel border border-amber-700 rounded-xl p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-3xl text-amber-400 mb-2">🌍 Creators Map</h2>
              <p className="text-gray-300 mb-4">
                A living peek at where our community lives. Every thread leads back
                to our little shop in Gort, Ireland.
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

      {/* TikTokathon (CTA) */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 mb-12 animate-fade-in">
        <Link
          to="/tiktokathon"
          className="block bg-black/30 backdrop-blur-md rounded-xl border border-fuchsia-700 shadow-xl p-6 text-center hover:shadow-fuchsia-600 transition"
        >
          <img
            src="/images/tiktokathon.png"
            alt="Inkbound TikTokathon"
            className="w-64 mx-auto mb-4 drop-shadow-lg"
          />
          <p className="text-fuchsia-400 font-semibold text-xl mb-1 tracking-wide">
            Inkbound TikTokathon
          </p>
          <p className="text-sm text-fuchsia-200 italic mb-3">
            Authors: claim a <span className="font-semibold text-white/90">free</span>{" "}
            20-minute live slot to showcase your book.
          </p>
          <span className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider bg-fuchsia-700/30 border border-fuchsia-700 text-fuchsia-200">
            Claim a Slot →
          </span>
        </Link>
      </section>

      {/* Feature Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center max-w-6xl mx-auto px-6 mb-12 animate-fade-in">
        {[
          {
            to: "/featured-books",
            img: "stocked-on-our-bookshelf.png",
            title: "Stocked in Our Bookshop",
            desc: "Discover books physically shelved at the Inkbound Bookshop in Gort",
          },
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
            to: "/inkbound-tbr",
            img: "readers-and-quests.png",
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

      {/* Divider */}
      <div className="relative z-10 flex justify-center my-10 animate-fade-in">
        <div className="w-2/3 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent blur-sm animate-pulse" />
      </div>

      {/* July Quest Teaser */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 animate-fade-in mb-16">
        <div className="glass-panel border border-amber-700 rounded-xl p-6 md:flex items-center gap-6 shadow-lg">
          <div className="w-40 h-40 mx-auto md:mx-0 group perspective mb-6 md:mb-0 relative">
            <div className="w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180 rounded-full">
              <img
                src="/images/the-marked-one-july.png"
                alt="The Marked One Coin Front"
                className="absolute w-full h-full object-cover rounded-full backface-hidden"
              />
              <img
                src="/images/the-marked-one-july.png"
                alt="The Marked One Coin Back"
                className="absolute w-full h-full object-cover transform rotate-y-180 rounded-full backface-hidden"
              />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl text-amber-400 mb-2 font-marcellus">
              📜 July Quest: The Marked Ones
            </h2>
            <p className="text-gray-300 mb-3">
              Prove you are among the Marked. Share a quote from a book that changed
              your path—and earn your reward.
            </p>
            <Link
              to="/quests"
              className="inline-block mt-2 px-4 py-2 rounded bg-amber-700 hover:bg-amber-600 text-white font-medium transition shadow-md"
            >
              Take the Quest →
            </Link>
          </div>
        </div>
      </section>

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
              The kids’ corner of the Inkbound Society — stories for little sprouts.
            </p>
            <span className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider bg-emerald-700/30 border border-emerald-700 text-emerald-200">
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
    </div>
  );
}
