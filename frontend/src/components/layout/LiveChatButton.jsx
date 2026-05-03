import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function LiveChatButton() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [thread, setThread] = useState([
    { who: "bot", text: null, useGreeting: true },
  ]);

  const send = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setThread((prev) => [...prev, { who: "me", text: msg }]);
    setMsg("");
    setTimeout(() => {
      setThread((prev) => [...prev, { who: "bot", text: t("chat.mock") }]);
    }, 600);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        data-testid="live-chat-button"
        aria-label="Open live chat"
        className="fixed bottom-5 right-5 z-[55] w-14 h-14 bg-[#0F4C81] hover:bg-[#0A3B66] text-white flex items-center justify-center shadow-2xl shadow-[#0F4C81]/40 transition"
      >
        {open ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            data-testid="live-chat-panel"
            className="fixed bottom-24 right-5 z-[55] w-[320px] sm:w-[360px] bg-white border border-slate-200 shadow-2xl shadow-slate-900/10"
          >
            <div className="bg-[#0F4C81] text-white p-4">
              <div className="text-xs font-bold tracking-widest uppercase opacity-70">Coreon IT</div>
              <div className="font-display font-semibold text-lg">{t("chat.label")}</div>
            </div>
            <div className="p-4 space-y-3 max-h-72 overflow-y-auto bg-slate-50">
              {thread.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.who === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 text-sm ${
                      m.who === "me"
                        ? "bg-[#0066FF] text-white"
                        : "bg-white border border-slate-200 text-slate-700"
                    }`}
                  >
                    {m.useGreeting ? t("chat.greeting") : m.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={send} className="flex border-t border-slate-200">
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={t("chat.placeholder")}
                data-testid="live-chat-input"
                className="flex-1 px-3 py-3 text-sm focus:outline-none"
              />
              <button
                type="submit"
                data-testid="live-chat-send"
                className="px-4 bg-[#0066FF] text-white hover:bg-[#0052CC] transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
