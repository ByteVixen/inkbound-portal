export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-16">
      <h1 className="text-5xl font-light mb-6 text-amber-500 text-glow">
        Contact the Inkbound Society
      </h1>

      <p className="text-lg text-gray-300 max-w-xl mb-8 leading-relaxed">
        Got questions, magical manuscripts, or ideas you’d like to share?
        Reach out below — we’d love to hear from you.
      </p>

      <p className="text-lg text-amber-400 font-semibold mb-2">📮 Email</p>
      <a
        href="mailto:summoning@inkboundsociety.com"
        className="text-white underline hover:text-amber-400"
      >
        summoning@inkboundsociety.com
      </a>

      <p className="text-lg text-amber-400 font-semibold mt-8 mb-2">📍 Location</p>
      <p className="text-gray-300">
        The Square, Gort, Co. Galway (Opening soon!)
      </p>
    </div>
  );
}