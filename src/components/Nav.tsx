import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // If using lucide icons (install with `npm install lucide-react`)

export default function Nav() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authorsOpen, setAuthorsOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const authorItems = [
    { label: "Author Hub", path: "/authors" },
    { label: "Bookshop Consignment", path: "/authors/consignment" },
    { label: "See Who's On Our Shelves", path: "/books" }, 
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-ink backdrop-blur-md px-6 py-4 shadow-xl border-b border-amber-700 animate-veil-shimmer">
      <div className="flex justify-between items-center max-w-6xl mx-auto">

        {/* Logo + Name */}
        <Link to="/" className="flex items-center space-x-3 group">
          <img src="/logo.png" alt="Inkbound Logo" className="h-10 w-10 object-contain" />
          <span className="text-xl font-bold text-white group-hover:text-amber-400 transition text-glow">
           The Inkbound Bookshop
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium text-white items-center">
          {navItems.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={`relative transition ${
                  pathname === path ? "text-amber-500" : "hover:text-amber-400"
                }`}
              >
                <span className="text-glow">{label}</span>
              </Link>
            </li>
          ))}

          {/* Authors Dropdown */}
          <li className="relative group">
            <div className="cursor-pointer hover:text-amber-400 transition text-glow">
              Authors
            </div>
            <ul className="absolute top-full left-0 mt-2 bg-black border border-amber-700 rounded-md shadow-xl py-2 px-4 space-y-2 z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 ease-out">
              {authorItems.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className={`block transition ${
                      pathname === path ? "text-amber-500" : "hover:text-amber-400"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 space-y-4 px-4 text-lg text-white font-medium">
          {navItems.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`block ${pathname === path ? "text-amber-500" : "hover:text-amber-400"}`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}

          <div>
            <button
              onClick={() => setAuthorsOpen(!authorsOpen)}
              className="w-full text-left text-glow hover:text-amber-400"
            >
              Authors
            </button>
            {authorsOpen && (
              <div className="mt-2 ml-4 space-y-2 text-sm text-white">
                {authorItems.map(({ label, path }) => (
                  <Link
                    key={path}
                    to={path}
                    className="block hover:text-amber-400"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
