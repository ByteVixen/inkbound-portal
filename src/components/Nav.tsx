import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [virtualOpen, setVirtualOpen] = useState(false);
  const [authorOpen, setAuthorOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeDropdowns = () => {
    setVirtualOpen(false);
    setAuthorOpen(false);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md z-50 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold" onClick={closeDropdowns}>
          The Inkbound Bookshop
        </Link>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-amber-400" onClick={closeDropdowns}>Home</Link>
          <Link to="/about" className="hover:underline" onClick={closeDropdowns}>About</Link>
          <Link to="/featured-books" className="hover:underline" onClick={closeDropdowns}>
            Stocked in Our Bookshop
          </Link>

          {/* Virtual Shelf */}
          <div className="relative">
            <button
              onClick={() => {
                setVirtualOpen(!virtualOpen);
                setAuthorOpen(false);
              }}
              className="hover:underline"
            >
              Virtual Shelf ▾
            </button>
            {virtualOpen && (
              <div className="absolute bg-black border border-white mt-2 rounded shadow-lg w-48 z-50">
                <Link to="/virtual-shelf" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeDropdowns}>Books</Link>
                <Link to="/audiobooks" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeDropdowns}>Audiobooks</Link>
              </div>
            )}
          </div>

          {/* Author Hub */}
          <div className="relative">
            <button
              onClick={() => {
                setAuthorOpen(!authorOpen);
                setVirtualOpen(false);
              }}
              className="hover:underline"
            >
              Author Hub ▾
            </button>
            {authorOpen && (
              <div className="absolute bg-black border border-white mt-2 rounded shadow-lg w-64 z-50">
                <Link to="/authors/consignment" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeDropdowns}>Become Stocked</Link>
                <Link to="/virtual-shelfspace" className="block px-4 py-2 hover:bg-white hover:text-black" onClick={closeDropdowns}>Virtual Shelfspace</Link>
              </div>
            )}
          </div>

          <Link to="/narrator-shelf" className="hover:underline" onClick={closeDropdowns}>Narrator Shelf</Link>
          <Link to="/narrator-hub" className="hover:underline" onClick={closeDropdowns}>Narrator Hub</Link>
          <Link to="/info" className="hover:underline" onClick={closeDropdowns}>Info</Link>
          <Link to="/contact" className="hover:underline" onClick={closeDropdowns}>Contact</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link to="/" className="block px-2 py-1 hover:text-amber-400" onClick={closeDropdowns}>Home</Link>
          <Link to="/about" className="block px-2 py-1 hover:text-amber-400" onClick={closeDropdowns}>About</Link>
          <Link to="/featured-books" className="block px-2 py-1 hover:text-amber-400" onClick={closeDropdowns}>
            Stocked in Our Bookshop
          </Link>

          {/* Virtual Shelf (nested mobile dropdown) */}
          <details className="px-2">
            <summary className="cursor-pointer hover:text-amber-400">Virtual Shelf</summary>
            <div className="ml-4 mt-1 space-y-1">
              <Link to="/virtual-shelf" className="block" onClick={closeDropdowns}>Books</Link>
              <Link to="/audiobooks" className="block" onClick={closeDropdowns}>Audiobooks</Link>
            </div>
          </details>

          {/* Author Hub (nested mobile dropdown) */}
          <details className="px-2">
            <summary className="cursor-pointer hover:text-amber-400">Author Hub</summary>
            <div className="ml-4 mt-1 space-y-1">
              <Link to="/authors/consignment" className="block" onClick={closeDropdowns}>Become Stocked</Link>
              <Link to="/virtual-shelfspace" className="block" onClick={closeDropdowns}>Virtual Shelfspace</Link>
            </div>
          </details>

          <Link to="/narrator-shelf" className="block px-2 py-1 hover:text-amber-400" onClick={closeDropdowns}>Narrator Shelf</Link>
          <Link to="/narrator-hub" className="block px-2 py-1 hover:text-amber-400" onClick={closeDropdowns}>Narrator Hub</Link>
          <Link to="/info" className="block px-2 py-1 hover:text-amber-400" onClick={closeDropdowns}>Info</Link>
          <Link to="/contact" className="block px-2 py-1 hover:text-amber-400" onClick={closeDropdowns}>Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
