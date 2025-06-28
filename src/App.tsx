import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthorHubPage from "./pages/AuthorHubPage";
import ConsignmentPage from "./pages/authors/ConsignmentPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import FeaturedBooksPage from "./pages/FeaturedBooksPage"; 
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import VantaBackground from "./components/VantaBackground";


export default function App() {
  return (
    <div className="relative bg-inkblack text-white font-marcellus min-h-screen overflow-hidden">
      <VantaBackground /> {/* Vanta background stays */}

      {/* Navigation */}
      <Nav />

      {/* Page Content */}
      <div className="pt-20 relative z-10">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/authors" element={<AuthorHubPage />} />
          <Route path="/authors/consignment" element={<ConsignmentPage />} />
          <Route path="/books" element={<FeaturedBooksPage />} />

        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
