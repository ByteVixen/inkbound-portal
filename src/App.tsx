// src/App.tsx
import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import InfoPage from "./pages/InfoPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

import AuthorHubPage from "./pages/AuthorHubPage";
import ConsignmentPage from "./pages/authors/ConsignmentPage";
import VirtualShelfspacePage from "./pages/VirtualShelfspacePage";

import FeaturedBooksPage from "./pages/FeaturedBooksPage";
import VirtualShelfPage from "./pages/VirtualShelfPage";
import AudiobookShelfPage from "./pages/AudiobookShelfPage";

import NarratorShelfPage from "./pages/NarratorShelfPage";
import NarratorHubPage from "./pages/NarratorHubPage";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import VantaBackground from "./components/VantaBackground";
import { FamiliarProvider } from "./components/FamiliarContext";
import FamiliarSelector from "./components/FamiliarSelector";

export default function App() {
  return (
    <FamiliarProvider>
      <div className="relative bg-black/30 text-white font-marcellus min-h-screen overflow-hidden">
        {/* Background and Nav */}
        <VantaBackground />
        <Nav />

        {/* Main Page Content */}
        <div className="relative z-10 pt-20 backdrop-blur-md">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />

            {/* Shelves */}
            <Route path="/virtual-shelf" element={<VirtualShelfPage />} />
            <Route path="/audiobooks" element={<AudiobookShelfPage />} />
            <Route path="/featured-books" element={<FeaturedBooksPage />} />

            {/* Author Hub */}
            <Route path="/authors" element={<AuthorHubPage />} />
            <Route path="/authors/consignment" element={<ConsignmentPage />} />
            <Route path="/virtual-shelfspace" element={<VirtualShelfspacePage />} />

            {/* Narrator Hub */}
            <Route path="/narrator-shelf" element={<NarratorShelfPage />} />
            <Route path="/narrator-hub" element={<NarratorHubPage />} />
          </Routes>
        </div>

        {/* Familiar & Footer */}
        <FamiliarSelector />
        <Footer />
        <Analytics />
      </div>
    </FamiliarProvider>
  );
}
