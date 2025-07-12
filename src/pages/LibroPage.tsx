import React from "react";
import VantaBackground from "../components/VantaBackground";

const LibroPage: React.FC = () => {
  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Vanta Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-400">Discover Audiobooks</h1>
              <p className="text-lg mb-6">
                We've partnered with Libro.fm so you can buy audiobooks directly through our bookshop.
                Explore over 500,000 titles and support indie with every listen.
              </p>
              <a
                href="https://libro.fm/inkboundsociety"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-600 hover:bg-amber-500 text-black px-6 py-3 rounded-full font-semibold transition"
              >
                Browse Audiobooks
              </a>
            </div>
            <div className="md:w-1/2">
              <img src="/images/Screen - Welcome.png" alt="Audiobook app screen" className="rounded-xl shadow-lg" />
            </div>
          </div>

          {/* Listening Options */}
          <div className="mt-20 grid gap-12 md:grid-cols-3 text-center">
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl text-amber-400 mb-3">Monthly Membership</h2>
              <p className="mb-4">One or two audiobooks per month. Perfect for avid listeners.</p>
              <a
                href="https://libro.fm/membership/new?bookstore=inkboundsociety"
                target="_blank"
                className="underline hover:text-amber-400"
              >
                Get Started
              </a>
            </div>
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl text-amber-400 mb-3">On Demand</h2>
              <p className="mb-4">Buy audiobooks à la carte. No subscription needed.</p>
              <a
                href="https://libro.fm/explore?bookstore=inkboundsociety"
                target="_blank"
                className="underline hover:text-amber-400"
              >
                Start Exploring
              </a>
            </div>
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl text-amber-400 mb-3">Gift Audiobooks</h2>
              <p className="mb-4">Send audiobook credits to anyone, anywhere.</p>
              <a
                href="https://libro.fm/gift?bookshop=inkboundsociety"
                target="_blank"
                className="underline hover:text-amber-400"
              >
                Start Gifting
              </a>
            </div>
          </div>

          {/* Switch Promo */}
          <div className="mt-24 bg-white/10 p-10 rounded-xl border border-white/20 text-center">
            <img
              src="/images/Device - Switch.png"
              alt="Libro.fm Switch"
              className="mx-auto w-60 mb-6"
            />
            <h2 className="text-2xl text-amber-400 mb-3">Get Two Free Audiobooks</h2>
            <p className="mb-4">
              Switch from another service and get 2 bonus credits when you start your membership using promo code <strong>SWITCH</strong>.
            </p>
            <a
              href="https://libro.fm/switch?bookshop=inkboundsociety"
              target="_blank"
              className="underline hover:text-amber-400"
            >
              Make the Switch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibroPage;
