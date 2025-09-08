import React from 'react';
import VantaBackground from '../components/VantaBackground';

const VirtualShelfspacePage: React.FC = () => {
  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Vanta Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 px-6 max-w-4xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md border border-amber-700 rounded-xl shadow-xl p-10">
          <h1 className="text-4xl font-light mb-6 text-amber-500 text-center text-glow">
            Virtual Shelfspace Submission
          </h1>

          <p className="mb-10 text-lg text-center text-gray-300 max-w-2xl mx-auto">
            Showcase your book to our readers. Please read the terms and visibility guidelines before submitting your form.
          </p>

          <div className="space-y-4 mb-12">
            <h2 className="text-2xl font-semibold text-amber-400">📜 Terms & Visibility Guidelines</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
              <li><strong>Submission Review:</strong> All entries are reviewed before acceptance.</li>
              <li><strong>Listing Duration:</strong> Will list until author updates/removes.</li>
      
              <li><strong>Content Standards:</strong> Valid link and cover image required. No harmful or offensive content accepted.</li>
              <li><strong>Featured Slots:</strong> Premium positioning may be offered in future.</li>
              <li><strong>Author Responsibility:</strong> You confirm all rights to submitted content.</li>
              <li><strong>Visibility:</strong> Books may be promoted on site and across social platforms.</li>
            </ul>
            <p className="text-sm italic text-gray-400">
              Questions? Contact us at{" "}
              <a
                href="mailto:summon@inkboundsociety.com"
                className="underline text-amber-500"
              >
                summon@inkboundsociety.com
              </a>
            </p>
          </div>

          <div className="text-center">
            <a
              href="https://forms.gle/91LXeerXVE6Ni3JU7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 px-8 rounded-full shadow-lg transition"
            >
              📩 Submit via Google Form
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualShelfspacePage;
