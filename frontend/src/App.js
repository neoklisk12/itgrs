import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/context/LanguageContext";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import IndustriesIndex from "@/pages/IndustriesIndex";
import IndustryPage from "@/pages/IndustryPage";
import BookingSystem from "@/pages/BookingSystem";
import Pricing from "@/pages/Pricing";
import Portfolio from "@/pages/Portfolio";
import Blog from "@/pages/Blog";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import LegalPage from "@/pages/LegalPage";
import Admin from "@/pages/Admin";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Toaster richColors position="top-center" />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/industries" element={<IndustriesIndex />} />
            <Route path="/industries/:slug" element={<IndustryPage />} />
            <Route path="/solutions/booking-system" element={<BookingSystem />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<LegalPage variant="privacy" />} />
            <Route path="/terms" element={<LegalPage variant="terms" />} />
            <Route path="/cookies" element={<LegalPage variant="cookies" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
