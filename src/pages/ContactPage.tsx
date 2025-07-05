import { useEffect } from "react";
import VantaBackground from "../components/VantaBackground";

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

export default function ContactPage() {
  useEffect(() => {
    if (window.Tally) {
      window.Tally.loadEmbeds();
    } else {
      const script = document.createElement("script");
      script.src = "https://tally.so/widgets/embed.js";
      script.onload = () => {
        window.Tally?.loadEmbeds();
      };
      script.onerror = () => {
        console.error("Tally script failed to load");
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Vanta Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 py-20 px-4 flex items-center justify-center">
        <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-4xl w-full text-center">

          {/* Section 1: Intro & Contact Info */}
          <h1 className="text-5xl font-light mb-6 text-amber-500 text-glow">
            Contact the Inkbound Society
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto mb-6 leading-relaxed">
            Got questions, magical manuscripts, or story-driven ideas you’d like to share?
            Reach out below — we’d love to hear from you.
          </p>

          <p className="text-lg text-amber-400 font-semibold mb-2">📮 Email</p>
          <a
            href="mailto:summon@inkboundsociety.com"
            className="text-white underline hover:text-amber-400"
          >
            summon@inkboundsociety.com
          </a>

          <p className="text-lg text-amber-400 font-semibold mt-8 mb-2">📍 Location</p>
          <p className="text-gray-300">
            The Square, Gort, Co. Galway (Opening soon!)
          </p>

          {/* Divider */}
          <hr className="my-10 border-amber-600/30" />

          {/* Section 2: Tally Form */}
          <h2 className="text-3xl font-light mb-6 text-amber-500 text-glow">
            Send Us a Whisper
          </h2>
          <div className="w-full mb-10 animate-fade-in">
            <iframe
              data-tally-src="https://tally.so/embed/nGVN7z?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="400"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Contact Us"
            />
          </div>

          {/* Divider */}
          <hr className="my-10 border-amber-600/30" />

          {/* Section 3: Map */}
          <h2 className="text-3xl font-light mb-6 text-amber-500 text-glow">
            Find Us
          </h2>
          <div className="w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg border border-amber-700 animate-fade-in">
            <iframe
              title="Inkbound Bookshop Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d599.359059910275!2d-8.820239156692498!3d53.066436411880495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485b82aae678e38f%3A0xc69f3df32e6086e2!2sTimeless%20Barber!5e0!3m2!1sen!2sie!4v1750980342550!5m2!1sen!2sie"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
