import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

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
  const toggleDropdown = (name: string) => setDropdown(dropdown === name ? null : name);
  const closeMenu = () => {
    setMenuOpen(false);
    setDropdown(null);
  };

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md z-50 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-glow" onClick={closeMenu}>
          The Inkbound Bookshop
        </Link>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className={isActive("/") ? "text-amber-400" : "hover:text-amber-400"}>Home</Link>
          <Link to="/featured-books" className={isActive("/featured-books") ? "text-amber-400" : "hover:text-amber-400"}>Stocked In-Store</Link>

          <div className="relative">
            <button onClick={() => toggleDropdown("readers") } className="hover:text-amber-400">
              Readers ▾
            </button>
            {dropdown === "readers" && (
              <div className="absolute bg-black border border-white mt-2 rounded shadow-lg w-64 z-50 animate-fadeIn">
                <Link to="/readers" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Reader Hub Overview</Link>
                <Link to="/inkbound-tbr" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>The Inkbound TBR</Link>
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => toggleDropdown("virtual") } className="hover:text-amber-400">
              Virtual Shelf ▾
            </button>
            {dropdown === "virtual" && (
              <div className="absolute bg-black border border-white mt-2 rounded shadow-lg w-48 z-50 animate-fadeIn">
                <Link to="/virtual-shelf" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Books</Link>
                <Link to="/audiobooks" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Audiobooks</Link>
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => toggleDropdown("authors") } className="hover:text-amber-400">
              Author Hub ▾
            </button>
            {dropdown === "authors" && (
              <div className="absolute bg-black border border-white mt-2 rounded shadow-lg w-64 z-50 animate-fadeIn">
                <Link to="/authors" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Author Hub Overview</Link>
                <Link to="/authors/consignment" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Become Stocked</Link>
                <Link to="/authors/ship-books" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Shipping Info</Link>
                <Link to="/virtual-shelfspace" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Virtual Shelfspace</Link>
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => toggleDropdown("narrators") } className="hover:text-amber-400">
              Narrators ▾
            </button>
            {dropdown === "narrators" && (
              <div className="absolute bg-black border border-white mt-2 rounded shadow-lg w-64 z-50 animate-fadeIn">
                <Link to="/narrators" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Narrator Hub Overview</Link>
                <Link to="/narrator-shelf" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Narrator Shelf</Link>
                <Link to="/narrator-hub" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Narrator Hub</Link>
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => toggleDropdown("collab") } className="hover:text-amber-400">
              Collaborate ▾
            </button>
            {dropdown === "collab" && (
              <div className="absolute bg-black border border-white mt-2 rounded shadow-lg w-64 z-50 animate-fadeIn">
                <Link to="/collaborate" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Business Collaborations</Link>
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => toggleDropdown("info") } className="hover:text-amber-400">
              Info & Contact ▾
            </button>
            {dropdown === "info" && (
              <div className="absolute bg-black border border-white mt-2 rounded shadow-lg w-48 z-50 animate-fadeIn">
                <Link to="/about" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>About</Link>
                <Link to="/info" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Info</Link>
                <Link to="/contact" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeMenu}>Contact</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;