// PostLaunchBanner.tsx
import React, { useEffect, useState } from "react";

const PostLaunchBanner: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const launchTime = new Date("2025-07-12T00:00:00Z").getTime();
    const now = new Date().getTime();
    if (now >= launchTime) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="w-full bg-black text-amber-400 text-center py-2 shadow-md fixed top-0 z-40 font-marcellus text-sm">
      The gates are open. Welcome to the place where every story has a home.
    </div>
  );
};

export default PostLaunchBanner;
