// RibbonOverlay.tsx
import React, { useEffect, useState } from "react";
import ribbonSound from "../assets/ribbon-snip.mp3";
import ribbonImg from "../assets/ribbon-gold.gif";

const RibbonOverlay: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const alreadyCut = localStorage.getItem("ribbon-cut");
    const now = new Date().getTime();
    const launchTime = new Date("2025-07-12T00:00:00Z").getTime();
    if (!alreadyCut && now >= launchTime) setShow(true);
  }, []);

  const handleCut = () => {
    new Audio(ribbonSound).play();
    localStorage.setItem("ribbon-cut", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black z-[1000] flex items-center justify-center flex-col text-center p-4">
      <img src={ribbonImg} alt="Gold Ribbon" className="mb-6 animate-pulse max-w-[80%]" />
      <button
        onClick={handleCut}
        className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-full shadow-lg transition-all"
      >
        ✂️ Cut the Ribbon
      </button>
    </div>
  );
};

export default RibbonOverlay;
