import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [virtualOpen, setVirtualOpen] = useState(false);
  const [authorOpen, setAuthorOpen] = useState(false);

  const closeDropdowns = () => {
    setVirtualOpen(false);
    setAuthorOpen(false);
  };

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md z-50 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Home */}
        <Link to="/" className="text-xl font-bold" onClick={closeDropdowns}>
          The Inkbound Bookshop
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-amber-400 transition">Home</Link>
          <Link to="/about" className="hover:underline" onClick={closeDropdowns}>About</Link>

          <Link to="/featured-books" className="hover:underline" onClick={closeDropdowns}>
            Stocked in Our Bookshop
          </Link>

          {/* Virtual Shelf Dropdown */}
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
                <Link
                  to="/virtual-shelf"
                  className="block px-4 py-2 hover:bg-white hover:text-black"
                  onClick={closeDropdowns}
                >
                  Books
                </Link>
                <Link
                  to="/audiobooks"
                  className="block px-4 py-2 hover:bg-white hover:text-black"
                  onClick={closeDropdowns}
                >
                  Audiobooks
                </Link>
              </div>
            )}
          </div>

          {/* Author Hub Dropdown */}
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
                <Link
                  to="/authors/consignment"
                  className="block px-4 py-2 hover:bg-white hover:text-black"
                  onClick={closeDropdowns}
                >
                  Become Stocked
                </Link>
                <Link
                  to="/virtual-shelfspace"
                  className="block px-4 py-2 hover:bg-white hover:text-black"
                  onClick={closeDropdowns}
                >
                  Virtual Shelfspace
                </Link>
              </div>
            )}
          </div>

          <Link to="/narrator-shelf" className="hover:underline" onClick={closeDropdowns}>
            Narrator Shelf
          </Link>
          <Link to="/narrator-hub" className="hover:underline" onClick={closeDropdowns}>
            Narrator Hub
          </Link>

          <Link to="/info" className="hover:underline" onClick={closeDropdowns}>Info</Link>
          <Link to="/contact" className="hover:underline" onClick={closeDropdowns}>Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
