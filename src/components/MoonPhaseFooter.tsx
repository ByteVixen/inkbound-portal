import { useEffect, useState } from "react";

const moonPhases: Record<string, string> = {
  "New Moon": "🌑",
  "Waxing Crescent": "🌒",
  "First Quarter": "🌓",
  "Waxing Gibbous": "🌔",
  "Full Moon": "🌕",
  "Waning Gibbous": "🌖",
  "Last Quarter": "🌗",
  "Waning Crescent": "🌘",
};

export default function MoonPhaseFooter() {
  const [phase, setPhase] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    fetch(`https://api.farmsense.net/v1/moonphases/?d=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        const current = data?.[0]?.Phase || "Unknown";
        setPhase(current);
      })
      .catch(() => setPhase(null));
  }, []);

  return (
    <div className="w-full text-center text-xs text-amber-300 bg-black/80 py-2">
      {phase ? (
        <span>
          {moonPhases[phase] || "🌘"} Current Moon Phase:{" "}
          <span className="italic">{phase}</span>
        </span>
      ) : (
        "🌙 Reading the stars..."
      )}
    </div>
  );
}
