import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

export default function CookieBanner() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ok = localStorage.getItem("itg_cookie_consent");
    if (!ok) setTimeout(() => setVisible(true), 1200);
  }, []);

  const accept = () => {
    localStorage.setItem("itg_cookie_consent", "accepted");
    setVisible(false);
  };
  const reject = () => {
    localStorage.setItem("itg_cookie_consent", "rejected");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 180 }}
          data-testid="cookie-banner"
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[60]"
        >
          <div className="bg-white border border-slate-200 shadow-2xl p-5 sm:p-6">
            <div className="eyebrow mb-2">🍪 Cookies</div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {t("cookies.text")}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={accept}
                data-testid="cookie-accept"
                className="btn-cta !py-2 !px-4 !text-sm"
              >
                {t("cookies.accept")}
              </button>
              <button
                onClick={reject}
                data-testid="cookie-reject"
                className="btn-outline !py-2 !px-4 !text-sm"
              >
                {t("cookies.reject")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
