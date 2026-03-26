import React, { useState } from "react";
import VantaBackground from "../components/VantaBackground";

const fortunes = [
  "You will fall in love with a villain—and like it.",
  "Your next read will ruin you (in the best way).",
  "Beware the book that stares back.",
  "A forbidden kiss will linger on the page.",
  "You will be chosen by a cursed object.",
  "The plot twist is closer than you think.",
  "He’s morally gray and he’s yours.",
  "The pen is mightier—and more dangerous—than the sword.",
  "A ghost waits for you between the lines.",
  "You’ll dog-ear a prophecy by accident. Fate will notice.",
  "One of your fictional lovers is watching.",
  "A monster will ask for your name. Don’t give it.",
  "Something ancient is listening to your annotations.",
  "Your TBR is sentient. And hungry.",
  "You’ll highlight a line and regret it later.",
  "You are the villain in someone else’s fantasy.",
  "The map in the front of your next book is a trap.",
  "A stranger will recommend the exact book you need.",
  "You will become obsessed with a new series. Sleep will suffer.",
  "The moon approves of your current ship.",
  "You’ll meet your next fictional obsession before the week ends.",
  "Your bookmark knows more than you think.",
  "A page will cut you—metaphorically, emotionally, or otherwise.",
  "You’re being watched by a character you forgot.",
  "The next book you open will change everything.",
  "Villains lie, but this one tells the truth.",
  "You’ve crossed into a cursed genre. Good luck.",
  "The trope you hate is about to seduce you.",
  "You will highlight a sentence that haunts you.",
  "A shadow in your TBR whispers your name.",
  "You’ll cry, then immediately recommend it to a friend.",
  "The author is laughing as you read this.",
  "That dog-eared page? It’s a warning.",
  "The love interest is lying—but it’s hot.",
  "You will binge the whole series and forget sleep.",
  "A fictional crown is waiting for you.",
  "The morally gray man has a moral gray twin.",
  "The ink remembers who skipped the prologue.",
  "Something ancient lives between chapters three and four.",
  "Your current book is watching you back.",
];

const DECOY_TALLY_URL = "https://tally.so/r/PdD1ZV";

const BookishFortunePage: React.FC = () => {
  const [fortune, setFortune] = useState<string | null>(null);
  const [sigilUnlocked, setSigilUnlocked] = useState(false);

  const drawFortune = () => {
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(random);
    setSigilUnlocked(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050506] font-marcellus text-[#f5efe3]">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(82,58,133,0.10),transparent_20%),radial-gradient(circle_at_20%_80%,rgba(13,30,66,0.12),transparent_24%)]" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#c8a04e]/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-20">
        <div className="w-full max-w-4xl overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/25 px-6 py-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl md:px-10 md:py-14">
          <div className="text-xs uppercase tracking-[0.34em] text-[#c8a04e]">
            Reader Pathway
          </div>

          <h1 className="mt-5 font-serif text-4xl leading-tight text-white md:text-6xl">
            Bookish Fortune
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
            Touch the glass, draw a whisper, and see what strange little omen
            the Inkbound world has waiting for you.
          </p>

          <div className="relative mt-12 flex justify-center">
            <div className="absolute inset-0 m-auto h-52 w-52 rounded-full bg-[#6d4db3]/20 blur-3xl md:h-64 md:w-64" />

            <div className="relative">
              <img
                src="/images/crystal-ball.gif"
                alt="Crystal Ball"
                className="relative z-10 w-64 cursor-pointer select-none md:w-80"
                onClick={drawFortune}
              />

              {fortune && (
                <p className="absolute left-1/2 top-1/2 z-20 w-[78%] -translate-x-1/2 -translate-y-1/2 px-2 text-center font-serif text-sm leading-6 text-[#1a1208] animate-fade-in md:text-lg md:leading-8">
                  “{fortune}”
                </p>
              )}

              {sigilUnlocked && (
                <button
                  type="button"
                  aria-label="Hidden sigil"
                  title="Something is wrong with this image…"
                  onClick={() =>
                    window.open(DECOY_TALLY_URL, "_blank", "noopener,noreferrer")
                  }
                  className="absolute bottom-[18%] right-[22%] z-30 h-3 w-3 rounded-full cursor-pointer opacity-[0.06] hover:opacity-25 focus:opacity-100 focus:outline-none sigil-glitch sigil-hint sigil-hitbox"
                />
              )}
            </div>
          </div>

          <button
            onClick={drawFortune}
            className="mt-10 inline-flex items-center justify-center rounded-2xl border border-[#c8a04e]/40 bg-[#c8a04e] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(200,160,78,0.2)]"
          >
            Draw Another Fortune
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookishFortunePage;