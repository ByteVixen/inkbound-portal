// src/pages/authors/ConsignmentPage.tsx

const ConsignmentPage = () => {
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-6 py-24 text-white font-marcellus">
      {/* Sidebar Navigation */}
      <aside className="md:w-1/4 mb-12 md:mb-0 md:sticky top-20">
        <nav className="space-y-4 text-lg">
          <a href="#overview" className="block hover:underline">Overview</a>
          <a href="#eligibility" className="block hover:underline">Eligibility</a>
          <a href="#how" className="block hover:underline">How It Works</a>
          <a href="#receive" className="block hover:underline">What You Receive</a>
          <a href="#submit" className="block hover:underline">Submit</a>
          <a href="#fineprint" className="block hover:underline">Fine Print</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="md:w-3/4 md:pl-12 space-y-16 scroll-smooth">
        <section id="overview">
          <h1 className="text-5xl font-light mb-6 text-amber-500 text-glow">
            Stock Your Story With Us
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Inkbound Bookshop proudly supports indie, self-published, and small press authors.
            We operate on a consignment model with no upfront fees — offering real shelf space for real storytellers.
            If you write Fiction of any kind, we’d love to hear from you.
          </p>
        </section>

        <section id="eligibility">
          <h2 className="text-2xl font-semibold text-amber-400 mb-3">Eligibility</h2>
          <p className="text-gray-300 mb-4">We currently accept submissions from:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>📚 Indie & self-published authors</li>
            <li>🏷️ Small press & micro-press creators</li>
            <li>🌍 Authors based in Ireland or able to ship to us</li>
            <li>📖 Books across all Fictional genres and formats</li>
          </ul>
        </section>

        <section id="how">
          <h2 className="text-2xl font-semibold text-amber-400 mb-3">How It Works</h2>
          <ol className="list-decimal list-inside space-y-1 text-gray-300">
            <li>Submit your book via our Google Form below</li>
            <li>We review submissions weekly</li>
            <li>If selected, we’ll request a limited number of physical copies</li>
            <li>Your book is stocked on our physical shelf in Gort, Co. Galway</li>
            <li>You receive a share of each sale (details below)</li>
          </ol>
        </section>

        <section id="receive">
          <h2 className="text-2xl font-semibold text-amber-400 mb-3">What You Receive</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>✔ Real-world exposure in a dedicated indie bookshop</li>
            <li>✔ Promotion via our events, social media, and storefront displays</li>
            <li>✔ Community support and future feature opportunities</li>
            <li>✔ No upfront costs — just your story, ready to be read</li>
          </ul>
        </section>

        <section id="submit">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeIMXyYKL5uRvpVkY6rhtMR_KLgeOi36NjtRP0XUPzElDO0zg/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition"
          >
            Submit Your Book
          </a>
          <p className="text-sm text-gray-400 italic mt-2">This link opens in a new tab.</p>
        </section>

        <section id="fineprint">
          <h2 className="text-2xl font-semibold text-amber-400 mb-3">The Fine Print</h2>
          <ul className="list-disc list-inside text-sm text-gray-400 space-y-1 leading-relaxed">
            <li>💸 We operate on a 70/30 split — you earn 70% of every sale</li>
            <li>📆 Payments are made quarterly via your preferred method</li>
            <li>🧾 All books must be pre-priced and in good condition</li>
            <li>📬 If your book doesn’t sell within 6 months, we’ll offer to return or donate remaining copies</li>
          </ul>
        </section>

        <section className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-amber-400 mb-2">✨ Featured Authors Coming Soon</h2>
          <p className="text-gray-400">We’ll soon showcase the amazing writers already on our shelves.</p>
        </section>
      </main>
    </div>
  );
};

export default ConsignmentPage;
