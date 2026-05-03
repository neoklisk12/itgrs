import React from "react";
import { motion } from "framer-motion";
import { Check, Target, Heart, Zap as Bolt, TrendingUp } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLang();
  const values = t("about.values");
  const whyItems = t("about.whyItems");
  const valueIcons = [Check, Heart, Bolt, TrendingUp];

  return (
    <div data-testid="page-about">
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 tech-grid-bg opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="eyebrow mb-4">{t("about.eyebrow")}</div>
            <h1 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tighter max-w-4xl">
              {t("about.title")}
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl">{t("about.lead")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#0F4C81] flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                  {t("about.missionTitle")}
                </h2>
                <p className="mt-4 text-slate-600 leading-relaxed">{t("about.mission")}</p>
              </div>
            </div>
          </div>
          <div className="aspect-[5/4] bg-slate-100 border border-slate-200 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1758518727707-b023e285b709"
              alt="Team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <div className="eyebrow mb-3">{t("about.valuesTitle")}</div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              {t("about.valuesTitle")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-slate-200 bg-white">
            {values.map((v, i) => {
              const Icon = valueIcons[i] || Check;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="p-8 border-r border-b border-slate-200"
                  data-testid={`value-${i}`}
                >
                  <Icon className="w-5 h-5 text-[#0F4C81] mb-4" />
                  <h3 className="font-display font-semibold text-lg text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="eyebrow mb-3">{t("about.whyTitle")}</div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              {t("about.whyTitle")}
            </h2>
          </div>
          <div className="lg:col-span-3">
            <ul className="space-y-3">
              {whyItems.map((w, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-3 p-4 border-b border-slate-200"
                  data-testid={`why-${i}`}
                >
                  <div className="w-6 h-6 bg-[#10B981]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  </div>
                  <span className="text-slate-700">{w}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
