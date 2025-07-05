// src/App.tsx
import './index.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import WhisperForm from "./components/WhisperForm";
import WhisperFeed from "./components/WhisperFeed";
import WhispersPage from "./pages/WhispersPage"; 
import ReadersPage from "./pages/ReadersPage";
import ReaderQuests from "./pages/ReaderQuests";
import Navbar from "./components/Nav";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FeaturedBooksPage from "./pages/FeaturedBooksPage";
import InfoPage from "./pages/InfoPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import BusinessCollaborationsPage from "./pages/BusinessCollaborationsPage";
// Author / Shelf Pages
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
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/whisper" element={<WhisperForm />} />
          <Route path="/whispers" element={<WhisperFeed />} />
          <Route path="/whispers" element={<WhispersPage />} />
          <Route path="/readers" element={<ReadersPage />} />
          <Route path="/quests" element={<ReaderQuests />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/collaborate" element={<BusinessCollaborationsPage />} />
          {/* Featured / Virtual / Audiobooks */}
          <Route path="/featured-books" element={<FeaturedBooksPage />} />
          <Route path="/virtual-shelf" element={<VirtualShelfPage />} />
          <Route path="/audiobooks" element={<AudiobooksPage />} />

          {/* Author Hub */}
          <Route path="/authors" element={<AuthorLanding />} />
          <Route path="/authors/consignment" element={<ConsignmentPage />} />
          <Route path="/virtual-shelfspace" element={<VirtualShelfspacePage />} />
          <Route path="/authors/ship-books" element={<ConsignmentShippingPage />} />

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
    </>
  );
};

export default App;
