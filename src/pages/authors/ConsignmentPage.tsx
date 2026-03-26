// src/pages/authors/ConsignmentPage.tsx
import VantaBackground from "../../components/VantaBackground";
import { ArrowRight, ScrollText } from "lucide-react";

const sidebarLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#eligibility", label: "Eligibility" },
  { href: "#how", label: "How It Works" },
  { href: "#receive", label: "What You Receive" },
  { href: "#submit", label: "Submit" },
  { href: "#shipping", label: "Sending Books" },
  { href: "#fineprint", label: "Fine Print" },
];

const sectionHeading =
  "font-serif text-3xl text-white md:text-4xl";
const sectionLabel =
  "mb-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]";
const bodyText =
  "text-base leading-8 text-white/65";
const listText =
  "space-y-2 text-sm leading-7 text-white/65";

const ConsignmentPage = () => {
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
              Author Pathway
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-tight text-white md:text-6xl">
              Stock Your Story With Us
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
              Inkbound Bookshop proudly supports indie, self-published, and
              small press authors through a consignment model built around real
              shelf space for real storytellers.
            </p>
          </div>
        </section>

        {/* Content layout */}
        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="lg:w-[260px] lg:shrink-0">
            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl lg:sticky lg:top-24">
              <div className="mb-4 text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
                On this page
              </div>

              <nav className="space-y-2">
                {sidebarLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl px-3 py-2 text-sm text-white/62 transition hover:bg-white/8 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 space-y-8 scroll-smooth">
            <section
              id="overview"
              className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8"
            >
              <div className={sectionLabel}>Overview</div>
              <h2 className={sectionHeading}>What this pathway is for</h2>
              <p className={`mt-4 ${bodyText}`}>
                Inkbound Bookshop proudly supports indie, self-published, and
                small press authors. We operate on a consignment model with no
                upfront fees, offering real shelf space for real storytellers.
                If you write fiction of any kind, we’d love to hear from you.
              </p>
            </section>

            <section
              id="eligibility"
              className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8"
            >
              <div className={sectionLabel}>Eligibility</div>
              <h2 className={sectionHeading}>Who can apply</h2>
              <p className={`mt-4 ${bodyText}`}>
                We currently accept submissions from:
              </p>
              <ul className={`mt-4 list-disc pl-5 ${listText}`}>
                <li>Indie and self-published authors</li>
                <li>Small press and micro-press creators</li>
                <li>Authors based in Ireland or able to ship to us</li>
                <li>Books across all fictional genres and formats</li>
              </ul>
            </section>

            <section
              id="how"
              className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8"
            >
              <div className={sectionLabel}>How it works</div>
              <h2 className={sectionHeading}>Consignment Agreement</h2>
              <p className="mt-4 text-sm leading-7 text-white/50">
                By submitting your book, you agree to the terms of our
                consignment program as outlined below.
              </p>
              <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm leading-7 text-white/65">
                <li>Complete the consignment form at the bottom of this page</li>
                <li>We review submissions daily and email you once your agreement is logged</li>
                <li>If your book is fiction, it will be stocked — no approval process required</li>
                <li>We’ll request a limited number of physical copies for our shop</li>
                <li>Your book will be stocked at Inkbound Bookshop in Gort, Co. Galway</li>
                <li>You receive a share of each sale</li>
              </ol>
            </section>

            <section
              id="receive"
              className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8"
            >
              <div className={sectionLabel}>What you receive</div>
              <h2 className={sectionHeading}>Visibility, placement, and support</h2>
              <ul className={`mt-5 list-disc pl-5 ${listText}`}>
                <li>Shelf space in a real indie bookshop — no fees, just your story</li>
                <li>Promotion through our events, social media, and curated displays</li>
                <li>Support from our reader community and future spotlight opportunities</li>
                <li>A chance to build visibility, locally and beyond</li>
              </ul>
            </section>

            <section
              id="submit"
              className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl md:p-8"
            >
              <div className="mx-auto max-w-2xl">
                <div className="mx-auto inline-flex rounded-2xl border border-[#c8a04e]/30 bg-[#c8a04e]/10 p-3 text-[#f6dca0]">
                  <ScrollText className="h-6 w-6" />
                </div>

                <div className="mt-5 text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
                  Submit
                </div>

                <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
                  Ready to apply?
                </h2>

                <p className="mt-4 text-base leading-8 text-white/60">
                  When you're ready, submit your book through the consignment
                  form below. The link opens in a new tab.
                </p>

                <a
                  href="https://tally.so/r/mRQA2K"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl border border-[#c8a04e]/40 bg-[#c8a04e] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(200,160,78,0.2)]"
                >
                  Submit Your Book
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </section>

            <section
              id="shipping"
              className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8"
            >
              <div className={sectionLabel}>Sending books</div>
              <h2 className={sectionHeading}>Getting Your Books to Inkbound Bookshop</h2>

              <p className={`mt-4 ${bodyText}`}>
                Thanks for signing your consignment agreement. You're now ready
                to send your books to us. Below are the available options,
                whether you're based in Ireland or abroad.
              </p>

              <h3 className="mt-8 text-xl text-white">Local Authors (Ireland-Based)</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-white/65">
                <li>
                  <span className="text-[#f6dca0]">Post or Courier:</span> Send
                  to Inkbound Bookshop, The Square, Gort, Co. Galway, H91 VW27,
                  Ireland. Include your name and book title(s).
                </li>
                <li>
                  <span className="text-[#f6dca0]">In-Person Drop-Off:</span>{" "}
                  Please{" "}
                  <a href="/contact" className="text-[#f6dca0] underline decoration-[#c8a04e]/40 underline-offset-4">
                    contact us
                  </a>{" "}
                  to arrange a time.
                </li>
              </ul>

              <h3 className="mt-8 text-xl text-white">International Authors</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-white/65">
                <li>Use KDP, IngramSpark, or your printer to ship directly to the address above</li>
                <li>Choose EU/UK printing for faster delivery and reduced customs</li>
                <li>Include your name, book titles, contact email, and any special notes</li>
                <li>You may also send books via friends, family, or events in Ireland</li>
              </ul>

              <h3 className="mt-8 text-xl text-white">
                Printing Short Runs in Ireland — Print Bureau
              </h3>
              <p className={`mt-3 ${bodyText}`}>
                Print Bureau do not print on-demand one-off books, but they do
                offer short runs.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-white/65">
                <li>Minimum 25 for softback, 50 for hardback</li>
                <li>Softbacks ready in around 5 days, hardbacks in around 10 with print-ready files</li>
                <li>Delivery available nationwide</li>
                <li>Competitive pricing — request a quote</li>
              </ul>
              <p className="mt-4 text-sm leading-7 text-white/55">
                Contact: Print Bureau — Tel 01-4733567 /{" "}
                <a
                  className="text-[#f6dca0] underline decoration-[#c8a04e]/40 underline-offset-4"
                  href="https://www.printbureau.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.printbureau.ie
                </a>
              </p>
            </section>

            <section
              id="fineprint"
              className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8"
            >
              <div className={sectionLabel}>Fine print</div>
              <h2 className={sectionHeading}>Terms of the agreement</h2>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-white/60">
                <li>We operate on a 70/30 consignment split — you earn 70% of every sale</li>
                <li>Payments are issued biannually (Jan–Jun, Jul–Dec) and processed within 14 days of period end</li>
                <li>A full sales report is provided with each payout (copies sold, stock remaining, earnings)</li>
                <li>Additional report requests are welcome, but response times may vary during busy shop periods</li>
                <li>In rare cases of operational delays, authors will be notified and payments completed as soon as reasonably possible</li>
                <li>All books remain the property of the author until sold</li>
                <li>Unsold books after 6 months will be offered for return or donation</li>
                <li>For international returns, including the UK, any customs duties or import taxes are the responsibility of the author or recipient</li>
                <li>All books must be priced in EUR or otherwise clearly stated and in saleable condition</li>
                <li>Either party may terminate the agreement; a final report will be issued and outstanding balances settled accordingly</li>
              </ul>
            </section>

            <section className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl md:p-8">
              <div className="text-[0.72rem] uppercase tracking-[0.28em] text-[#c8a04e]">
                Coming soon
              </div>
              <h2 className="mt-3 font-serif text-3xl text-white">
                Featured Authors
              </h2>
              <p className="mt-4 text-base leading-8 text-white/55">
                We’ll soon showcase the amazing writers already on our shelves.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ConsignmentPage;