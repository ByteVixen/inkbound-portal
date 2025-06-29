import { useEffect, useState } from "react";

const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 w-full bg-black/90 text-white text-sm px-4 py-3 flex flex-col md:flex-row justify-between items-center z-50 border-t border-amber-700">
      <p className="mb-2 md:mb-0 text-center md:text-left">
        We use cookies to improve your experience. By continuing, you agree to our use of cookies.
      </p>
      <button
        onClick={handleAccept}
        className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
      >
        Accept
      </button>
    </div>
  );
};

export default CookieConsentBanner;
