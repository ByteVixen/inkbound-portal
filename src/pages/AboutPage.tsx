import VantaBackground from "../components/VantaBackground";

type TeamMember = {
  name: string;
  role: string;
  lore: string;
  socialHandle?: string;
  socialUrl?: string;
  anchor?: boolean;
};

const teamMembers: TeamMember[] = [
  {
    name: "Amanda Kilkenny",
    role: "CEO · Founder",
    lore: "Built the bookshop she wished existed as a kid and turned it into a portal for readers and writers. Builder of the wider Inkbound world — from the bookshop to the Society, from the systems behind it to the future branches still taking shape. Member of the racoon burrito trio and one of the hosts of Inkbound After Dark.",
    socialHandle: "@the.inkbound.society",
    socialUrl: "https://www.tiktok.com/@the.inkbound.society?lang=en-GB",
    anchor: true,
  },
  {
    name: "Ria",
    role: "COO",
    lore: "Author, original Inkbound co-founder with Amanda, crafter, list-maker, and the rare soul who actually remembers to bring the list.",
    socialHandle: "@riak233",
    socialUrl: "https://www.tiktok.com/@riak233?lang=en-GB",
    anchor: true,
  },
  {
    name: "Roma",
    role: "VP of Community & Reader Experience · Lead of the Inkbound Indie Book Club",
    lore: "There would be no books in Inkbound without her, PA extraordinaire, chaos-wrangler, and an all-round incredible human. She helps hold the reader side of Inkbound together, leads the Inkbound Indie Book Club, and is one of the hosts of Inkbound After Dark.",
    socialHandle: "@roma_booktok",
    socialUrl: "https://www.tiktok.com/@roma_booktok?lang=en-GB",
    anchor: true,
  },
  {
    name: "Gina",
    role: "VP of Marketing and Innovation",
    lore: "Exceptional author and organiser of absolutely everything, the formatter who quietly makes impossible timelines work, creator of the Fall for Grace series on TikTok, and one of the hosts of Inkbound After Dark.",
    socialHandle: "@ginaparrillo",
    socialUrl: "https://www.tiktok.com/@ginaparrillo?lang=en-GB",
    anchor: true,
  },
  {
    name: "Surf",
    role: "CFO",
    lore: "Resident vampire and writer of stunning books, alter ego Captain Surf, steadfast supporter of everyone, genuinely good soul, and one of the hosts of Inkbound After Dark.",
    socialHandle: "@sherediaauthor",
    socialUrl: "https://www.tiktok.com/@sherediaauthor?lang=en-GB",
    anchor: true,
  },
  {
    name: "David",
    role: "Original Member",
    lore: "My big brother in chaos and craft, part menace. Sounding board for every wild idea, architect of beautifully unhinged smut, the kind of writer who turns audacity into art, and one of the hosts of Inkbound After Dark.",
    socialHandle: "@davidcorbinauthor",
    socialUrl: "https://www.tiktok.com/@davidcorbinauthor",
    anchor: true,
  },
  {
    name: "Jen",
    role: "Original Member",
    lore: "Boss energy in human form. Indie champion, community builder, fearless writer of questionably possessed anatomy, equal parts legend and menace, and one of the hosts of Inkbound After Dark.",
    socialHandle: "@yourgenxaunt2",
    socialUrl: "https://www.tiktok.com/@yourgenxaunt2?lang=en-GB",
   
  },
  {
    name: "Ash B",
    role: "Original Member · Committee Member of the Inkbound Indie Book Club",
    lore: "Indie author advocate and artist with truly astronomical talent, chopper of wood, keeper of living plants, proud member of the raccoon burrito trio, and a committee member of the Inkbound Indie Book Club.",
    socialHandle: "@reptilesandreads",
    socialUrl: "https://www.tiktok.com/@reptilesandreads?lang=en-GB",
  },
  {
    name: "Sabrina",
    role: "Original Member · Committee Member of the Inkbound Indie Book Club",
    lore: "Indie author advocate, owner of Triple Moon Proofing, maker of dangerously good playlists, part of the raccoon burrito trio, and a committee member of the Inkbound Indie Book Club.",
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
    name: "MommaD",
    role: "Original Member · Committee Member of the Inkbound Indie Book Club",
    lore: "Community cornerstone and relentless indie supporter. The steady heartbeat of BookTok, champion of authors, curator of a library that borders on mythical, and a committee member of the Inkbound Indie Book Club. If stories had a guardian, it would look a lot like her.",
    socialHandle: "@mommad1452",
    socialUrl: "https://www.tiktok.com/@mommad1452?lang=en-GB",
  },
  {
    name: "Mama Meyers",
    role: "Committee Member of the Inkbound Indie Book Club",
    lore: "ARC reader, advocate, author, and cheerleader to all of us. A steady source of support behind the scenes and a valued committee member of the Inkbound Indie Book Club.",
    socialHandle: "@mama_myres",
    socialUrl: "https://www.tiktok.com/@mama_myres?lang=en-GB",
  },
  {
    name: "Amy Reads",
    role: "Committee Member of the Inkbound Indie Book Club",
    lore: "ARC reader, advocate, supporter, and cheerleader. One of the people helping hold up the reader side of Inkbound and a committee member of the Inkbound Indie Book Club.",
    socialHandle: "@amy.reads719",
    socialUrl: "https://www.tiktok.com/@amy.reads719?lang=en-GB",
  },
  {
    name: "LeAnne",
    role: "Head of Education at Inkspire",
    lore: "Author. Editor. Absolute powerhouse. Equal parts precision and passion, sharp-eyed with a red pen, soft-hearted with her people, and stronger than most will ever know.",
    socialHandle: "@leannehart.author",
    socialUrl: "https://www.tiktok.com/@leannehart.author?lang=en-GB",
  },
  {
    name: "Uncle James",
    role: "Junior Partner · Inkbound Studios",
    lore: "Author. Advocate. Head of the family meetings. The steady voice when things wobble, the pep talk when morale dips, and the man who will absolutely call the meeting to order. Equal parts wisdom and warmth, protective without being loud about it, motivational without being preachy. Community dad energy in its purest form.",
    socialHandle: "@unclejamesbackup",
    socialUrl: "https://www.tiktok.com/@unclejamesbackup",
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
      <style>{`
        @keyframes fadeInUpSoft {
          0% {
            opacity: 0;
            transform: translateY(14px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .team-card {
          opacity: 0;
          animation: fadeInUpSoft 0.65s ease-out forwards;
        }

        .team-card:nth-child(1) { animation-delay: 0.04s; }
        .team-card:nth-child(2) { animation-delay: 0.08s; }
        .team-card:nth-child(3) { animation-delay: 0.12s; }
        .team-card:nth-child(4) { animation-delay: 0.16s; }
        .team-card:nth-child(5) { animation-delay: 0.20s; }
        .team-card:nth-child(6) { animation-delay: 0.24s; }
        .team-card:nth-child(7) { animation-delay: 0.28s; }
        .team-card:nth-child(8) { animation-delay: 0.32s; }
        .team-card:nth-child(9) { animation-delay: 0.36s; }
        .team-card:nth-child(10) { animation-delay: 0.40s; }
        .team-card:nth-child(11) { animation-delay: 0.44s; }
        .team-card:nth-child(12) { animation-delay: 0.48s; }
        .team-card:nth-child(13) { animation-delay: 0.52s; }
        .team-card:nth-child(14) { animation-delay: 0.56s; }
        .team-card:nth-child(15) { animation-delay: 0.60s; }
        .team-card:nth-child(16) { animation-delay: 0.64s; }

        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <div className="relative min-h-screen overflow-hidden bg-[#050506] font-marcellus text-[#f5efe3]">
        <div className="absolute inset-0 z-0">
          <VantaBackground />
        </div>

        <div className="pointer-events-none fixed inset-0 z-[1]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(82,58,133,0.08),transparent_20%),radial-gradient(circle_at_20%_80%,rgba(13,30,66,0.10),transparent_24%)]" />
          <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[#c8a04e]/8 blur-3xl" />
        </div>

        <div className="relative z-10 px-4 py-16 md:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            {/* Hero */}
            <section className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/25 px-6 py-10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl md:px-10 md:py-14">
              <div className="mx-auto max-w-4xl text-center">
                <div className="text-xs uppercase tracking-[0.34em] text-[#c8a04e]">
                  About Inkbound
                </div>

                <img
                  src="/amanda.png"
                  alt="Amanda Kilkenny"
                  className="mx-auto mt-8 h-36 w-36 rounded-full border border-[#c8a04e]/40 object-cover shadow-[0_0_40px_rgba(200,160,78,0.18)] md:h-44 md:w-44"
                />

                <p className="mt-5 text-sm uppercase tracking-[0.18em] text-[#f6dca0]">
                  Amanda Kilkenny · Founder of Inkbound
                </p>

                <h1 className="mt-6 font-serif text-4xl leading-tight text-white md:text-6xl">
                  About the Inkbound Society
                </h1>

                <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
                  Inkbound Bookshop is a real-world haven for stories and storytellers,
                  tucked into the heart of Gort, Co. Galway. Founded by Amanda, a
                  lifelong local from the Ardrahan–Peterswell area, Inkbound was built
                  to become the kind of space she always wished existed growing up.
                </p>

                <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/62">
                  Despite Gort’s deep literary ties, it never had a bookshop of its own.
                  Inkbound exists to change that — not just by selling books, but by
                  building a place where readers, writers, narrators, creatives, and
                  storytellers of all kinds can find each other.
                </p>

                <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/56">
                  We champion indie authors, celebrate the self-published and the
                  strange, and build a world where no reader or writer is left out.
                  Here, stories are currency, quests are real, and every book has the
                  potential to change someone’s world.
                </p>

                <p className="mt-8 text-lg italic text-[#f6dca0]">
                  “From a girl who grew up with no bookshop — to a woman who built one.”
                </p>
              </div>
            </section>

            {/* Team Intro */}
            <section className="mt-10 rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl md:p-8">
              <div className="text-xs uppercase tracking-[0.3em] text-[#c8a04e]">
                The Inkbound Team
              </div>
              <h2 className="mt-4 font-serif text-3xl text-white md:text-5xl">
                The people holding the lanterns
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/60">
                Inkbound was never meant to be a solo story. These are the people
                helping hold the threads — the original crew, the builders, the
                advocates, the chaos-wranglers, and the ones still keeping the
                pages turning.
              </p>
            </section>

            {/* Anchors */}
            <section className="mt-10">
              <div className="mb-6 text-center">
                <div className="text-xs uppercase tracking-[0.3em] text-[#c8a04e]">
                  Core Anchors
                </div>
                <p className="mt-3 text-sm text-white/50">
                  The central force helping shape the wider Inkbound ecosystem.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {teamMembers
                  .filter((member) => member.anchor)
                  .map((member) => (
                    <a
                      key={member.name}
                      href={member.socialUrl || "#"}
                      target={member.socialUrl ? "_blank" : undefined}
                      rel={member.socialUrl ? "noopener noreferrer" : undefined}
                      className="team-card group overflow-hidden rounded-[1.8rem] border border-[#c8a04e]/30 bg-[linear-gradient(145deg,rgba(200,160,78,0.12),rgba(255,255,255,0.04),rgba(0,0,0,0.35))] p-[1px] transition duration-300 hover:-translate-y-1"
                    >
                      <div className="h-full rounded-[1.75rem] bg-[radial-gradient(circle_at_top_left,rgba(200,160,78,0.08),rgba(9,9,11,0.96))] p-6 backdrop-blur-xl">
                        <div className="flex items-center gap-2">
                          <span className="rounded-full border border-[#c8a04e]/30 bg-[#c8a04e]/10 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[#f6dca0]">
                            Anchor
                          </span>
                        </div>

                        <h3 className="mt-4 text-2xl text-white">{member.name}</h3>
                        <p className="mt-2 text-[0.72rem] uppercase tracking-[0.24em] text-[#c8a04e]">
                          {member.role}
                        </p>

                        <p className="mt-4 text-sm leading-7 text-white/70">
                          {member.lore}
                        </p>

                        <div className="mt-5 text-sm text-[#f6dca0]/85">
                          {member.socialHandle ? member.socialHandle : "Social coming soon"}
                        </div>
                      </div>
                    </a>
                  ))}
              </div>
            </section>

            {/* Full Team */}
            <section className="mt-12">
              <div className="mb-6 text-center">
                <div className="text-xs uppercase tracking-[0.3em] text-[#c8a04e]">
                  Original Members & Extended Team
                </div>
                <p className="mt-3 text-sm text-white/50">
                  The wider circle helping Inkbound keep moving.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {teamMembers
                  .filter((member) => !member.anchor && member.name !== "Dad")
                  .map((member) => (
                    <a
                      key={member.name}
                      href={member.socialUrl || "#"}
                      target={member.socialUrl ? "_blank" : undefined}
                      rel={member.socialUrl ? "noopener noreferrer" : undefined}
                      className="team-card group overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]"
                    >
                      <h3 className="text-2xl text-white">{member.name}</h3>
                      <p className="mt-2 text-[0.72rem] uppercase tracking-[0.24em] text-[#c8a04e]">
                        {member.role}
                      </p>

                      <p className="mt-4 text-sm leading-7 text-white/68">
                        {member.lore}
                      </p>

                      <div className="mt-5 text-sm text-[#f6dca0]/80">
                        {member.socialHandle ? member.socialHandle : "Social coming soon"}
                      </div>
                    </a>
                  ))}
              </div>
            </section>

            {/* Dad at the bottom */}
            {teamMembers
              .filter((member) => member.name === "Dad")
              .map((member) => (
                <section key={member.name} className="mt-12">
                  <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-[#c8a04e]/20 bg-[linear-gradient(145deg,rgba(200,160,78,0.10),rgba(255,255,255,0.04),rgba(0,0,0,0.32))] p-[1px]">
                    <a
                      href={member.socialUrl || "#"}
                      target={member.socialUrl ? "_blank" : undefined}
                      rel={member.socialUrl ? "noopener noreferrer" : undefined}
                      className="team-card block rounded-[1.95rem] bg-[radial-gradient(circle_at_top_left,rgba(200,160,78,0.06),rgba(9,9,11,0.96))] p-8 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1"
                    >
                      <div className="text-xs uppercase tracking-[0.3em] text-[#c8a04e]">
                        Final word
                      </div>
                      <h3 className="mt-4 font-serif text-3xl text-white md:text-4xl">
                        {member.name}
                      </h3>
                      <p className="mt-3 text-[0.72rem] uppercase tracking-[0.24em] text-[#f6dca0]">
                        {member.role}
                      </p>
                      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/70">
                        {member.lore}
                      </p>
                      <div className="mt-6 text-sm text-[#f6dca0]/80">
                        {member.socialHandle ? member.socialHandle : "Social coming soon"}
                      </div>
                    </a>
                  </div>
                </section>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}