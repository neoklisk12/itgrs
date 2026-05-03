import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";

export default function LegalPage({ variant = "privacy" }) {
  const { t, lang } = useLang();
  const titleMap = {
    privacy: t("footer.privacy"),
    terms: t("footer.terms"),
    cookies: t("footer.cookies"),
  };
  const placeholderEl = "Το πλήρες κείμενο είναι υπό επεξεργασία. Επικοινωνήστε μαζί μας για περισσότερες πληροφορίες.";
  const placeholderEn = "The full text is being prepared. Please contact us for more information.";
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 sm:py-28" data-testid={`page-${variant}`}>
      <Link to="/" className="text-xs uppercase tracking-widest text-[#0F4C81] font-bold mb-4 inline-block hover:underline">
        ← {t("nav.home")}
      </Link>
      <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tighter mt-3">
        {titleMap[variant]}
      </h1>
      <p className="mt-6 text-slate-600 leading-relaxed">
        {lang === "el" ? placeholderEl : placeholderEn}
      </p>
    </div>
  );
}
