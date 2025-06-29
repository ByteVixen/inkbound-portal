import React from 'react';
import VantaBackground from '../components/VantaBackground';

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="relative z-10 py-20 px-6 max-w-4xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md border border-amber-700 rounded-xl shadow-xl p-10 space-y-6">
          <h1 className="text-4xl font-light text-amber-500 text-center">Privacy Policy</h1>

          <p className="text-gray-300 text-base">
            Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
          </p>

          <div className="space-y-4 text-sm text-gray-400">
            <p><strong>1. Data Collection:</strong> We collect your email address if you voluntarily submit it through forms. We do not collect sensitive personal data.</p>
            <p><strong>2. Use of Information:</strong> Your information is used solely for communication and service updates related to the Inkbound Society.</p>
            <p><strong>3. Sharing:</strong> We do not share, sell, or trade your personal information with third parties.</p>
            <p><strong>4. Security:</strong> All data is handled securely and never stored beyond what is necessary.</p>
            <p><strong>5. External Links:</strong> We are not responsible for the privacy practices of websites linked from our pages.</p>
            <p><strong>6. Contact:</strong> For questions, contact us at <a href="mailto:summon@inkboundsociety.com" className="underline text-amber-500">summon@inkboundsociety.com</a>.</p>
          </div>

          <p className="text-sm italic text-center text-gray-500 mt-6">Last updated: June 2025</p>
        </div>
      </div>
    </div>
  );
}
