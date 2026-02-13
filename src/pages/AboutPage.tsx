import VantaBackground from "../components/VantaBackground";

type TeamMember = {
  name: string;
  role: string;
  lore: string;
  socialHandle?: string;
  socialUrl?: string;
  anchor?: boolean;
};

const originalMembers: TeamMember[] = [
  {
    name: "Amanda Kilkenny",
    role: "CEO - Founder",
    lore: "Built the bookshop she wished existed as a kid and turned it into a portal for readers and writers, member of the racoon burrito trio.",
    socialHandle: "@the.inkbound.society",
    socialUrl: "https://www.tiktok.com/@the.inkbound.society?lang=en-GB",
    anchor: true,
  },
  {
    name: "Ria",
    role: "COO",
    lore: "Author, original Inkbound co-founder with Amanda, crafter, list-maker and the rare soul who actually remembers to bring the list.",
    socialHandle: "@riak233",
    socialUrl: "https://www.tiktok.com/@riak233?lang=en-GB",
  },
  {
    name: "Roma",
    role: "VP of Talent Acquisitions",
    lore: "There would be no books in Inkbound without her, PA extraordinaire, chaos-wrangler, and an all-round incredible human.",
    socialHandle: "@roma_booktok",
    socialUrl: "https://www.tiktok.com/@roma_booktok?lang=en-GB",
  },
  {
    name: "Gina",
    role: "VP of Marketing and Innovation",
    lore: "Exceptional author and organiser of absolutely everything, the formatter who quietly makes impossible timelines work and Creator of the Fall for Grace Series on Tiktok.",
    socialHandle: "@ginaparrillo",
    socialUrl: "https://www.tiktok.com/@ginaparrillo?lang=en-GB",
  },
  {
    name: "David",
    role: "Original Member",
    lore: "My big brother in chaos and craft, part menace. Sounding board for every wild idea, architect of beautifully unhinged smut, and the kind of writer who turns audacity into art.",
    socialHandle: "@davidcorbinauthor",
    socialUrl: "https://www.tiktok.com/@davidcorbinauthor",
  },
  {
    name: "Ash B",
    role: "Original Member",
    lore: "Indie author advocate and artist with truly astronomical talent, chopper of wood, keeper of living plants, and proud member of the raccoon burrito trio.",
    socialHandle: "@reptilesandreads",
    socialUrl: "https://www.tiktok.com/@reptilesandreads?lang=en-GB",
  },
  {
    name: "Sabrina",
    role: "Original Member",
    lore: "Indie author advocate, owner of Triple Moon Proofing, maker of dangerously good playlists, and part of the raccoon burrito trio.",
    socialHandle: "@sabrina.k227",
    socialUrl: "https://www.tiktok.com/@sabrina.k227?lang=en-GB",
  },
  {
    name: "Phineas",
    role: "Original Member",
    lore: "Author, all-round exceptional human, helper of everyone, founder of Pocket Wizard Formatting, voice of Harrold, and reliable bringer of joy.",
    socialHandle: "@phindelgado",
    socialUrl: "https://www.tiktok.com/@phindelgado?lang=en-GB",
  },
  {
    name: "Surf",
    role: "Original Member",
    lore: "Resident vampire and writer of stunning books, alter ego Captain Surf, steadfast supporter of everyone, and just a genuinely good soul.",
    socialHandle: "@sherediaauthor",
    socialUrl: "https://www.tiktok.com/@sherediaauthor?lang=en-GB",
  },
  {
    name: "LeAnne",
    role: "Original Member",
    lore: "Author. Editor. Absolute powerhouse. Equal parts precision and passion, sharp-eyed with a red pen, soft-hearted with her people, and stronger than most will ever know.",
    socialHandle: "@leannehart.author",
    socialUrl: "https://www.tiktok.com/@leannehart.author?lang=en-GB",
  },
  {
    name: "Dad",
    role: "Original Member",
    lore: "Called Dad by everyone who’s ever met him. The sounding board, the best hug-giver in any county, and the man who never once told Amanda the sky wasn’t hers to claim. Santa during the festive season, maker of absolutely anything with his hands, and a devoted audiobook consumer.",
    socialHandle: "@patkilkenny3",
    socialUrl: "https://www.tiktok.com/@patkilkenny3?lang=en-GB",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Local styles for glow + animated reveal */}
      <style>{`
        @keyframes fadeInUpSoft {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .team-card {
          border-radius: 0.75rem;
          border: 1px solid rgba(251, 191, 36, 0.3); /* amber-400-ish */
          box-shadow: 0 0 18px rgba(251, 191, 36, 0.18);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease,
            background-color 0.25s ease;
          background: radial-gradient(circle at top left, rgba(251, 191, 36, 0.08), rgba(15, 23, 42, 0.95));
          opacity: 0;
          animation: fadeInUpSoft 0.6s ease-out forwards;
        }

        .team-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 26px rgba(251, 191, 36, 0.4);
          border-color: rgba(251, 191, 36, 0.85);
          background-color: rgba(15, 23, 42, 0.98);
        }

        .team-card:nth-child(1) { animation-delay: 0.05s; }
        .team-card:nth-child(2) { animation-delay: 0.12s; }
        .team-card:nth-child(3) { animation-delay: 0.19s; }
        .team-card:nth-child(4) { animation-delay: 0.26s; }
        .team-card:nth-child(5) { animation-delay: 0.33s; }
        .team-card:nth-child(6) { animation-delay: 0.40s; }
        .team-card:nth-child(7) { animation-delay: 0.47s; }
        .team-card:nth-child(8) { animation-delay: 0.54s; }
        .team-card:nth-child(9) { animation-delay: 0.61s; }

        .team-card-name {
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 0.03em;
        }

        .team-card-role {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          opacity: 0.85;
        }

        .team-card-lore {
          font-size: 0.95rem;
          line-height: 1.5;
          opacity: 0.9;
        }

        .team-card-social {
          font-size: 0.85rem;
          opacity: 0.8;
        }
      `}</style>

      <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
        {/* Vanta Background */}
        <div className="absolute inset-0 z-0">
          <VantaBackground />
        </div>

        {/* Page Content */}
        <div className="relative z-10 py-20 px-4 flex flex-col items-center justify-center">
          {/* Main About Block */}
          <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-3xl w-full text-center">
            {/* Profile Image */}
            <img
              src="/amanda.png"
              alt="Amanda Kilkenny"
              className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-amber-500 shadow-lg mx-auto"
            />

            <h2 className="text-amber-400 text-sm uppercase tracking-wide font-semibold mb-4">
              Amanda Kilkenny · Founder of Inkbound
            </h2>

            <h1 className="text-5xl font-light mb-8 text-amber-500 text-glow">
              About the Inkbound Society
            </h1>

            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Inkbound Bookshop is a real-world haven for stories and storytellers,
              tucked away in the heart of Gort, Co. Galway. Founded by me, Amanda,
              a lifelong local from the Ardrahan–Peterswell area, Inkbound is the
              kind of space I always wished existed growing up. Despite Gort’s deep
              literary ties (W.B Yeats, anyone?), it never had a bookshop. I wanted
              to change that.
            </p>

            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Since I was a child, I’ve dreamed of creating a bookshop that felt like
              stepping through a portal, a place where magic lives on every shelf.
              Books have always been my way into other worlds, and Inkbound is my way
              of bringing those worlds to life for others.
            </p>

            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              We champion indie authors, celebrate the self-published and the strange,
              and build a community where no reader or writer is left out. Here,
              stories are currency, quests are real, and every book has the potential
              to change someone’s world.
            </p>

            <p className="italic text-amber-400 mt-6 text-lg">
              “From a girl who grew up with no bookshop — to a woman who built one.”
            </p>
          </div>

          {/* Team Section */}
          <div className="relative z-10 mt-16 max-w-5xl w-full bg-black/55 backdrop-blur-md p-10 rounded-xl shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl text-amber-500 font-light mb-3">
                The Inkbound Society Team
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
                Inkbound was never meant to be a solo story. These are the people
                who help hold the threads, the original crew who lit the first
                lanterns and keep the pages turning.
              </p>
            </div>

            {/* Original Members */}
            <section className="mt-6">
              <h3 className="text-2xl text-amber-400 font-light mb-4 text-center">
                Original Members
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {originalMembers.map((member) => (
                  <a
                    key={member.name}
                    href={member.socialUrl || "#"}
                    target={member.socialUrl ? "_blank" : undefined}
                    rel={member.socialUrl ? "noopener noreferrer" : undefined}
                    className={`team-card cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/80 focus:ring-offset-2 focus:ring-offset-black ${
                      member.anchor ? "ring-2 ring-amber-400/90" : ""
                    }`}
                  >
                    <div className="h-full w-full px-5 py-4 flex flex-col justify-between text-left">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="team-card-name text-amber-100">
                            {member.name}
                          </span>
                          {member.anchor && (
                            <span className="text-[0.7rem] uppercase tracking-[0.16em] text-amber-300/90 bg-amber-500/10 px-2 py-0.5 rounded-full">
                              Anchor
                            </span>
                          )}
                        </div>
                        <span className="team-card-role text-amber-300/80">
                          {member.role}
                        </span>
                      </div>

                      <p className="team-card-lore text-gray-200 mt-3">
                        {member.lore}
                      </p>

                      <div className="mt-4 team-card-social text-amber-200/80">
                        {member.socialHandle
                          ? `Social: ${member.socialHandle}`
                          : "Social: coming soon"}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
