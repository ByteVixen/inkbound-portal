// src/pages/LandingPage.tsx

import { Link } from "react-router-dom";
import VantaBackground from "../components/VantaBackground";
import CountdownBanner from "../components/CountdownBanner";
import GuestBook from "../components/GuestBook";
import { newsletterIssues } from "../data/newsletterIssues";

export default function LandingPage() {
  const fakeUserCount = Math.floor(Math.random() * 12) + 5;
  const latestIssue = newsletterIssues[0];

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
    <div className="relative min-h-screen overflow-hidden font-marcellus text-white">
      {/* Vanta Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Countdown Banner */}
      <CountdownBanner />

      {/* Logo */}
      <div className="relative z-10 animate-fade-in pt-10 text-center">
        <div className="mx-auto inline-block relative">
          <img
            src="/logo.png"
            alt="Inkbound Society Logo"
            className="h-auto w-48 drop-shadow-xl sm:w-56 md:w-64"
          />
        </div>
      </div>

      {/* Hero */}
      <div className="relative z-10 mx-auto max-w-4xl animate-fade-in px-6 pb-10 text-center">
        <h1 className="text-5xl font-light mb-4 text-glow">
          Some stories find you.
        </h1>
        <p className="mb-4 text-lg text-gray-300 opacity-80">
          Whisper your name. Join the Society.
        </p>
        <div className="mb-6 text-sm text-gray-400">
          {fakeUserCount} readers browsing right now...
        </div>
      </div>

      {/* ✦ BLACK DIADEM FEATURE SECTION ✦ */}
      <section className="relative overflow-hidden border-t border-white/10 py-24">
        {/* Ambient golden aura */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/12 blur-3xl" />
          <div className="absolute left-1/3 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          {/* Image Side */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 flex justify-center">
              <div className="h-[340px] w-[340px] rounded-full bg-amber-500/15 blur-3xl" />
            </div>

            <div className="glass-panel rounded-2xl border border-amber-700/40 bg-white/5 p-6 backdrop-blur-xl md:p-7">
              <img
                src="/images/blackdiadem.png"
                alt="The Tiara Court – The Black Diadem Series"
                className="mx-auto w-full max-w-md drop-shadow-[0_0_30px_rgba(225,167,48,0.25)]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text Side */}
          <div className="glass-panel rounded-2xl border border-amber-700/30 bg-white/5 p-8 backdrop-blur-xl md:p-10">
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-amber-300/90">
              ✦ Collaborative Series ✦
            </p>

            <h2 className="mb-5 text-4xl font-serif text-amber-400 md:text-5xl">
              The Tiara Court
            </h2>

            <p className="mb-6 text-lg leading-relaxed text-gray-200/90">
              A connected 14 book series of dark fairytale retelling novellas.
              Each story stands alone, yet every princess bears the same mark.
              And with every tale told, the Black Diadem loses another piece.
            </p>

            <p className="mb-8 text-gray-300">
              Release: <span className="text-amber-200">Halloween 2026</span>
            </p>

            <a
              href="/black-diadem"
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/70 bg-amber-700 px-6 py-3 text-white font-semibold uppercase tracking-[0.18em] shadow-[0_0_18px_rgba(225,167,48,0.55)] transition hover:bg-amber-600"
            >
              See the Court →
            </a>
          </div>
        </div>
      </section>

      {/* 📰 Inkbound Times */}
      <section className="relative z-10 mx-auto mb-16 max-w-6xl animate-fade-in px-6">
        <div className="glass-panel overflow-hidden rounded-2xl border border-amber-700/40 bg-white/5 p-6 backdrop-blur-xl md:p-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-xl border border-amber-700/40 bg-black/40">
                <img
                  src={latestIssue.coverImage}
                  alt={`${latestIssue.title} ${latestIssue.issueNumber}`}
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-black/10" />
              </div>
            </div>

            <div className="lg:col-span-3">
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-amber-300/90">
                ✦ Fresh from the press ✦
              </p>

              <h2 className="mb-3 text-3xl text-amber-400 md:text-4xl">
                The Inkbound Times
              </h2>

              <p className="mb-3 text-sm uppercase tracking-[0.18em] text-gray-400">
                {latestIssue.issueNumber} • {latestIssue.dateLabel}
              </p>

              <p className="mb-5 leading-relaxed text-gray-300 opacity-90">
                {latestIssue.description}
              </p>

              <p className="mb-6 text-gray-400">
                Open the latest issue as a digital edition with flippable pages,
                or step into the full archive to explore every release.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/newsletter/${latestIssue.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-amber-400/70 bg-amber-700 px-6 py-3 text-white font-semibold uppercase tracking-[0.18em] shadow-[0_0_18px_rgba(225,167,48,0.55)] transition hover:bg-amber-600"
                >
                  Read latest issue →
                </Link>

                <Link
                  to="/newsletter"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-white font-semibold uppercase tracking-[0.18em] transition hover:border-white/40 hover:bg-white/10"
                >
                  View archive
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creators Map */}
      <section className="relative z-10 mx-auto mb-12 max-w-6xl animate-fade-in px-6">
        <div className="glass-panel rounded-xl border border-amber-700 p-6 md:p-8">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="mb-2 text-3xl text-amber-400">🌍 Creators Map</h2>
              <p className="mb-4 text-gray-300">
                A living peek at where our community lives. Every thread leads
                back to our little shop in Gort, Ireland.
              </p>
              <Link
                to="/author-map"
                className="inline-block rounded bg-amber-700 px-4 py-2 text-white font-medium shadow-md transition hover:bg-amber-600"
              >
                View Full Globe →
              </Link>
            </div>

            <div className="lg:col-span-3">
              <Link to="/author-map" className="block group">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-amber-700 bg-black/50">
                  <img
                    src="/globe.png"
                    alt="Inkbound Creators Map preview"
                    className="absolute inset-0 h-full w-full object-cover opacity-95 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-black/10" />
                  <div className="absolute bottom-3 right-3 rounded border border-white/10 bg-black/50 px-2 py-1 text-xs text-gray-300">
                    Open interactive globe →
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <div className="relative z-10 mx-auto mb-12 grid max-w-6xl grid-cols-1 gap-6 animate-fade-in px-6 text-center md:grid-cols-2 lg:grid-cols-3">
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
            className="glass-card group relative overflow-hidden rounded-xl border border-amber-700 p-6 transition duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
          >
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100" />
            <img
              src={`/images/${item.img}`}
              alt={item.title}
              className="mx-auto mb-4 h-20 w-20 animate-float drop-shadow-lg"
            />
            <h2 className="text-xl font-semibold text-amber-400">
              {item.title}
            </h2>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </Link>
        ))}
      </div>

      {/* ✨ Inkbound Events */}
      <section className="relative z-10 mx-auto mb-14 max-w-5xl animate-fade-in px-6">
        <div className="pointer-events-none absolute -inset-6 opacity-70">
          <div className="absolute -top-10 left-10 h-56 w-56 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="absolute right-10 top-0 h-64 w-64 rounded-full bg-red-700/20 blur-3xl" />
          <div className="absolute -bottom-10 left-1/3 h-64 w-64 rounded-full bg-emerald-700/20 blur-3xl" />
        </div>

        <div className="relative glass-panel overflow-hidden rounded-xl border border-amber-700 p-6 text-center md:p-8">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-amber-500/10 via-transparent to-emerald-500/10 opacity-70" />

          <div className="relative mb-4 flex flex-wrap items-center justify-center gap-4">
            <img
              src="/images/inkxiaac.png"
              alt="Inkbound x Indie Author Advocate Community"
              className="h-16 w-auto rounded-lg border border-amber-700/50 bg-black/30 p-2"
            />
          </div>

          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-amber-300/90">
            ✦ Inkbound Events
          </p>

          <h2 className="mb-3 text-3xl text-amber-400 md:text-4xl">
            Community-Driven Bookish Events
          </h2>

          <p className="mx-auto mb-4 max-w-2xl text-gray-300 opacity-90">
            Inkbound hosts a rotating lineup of indie-focused events - from{" "}
            <span className="font-semibold text-amber-200">
              Stuff Your Kindle days
            </span>{" "}
            and reader challenges to author collaborations, live launches, and
            special community drops. Every event is built to spotlight indie
            voices and make discovering books easy, fun, and genuinely human.
          </p>

          <div className="mb-5 flex flex-wrap justify-center gap-2 text-[0.8rem]">
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

          <Link
            to="/stuff-your-kindle"
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/70 bg-amber-700 px-6 py-2.5 text-white font-semibold uppercase tracking-[0.18em] shadow-[0_0_18px_rgba(225,167,48,0.6)] transition hover:bg-amber-600"
          >
            ✨ View upcoming events →
          </Link>

          <p className="mt-3 text-xs text-gray-400 opacity-90">
            New events are announced regularly - check back or join the mailing
            list to stay in the loop.
          </p>
        </div>
      </section>

      {/* ✦ Inkbound Publishing */}
      <section className="relative z-10 mx-auto mb-14 max-w-6xl animate-fade-in px-6">
        <div className="pointer-events-none absolute -inset-6 opacity-70">
          <div className="absolute -top-10 left-10 h-56 w-56 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="absolute right-10 top-0 h-64 w-64 rounded-full bg-emerald-700/20 blur-3xl" />
          <div className="absolute -bottom-10 left-1/3 h-64 w-64 rounded-full bg-fuchsia-700/15 blur-3xl" />
        </div>

        <div className="relative glass-panel overflow-hidden rounded-xl border border-amber-700 p-6 md:p-8">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-amber-500/10 via-transparent to-emerald-500/10 opacity-70" />

          <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-xl border border-amber-700 bg-black/40">
                <img
                  src="/images/inkboundpublishing.png"
                  alt="Inkbound Publishing"
                  className="h-full w-full object-cover opacity-95"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/25 via-transparent to-black/10" />
              </div>
            </div>

            <div className="lg:col-span-3">
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-amber-300/90">
                ✦ Inkbound Publishing
              </p>

              <h2 className="mb-3 text-3xl text-amber-400 md:text-4xl">
                A Community Imprint - Not a Traditional Publisher
              </h2>

              <p className="mb-4 text-gray-300 opacity-90">
                Inkbound Publishing is a{" "}
                <span className="font-semibold text-amber-200">
                  community - led imprint credit
                </span>{" "}
                used by authors affiliated with the Inkbound Society. It exists
                to signal connection, support, and visibility - not ownership.
              </p>

              <div className="mb-5 grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                <div className="rounded-xl border border-amber-500/30 bg-black/30 p-4">
                  <p className="mb-1 font-semibold text-amber-200">
                    ✅ What it is
                  </p>
                  <ul className="list-disc space-y-1 pl-5 text-gray-300">
                    <li>Affiliation / community imprint credit</li>
                    <li>Optional visibility + support via Inkbound channels</li>
                    <li>A signal you’re part of the Inkbound world</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-red-500/30 bg-black/30 p-4">
                  <p className="mb-1 font-semibold text-red-200">
                    🚫 What it is NOT
                  </p>
                  <ul className="list-disc space-y-1 pl-5 text-gray-300">
                    <li>No rights or ownership claimed</li>
                    <li>No royalties, fees, or payments owed</li>
                    <li>No editorial control or publishing obligations</li>
                    <li>No responsibility for printing/distribution</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-black/40 p-4">
                <p className="mb-2 text-sm text-gray-200">
                  If you’d like to credit it, use this exact line:
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <code className="overflow-x-auto rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-amber-200">
                    {IMPRINT_CREDIT_LINE}
                  </code>
                  <button
                    type="button"
                    onClick={copyImprintLine}
                    className="rounded-full border border-amber-400/70 bg-amber-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-amber-600"
                  >
                    Copy
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  This keeps the meaning clear and protects both the author and
                  Inkbound.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 my-10 flex justify-center animate-fade-in">
        <div className="h-px w-2/3 animate-pulse bg-gradient-to-r from-transparent via-amber-500 to-transparent blur-sm" />
      </div>

      {/* Guest Book */}
      <GuestBook />

      {/* Coming Soon */}
      <section className="relative z-10 mt-12 animate-fade-in px-4">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {/* BookTok Unhinged */}
          <div className="rounded-xl border border-purple-700 bg-black/30 p-6 text-center shadow-xl backdrop-blur-md transition hover:shadow-purple-600">
            <img
              src="/images/booktok-unhinged.png"
              alt="BookTok Unhinged"
              className="mx-auto mb-4 w-64 drop-shadow-lg"
            />
            <p className="mb-1 text-xl font-semibold tracking-wide text-purple-400">
              BookTok Unhinged
            </p>
            <p className="mb-3 text-sm italic text-purple-200">
              Where spice goes to die and tropes go to sin.
            </p>
            <span className="inline-block rounded-full border border-purple-700 bg-purple-700/30 px-3 py-1 text-xs uppercase tracking-wider text-purple-200">
              Coming Soon
            </span>
          </div>

          {/* InkSprouts */}
          <div className="rounded-xl border border-emerald-700 bg-black/30 p-6 text-center shadow-xl backdrop-blur-md transition hover:shadow-emerald-600">
            <img
              src="/images/inksprouts.png"
              alt="InkSprouts — Kids of the Inkbound Society"
              className="mx-auto mb-4 w-64 drop-shadow-lg"
            />
            <p className="mb-1 text-xl font-semibold tracking-wide text-emerald-400">
              InkSprouts
            </p>
            <p className="mb-3 text-sm italic text-emerald-200">
              The kids’ corner of the Inkbound Society - stories for little
              sprouts.
            </p>
            <span className="inline-block rounded-full border border-emerald-700 bg-emerald-700/30 px-3 py-1 text-xs uppercase tracking-wider text-emerald-200">
              Coming Soon
            </span>
          </div>

          {/* Inkbound Studios */}
          <div className="rounded-xl border border-yellow-700 bg-black/30 p-6 text-center shadow-xl backdrop-blur-md transition hover:shadow-yellow-600">
            <img
              src="/images/inkbound-studios.png"
              alt="Inkbound Studios — Film and Media"
              className="mx-auto mb-4 w-80 drop-shadow-lg"
            />
            <p className="mb-1 text-xl font-semibold tracking-wide text-yellow-400">
              Inkbound Studios
            </p>
            <p className="mb-3 text-sm italic text-yellow-200">
              Film, media, and storytelling beyond the page.
            </p>
            <span className="inline-block rounded-full border border-yellow-700 bg-yellow-700/30 px-3 py-1 text-xs uppercase tracking-wider text-yellow-200">
              Coming Soon
            </span>
          </div>

          {/* Inkbound After Dark */}
          <div className="rounded-xl border border-rose-700 bg-black/30 p-6 text-center shadow-xl backdrop-blur-md transition hover:shadow-rose-600">
            <img
              src="/images/inkbound-after-dark.png"
              alt="Inkbound After Dark Podcast"
              className="mx-auto mb-4 w-80 drop-shadow-lg"
            />
            <p className="mb-1 text-xl font-semibold tracking-wide text-rose-400">
              Inkbound After Dark
            </p>
            <p className="mb-3 text-sm italic text-rose-200">
              The Inkbound podcast exploring books, stories, and the darker
              corners of storytelling.
            </p>
            <span className="inline-block rounded-full border border-rose-700 bg-rose-700/30 px-3 py-1 text-xs uppercase tracking-wider text-rose-200">
              Coming Soon
            </span>
          </div>
        </div>
      </section>

      {/* Magical Glow Divider */}
      <div className="relative z-20 mb-4 mt-24 flex justify-center">
        <div className="h-1 w-2/3 animate-pulse bg-gradient-to-r from-transparent via-amber-400 to-transparent blur-sm" />
      </div>

      {/* Partnership Logos */}
      <div className="relative z-20 my-12 flex flex-wrap items-center justify-center gap-12 px-6">
        <a
          href="https://libro.fm/inkboundsociety"
          target="_blank"
          rel="noopener noreferrer"
          className="transform transition hover:scale-105"
        >
          <img
            src="/images/Librofm-Logo.png"
            alt="Libro.fm logo"
            className="w-40 opacity-90 transition hover:opacity-100 md:w-56"
          />
        </a>

        <img
          src="/images/proudindie.png"
          alt="Proudly Supporting Independent Authors"
          className="w-40 opacity-90 transition hover:opacity-100 md:w-56"
        />

        <a
          href="https://discord.gg/BkHyN6hDwJ"
          target="_blank"
          rel="noopener noreferrer"
          className="transform transition hover:scale-105"
        >
          <img
            src="/images/InkboundDiscord.png"
            alt="Join us on Discord"
            className="w-40 opacity-90 transition hover:opacity-100 md:w-56"
          />
        </a>
      </div>
    </div>
  );
}