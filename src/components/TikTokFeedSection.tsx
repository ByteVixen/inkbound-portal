import { useEffect } from "react";

export default function TikTokFeedSection() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    script.setAttribute("data-elfsight-app-lazy", "true");
    document.body.appendChild(script);
  }, []);

  return (
    <div className="relative z-10 px-4 max-w-4xl mx-auto mb-20 animate-fade-in">
      <div className="text-center text-amber-400 text-xl mb-4 animate-pulse">
        📡 Latest from TikTok
      </div>
      <div className="glass-panel p-6 border border-amber-500 rounded-xl shadow-lg">
        <div className="elfsight-app-c60eab0e-7bf3-4a0a-a854-9d31f073912a" />
      </div>
    </div>
  );
}
