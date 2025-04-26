// @ts-ignore
import VANTAFOG from "vanta/dist/vanta.fog.min";

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export default function App() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!vantaEffect) {
      const effect = VANTAFOG({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        highlightColor: 0x4a00ff,
        midtoneColor: 0x140403,
        lowlightColor: 0x111011,
        baseColor: 0x070707,
        blurFactor: 0.4,
        speed: 1.0,
        resize: true,
      });
      setVantaEffect(effect);

      setTimeout(() => {
        if (effect && effect.resize) {
          effect.resize();
        }
      }, 500);
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // ✨ Handle email submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    // Create hidden iframe to submit into
    const iframe = document.createElement("iframe");
    iframe.name = "hidden_iframe";
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    form.target = "hidden_iframe"; // Submit into iframe
    form.submit();
    setSubmitted(true); // Show thank you after
  };

  return (
    <div
      ref={vantaRef}
      className="min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden px-6 py-12 font-marcellus bg-black"
    >
      <div className="z-20 flex flex-col items-center max-w-2xl w-full text-center">

        {/* Logo */}
        <img src="/logo.png" alt="Inkbound Society Logo" className="w-80 md:w-96 mb-10 animate-fade-in" />

        {/* Main Tagline */}
        <h1 className="text-5xl font-light mb-4 animate-fade-in text-glow">
          Some stories find you.
        </h1>

        {/* Subheading */}
        <p className="text-lg font-light mb-8 animate-fade-in opacity-70 text-glow">
          A hidden society stirs beyond the veil.
        </p>

        {/* ✨ Summoning Flow */}
        {!showForm && !submitted && (
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-4 border border-white rounded-full hover:border-moonlight hover:text-moonlight hover:shadow-glow transition duration-500 ease-in-out animate-fade-in mt-8"
          >
            Be Summoned
          </button>
        )}

        {showForm && !submitted && (
          <form
            onSubmit={handleSubmit}
            action="https://inkboundsociety.us22.list-manage.com/subscribe/post?u=3ad07cbf3b00878d5097f3c6b&amp;id=e86c064031"
            method="POST"
            className="flex flex-col items-center mt-8 w-full animate-veil-shimmer space-y-6"
          >
            <p className="text-lg max-w-md mx-auto">
              Whisper your name to be summoned.
            </p>

            <input
              type="email"
              name="EMAIL"
              id="mce-EMAIL"
              placeholder="Your email address..."
              className="px-4 py-3 rounded bg-black border border-white placeholder-gray-400 w-80 text-center text-lg"
              required
            />

            {/* Honeypot */}
            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
              <input type="text" name="b_3ad07cbf3b00878d5097f3c6b_e86c064031" tabIndex={-1} defaultValue="" />
            </div>
{/* GDPR Consent */}
<div className="flex items-center space-x-2 text-sm text-gray-300 max-w-md text-left">
  <input 
    type="checkbox" 
    id="gdpr-consent" 
    required 
    className="accent-moonlight"
  />
  <label htmlFor="gdpr-consent">
    I consent to receive emails from The Inkbound Society and understand I can unsubscribe at any time.
  </label>
</div>
            <button
              type="submit"
              className="px-8 py-4 w-64 border border-white rounded-full hover:border-moonlight hover:text-moonlight hover:shadow-glow transition duration-500 ease-in-out"
            >
              Answer the Summons
            </button>
          </form>
        )}

        {/* Thank You Message */}
        {submitted && (
          <div className="flex flex-col items-center mt-8 animate-veil-shimmer space-y-6">
            <p className="text-2xl font-light text-moonlight">✨ Your summons has been received.</p>
            <p className="text-lg opacity-80">
              Watch the stars — your invitation will find you.
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-sm text-gray-400 mt-16 mb-8 animate-fade-in opacity-60">
          © 2025 The Inkbound Society — Created in Shadows
        </footer>

      </div>
    </div>
  );
}
