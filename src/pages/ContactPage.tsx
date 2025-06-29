// src/pages/ContactPage.tsx
import VantaBackground from "../components/VantaBackground";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Vanta Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 px-4 flex items-center justify-center">
        <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-4xl w-full text-center">
          <h1 className="text-5xl font-light mb-6 text-amber-500 text-glow">
            Contact the Inkbound Society
          </h1>

          <p className="text-lg text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Got questions, magical manuscripts, or ideas you’d like to share?
            Reach out below — we’d love to hear from you.
          </p>

          <p className="text-lg text-amber-400 font-semibold mb-2">📮 Email</p>
          <a
            href="mailto:summoning@inkboundsociety.com"
            className="text-white underline hover:text-amber-400"
          >
            summon@inkboundsociety.com
          </a>

          <p className="text-lg text-amber-400 font-semibold mt-8 mb-2">📍 Location</p>
          <p className="text-gray-300 mb-6">
            The Square, Gort, Co. Galway (Opening soon!)
          </p>

          {/* Map */}
          <div className="w-full max-w-3xl mx-auto mt-6 rounded-lg overflow-hidden shadow-lg border border-amber-700">
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
