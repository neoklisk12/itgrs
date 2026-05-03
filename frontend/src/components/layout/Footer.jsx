import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { services } from "@/data/services";

const API = "/api";

export default function Footer() {
  const { t, lang } = useLang();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email, locale: lang });
      toast.success(t("footer.newsletterSuccess"));
      setEmail("");
    } catch (err) {
      toast.error(t("contactPage.form.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10">
          <div className="col-span-2 lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <img
                src="/coreon-logo-full.png"
                alt="Coreon IT"
                className="h-10 w-10 object-contain brightness-125"
              />
              <span className="font-display font-bold text-lg tracking-tight text-white leading-none">
                Coreon <span className="text-[#0066FF]">IT</span>
              </span>
            </Link>
            <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#0066FF] mb-3">
              Connect · Secure · Empower
            </div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0066FF]" />
                {t("contactPage.info.phone")}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0066FF]" />
                {t("contactPage.info.email")}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="eyebrow !text-slate-500 mb-4">{t("footer.company")}</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition">{t("nav.about")}</Link></li>
              <li><Link to="/solutions/booking-system" className="hover:text-white transition">{t("nav.bookingSystem")}</Link></li>
              <li><Link to="/blog" className="hover:text-white transition">{t("nav.blog")}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="eyebrow !text-slate-500 mb-4">{t("footer.services")}</div>
            <ul className="space-y-2 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link to="/services" className="hover:text-white transition">
                    {(s[lang] || s.el).name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-4">
            <div className="eyebrow !text-slate-500 mb-4">{t("footer.newsletter")}</div>
            <p className="text-sm text-slate-400 mb-4">{t("footer.newsletterDesc")}</p>
            <form onSubmit={submit} className="flex gap-2" data-testid="newsletter-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.newsletterPlaceholder")}
                data-testid="newsletter-email"
                className="flex-1 bg-slate-900 border border-slate-800 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#0066FF]"
              />
              <button
                type="submit"
                disabled={loading}
                data-testid="newsletter-submit"
                className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-4 py-2.5 text-sm font-semibold flex items-center gap-2 disabled:opacity-50 transition"
              >
                {t("footer.newsletterCta")} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between gap-4 text-xs text-slate-500">
          <div>{t("footer.copyright")}</div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white">{t("footer.privacy")}</Link>
            <Link to="/terms" className="hover:text-white">{t("footer.terms")}</Link>
            <Link to="/cookies" className="hover:text-white">{t("footer.cookies")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
