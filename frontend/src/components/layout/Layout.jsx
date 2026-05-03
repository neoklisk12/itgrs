import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import LiveChatButton from "@/components/layout/LiveChatButton";

export default function Layout() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-16 sm:pt-20">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      <LiveChatButton />
    </div>
  );
}
