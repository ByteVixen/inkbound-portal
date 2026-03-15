// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import "./index.css";

import AdminDashboard from "./pages/AdminDashboard";
import AuthorMapPage from "./pages/AuthorMapPage";

// Components
import Navbar from "./components/Nav";
import Footer from "./components/Footer";
import WhisperForm from "./components/WhisperForm";
import OpeningOverlay from "./components/OpeningOverlay";
import CountdownBanner from "./components/CountdownBanner";
import PostLaunchBanner from "./components/PostLaunchBanner";
import FamiliarSelector from "./components/FamiliarSelector";
import { FamiliarProvider } from "./components/FamiliarContext";

// Pages
import MakeItFluffyPage from "./pages/MakeItFluffyPage";
import NewsletterArchive from "./pages/ NewsletterArchive";
import NewsletterIssue from "./pages/NewsletterIssue";
import BookClubPage from "./pages/BookClubPage";
import HomePage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FeaturedBooksPage from "./pages/FeaturedBooksPage";
import InfoPage from "./pages/InfoPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import BusinessCollaborationsPage from "./pages/BusinessCollaborationsPage";
import ReadersPage from "./pages/ReadersPage";
import ReaderQuests from "./pages/ReaderQuests";
import WhispersPage from "./pages/WhispersPage";
import InkboundTBR from "./pages/InkboundTBR";
import LibroPage from "./pages/LibroPage";
import BookishFortune from "./pages/BookishFortune";
import CreativesPage from "./pages/CreativesPage";
import TikTokathon from "./pages/TikTokathon";
import InkboundSanta from "./pages/InkboundSanta";
import StuffYourKindle from "./pages/StuffYourKindle";
import CreativesHub from "./pages/CreativesHub";

import MerchPage from "./pages/MerchPage";
import NewReleasesPage from "./pages/NewReleasesPage";

// Black Diadem
import BlackDiademSeries from "./pages/BlackDiademSeries";

// Author / Shelf
import ConsignmentPage from "./pages/authors/ConsignmentPage";
import VirtualShelfspacePage from "./pages/VirtualShelfspacePage";
import ConsignmentShippingPage from "./pages/ConsignmentShippingPage";
import VirtualShelfPage from "./pages/VirtualShelfPage";
import AudiobooksPage from "./pages/AudiobookShelfPage";
import NarratorShelfPage from "./pages/NarratorShelfPage";
import NarratorHubPage from "./pages/NarratorHubPage";
import AuthorLanding from "./pages/AuthorLanding";
import NarratorLanding from "./pages/NarratorLanding";

const App: React.FC = () => {
  return (
    <FamiliarProvider>
      <div className="flex flex-col min-h-screen">
        <OpeningOverlay />
        <CountdownBanner />
        <PostLaunchBanner />
        <Navbar />
        <ScrollToTop />

        <main className="flex-grow pt-20">
          <Routes>

            {/* Home */}
            <Route path="/" element={<HomePage />} />

            {/* Community */}
            <Route path="/whisper" element={<WhisperForm />} />
            <Route path="/whispers" element={<WhispersPage />} />
            <Route path="/readers" element={<ReadersPage />} />
            <Route path="/quests" element={<ReaderQuests />} />

            {/* Info */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/collaborate" element={<BusinessCollaborationsPage />} />

            {/* Reader Tools */}
            <Route path="/inkbound-tbr" element={<InkboundTBR />} />
            <Route path="/readers/fortune" element={<BookishFortune />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Events / Community */}
            <Route path="/creatives" element={<CreativesPage />} />
            <Route path="/tiktokathon" element={<TikTokathon />} />
            <Route path="/inkbound-santa" element={<InkboundSanta />} />
            <Route path="/stuff-your-kindle" element={<StuffYourKindle />} />
            <Route path="/creativeshub" element={<CreativesHub />} />
            <Route path="/book-club" element={<BookClubPage />} />
            {/* Merch */}
            <Route path="/merch" element={<MerchPage />} />

            {/* Black Diadem */}
            <Route path="/black-diadem" element={<BlackDiademSeries />} />

            {/* Books */}
            <Route path="/featured-books" element={<FeaturedBooksPage />} />
            <Route path="/new-releases" element={<NewReleasesPage />} />

            {/* Shelf */}
            <Route path="/virtual-shelf" element={<VirtualShelfPage />} />
            <Route path="/virtual-shelfspace" element={<VirtualShelfspacePage />} />

            {/* Audiobooks */}
            <Route path="/audiobooks" element={<AudiobooksPage />} />
            <Route path="/LibroPage" element={<LibroPage />} />

            {/* Author Map */}
            <Route path="/author-map" element={<AuthorMapPage />} />
            <Route path="/AuthorMapPage" element={<Navigate to="/author-map" replace />} />

            {/* Fun */}
            <Route path="/make-it-fluffy" element={<MakeItFluffyPage />} />

            {/* Author Hub */}
            <Route path="/authors" element={<AuthorLanding />} />
            <Route path="/authors/consignment" element={<ConsignmentPage />} />
            <Route path="/authors/ship-books" element={<ConsignmentShippingPage />} />

            {/* Newsletter */}
            <Route path="/newsletter" element={<NewsletterArchive />} />
            <Route path="/newsletter/:slug" element={<NewsletterIssue />} />

            {/* Narrators */}
            <Route path="/narrators" element={<NarratorLanding />} />
            <Route path="/narrator-shelf" element={<NarratorShelfPage />} />
            <Route path="/narrator-hub" element={<NarratorHubPage />} />

            {/* Legal */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />

          </Routes>
        </main>

        <Footer />
        <FamiliarSelector />

        {/* Join Society Button */}
        <button
          data-tally-open="nPNMrd"
          data-tally-align-left="1"
          data-tally-overlay="1"
          data-tally-emoji-text="✨"
          data-tally-emoji-animation="flash"
          data-tally-auto-close="4000"
          className="fixed bottom-6 right-6 z-50 bg-amber-600 hover:bg-amber-500 text-black font-semibold px-4 py-3 rounded-full shadow-lg transition-all"
        >
          ✨ Join the Society
        </button>

      </div>
    </FamiliarProvider>
  );
};

export default App;