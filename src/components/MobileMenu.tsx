// ✅ MobileMenu.tsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 flex flex-col justify-center items-center space-y-1.5 group"
      >
        <span className="w-6 h-0.5 bg-amber-400 transition-transform group-hover:scale-110" />
        <span className="w-6 h-0.5 bg-amber-400 transition-transform group-hover:scale-110" />
        <span className="w-6 h-0.5 bg-amber-400 transition-transform group-hover:scale-110" />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center text-center space-y-6 text-xl text-amber-400 animate-fade-in">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/quests" onClick={() => setOpen(false)}>Quests</Link>
          <Link to="/bookshop" onClick={() => setOpen(false)}>Bookshop</Link>
          <Link to="/virtual-shelf" onClick={() => setOpen(false)}>Virtual Shelf</Link>
          <Link to="/authors" onClick={() => setOpen(false)}>Author Hub</Link>
          <Link to="/narrators" onClick={() => setOpen(false)}>Narrators</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </div>
  );
}
