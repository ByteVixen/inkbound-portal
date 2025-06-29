import React, { useState, useEffect } from 'react';
import VantaBackground from "../components/VantaBackground";

const sections = [
  { id: 'pricing', title: 'Pricing' },
  { id: 'consignment', title: 'Consignment Policy' },
  { id: 'virtual', title: 'Virtual Shelf Terms' },
  { id: 'narrator', title: 'Narrator Terms' },
  { id: 'promotion', title: 'How We Promote Listings' },
  { id: 'faq', title: 'FAQs' },
  { id: 'contact', title: 'Contact' },
];

const CollapsibleSection = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div id={id} className="mb-8 border-b border-amber-700 pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left text-xl font-semibold text-amber-400 hover:underline focus:outline-none"
      >
        {title} {open ? '▲' : '▼'}
      </button>
      {open && <div className="mt-4 text-base text-gray-300 space-y-3">{children}</div>}
    </div>
  );
};

const InfoPage: React.FC = () => {
  const [currency, setCurrency] = useState<'EUR' | 'USD' | 'GBP'>('EUR');
  const [rates, setRates] = useState<{ [key: string]: number }>({ USD: 1.1, GBP: 0.85, EUR: 1 });

  useEffect(() => {
    fetch('https://api.exchangerate.host/latest?base=EUR&symbols=USD,GBP,EUR')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          setRates(data.rates);
        }
      })
      .catch(err => console.error("Failed to fetch rates:", err));
  }, []);

  const convert = (eur: number) => {
    const rate = rates[currency];
    const symbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '£';
    return `${symbol}${(eur * rate).toFixed(2)}`;
  };

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
          <main className="md:w-3/4 md:pl-8">
            <h1 className="text-4xl font-light text-amber-500 mb-10 text-glow">
              Information & Guidelines
            </h1>

            <CollapsibleSection id="pricing" title="Pricing">
              <label htmlFor="currency" className="block text-sm mb-1 text-gray-400">View prices in:</label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as 'EUR' | 'USD' | 'GBP')}
                className="bg-black border border-white rounded px-2 py-1 mb-4"
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>

              <p>Virtual Shelfspace listings cost <strong>{convert(5)}/month</strong>, or save by booking ahead:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>3 Months:</strong> {convert(12)} (save {convert(3)})</li>
                <li><strong>6 Months:</strong> {convert(25)} (save {convert(5)})</li>
                <li><strong>12 Months:</strong> {convert(50)} (save {convert(10)})</li>
              </ul>
            </CollapsibleSection>

            <CollapsibleSection id="consignment" title="Consignment Policy">
              <p>We accept indie books for physical display in the Gort bookshop:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>3-month term minimum</li>
                <li>60/40 revenue split (author/bookshop)</li>
                <li>Author handles delivery/shipping</li>
                <li>Returns or donations at end of term</li>
              </ul>
              <p>Submit on the <a href="/authors/consignment" className="underline text-amber-400">Become Stocked page</a>.</p>
            </CollapsibleSection>

            <CollapsibleSection id="virtual" title="Virtual Shelf Terms">
              <ul className="list-disc list-inside space-y-1">
                <li>All listings are reviewed</li>
                <li>Cover image and valid link required</li>
                <li>No harmful, illegal content</li>
                <li>Books are rotated monthly and visible for minimum 30 days</li>
              </ul>
            </CollapsibleSection>

            <CollapsibleSection id="narrator" title="Narrator Terms">
              <p>All narrator submissions are reviewed. Public listing includes name, genres, voice style, and optional link to samples. We reserve the right to curate.</p>
            </CollapsibleSection>

            <CollapsibleSection id="promotion" title="How We Promote Listings">
              <ul className="list-disc list-inside space-y-1">
                <li>Instagram stories & reels</li>
                <li>Inkbound TikTok features</li>
                <li>Front window & in-store table displays</li>
                <li>“Shelf Tour” videos and lives</li>
              </ul>
            </CollapsibleSection>

            <CollapsibleSection id="faq" title="FAQs">
              <p><strong>Can I submit more than one book?</strong> Yes, each needs its own form.</p>
              <p><strong>What if my book is rejected?</strong> We'll let you know why, if possible, and you can revise/resubmit.</p>
            </CollapsibleSection>

            <CollapsibleSection id="contact" title="Contact">
              <p>Still have questions? Email us at <a href="mailto:summon@inkboundsociety.com" className="underline text-amber-400">summon@inkboundsociety.com</a></p>
            </CollapsibleSection>
          </main>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
