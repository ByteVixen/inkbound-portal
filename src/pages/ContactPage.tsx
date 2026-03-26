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
    <div className="relative min-h-screen overflow-hidden bg-[#050506] font-marcellus text-[#f5efe3]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Ambient overlays */}
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(82,58,133,0.08),transparent_20%),radial-gradient(circle_at_20%_80%,rgba(13,30,66,0.10),transparent_24%)]" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#c8a04e]/8 blur-3xl" />
      </div>

      {/* Foreground */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {/* Hero */}
        <section className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/25 px-6 py-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl md:px-10 md:py-14">
          <div className="mx-auto max-w-4xl">
            <div className="text-xs uppercase tracking-[0.34em] text-[#c8a04e]">
              Contact Inkbound
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-tight text-white md:text-6xl">
              Send Us a Whisper
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
              Got questions, story-driven ideas, magical manuscripts, or
              something else brewing? Reach out below and we’ll point you in the
              right direction.
            </p>
          </div>
        </section>

        {/* Contact info */}
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
            <div className="text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
              Contact details
            </div>

            <h2 className="mt-3 font-serif text-3xl text-white">
              Reach Inkbound directly
            </h2>

            <div className="mt-6 space-y-6 text-base leading-8 text-white/65">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-[#f6dca0]">
                  Email
                </p>
                <a
                  href="mailto:summon@inkboundsociety.com"
                  className="mt-2 inline-block text-white underline decoration-[#c8a04e]/40 underline-offset-4 transition hover:text-[#f6dca0]"
                >
                  summon@inkboundsociety.com
                </a>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-[#f6dca0]">
                  Location
                </p>
                <p className="mt-2 text-white/75">
                  Inkbound Bookshop
                  <br />
                  The Square, Gort, Co. Galway
                </p>
              </div>

              <div className="rounded-[1.4rem] border border-[#c8a04e]/20 bg-[#c8a04e]/10 p-4 text-sm leading-7 text-white/70">
                Use the contact form for general questions, collaboration
                enquiries, and community-related messages. For pathway-specific
                submissions, use the dedicated forms on those pages.
              </div>
            </div>
          </div>

          {/* Tally form */}
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
            <div className="text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
              Contact form
            </div>

            <h2 className="mt-3 font-serif text-3xl text-white">
              Leave a message
            </h2>

            <div className="mt-6 w-full animate-fade-in overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/25">
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
          </div>
        </section>

        {/* Map */}
        <section className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
          <div className="text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
            Find us
          </div>

          <h2 className="mt-3 font-serif text-3xl text-white">
            Inkbound Bookshop
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-8 text-white/60">
            The physical heart of Inkbound sits in Gort, Co. Galway — the point
            all these story threads keep tracing back to.
          </p>

          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 shadow-lg">
            <iframe
              title="Inkbound Bookshop Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d599.359059910275!2d-8.820239156692498!3d53.066436411880495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485b82aae678e38f%3A0xc69f3df32e6086e2!2sTimeless%20Barber!5e0!3m2!1sen!2sie!4v1750980342550!5m2!1sen!2sie"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </div>
  );
}