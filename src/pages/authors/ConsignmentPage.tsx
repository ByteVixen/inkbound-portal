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
          <a href="#shipping" className="block hover:underline">Sending Books</a>
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
  <h2 className="text-2xl font-semibold text-amber-400 mb-3">Consignment Agreement: How It Works</h2>
  <p className="text-gray-400 mb-2">By submitting your book, you agree to the terms of our consignment program as outlined below.</p>
  <ol className="list-decimal list-inside space-y-1 text-gray-300">
    <li>Complete the Consignment Form at the bottom of this page</li>
    <li>We review submissions daily and email you once your agreement is logged</li>
    <li>If your book is fiction, it will be stocked — no approval process required</li>
    <li>We’ll request a limited number of physical copies for our shop</li>
    <li>Your book will be stocked at the Inkbound Bookshop in Gort, Co. Galway</li>
    <li>You receive a share of each sale (see details below)</li>
  </ol>
</section>

<section id="receive">
  <h2 className="text-2xl font-semibold text-amber-400 mb-3">What You Receive</h2>
  <ul className="list-disc list-inside space-y-1 text-gray-300">
    <li>✔ Shelf space in a real indie bookshop — no fees, just your story</li>
    <li>✔ Promotion through our events, social media, and curated displays</li>
    <li>✔ Support from our reader community and future spotlight opportunities</li>
    <li>✔ A chance to build visibility, locally and beyond</li>
  </ul>
</section>


        <section id="submit">
          <a
            href="https://tally.so/r/mRQA2K"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition"
          >
            Submit Your Book
          </a>
          <p className="text-sm text-gray-400 italic mt-2">This link opens in a new tab.</p>
        </section>

        <section id="shipping">
          <h2 className="text-2xl font-semibold text-amber-400 mb-3">📦 Getting Your Books to Inkbound Bookshop</h2>
          <p className="text-gray-300 mb-4">
            Thanks for signing your consignment agreement! You're now ready to send your books to us.
            Below are the options available, whether you're based in Ireland or abroad.
          </p>

          <h3 className="text-lg text-white mt-4">🇮🇪 Local Authors (Ireland-Based)</h3>
          <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
            <li><strong>Post or Courier:</strong> Send to Inkbound Bookshop, The Square, Gort, Co. Galway, H91 VW27, Ireland. Include your name and book title(s).</li>
            <li><strong>In-Person Drop-Off:</strong> Please <a href="/contact" className="underline text-amber-400">contact us</a> to arrange a time.</li>
          </ul>

          <h3 className="text-lg text-white mt-6">🌍 International Authors</h3>
          <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
            <li>Use KDP, IngramSpark, or your printer to ship directly to the address above</li>
            <li>Choose EU/UK printing for faster delivery and reduced customs</li>
            <li>Include your name, book titles, contact email, and any special notes</li>
            <li>You may also send books via friends, family, or events in Ireland</li>
          </ul>

          <h3 className="text-lg text-white mt-6">🖨 Printing Short Runs in Ireland - With Print Bureau</h3>
          <p className="text-gray-300 mt-2">
            The Print Bureau do not print ‘on-demand’ one-off books. However, they do offer short runs.
          </p>
          <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
            <li>Minimum 25 for softback, 50 for hardback</li>
            <li>Softbacks ready in ~5 days, hardbacks in ~10 (with print-ready files)</li>
            <li>Delivery available nationwide</li>
            <li>Competitive pricing — request a quote</li>
           
          </ul>
          <p className="text-gray-300 mt-2">Contact:  Print Bureau — Tel 01-4733567 / <a className="underline text-amber-400" href="https://www.printbureau.ie" target="_blank">www.printbureau.ie</a></p>
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