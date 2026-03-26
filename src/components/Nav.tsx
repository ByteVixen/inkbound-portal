import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const navSections = [
  {
    label: "Readers",
    items: [
      { path: "/readers", label: "Reader Portal" },
      { path: "/inkbound-tbr", label: "The Inkbound TBR" },
      { path: "/readers/fortune", label: "Bookish Fortune" },
      { path: "/book-club", label: "Book Club" },
    ],
  },
  {
    label: "Virtual Shelf",
    items: [
      { path: "/virtual-shelf", label: "Books" },
      { path: "/audiobooks", label: "Audiobooks" },
      { path: "/LibroPage", label: "Libro.fm" },
    ],
  },
  {
    label: "Author Hub",
    items: [
      { path: "/authors", label: "Author Portal" },
      { path: "/authors/consignment", label: "Become Stocked" },
      { path: "/authors/ship-books", label: "Shipping Info" },
      { path: "/virtual-shelfspace", label: "Virtual Shelfspace" },
      { path: "/author-map", label: "Global Author Map" },
    ],
  },
  {
    label: "Narrators",
    items: [
      { path: "/narrators", label: "Narrator Portal" },
      { path: "/narrator-shelf", label: "Narrator Shelf" },
      { path: "/narrator-hub", label: "Narrator Submissions" },
    ],
  },
  {
    label: "Creatives",
    items: [
      { path: "/creatives", label: "Creatives Submissions" },
      { path: "/creativeshub", label: "Creatives Hub" },
    ],
  },
  {
    label: "Collab",
    items: [{ path: "/collaborate", label: "Business Collaborations" }],
  },
  {
    label: "Info",
    items: [
      { path: "/about", label: "About" },
      { path: "/info", label: "Info" },
      { path: "/contact", label: "Contact" },
    ],
  },
];

const primaryLinks = [
  { label: "Home", to: "/" },
  { label: "Stocked In-Store", to: "/featured-books" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <nav
      ref={navRef}
      className={`fixed left-0 top-0 z-50 w-full text-[#f5efe3] transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-black/70 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-black/45 via-black/20 to-transparent"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-70"
        } bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.10),transparent_35%)]`}
      />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Brand */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="group flex min-w-0 flex-col"
        >
          <span className="text-[0.68rem] uppercase tracking-[0.34em] text-[#c8a04e] transition group-hover:text-[#f6dca0]">
            Inkbound Ecosystem
          </span>
          <span className="mt-1 text-xl font-semibold tracking-[0.12em] text-white sm:text-2xl">
            Inkbound Society
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 xl:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-white/78 transition hover:text-[#f6dca0]"
            >
              {link.label}
            </Link>
          ))}

          <a
            href="https://www.theinkboundbookshop.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white/78 transition hover:text-[#f6dca0]"
          >
            Merch
          </a>

          {navSections.map((section) => (
            <div key={section.label} className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown(section.label)}
                className="inline-flex items-center gap-1 text-sm font-medium text-white/78 transition hover:text-[#f6dca0]"
              >
                {section.label}
                <ChevronDown
                  className={`h-4 w-4 transition ${
                    activeDropdown === section.label ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute left-0 top-full mt-3 w-64 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[rgba(5,5,8,0.92)] shadow-[0_20px_60px_rgba(0,0,0,0.50)] backdrop-blur-2xl transition-all duration-200 ${
                  activeDropdown === section.label
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-1 opacity-0"
                }`}
              >
                <div className="border-b border-white/8 bg-[linear-gradient(180deg,rgba(200,160,78,0.08),rgba(255,255,255,0.00))] px-4 py-3">
                  <div className="text-[0.68rem] uppercase tracking-[0.24em] text-[#c8a04e]">
                    {section.label}
                  </div>
                </div>

                <div className="p-2">
                  {section.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        setMenuOpen(false);
                        setActiveDropdown(null);
                      }}
                      className="block rounded-xl px-3 py-2.5 text-sm text-white/72 transition hover:bg-white/8 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/85 transition hover:border-[#c8a04e]/30 hover:bg-white/10 xl:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

        {/* Mobile Menu */}
      {menuOpen && (
        <div className="relative border-t border-white/10 bg-black/90 backdrop-blur-2xl xl:hidden">
          <div className="mx-auto max-h-[calc(100vh-88px)] max-w-7xl overflow-y-auto px-6 py-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-3">
                {primaryLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white/80 transition hover:border-[#c8a04e]/30 hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}

                <a
                  href="https://www.theinkboundbookshop.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white/80 transition hover:border-[#c8a04e]/30 hover:bg-white/10 hover:text-white"
                >
                  Merch
                </a>
              </div>

              <div className="space-y-4 pb-6">
                {navSections.map((section) => (
                  <details
                    key={section.label}
                    className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/5"
                  >
                    <summary className="cursor-pointer list-none px-4 py-3 text-sm uppercase tracking-[0.18em] text-[#c8a04e]">
                      {section.label}
                    </summary>

                    <div className="border-t border-white/10 px-3 py-3">
                      <div className="space-y-2">
                        {section.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setMenuOpen(false)}
                            className="block rounded-xl px-3 py-2.5 text-sm text-white/72 transition hover:bg-white/8 hover:text-white"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}