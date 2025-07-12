// CountdownBanner.tsx
import React, { useEffect, useState } from "react";

const launchTime = new Date("2025-07-12T00:00:00Z").getTime(); // Midnight UTC

const CountdownBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(launchTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = launchTime - Date.now();
      setTimeLeft(diff);
      if (diff <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft <= 0) return null;

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="w-full bg-black text-gold text-center py-2 z-50 fixed top-0 shadow-md font-bold">
      Grand Opening in {hours}h {minutes}m {seconds}s
    </div>
  );
};

export default CountdownBanner;
