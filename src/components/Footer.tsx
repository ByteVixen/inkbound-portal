// src/components/Footer.tsx
import { Instagram, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black/80 border-t border-amber-700 text-center text-sm z-10 font-marcellus">
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

        <a href="mailto:summon@inkboundsociety.com" className="hover:text-amber-400">
          <Mail />
        </a>
      </div>

      {/* 📜 Legal */}
      <p className="text-gray-500 mb-1">
        © {new Date().getFullYear()} The Inkbound Society
      </p>

      <div className="space-x-4 text-xs text-gray-400 pb-4">
        <Link to="/privacy-policy" className="hover:text-amber-400 underline">
          Privacy Policy
        </Link>
        <Link to="/terms-of-service" className="hover:text-amber-400 underline">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
