// src/pages/LandingPage.tsx
import { Link } from "react-router-dom";
import VantaBackground from "../components/VantaBackground";
import WhisperFeed from "../components/WhisperFeed";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Vanta Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Logo */}
      <div className="relative z-10 text-center pt-10 animate-fade-in">
        <img
          src="/logo.png"
          alt="Inkbound Society Logo"
          className="mx-auto w-48 h-auto mb-6 drop-shadow-xl"
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 text-center px-6 pb-10 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl font-light mb-4 text-glow">
          Some stories find you.
        </h1>
        <p className="text-lg text-gray-300 mb-8 opacity-80">
          Whisper your name. Join the Society.
        </p>
       
      </div>

      {/* Feature Blocks */}
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

      {/* Magic Divider */}
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
              Prove you are among the Marked. Share a quote from a book that changed your path—and earn your reward.
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

      {/* Whisper Feed */}
      <div className="relative z-10 px-4 max-w-3xl mx-auto mb-20 animate-fade-in">
        <div className="text-center text-amber-400 text-xl mb-2 animate-pulse">
          ✨ {Math.floor(Math.random() * 30) + 3} readers whispering now...
        </div>
        <div className="glass-panel p-6 border border-amber-500 rounded-xl shadow-lg">
          <WhisperFeed />
        </div>
      </div>

  
    </div>
  );
}
