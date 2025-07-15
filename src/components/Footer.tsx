import { Instagram, Facebook, Mail } from "lucide-react";
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

export default function Footer() {
  const [phase, setPhase] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://api.farmsense.net/v1/moonphases/?d=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        const current = data?.[0]?.Phase || "Unknown";
        setPhase(current);
      })
      .catch(() => setPhase(null));
  }, []);

  return (
    <footer className="bg-black/80 border-t border-amber-700 text-center text-sm z-10 font-marcellus">
      {/* 🌕 Moon Phase Bar */}
      <div className="w-full text-xs text-amber-300 bg-black/90 py-2 border-b border-amber-800">
        {phase ? (
          <span>
            {moonPhases[phase] || "🌘"} Current Moon Phase:{" "}
            <span className="italic">{phase}</span>
          </span>
        ) : (
          "🌙 Reading the stars..."
        )}
      </div>

      {/* 🔗 Social Icons */}
      <div className="flex justify-center space-x-6 my-4">
        <a
          href="https://www.instagram.com/the.inkbound.society/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-400"
        >
          <Instagram />
        </a>

        <a
          href="https://www.tiktok.com/@the.inkbound.society"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition"
        >
          <img
            src="/tiktok.png"
            alt="TikTok"
            className="w-5 h-5 md:w-6 md:h-6 inline-block"
          />
        </a>

        <a
          href="https://www.facebook.com/profile.php?id=61577178964903"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-400"
        >
          <Facebook />
        </a>

        <a
          href="mailto:summon@inkboundsociety.com"
          className="hover:text-amber-400"
        >
          <Mail />
        </a>
      </div>

      {/* 📜 Legal */}
      <p className="text-gray-500 mb-1">
        © {new Date().getFullYear()} The Inkbound Society
      </p>

      <div className="space-x-4 text-xs text-gray-400 pb-4">
        <a href="/privacy" className="hover:text-amber-400 underline">
          Privacy Policy
        </a>
        <a href="/terms" className="hover:text-amber-400 underline">
          Terms of Service
        </a>
      </div>
    </footer>
  );
}
