import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { portfolio } from "@/data/content";

export default function Portfolio() {
  const { t, lang } = useLang();
  const categories = t("portfolioPage.categories");
  const [filter, setFilter] = useState(categories[0]);

  const filtered = useMemo(() => {
    if (filter === categories[0]) return portfolio;
    // map categories index to English key used in data
    const idx = categories.indexOf(filter);
    const enCategories = ["All", "E-shop", "Corporate", "Professionals", "Custom"];
    const catKey = enCategories[idx];
    return portfolio.filter((p) => p.categoryKey === catKey);
  }, [filter, categories]);

  return (
    <div data-testid="page-portfolio">
      <section className="border-b border-slate-200 bg-white relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-bg opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="eyebrow mb-4">{t("portfolioPage.eyebrow")}</div>
          <h1 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tighter max-w-4xl">
            {t("portfolioPage.title")}
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-2xl">{t("portfolioPage.subtitle")}</p>
        </div>
      </section>

      <section className="py-12 bg-slate-50 border-b border-slate-200 sticky top-16 sm:top-20 z-30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              data-testid={`portfolio-filter-${c.toLowerCase()}`}
              className={`px-4 py-2 text-sm font-semibold whitespace-nowrap transition border ${
                filter === c
                  ? "bg-[#0F4C81] text-white border-[#0F4C81]"
                  : "bg-white text-slate-600 border-slate-200 hover:border-[#0F4C81] hover:text-[#0F4C81]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => {
              const data = p[lang] || p.el;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  data-testid={`portfolio-item-${p.id}`}
                  className="group bg-white border border-slate-200 overflow-hidden hover:border-[#0F4C81] transition"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={p.image}
                      alt={data.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="eyebrow !text-slate-400">{p.categoryKey}</div>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0066FF] transition" />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-slate-900 mt-3">
                      {data.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">{data.subtitle}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {data.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium px-2 py-1 bg-slate-100 text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
