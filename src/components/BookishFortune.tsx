// BookishFortune.tsx
import { useState } from "react";

const fortunes = [
  "You will fall in love with a villain—and like it.",
  "A cursed book holds your next obsession.",
  "Your bookmark will choose your next heartbreak.",
  "You will meet a mysterious stranger with a tragic past.",
  "The plot twist you fear is the one you need.",
  "Your next read will ruin you—in the best way.",
  "Beware the book with no ending.",
  "Something old will whisper to you soon.",
  "You are being watched by your favourite character.",
  "Trust the author—but only halfway.",
  "One quote will undo you this week.",
  "You're not reading this book. It's reading you.",
  "Magic is waiting where you least expect it.",
  "You’ll cry. It’s inevitable.",
  "Read the dedication. It’s meant for you.",
  "Don't skip the prologue. That’s the trap.",
  "Your next book boyfriend has claws.",
  "You were written into a story long ago.",
  "Something ancient awakens when you turn the page.",
  "The antagonist has their reasons. So do you."
];

export default function BookishFortune() {
  const [fortune, setFortune] = useState("");
  const [show, setShow] = useState(false);

  const drawFortune = () => {
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(random);
    setShow(true);
  };

  return (
    <div className="fixed bottom-20 right-6 z-50">
      <button
        onClick={drawFortune}
        className="bg-black/80 text-amber-300 border border-amber-400 px-4 py-2 rounded-full shadow-md hover:bg-black hover:text-amber-100 backdrop-blur-md"
      >
        🔮 Draw a Fortune
      </button>

      {show && (
        <div className="mt-3 p-4 bg-black/90 text-amber-300 border border-amber-500 rounded-xl shadow-xl max-w-xs animate-fade-in">
          <p className="text-sm italic text-center">“{fortune}”</p>
          <button
            className="mt-2 text-xs underline text-amber-400 hover:text-amber-200 block mx-auto"
            onClick={() => setShow(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
