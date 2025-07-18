import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const isActive = (path: string) => location.pathname === path;
  const closeMenu = () => setMenuOpen(false);

  const navSections = [
    {
      label: "Readers",
      items: [
        { path: "/readers", label: "Reader Hub Overview" },
        { path: "/inkbound-tbr", label: "The Inkbound TBR" },
        { path: "/readers/fortune", label: "Bookish Fortune" },
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
        { path: "/authors", label: "Author Hub Overview" },
        { path: "/authors/consignment", label: "Become Stocked" },
        { path: "/authors/ship-books", label: "Shipping Info" },
        { path: "/virtual-shelfspace", label: "Virtual Shelfspace" },
      ],
    },
    {
      label: "Narrators",
      items: [
        { path: "/narrators", label: "Narrator Hub Overview" },
        { path: "/narrator-shelf", label: "Narrator Shelf" },
        { path: "/narrator-hub", label: "Narrator Hub" },
      ],
    },
    {
      label: "Collaborate",
      items: [{ path: "/collaborate", label: "Business Collaborations" }],
    },
    {
      label: "Info & Contact",
      items: [
        { path: "/about", label: "About" },
        { path: "/info", label: "Info" },
        { path: "/contact", label: "Contact" },
      ],
    },
  ];

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md z-50 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-glow" onClick={closeMenu}>
          The Inkbound Bookshop
        </Link>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className={isActive("/") ? "text-amber-400" : "hover:text-amber-400"}>Home</Link>
          <Link to="/featured-books" className={isActive("/featured-books") ? "text-amber-400" : "hover:text-amber-400"}>Stocked In-Store</Link>

          {navSections.map((section) => (
            <div key={section.label} className="relative group">
              <button className="hover:text-amber-400">{section.label} ▾</button>
              <div className="absolute left-0 mt-2 hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto bg-black border border-white rounded shadow-lg z-50 min-w-[200px]">
                {section.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-2 hover:bg-white hover:text-black"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-6 border-t border-white/20 pt-6 px-4">
          <Link to="/" onClick={closeMenu} className="block text-lg hover:text-amber-400">Home</Link>
          <Link to="/featured-books" onClick={closeMenu} className="block text-lg hover:text-amber-400">Stocked In-Store</Link>

          {navSections.map((section) => (
            <details key={section.label} className="text-lg pb-4">
              <summary className="cursor-pointer hover:text-amber-400">{section.label}</summary>
              <div className="ml-4 space-y-2 mt-2">
                {section.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className="block hover:text-amber-400"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
