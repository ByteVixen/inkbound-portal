import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthorHubPage from "./pages/AuthorHubPage";
import ConsignmentPage from "./pages/ConsignmentPage";
import ContactPage from "./pages/ContactPage";
import Nav from "./components/Nav";
import AboutPage from "./pages/AboutPage";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen font-marcellus text-white bg-black overflow-hidden pt-20 flex flex-col justify-between">
      <Nav />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/authors" element={<AuthorHubPage />} />
          <Route path="/authors/consignment" element={<ConsignmentPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}