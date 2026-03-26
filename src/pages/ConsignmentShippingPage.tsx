// src/pages/ConsignmentShippingPage.tsx
import React from "react";
import VantaBackground from "../components/VantaBackground";

const sections = [
  { id: "ireland", title: "Local Shipping" },
  { id: "international", title: "International Shipping" },
  { id: "print", title: "Printing Options" },
];

const sectionLabel =
  "mb-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]";
const sectionHeading = "font-serif text-3xl text-white md:text-4xl";
const bodyText = "text-base leading-8 text-white/65";

const ConsignmentShippingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050506] font-marcellus text-[#f5efe3]">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(82,58,133,0.08),transparent_20%),radial-gradient(circle_at_20%_80%,rgba(13,30,66,0.10),transparent_24%)]" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#c8a04e]/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {/* Hero */}
        <section className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/25 px-6 py-10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl md:px-10 md:py-14">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-xs uppercase tracking-[0.34em] text-[#c8a04e]">
              Shipping Guide
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-tight text-white md:text-6xl">
              Getting Your Books to Inkbound Bookshop
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
              A practical guide for sending consignment stock to Inkbound,
              whether you're posting locally in Ireland or shipping from abroad.
            </p>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="lg:w-[260px] lg:shrink-0">
            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl lg:sticky lg:top-24">
              <div className="mb-4 text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
                On this page
              </div>

              <nav className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-xl px-3 py-2 text-sm text-white/62 transition hover:bg-white/8 hover:text-white"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            <section
              id="ireland"
              className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8"
            >
              <div className={sectionLabel}>Local Shipping</div>
              <h2 className={sectionHeading}>Ireland-Based Authors</h2>

              <ol className="mt-5 list-decimal space-y-5 pl-5 text-sm leading-7 text-white/65">
                <li>
                  <span className="text-[#f6dca0]">Post or Courier:</span> Send
                  your books directly to:
                  <div className="mt-3 rounded-[1.2rem] border border-white/10 bg-black/30 p-4 text-white/78">
                    Inkbound Bookshop
                    <br />
                    The Square, Gort
                    <br />
                    Co. Galway, H91 VW27
                    <br />
                    Ireland
                  </div>
                  <p className="mt-3">
                    Include your name and book title(s) inside the package so we
                    can confirm your delivery properly.
                  </p>
                </li>

                <li>
                  <span className="text-[#f6dca0]">In-Person Drop-Off:</span> If
                  you're nearby or attending an event in the area, you're
                  welcome to drop off your books.
                  <p className="mt-2 text-white/50">
                    Please contact us in advance to arrange a time.
                  </p>
                </li>
              </ol>
            </section>

            <section
              id="international"
              className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8"
            >
              <div className={sectionLabel}>International Shipping</div>
              <h2 className={sectionHeading}>Authors Outside Ireland</h2>

              <ol className="mt-5 list-decimal space-y-5 pl-5 text-sm leading-7 text-white/65">
                <li>
                  <span className="text-[#f6dca0]">
                    Place a Print Order to Ship Directly:
                  </span>{" "}
                  Use Amazon KDP, IngramSpark, or a similar printer to send your
                  books directly to us.
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-white/60">
                    <li>Choose a UK or EU printer where possible to reduce customs delays</li>
                    <li>Set billing currency to EUR if available</li>
                  </ul>

                  <div className="mt-3 rounded-[1.2rem] border border-white/10 bg-black/30 p-4 text-white/78">
                    Inkbound Bookshop
                    <br />
                    The Square, Gort
                    <br />
                    Co. Galway, H91 VW27
                    <br />
                    Ireland
                  </div>

                  <p className="mt-3">
                    We’ll confirm delivery, and you’re welcome to share tracking
                    information with us.
                  </p>
                </li>

                <li>
                  <span className="text-[#f6dca0]">Use a Local Printer or Stockist:</span>{" "}
                  You can also send books from your own inventory or preferred
                  printer.
                </li>

                <li>
                  <span className="text-[#f6dca0]">Drop-Off via Representative or Event:</span>{" "}
                  A friend, colleague, or event contact may drop them off for
                  you. Just let us know who to expect.
                </li>
              </ol>

              <div className="mt-8 rounded-[1.4rem] border border-white/10 bg-black/25 p-5">
                <h3 className="text-xl text-white">Be Sure to Include</h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-white/65">
                  <li>Your name and book title(s)</li>
                  <li>Your contact email</li>
                  <li>Any notes such as signed copies, promos, or instructions</li>
                </ul>
              </div>
            </section>

            <section
              id="print"
              className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8"
            >
              <div className={sectionLabel}>Printing Options</div>
              <h2 className={sectionHeading}>Irish Print Option: Print Bureau</h2>

              <p className={`mt-4 ${bodyText}`}>
                If you need a reliable printer for short runs in Ireland, Print
                Bureau is a strong option.
              </p>

              <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-black/25 p-5 text-sm leading-7 text-white/65">
                <p className="text-[#f6dca0]">No print-on-demand for single copies.</p>
                <p>Minimums: 25 softbacks, 50 hardbacks</p>
                <p>With print-ready files:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Softback: around 5 days</li>
                  <li>Hardback: around 10 days</li>
                </ul>
                <p className="mt-2">Nationwide delivery available</p>
                <p>Competitive rates for bulk jobs</p>
              </div>

              <div className="mt-6 rounded-[1.4rem] border border-[#c8a04e]/25 bg-[#c8a04e]/10 p-5 text-sm leading-7 text-white/75">
                <p className="font-semibold text-[#f6dca0]">Print Bureau</p>
                <p>
                  <a href="tel:014733567" className="underline decoration-[#c8a04e]/40 underline-offset-4">
                    01-4733567
                  </a>
                </p>
                <p>
                  <a
                    href="http://www.printbureau.ie"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-[#c8a04e]/40 underline-offset-4"
                  >
                    www.printbureau.ie
                  </a>
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ConsignmentShippingPage;