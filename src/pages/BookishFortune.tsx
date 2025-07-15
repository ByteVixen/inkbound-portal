import React, { useState } from "react";

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

const BookishFortunePage: React.FC = () => {
  const [fortune, setFortune] = useState<string | null>(null);

  const drawFortune = () => {
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(random);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20 bg-black text-white font-marcellus">
      <h1 className="text-3xl md:text-5xl mb-10 text-amber-300 text-center drop-shadow-glow">
        🔮 Bookish Fortune Generator
      </h1>

      <div className="relative">
        {/* Glowing aura behind */}
        <div className="absolute inset-0 rounded-full blur-2xl bg-purple-600 opacity-40 animate-pulse" />

        {/* Crystal Ball */}
        <img
          src="/images/crystal-ball.gif"
          alt="Crystal Ball"
          className="w-64 md:w-80 z-10 relative"
          onClick={drawFortune}
        />

        {/* Fortune inside the ball */}
        {fortune && (
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-6 text-sm md:text-lg text-black font-script animate-fade-in z-20">
            “{fortune}”
          </p>
        )}
      </div>

      <button
        onClick={drawFortune}
        className="mt-10 bg-purple-700 hover:bg-purple-600 text-white px-5 py-3 rounded-full text-sm uppercase tracking-wide shadow-lg transition-all"
      >
        Draw Another Fortune
      </button>
    </div>
  );
};

export default BookishFortunePage;
