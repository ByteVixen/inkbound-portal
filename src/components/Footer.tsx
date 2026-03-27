// src/components/Footer.tsx
import { Instagram, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const footerNav = [
  {
    title: "Explore",
    links: [
      { label: "Readers", to: "/readers" },
      { label: "Virtual Shelf", to: "/virtual-shelf" },
      { label: "Author Hub", to: "/authors" },
      { label: "Narrators", to: "/narrators" },
    ],
  },
  {
    title: "Create",
    links: [
      { label: "Creatives Hub", to: "/CreativesHub" },
      { label: "Collaborate", to: "/collaborate" },
      { label: "Become Stocked", to: "/authors/consignment" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "New Releases", to: "/new-releases" },
      { label: "Inkbound TBR", to: "/inkbound-tbr" },
      { label: "Global Map", to: "/author-map" },
    ],
  },
  {
    title: "Info",
    links: [
      { label: "About", to: "/about" },
      { label: "Info", to: "/info" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

const ecosystemLinks = [
  { label: "Inkbound Society™", href: "https://inkboundsociety.com" },
  { label: "Inkbound Bookshop", href: "https://www.theinkboundbookshop.com" },
  { label: "Inkbound Community Discord", href: "https://discord.gg/BkHyN6hDwJ" },
  { label: "Inkbound Studios", href: "https://www.inkboundstudios.com" },
  { label: "Inkbound Publishing", href: "https://www.inkboundpublishing.com" },
  { label: "InkSpire Academy", href: "https://www.inkspire-academy.com" },
  { label: "Inkbound Marketplace – in development", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/10 bg-black/50 font-marcellus text-[#f5efe3] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.08),transparent_30%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1.1fr_1fr]">
          {/* Brand / Intro */}
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#c8a04e]">
              Inkbound Society™
            </div>

            <h2 className="mt-4 text-2xl text-white md:text-3xl">
              The gateway into the Inkbound ecosystem
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/65">
              A growing world of authors, readers, narrators, and creative
              professionals building something new together — outside the
              constraints of traditional publishing.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#f6dca0]">
              This is where discovery begins. This is where stories move.
            </p>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">
              Inkbound connects physical spaces, digital platforms, and creative
              pathways into one evolving system — from bookshop to publishing,
              from media to marketplace.
            </p>

            <a
              href="mailto:summon@inkboundsociety.com"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 px-4 py-2 text-sm text-[#f6dca0] transition hover:border-[#c8a04e]/50 hover:bg-[#c8a04e]/15"
            >
              <Mail className="h-4 w-4" />
              summon@inkboundsociety.com
            </a>

            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.instagram.com/the.inkbound.society/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/5 p-3 text-white/75 transition hover:border-[#c8a04e]/30 hover:bg-white/10 hover:text-[#f6dca0]"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://www.tiktok.com/@the.inkbound.society"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/5 p-3 text-white/75 transition hover:border-[#c8a04e]/30 hover:bg-white/10"
                aria-label="TikTok"
              >
                <img
                  src="/tiktok.png"
                  alt="TikTok"
                  className="h-5 w-5 object-contain opacity-80 transition hover:opacity-100"
                />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61577178964903"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/5 p-3 text-white/75 transition hover:border-[#c8a04e]/30 hover:bg-white/10 hover:text-[#f6dca0]"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="mailto:summon@inkboundsociety.com"
                className="rounded-full border border-white/10 bg-white/5 p-3 text-white/75 transition hover:border-[#c8a04e]/30 hover:bg-white/10 hover:text-[#f6dca0]"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
<div>
  <div className="text-xs uppercase tracking-[0.3em] text-[#c8a04e]">
    Navigation
  </div>

  <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6">
    {footerNav.map((section) => (
      <div key={section.title}>
        <div className="mb-2 text-[0.7rem] uppercase tracking-[0.22em] text-[#c8a04e]">
          {section.title}
        </div>

        <div className="space-y-2">
          {section.links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block text-sm text-white/60 transition hover:text-[#f6dca0]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    ))}
  </div>

  
 
</div>

          {/* Ecosystem */}
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#c8a04e]">
              Explore Inkbound
            </div>

            <div className="mt-5 space-y-3">
              {ecosystemLinks.map((item) =>
                item.href === "#" ? (
                  <div key={item.label} className="text-sm text-white/40">
                    {item.label}
                  </div>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-white/65 transition hover:text-[#f6dca0]"
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Ecosystem line */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.28em] text-[#c8a04e]">
              The Inkbound Ecosystem
            </div>

            <p className="mt-4 text-sm leading-7 text-white/55">
              Inkbound Society™ &nbsp; • &nbsp; InkSpire Academy™ &nbsp; •
              &nbsp; Inkbound Bookshop &nbsp; • &nbsp; Inkbound Studios &nbsp;
              • &nbsp; Inkbound Publishing &nbsp; • &nbsp; Inkbound Marketplace
            </p>

            <p className="mt-4 text-sm text-white/45">
              A growing world of authors, readers, narrators, and creatives
            </p>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center md:flex-row md:text-left">
          <p className="text-xs text-white/40">
            © 2026 Inkbound Society™. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/45">
            <Link
              to="/privacy-policy"
              className="transition hover:text-[#f6dca0]"
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookie-policy"
              className="transition hover:text-[#f6dca0]"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}