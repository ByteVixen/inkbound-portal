import { Instagram, Facebook, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black/80 py-6 border-t border-amber-700 text-center text-sm z-10">
      <div className="flex justify-center space-x-6 mb-2">
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

      <p className="text-gray-500">
        © {new Date().getFullYear()} The Inkbound Society
      </p>
    </footer>
  );
}
