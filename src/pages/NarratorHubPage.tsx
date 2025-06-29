import React from 'react';
import VantaBackground from '../components/VantaBackground';

const NarratorHubPage: React.FC = () => {
  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Vanta Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-xl p-10">
          <h1 className="text-4xl font-light mb-6 text-amber-500 text-center text-glow">
            Narrator Submission
          </h1>

          <p className="mb-10 text-lg text-center text-gray-300 max-w-2xl mx-auto">
            If you're a voice actor or audiobook narrator and would like to be featured in the Inkbound Society directory, please review the guidelines and submit your details using the form below.
          </p>

          <div className="bg-black/50 border border-amber-700 rounded-lg p-6 mb-12 space-y-4">
            <h2 className="text-2xl font-semibold text-amber-400">🎙️ Narrator Listing Guidelines</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
              <li><strong>Directory Inclusion:</strong> Your profile may appear publicly on our Narrator Shelf.</li>
              <li><strong>Professional Standards:</strong> We review submissions for quality, clarity, and completeness.</li>
              <li><strong>Genres & Vocal Style:</strong> Indicate what genres you narrate and describe your voice style.</li>
              <li><strong>Link Required:</strong> Please provide a link to a portfolio, website, or TikTok page with samples.</li>
              <li><strong>Promotions:</strong> Some narrators may be featured in social content or creator interviews.</li>
            </ul>
            <p className="text-sm italic text-gray-400">
              Questions? Contact us at <a href="mailto:summon@inkboundsociety.com" className="underline text-amber-500">summon@inkboundsociety.com</a>
            </p>
          </div>

          <div className="text-center">
            <a
              href="https://forms.gle/uwsJtMc38mDBBKAx8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 px-8 rounded-full shadow-lg transition"
            >
              🎤 Submit via Google Form
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NarratorHubPage;
