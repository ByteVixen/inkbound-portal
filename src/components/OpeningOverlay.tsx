// src/components/OpeningOverlay.tsx
import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function OpeningOverlay() {
  const [visible, setVisible] = useState(false);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const alreadyVisited = localStorage.getItem("doorsOpened");
    const now = new Date();
    const launchTime = new Date("2025-07-12T00:00:00");

    if (!alreadyVisited && now >= launchTime) {
      setVisible(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem("doorsOpened", "true");
    setPlayed(true);
    setTimeout(() => setVisible(false), 1000);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black z-[1000] flex items-center justify-center">
      {!played && (
        <Player
          autoplay
          keepLastFrame
          src="/certain opening animation.lottie"
          style={{ height: "100vh", width: "100vw" }}
          onEvent={(e) => {
            if (e === "complete") handleComplete();
          }}
        />
      )}
    </div>
  );
}
