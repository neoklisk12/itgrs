import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { translations } from "@/i18n/translations";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "el";
    return window.localStorage.getItem("itg_lang") || "el";
  });

  useEffect(() => {
    window.localStorage.setItem("itg_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key) => {
      const dict = translations[lang] || translations.el;
      return key.split(".").reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : null), dict) ?? key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
};
