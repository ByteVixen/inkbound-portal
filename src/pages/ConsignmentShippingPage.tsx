// src/pages/ConsignmentShippingPage.tsx
import React from "react";
import VantaBackground from "../components/VantaBackground";

const sections = [
  { id: "ireland", title: "Local Shipping (Ireland)" },
  { id: "international", title: "International Shipping" },
  { id: "print", title: "Printing Options" },
];

const ConsignmentShippingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-xl p-8 flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="md:w-1/4 mb-8 md:mb-0 sticky top-24 self-start pr-6 border-r border-amber-700">
            <nav className="space-y-4 text-lg">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block hover:underline text-amber-400"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="md:w-3/4 md:pl-8 space-y-12">
            <h1 className="text-4xl font-light text-amber-500 mb-6 text-glow">
              📦 Getting Your Books to Inkbound Bookshop
            </h1>

            <section id="ireland">
              <h2 className="text-2xl font-semibold text-amber-400 mb-2">🇮🇪 Local Authors (Ireland-Based)</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-300">
                <li>
                  <strong>Post or Courier:</strong> Send your books directly to:
                  <div className="bg-black/30 border border-white rounded p-4 mt-2">
                    Inkbound Bookshop<br />
                    The Square, Gort<br />
                    Co. Galway, H91 VW27<br />
                    Ireland
                  </div>
                  <p className="mt-2">✅ Include your name and book title(s) inside the package so we can confirm your delivery.</p>
                </li>
                <li>
                  <strong>In-Person Drop-Off:</strong> If you're nearby or attending an event in the area, you're welcome to drop off your books.<br />
                  📅 <em>Please contact us in advance to arrange a time.</em>
                </li>
              </ol>
            </section>

            <section id="international">
              <h2 className="text-2xl font-semibold text-amber-400 mb-2">🌍 International Authors (Outside Ireland)</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-300">
                <li>
                  <strong>Place a Print Order to Ship Directly:</strong> Use Amazon KDP, IngramSpark, etc., to ship directly to us.
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li>Choose UK or EU printer to avoid customs delays</li>
                    <li>Set billing currency to EUR if available</li>
                  </ul>
                  <div className="bg-black/30 border border-white rounded p-4 mt-2">
                    Inkbound Bookshop<br />
                    The Square, Gort<br />
                    Co. Galway, H91 VW27<br />
                    Ireland
                  </div>
                  <p className="mt-2">📬 We’ll confirm delivery. You're welcome to share tracking info.</p>
                </li>
                <li>
                  <strong>Use a Local Printer or Stockist:</strong> You can send books from your own inventory or preferred printer.
                </li>
                <li>
                  <strong>Drop-Off via Representative or Event:</strong> A friend or colleague may drop them off for you. Let us know who to expect!
                </li>
              </ol>

              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2 text-amber-300">📌 Be Sure to Include:</h3>
                <ul className="list-disc list-inside ml-4 text-gray-300 space-y-1">
                  <li>Your name and book title(s)</li>
                  <li>Your contact email</li>
                  <li>Any notes (signed copies, promos, etc.)</li>
                </ul>
              </div>
            </section>

            <section id="print">
              <h2 className="text-2xl font-semibold text-amber-400 mb-3">🖨️ Irish Print Option: Print Bureau</h2>
              <p className="text-gray-300 mb-4">
                If you need a reliable printer for short runs in Ireland, we recommend:
              </p>

              <div className="bg-black/30 border border-white rounded p-4 text-gray-200 space-y-2">
                <p><strong>📌 No print-on-demand for single copies.</strong></p>
                <p>✅ Minimums: 25 (softback), 50 (hardback)</p>
                <p>Provided with print-ready files:</p>
                <ul className="list-disc list-inside ml-6">
                  <li>Softback: ~5 days</li>
                  <li>Hardback: ~10 days</li>
                </ul>
                <p>📦 Nationwide delivery available</p>
                <p>💰 Competitive rates for bulk jobs</p>
              </div>

              <div className="bg-black/40 border border-amber-400 rounded p-4 text-sm mt-4 text-gray-200">
                <p className="font-semibold">Print Bureau</p>
                <p>📞 <a href="tel:014733567" className="underline">01-4733567</a></p>
                <p>🌐 <a href="http://www.printbureau.ie" target="_blank" rel="noreferrer" className="underline">www.printbureau.ie</a></p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ConsignmentShippingPage;
