
import VantaBackground from '../components/VantaBackground';

export default function TermsOfServicePage() {
  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="relative z-10 py-20 px-6 max-w-4xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md border border-amber-700 rounded-xl shadow-xl p-10 space-y-6">
          <h1 className="text-4xl font-light text-amber-500 text-center">Terms of Service</h1>

          <p className="text-gray-300 text-base">
            By accessing or using the Inkbound Society website, you agree to the following terms:
          </p>

          <div className="space-y-4 text-sm text-gray-400">
            <p><strong>1. Use:</strong> You agree not to use this website for any unlawful purpose or activity that may harm the Society or its users.</p>
            <p><strong>2. Content:</strong> You retain ownership of any content you submit (books, bios, etc.) but grant us the right to display it for promotional purposes.</p>
            <p><strong>3. Listings:</strong> We reserve the right to accept, reject, or remove any listing at our discretion.</p>
            <p><strong>4. Payments:</strong> All payments are non-refundable unless otherwise stated. Shelfspace durations and promotions are clearly stated in advance.</p>
            <p><strong>5. Changes:</strong> We may update these terms. Continued use of the site means you accept the latest version.</p>
            <p><strong>6. Contact:</strong> For questions, email us at <a href="mailto:summon@inkboundsociety.com" className="underline text-amber-500">summon@inkboundsociety.com</a>.</p>
          </div>

          <p className="text-sm italic text-center text-gray-500 mt-6">Last updated: June 2025</p>
        </div>
      </div>
    </div>
  );
}
