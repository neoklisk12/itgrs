import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const NavItem = ({ to, children, testId }) => (
  <NavLink
    to={to}
    data-testid={testId}
    className={({ isActive }) =>
      `text-sm font-medium transition-colors ${
        isActive ? "text-[#0F4C81]" : "text-slate-600 hover:text-[#0F4C81]"
      }`
    }
  >
    {children}
  </NavLink>
);

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled
          ? "backdrop-blur-xl bg-white/85 border-b border-slate-200"
          : "bg-white/60 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" data-testid="brand-logo" className="flex items-center gap-2.5 group">
            <img
              src="/coreon-logo-full.png"
              alt="Coreon IT"
              className="h-9 w-9 object-contain"
            />
            <span className="font-display font-bold text-lg tracking-tight text-slate-900 leading-none">
              Coreon <span className="text-[#0066FF]">IT</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <NavItem to="/" testId="nav-home">{t("nav.home")}</NavItem>
            <NavItem to="/about" testId="nav-about">{t("nav.about")}</NavItem>
            <NavItem to="/services" testId="nav-services">{t("nav.services")}</NavItem>
            <NavItem to="/industries" testId="nav-industries">{t("nav.industries")}</NavItem>
            <NavItem to="/pricing" testId="nav-pricing">{t("nav.pricing")}</NavItem>
            <NavItem to="/solutions/booking-system" testId="nav-booking-system">{t("nav.bookingSystem")}</NavItem>
            <NavItem to="/blog" testId="nav-blog">{t("nav.blog")}</NavItem>
            <NavItem to="/faq" testId="nav-faq">{t("nav.faq")}</NavItem>
            <NavItem to="/contact" testId="nav-contact">{t("nav.contact")}</NavItem>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center border border-slate-200 overflow-hidden">
              <button
                data-testid="lang-toggle-el"
                onClick={() => setLang("el")}
                className={`px-2.5 py-1 text-xs font-bold tracking-wider transition ${
                  lang === "el" ? "bg-[#0F4C81] text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                ΕΛ
              </button>
              <button
                data-testid="lang-toggle-en"
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 text-xs font-bold tracking-wider transition ${
                  lang === "en" ? "bg-[#0F4C81] text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                EN
              </button>
            </div>
            <Link
              to="/contact"
              data-testid="header-quote-cta"
              className="hidden md:inline-flex btn-cta !py-2 !px-4 !text-sm"
            >
              {t("nav.quote")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              data-testid="mobile-menu-toggle"
              className="lg:hidden p-2"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-white border-t border-slate-200"
            data-testid="mobile-menu"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {[
                ["/", t("nav.home"), "m-home"],
                ["/about", t("nav.about"), "m-about"],
                ["/services", t("nav.services"), "m-services"],
                ["/industries", t("nav.industries"), "m-industries"],
                ["/pricing", t("nav.pricing"), "m-pricing"],
                ["/solutions/booking-system", t("nav.bookingSystem"), "m-booking-system"],
                ["/blog", t("nav.blog"), "m-blog"],
                ["/faq", t("nav.faq"), "m-faq"],
                ["/contact", t("nav.contact"), "m-contact"],
              ].map(([to, label, tid]) => (
                <NavLink
                  key={to}
                  to={to}
                  data-testid={`mobile-nav-${tid}`}
                  className={({ isActive }) =>
                    `py-3 px-2 text-base font-medium border-b border-slate-100 ${
                      isActive ? "text-[#0F4C81]" : "text-slate-700"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <div className="flex items-center gap-2 pt-4">
                <button
                  onClick={() => setLang("el")}
                  data-testid="mobile-lang-el"
                  className={`flex-1 py-2 text-xs font-bold tracking-wider border ${
                    lang === "el" ? "bg-[#0F4C81] text-white border-[#0F4C81]" : "border-slate-200"
                  }`}
                >
                  ΕΛ
                </button>
                <button
                  onClick={() => setLang("en")}
                  data-testid="mobile-lang-en"
                  className={`flex-1 py-2 text-xs font-bold tracking-wider border ${
                    lang === "en" ? "bg-[#0F4C81] text-white border-[#0F4C81]" : "border-slate-200"
                  }`}
                >
                  EN
                </button>
              </div>
              <Link to="/contact" data-testid="mobile-quote-cta" className="btn-cta mt-3">
                {t("nav.quote")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
