import { Link } from "react-router-dom";
import { ArrowRight, Globe2, Newspaper } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import VantaBackground from "../components/VantaBackground";
import CountdownBanner from "../components/CountdownBanner";
import GuestBook from "../components/GuestBook";
import { newsletterIssues } from "../data/newsletterIssues";

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function GoldParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i * 3.7) % 100}%`,
        top: `${(i * 7.9) % 100}%`,
        size: 2 + (i % 4) * 2,
        duration: 6 + (i % 7),
        delay: (i % 6) * 0.8,
        opacity: 0.18 + (i % 5) * 0.08,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[#f6dca0] blur-[1px]"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -22, 0],
            opacity: [p.opacity * 0.35, p.opacity, p.opacity * 0.45],
            scale: [1, 1.35, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function LandingPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.35]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const fakeUserCount = Math.floor(Math.random() * 12) + 5;
  const latestIssue = newsletterIssues[0];

  const pathways = [
    {
      title: "For Readers",
      desc: "Quests, discoveries, community reading spaces, featured releases, and the ever-growing Inkbound TBR.",
      links: [
        { label: "Readers & Quests", to: "/readers" },
        { label: "Inkbound Indie Book Club", to: "/book-club" },
        { label: "The Inkbound TBR", to: "/inkbound-tbr" },
        { label: "New Releases", to: "/new-releases" },
      ],
    },
    {
      title: "For Authors",
      desc: "A place to be seen, stocked, featured, supported, and connected into the wider Inkbound ecosystem.",
      links: [
        { label: "Author Hub", to: "/authors" },
        { label: "On the Virtual Shelf", to: "/virtual-shelf" },
        { label: "About the Society", to: "/about" },
      ],
    },
    {
      title: "For Narrators",
      desc: "A growing space for voice talent, spotlight features, and discovery inside the wider story world.",
      links: [{ label: "Narrator Spotlight", to: "/narrators" }],
    },
    {
      title: "For Creatives",
      desc: "Editors, artists, formatters, service providers, and creative collaborators helping stories take form.",
      links: [{ label: "Creatives Hub", to: "/creativeshub" }],
    },
  ];

  const suiteSites = [
    {
      title: "Inkbound Publishing",
      href: "https://www.inkboundpublishing.com",
      blurb:
        "The Sixth House — Inkbound’s community imprint built around affiliation, visibility, and a creator-first future.",
      status: "Live now",
    },
    {
      title: "Inkbound Studios",
      href: "https://www.inkboundstudios.com",
      blurb:
        "The cinematic and media branch of Inkbound — built for adaptation, digital presence, visual identity, and immersive expansion.",
      status: "Live now",
    },
    {
      title: "Inkspire Academy",
      href: "https://www.inkspire-academy.com",
      blurb:
        "Education, mentorship, and structured pathways for indie creators who want strategy, support, and momentum.",
      status: "Live now",
    },
    {
      title: "Inkbound Marketplace",
      href: "#",
      blurb:
        "A future platform designed to bring together books, creators, services, and discovery in one connected ecosystem.",
      status: "Coming soon",
    },
    {
      title: "Inkbound Merch",
      href: "https://www.theinkboundbookshop.com",
      blurb:
        "Merchandise, branded pieces, and extensions of the Inkbound world through the bookshop and beyond.",
      status: "Live now",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050506] font-marcellus text-[#f5efe3]">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.08),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(82,58,133,0.08),transparent_20%),radial-gradient(circle_at_20%_80%,rgba(13,30,66,0.10),transparent_24%)]" />
      </div>

      <CountdownBanner />

      <main className="relative z-10">
{/* HERO */}
<section
  ref={heroRef}
  className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-28 md:pt-32"
>
  <motion.video
    className="absolute inset-0 h-full w-full object-cover"
    style={{ scale: videoScale }}
    autoPlay
    muted
    loop
    playsInline
  >
    <source src="/inkbound-hero.mp4" type="video/mp4" />
  </motion.video>

  <motion.div
    className="absolute inset-0 bg-black/40"
    style={{ opacity: heroOpacity }}
  />

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,160,78,0.32),transparent_38%)]" />
  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,2,10,0.65)_0%,rgba(0,0,0,0.12)_30%,rgba(0,0,0,0.38)_100%)]" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_48%,rgba(0,0,0,0.42)_100%)]" />

  <GoldParticles />

  <motion.div
    className="relative z-10 flex w-full justify-center px-6 pb-28 md:pb-32"
    style={{ y: heroTextY }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      className="flex w-full max-w-5xl flex-col items-center text-center"
    >
      <div className="mb-4 text-xs uppercase tracking-[0.38em] text-[#d4b160] drop-shadow-[0_0_12px_rgba(200,160,78,0.35)]">
        The Inkbound Ecosystem
      </div>

      <motion.img
        src="/logo.png"
        alt="Inkbound Society Logo"
        className="h-auto w-[280px] max-w-[72vw] drop-shadow-[0_0_40px_rgba(200,160,78,0.25)] sm:w-[340px] md:w-[420px] lg:w-[500px]"
        animate={{
          filter: [
            "drop-shadow(0 0 22px rgba(200,160,78,0.12))",
            "drop-shadow(0 0 38px rgba(200,160,78,0.26))",
            "drop-shadow(0 0 22px rgba(200,160,78,0.12))",
          ],
          scale: [1, 1.012, 1],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="mt-8 max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl"
      >
        Some stories find you.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="mt-4 max-w-3xl text-base leading-7 text-white/75 md:text-lg"
      >
        The gateway to the Inkbound world — where readers, authors,
        narrators, creatives, and new story ventures converge.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55 }}
        className="mt-5 text-sm uppercase tracking-[0.18em] text-white/55"
      >
        {fakeUserCount} readers browsing right now
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <Link
          to="/about"
          className="inline-flex items-center gap-2 rounded-2xl border border-[#c8a04e]/40 bg-[#c8a04e] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(200,160,78,0.22)]"
        >
          Enter the Society
          <ArrowRight className="h-4 w-4" />
        </Link>

        <Link
          to="/newsletter"
          className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-white/30 hover:bg-white/10"
        >
          Read the Times
        </Link>
      </motion.div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <div className="flex flex-col items-center gap-2 text-white/55">
        <span className="text-[0.68rem] uppercase tracking-[0.35em]">
          Scroll
        </span>
        <motion.span
          className="h-10 w-px bg-gradient-to-b from-[#c8a04e] to-transparent"
          animate={{ opacity: [0.35, 1, 0.35], y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  </motion.div>
</section>

        {/* PATHWAYS */}
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <Reveal>
            <div className="mb-10 text-center">
              <div className="text-xs uppercase tracking-[0.32em] text-[#c8a04e]">
                Pathways into Inkbound
              </div>
              <h2 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
                Choose your way in
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/62 md:text-lg">
                Not a pile of pages. A set of clear entry points into the spaces
                built for each part of the community.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {pathways.map((path, index) => (
              <Reveal key={path.title} delay={index * 0.08}>
                <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:border-[#c8a04e]/30 hover:bg-white/[0.07]">
                  <div className="text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
                    Pathway
                  </div>

                  <h3 className="mt-3 text-3xl text-white">{path.title}</h3>

                  <p className="mt-4 text-sm leading-7 text-white/62">
                    {path.desc}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {path.links.map((link) => (
                      <Link
                        key={link.label}
                        to={link.to}
                        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/20 px-4 py-2 text-sm text-white/80 transition hover:border-[#c8a04e]/30 hover:bg-white/10 hover:text-white"
                      >
                        {link.label}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* WIDER INKBOUND WORLD */}
        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <Reveal>
            <div className="mb-10 text-center">
              <div className="text-xs uppercase tracking-[0.32em] text-[#c8a04e]">
                The Wider Inkbound World
              </div>
              <h2 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
                Beyond the Society
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/62 md:text-lg">
                The Society is the gateway. These are the expanding branches of
                the wider Inkbound suite — each built for a different role in the
                ecosystem.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {suiteSites.map((site, index) => {
              const isComingSoon = site.href === "#";

              const card = (
                <Reveal delay={index * 0.06}>
                  <div className="group rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/30 hover:bg-white/[0.07]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
                        Inkbound Site
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] ${
                          isComingSoon
                            ? "border border-white/10 bg-white/5 text-white/55"
                            : "border border-[#c8a04e]/30 bg-[#c8a04e]/10 text-[#f6dca0]"
                        }`}
                      >
                        {site.status}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl leading-tight text-white">
                      {site.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/60">
                      {site.blurb}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-[#f6dca0]">
                      {isComingSoon ? "Coming soon" : "Visit site"}
                      {!isComingSoon && (
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      )}
                    </div>
                  </div>
                </Reveal>
              );

              if (isComingSoon) {
                return <div key={site.title}>{card}</div>;
              }

              return (
                <a
                  key={site.title}
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {card}
                </a>
              );
            })}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl md:p-8">
              <div className="grid items-center gap-8 lg:grid-cols-5">
                <div className="lg:col-span-2">
                  <div className="relative overflow-hidden rounded-[1.5rem] border border-[#c8a04e]/20 bg-black/40">
                    <img
                      src={latestIssue.coverImage}
                      alt={`${latestIssue.title} ${latestIssue.issueNumber}`}
                      className="h-auto w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <div className="inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
                    <Newspaper className="h-6 w-6" />
                  </div>

                  <div className="mt-4 text-xs uppercase tracking-[0.28em] text-[#c8a04e]">
                    Fresh from the press
                  </div>

                  <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                    The Inkbound Times
                  </h2>

                  <p className="mt-3 text-sm uppercase tracking-[0.18em] text-white/40">
                    {latestIssue.issueNumber} • {latestIssue.dateLabel}
                  </p>

                  <p className="mt-5 text-base leading-8 text-white/68">
                    {latestIssue.description}
                  </p>

                  <p className="mt-4 text-base leading-8 text-white/55">
                    Open the latest issue as a digital edition with flippable
                    pages, or step into the archive to explore every release.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to={`/newsletter/${latestIssue.slug}`}
                      className="inline-flex items-center gap-2 rounded-2xl border border-[#c8a04e]/40 bg-[#c8a04e] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:scale-[1.02]"
                    >
                      Read latest issue
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      to="/newsletter"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-white/30 hover:bg-white/10"
                    >
                      View archive
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* TIARA COURT */}
        <section className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl md:p-8">
              <div className="relative overflow-hidden rounded-[2rem] border border-[#c8a04e]/20 bg-black/30 p-6 backdrop-blur-xl md:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,160,78,0.12),transparent_30%)]" />

                <div className="relative grid items-center gap-8 md:grid-cols-[0.95fr_1.05fr]">
                  <div className="rounded-[1.5rem] border border-[#c8a04e]/20 bg-white/5 p-4">
                    <img
                      src="/images/blackdiadem.png"
                      alt="The Tiara Court – The Black Diadem Series"
                      className="mx-auto w-full max-w-md drop-shadow-[0_0_25px_rgba(200,160,78,0.22)]"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.28em] text-[#c8a04e]">
                      Collaborative series
                    </div>
                    <h2 className="mt-3 text-3xl text-white md:text-4xl">
                      The Tiara Court
                    </h2>
                    <p className="mt-4 text-base leading-8 text-white/70">
                      A connected 14-book series of dark fairytale retelling
                      novellas. Each story stands alone, but every princess bears
                      the same mark — and with every tale told, the Black Diadem
                      loses another piece.
                    </p>
                    <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[#f6dca0]">
                      Releasing Halloween 2026
                    </p>

                    <a
                      href="/black-diadem"
                      className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-[#c8a04e]/40 bg-[#c8a04e] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:scale-[1.02]"
                    >
                      See the Court
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* MAP + EVENTS */}
        <section className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
                <div className="inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
                  <Globe2 className="h-6 w-6" />
                </div>

                <div className="mt-4 text-xs uppercase tracking-[0.28em] text-[#c8a04e]">
                  Community map
                </div>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Creators around the world
                </h2>
                <p className="mt-4 text-base leading-8 text-white/68">
                  A living glimpse of where our community gathers, stretching
                  outward while still tracing back to your little shop in Gort.
                </p>

                <Link
                  to="/author-map"
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-[#c8a04e]/40 bg-[#c8a04e] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:scale-[1.02]"
                >
                  View full globe
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link to="/author-map" className="mt-6 block group">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-[#c8a04e]/20 bg-black/40">
                    <img
                      src="/globe.png"
                      alt="Inkbound Creators Map preview"
                      className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
                  </div>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[2rem] border border-[#c8a04e]/20 bg-[linear-gradient(135deg,rgba(200,160,78,0.10),rgba(255,255,255,0.04),rgba(20,65,45,0.10))] p-6 backdrop-blur-2xl md:p-8">
                <div className="text-xs uppercase tracking-[0.28em] text-[#c8a04e]">
                  Inkbound events
                </div>

                <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                  Community-driven bookish events
                </h2>

                <p className="mt-4 text-base leading-8 text-white/68">
                  From Stuff Your Kindle days and reader challenges to live
                  launches, collaborations, and limited-time drops, Inkbound
                  events are built to make indie discovery feel alive.
                </p>

                <div className="mt-6 flex flex-wrap gap-2 text-[0.8rem] uppercase tracking-[0.12em] text-[#f6dca0]">
                  <span className="rounded-full border border-[#c8a04e]/30 bg-black/25 px-3 py-1">
                    Indie-first
                  </span>
                  <span className="rounded-full border border-[#c8a04e]/30 bg-black/25 px-3 py-1">
                    Global community
                  </span>
                  <span className="rounded-full border border-[#c8a04e]/30 bg-black/25 px-3 py-1">
                    Limited-time events
                  </span>
                  <span className="rounded-full border border-[#c8a04e]/30 bg-black/25 px-3 py-1">
                    Human discovery
                  </span>
                </div>

                <div className="mt-6">
                  <img
                    src="/images/inkxiaac.png"
                    alt="Inkbound x Indie Author Advocate Community"
                    className="h-16 w-auto rounded-xl border border-white/10 bg-black/20 p-2"
                  />
                </div>

                <Link
                  to="/stuff-your-kindle"
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-[#c8a04e]/40 bg-[#c8a04e] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:scale-[1.02]"
                >
                  View upcoming events
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PARTNERS */}
        <section className="px-6 pb-12 pt-6 lg:px-10">
          <Reveal>
            <div className="mx-auto max-w-7xl">
              <div className="mb-10 flex justify-center">
                <div className="h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-[#c8a04e] to-transparent opacity-70" />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
                <a
                  href="https://libro.fm/inkboundsociety"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:scale-105"
                >
                  <img
                    src="/images/Librofm-Logo.png"
                    alt="Libro.fm logo"
                    className="w-36 opacity-85 transition hover:opacity-100 md:w-48"
                  />
                </a>

                <img
                  src="/images/proudindie.png"
                  alt="Proudly Supporting Independent Authors"
                  className="w-36 opacity-85 transition hover:opacity-100 md:w-48"
                />

                <a
                  href="https://discord.gg/BkHyN6hDwJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:scale-105"
                >
                  <img
                    src="/images/InkboundDiscord.png"
                    alt="Join us on Discord"
                    className="w-36 opacity-85 transition hover:opacity-100 md:w-48"
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* GUESTBOOK */}
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-6 lg:px-10">
          <Reveal>
            <div className="mb-8 flex justify-center">
              <div className="h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-[#c8a04e] to-transparent opacity-70" />
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl md:p-8">
              <div className="mb-6 text-center">
                <div className="text-xs uppercase tracking-[0.28em] text-[#c8a04e]">
                  Leave your mark
                </div>
                <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                  The Inkbound Guest Book
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/62">
                  A final little whisper before you leave the gate.
                </p>
              </div>

              <GuestBook />
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}