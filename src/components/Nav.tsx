import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [virtualOpen, setVirtualOpen] = useState(false);
  const [authorOpen, setAuthorOpen] = useState(false);
  const [narratorOpen, setNarratorOpen] = useState(false);

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

  const closeMenu = () => {
    setMenuOpen(false);
    setVirtualOpen(false);
    setAuthorOpen(false);
    setNarratorOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

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
          <Link to="/about" className={isActive("/about") ? "text-amber-400" : "hover:text-amber-400"}>About</Link>
          <Link to="/featured-books" className={isActive("/featured-books") ? "text-amber-400" : "hover:text-amber-400"}>Stocked In-Store</Link>

          <div className="relative group">
            <button
              onClick={() => {
                setVirtualOpen(!virtualOpen);
                setAuthorOpen(false);
                setNarratorOpen(false);
              }}
              className="hover:text-amber-400 transition duration-300"
            >
              Virtual Shelf ▾
            </button>
            {virtualOpen && (
              <div className="absolute bg-black border border-white mt-2 rounded shadow-lg w-48 z-50 animate-fadeIn">
                <Link to="/virtual-shelf" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Books</Link>
                <Link to="/audiobooks" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Audiobooks</Link>
              </div>
            )}
          </div>

          <div className="relative group">
            <button
              onClick={() => {
                setAuthorOpen(!authorOpen);
                setVirtualOpen(false);
                setNarratorOpen(false);
              }}
              className="hover:text-amber-400 transition duration-300"
            >
              Author Hub ▾
            </button>
            {authorOpen && (
              <div className="absolute bg-black border border-white mt-2 rounded shadow-lg w-64 z-50 animate-fadeIn">
                <Link to="/authors/consignment" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Become Stocked</Link>
                <Link to="/authors/ship-books" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Shipping Info</Link>
                <Link to="/virtual-shelfspace" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Virtual Shelfspace</Link>
              </div>
            )}
          </div>

          <div className="relative group">
            <button
              onClick={() => {
                setNarratorOpen(!narratorOpen);
                setAuthorOpen(false);
                setVirtualOpen(false);
              }}
              className="hover:text-amber-400 transition duration-300"
            >
              Narrators ▾
            </button>
            {narratorOpen && (
              <div className="absolute bg-black border border-white mt-2 rounded shadow-lg w-56 z-50 animate-fadeIn">
                <Link to="/narrator-shelf" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Narrator Shelf</Link>
                <Link to="/narrator-hub" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Narrator Hub</Link>
              </div>
            )}
          </div>

          <Link to="/info" className={isActive("/info") ? "text-amber-400" : "hover:text-amber-400"}>Info</Link>
          <Link to="/contact" className={isActive("/contact") ? "text-amber-400" : "hover:text-amber-400"}>Contact</Link>
        </div>
      </div>

      {/* Fullscreen Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/95 text-white z-50 flex flex-col items-center justify-center space-y-6 animate-fadeSlideDown">
          <Link to="/" className="text-xl hover:text-amber-400" onClick={closeMenu}>Home</Link>
          <Link to="/about" className="text-xl hover:text-amber-400" onClick={closeMenu}>About</Link>
          <Link to="/featured-books" className="text-xl hover:text-amber-400" onClick={closeMenu}>Stocked In-Store</Link>

          <details className="text-xl">
            <summary className="cursor-pointer hover:text-amber-400">Virtual Shelf</summary>
            <div className="mt-2 pl-4 text-base space-y-2">
              <Link to="/virtual-shelf" onClick={closeMenu}>Books</Link>
              <Link to="/audiobooks" onClick={closeMenu}>Audiobooks</Link>
            </div>
          </details>

          <details className="text-xl">
            <summary className="cursor-pointer hover:text-amber-400">Author Hub</summary>
            <div className="mt-2 pl-4 text-base space-y-2">
              <Link to="/authors/consignment" onClick={closeMenu}>Become Stocked</Link>
              <Link to="/authors/ship-books" onClick={closeMenu}>Shipping Info</Link>
              <Link to="/virtual-shelfspace" onClick={closeMenu}>Virtual Shelfspace</Link>
            </div>
          </details>

          <details className="text-xl">
            <summary className="cursor-pointer hover:text-amber-400">Narrators</summary>
            <div className="mt-2 pl-4 text-base space-y-2">
              <Link to="/narrator-shelf" onClick={closeMenu}>Narrator Shelf</Link>
              <Link to="/narrator-hub" onClick={closeMenu}>Narrator Hub</Link>
            </div>
          </details>

          <Link to="/info" className="text-xl hover:text-amber-400" onClick={closeMenu}>Info</Link>
          <Link to="/contact" className="text-xl hover:text-amber-400" onClick={closeMenu}>Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
