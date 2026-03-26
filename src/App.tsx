// src/App.tsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import "./index.css";

// Components
import Navbar from "./components/Nav";
import Footer from "./components/Footer";
import WhisperForm from "./components/WhisperForm";
import OpeningOverlay from "./components/OpeningOverlay";
import CountdownBanner from "./components/CountdownBanner";
import FamiliarSelector from "./components/FamiliarSelector";
import { FamiliarProvider } from "./components/FamiliarContext";

// Lazy Pages
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AuthorMapPage = lazy(() => import("./pages/AuthorMapPage"));
const NewsletterArchive = lazy(() => import("./pages/NewsletterArchive"));
const NewsletterIssue = lazy(() => import("./pages/NewsletterIssue"));
const BookClubPage = lazy(() => import("./pages/BookClubPage"));
const HomePage = lazy(() => import("./pages/LandingPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const FeaturedBooksPage = lazy(() => import("./pages/FeaturedBooksPage"));
const InfoPage = lazy(() => import("./pages/InfoPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const BusinessCollaborationsPage = lazy(() => import("./pages/BusinessCollaborationsPage"));
const ReadersPage = lazy(() => import("./pages/ReadersPage"));
const ReaderQuests = lazy(() => import("./pages/ReaderQuests"));
const WhispersPage = lazy(() => import("./pages/WhispersPage"));
const InkboundTBR = lazy(() => import("./pages/InkboundTBR"));
const LibroPage = lazy(() => import("./pages/LibroPage"));
const BookishFortune = lazy(() => import("./pages/BookishFortune"));
const CreativesPage = lazy(() => import("./pages/CreativesPage"));
const TikTokathon = lazy(() => import("./pages/TikTokathon"));
const InkboundSanta = lazy(() => import("./pages/InkboundSanta"));
const StuffYourKindle = lazy(() => import("./pages/StuffYourKindle"));
const CreativesHub = lazy(() => import("./pages/CreativesHub"));
const NewReleasesPage = lazy(() => import("./pages/NewReleasesPage"));
const BlackDiademSeries = lazy(() => import("./pages/BlackDiademSeries"));
const ConsignmentPage = lazy(() => import("./pages/authors/ConsignmentPage"));
const VirtualShelfspacePage = lazy(() => import("./pages/VirtualShelfspacePage"));
const ConsignmentShippingPage = lazy(() => import("./pages/ConsignmentShippingPage"));
const VirtualShelfPage = lazy(() => import("./pages/VirtualShelfPage"));
const AudiobooksPage = lazy(() => import("./pages/AudiobookShelfPage"));
const NarratorShelfPage = lazy(() => import("./pages/NarratorShelfPage"));
const NarratorHubPage = lazy(() => import("./pages/NarratorHubPage"));
const AuthorLanding = lazy(() => import("./pages/AuthorLanding"));
const NarratorLanding = lazy(() => import("./pages/NarratorLanding"));

const App: React.FC = () => {
  return (
    <FamiliarProvider>
      <div className="flex min-h-screen flex-col">
        <OpeningOverlay />
        <CountdownBanner />
        <Navbar />
        <ScrollToTop />

        <main className="flex-grow">
          <Suspense
            fallback={
              <div className="flex min-h-[50vh] items-center justify-center text-white">
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/whisper" element={<WhisperForm />} />
              <Route path="/whispers" element={<WhispersPage />} />
              <Route path="/readers" element={<ReadersPage />} />
              <Route path="/quests" element={<ReaderQuests />} />

              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/info" element={<InfoPage />} />
              <Route path="/collaborate" element={<BusinessCollaborationsPage />} />

              <Route path="/inkbound-tbr" element={<InkboundTBR />} />
              <Route path="/readers/fortune" element={<BookishFortune />} />

              <Route path="/admin" element={<AdminDashboard />} />

              <Route path="/creatives" element={<CreativesPage />} />
              <Route path="/tiktokathon" element={<TikTokathon />} />
              <Route path="/inkbound-santa" element={<InkboundSanta />} />
              <Route path="/stuff-your-kindle" element={<StuffYourKindle />} />
              <Route path="/creativeshub" element={<CreativesHub />} />
              <Route path="/book-club" element={<BookClubPage />} />

              <Route path="/black-diadem" element={<BlackDiademSeries />} />

              <Route path="/featured-books" element={<FeaturedBooksPage />} />
              <Route path="/new-releases" element={<NewReleasesPage />} />

              <Route path="/virtual-shelf" element={<VirtualShelfPage />} />
              <Route path="/virtual-shelfspace" element={<VirtualShelfspacePage />} />

              <Route path="/audiobooks" element={<AudiobooksPage />} />
              <Route path="/LibroPage" element={<LibroPage />} />

              <Route path="/author-map" element={<AuthorMapPage />} />
              <Route path="/AuthorMapPage" element={<Navigate to="/author-map" replace />} />

              <Route path="/authors" element={<AuthorLanding />} />
              <Route path="/authors/consignment" element={<ConsignmentPage />} />
              <Route path="/authors/ship-books" element={<ConsignmentShippingPage />} />

              <Route path="/newsletter" element={<NewsletterArchive />} />
              <Route path="/newsletter/:slug" element={<NewsletterIssue />} />

              <Route path="/narrators" element={<NarratorLanding />} />
              <Route path="/narrator-shelf" element={<NarratorShelfPage />} />
              <Route path="/narrator-hub" element={<NarratorHubPage />} />

              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <FamiliarSelector />

        <button
          data-tally-open="nPNMrd"
          data-tally-align-left="1"
          data-tally-overlay="1"
          data-tally-emoji-text="✨"
          data-tally-emoji-animation="flash"
          data-tally-auto-close="4000"
          className="fixed bottom-6 right-6 z-50 rounded-full bg-amber-600 px-4 py-3 font-semibold text-black shadow-lg transition-all hover:bg-amber-500"
        >
          ✨ Join the Society
        </button>
      </div>
    </FamiliarProvider>
  );
};

export default App;