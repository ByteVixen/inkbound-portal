import { useEffect, useState, useRef } from "react";

export default function OpeningOverlay() {
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const alreadyVisited = localStorage.getItem("doorsOpened");
    const now = new Date();
    const launchTime = new Date("2025-07-12T00:00:00");

    if (!alreadyVisited && now >= launchTime) {
      setVisible(true);
    }
  }, []);

  const handleEnter = () => {
    localStorage.setItem("doorsOpened", "true");
    setEntered(true);

    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.warn("Audio play error:", err));
    }

    setTimeout(() => setVisible(false), 800);
  };

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-[1000] bg-inkblack/90 backdrop-blur-sm flex items-center justify-center transition-opacity duration-700 ${entered ? "opacity-0" : "opacity-100"}`}>
      <audio ref={audioRef} preload="auto">
  <source src="/sounds/gate-opening.wav" type="audio/wav" />
</audio>

      {!entered && (
        <button
          onClick={handleEnter}
          className="relative text-white text-4xl md:text-5xl px-12 py-6 rounded-full bg-fairygold hover:bg-amber-500 transition-all duration-300 font-marcellus z-50 shadow-goldglow animate-magicpop"
        >
          Enter

          {/* Glow ring behind button */}
          <span className="absolute inset-0 rounded-full blur-xl bg-fairygold opacity-50 animate-glow z-[-1]" />

          {/* Flicker pulse */}
          <span className="absolute inset-0 rounded-full blur-2xl bg-fairygold opacity-40 animate-flicker z-[-2]" />

          {/* Shimmer pulse */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent rounded-full opacity-10 animate-shimmer bg-[length:400%_100%] z-[-3]" />
        </button>
      )}
    </div>
  );
}
