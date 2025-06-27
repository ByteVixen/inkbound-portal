// src/pages/ConsignmentPage.tsx

export default function ConsignmentPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">

          <h1 className="text-5xl font-light mb-6 text-amber-500 text-glow">
            Stock Your Story With Us
          </h1>

          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Inkbound Bookshop is proud to support indie, self-published, and small press authors.
            We operate on a consignment model with no upfront fees — offering real shelf space for real storytellers.
            If you’re an indie author writing any type of Fiction, we’d love to hear from you.
          </p>

          <h2 className="text-2xl font-semibold text-amber-400 mb-3">Eligibility</h2>
          <p className="text-gray-300 mb-6">
            We accept submissions from:
          </p>
          <ul className="text-left text-gray-300 mb-8 list-disc list-inside">
            <li>📚 Indie & self-published authors</li>
            <li>🏷️ Small press & micro-press creators</li>
            <li>🌍 Authors based in Ireland or able to ship to us</li>
            <li>📖 Books across all Fictional genres and formats</li>
          </ul>

          <h2 className="text-2xl font-semibold text-amber-400 mb-3">How It Works</h2>
          <ul className="text-left text-gray-300 mb-8 list-decimal list-inside">
            <li>Submit your book via our Google Form below</li>
            <li>We review submissions weekly</li>
            <li>If selected, we’ll request a limited number of physical copies</li>
            <li>Your book is stocked on our physical shelf in Gort, Co. Galway</li>
            <li>You receive a share of each sale (details below)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-amber-400 mb-3">What You Receive</h2>
          <ul className="text-left text-gray-300 mb-8 list-disc list-inside">
            <li>✔ Real-world exposure in a dedicated indie bookshop</li>
            <li>✔ Promotion via our events, social media, and storefront displays</li>
            <li>✔ Community support and future feature opportunities</li>
            <li>✔ No upfront costs — just your story, ready to be read</li>
          </ul>

          <a
            href="https://docs.google.com/forms/d/1zt-aKJ0t1o3-6DHPY5YunaiQ73JvzZEq8IVExTlMvYQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition mb-12"
          >
            Submit Your Book
          </a>

          <h2 className="text-2xl font-semibold text-amber-400 mb-2">The Fine Print</h2>
          <ul className="text-left text-gray-400 text-sm leading-relaxed max-w-xl mx-auto list-disc list-inside">
            <li>💸 We operate on a 70/30 split — you earn 70% of every sale</li>
            <li>📆 Payments are made quarterly via your preferred method</li>
            <li>🧾 All books must be pre-priced and in good condition</li>
            <li>📬 If your book doesn’t sell within 6 months, we’ll offer to return or donate remaining copies</li>
          </ul>

        </div>
      </div>
    </div>
  );
}
