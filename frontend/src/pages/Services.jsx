import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Users,
  Wallet,
  Radar,
  MessageSquareMore,
  ShieldCheck as GdprIcon,
} from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { services } from "@/data/services";

const WHY_ICONS = [Users, Wallet, Radar, MessageSquareMore, GdprIcon];

export default function Services() {
  const { t, lang } = useLang();
  const howSteps = t("servicesPage.howSteps");
  const whyItems = t("servicesPage.whyItems");
  const stats = t("servicesPage.stats");

  const techStack = [
    "React", "Next.js", "Node.js", "WordPress", "Shopify", "WooCommerce",
    "PostgreSQL", "MongoDB", "AWS", "Cloudflare", "Docker", "Figma",
    "Tailwind", "Stripe", "Google Workspace", "Microsoft 365",
  ];
  const doubled = [...techStack, ...techStack];

  return (
    <div data-testid="page-services">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 tech-grid-bg opacity-50" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#0066FF]/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#0F4C81]/10 blur-[100px] rounded-full" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="eyebrow mb-5">{t("servicesPage.eyebrow")}</div>
            <h1 className="font-display font-bold text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] tracking-tighter text-slate-900">
              {t("servicesPage.title")}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
              {t("servicesPage.subtitle")}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" data-testid="services-hero-primary" className="btn-cta">
                {t("servicesPage.ctaPrimary")} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/pricing" data-testid="services-hero-secondary" className="btn-outline">
                {t("servicesPage.ctaSecondary")}
              </Link>
            </div>
          </motion.div>

          {/* Stat strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-l border-slate-200">
            {stats.map((s, i) => (
              <div
                key={i}
                className="p-6 border-r border-b border-slate-200 bg-white/60 backdrop-blur"
                data-testid={`services-stat-${i}`}
              >
                <div className="font-display font-bold text-3xl sm:text-4xl text-[#0F4C81] tracking-tighter">
                  {s.n}
                </div>
                <div className="mt-1 text-xs text-slate-500 uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200" data-testid="what-we-do">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="eyebrow mb-3">{t("servicesPage.whatEyebrow")}</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
              {t("servicesPage.whatTitle")}
            </h2>
            <p className="mt-6 text-slate-600 leading-relaxed text-lg">
              {t("servicesPage.whatLead")}
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#0F4C81] hover:text-[#0066FF] transition"
            >
              {lang === "el" ? "Δωρεάν audit" : "Free audit"} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-square bg-slate-100 border border-slate-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1758518727707-b023e285b709"
                alt={t("servicesPage.whatTitle")}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white border border-slate-200 p-5 max-w-[200px] shadow-xl shadow-slate-900/5">
              <div className="font-display font-bold text-3xl text-[#0F4C81] tracking-tighter">24/7</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                {lang === "el" ? "Monitoring" : "Monitoring"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED — 6 pillars */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200" data-testid="what-we-offer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <div className="eyebrow mb-3">{t("servicesPage.offerEyebrow")}</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
              {t("servicesPage.offerTitle")}
            </h2>
            <p className="mt-4 text-slate-600">{t("servicesPage.offerSubtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-slate-200 bg-white">
            {services.map((s, i) => {
              const Icon = s.icon;
              const data = s[lang] || s.el;
              return (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  data-testid={`pillar-${s.slug}`}
                  className="p-8 border-r border-b border-slate-200 bg-white group hover:bg-slate-50 transition"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-11 h-11 bg-[#0F4C81]/5 flex items-center justify-center shrink-0 group-hover:bg-[#0F4C81] transition">
                      <Icon className="w-5 h-5 text-[#0F4C81] group-hover:text-white transition" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-lg text-slate-900">{data.name}</h3>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">{data.short}</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 pl-[60px]">
                    {data.benefits.slice(0, 3).map((b, k) => (
                      <li key={k} className="flex gap-2 text-xs text-slate-500">
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200" data-testid="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <div className="eyebrow mb-3">{t("servicesPage.howEyebrow")}</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
              {t("servicesPage.howTitle")}
            </h2>
            <p className="mt-4 text-slate-600">{t("servicesPage.howSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-0 border-t border-l border-slate-200">
            {howSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-testid={`how-step-${i}`}
                className="p-8 sm:p-10 border-r border-b border-slate-200 group hover:bg-slate-50 transition relative"
              >
                <div className="flex items-start gap-6">
                  <div className="font-display font-black text-5xl sm:text-6xl text-[#0F4C81]/15 tracking-tighter leading-none shrink-0 group-hover:text-[#0066FF]/30 transition">
                    {step.n}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xl text-slate-900 mb-2">
                      {step.t}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                      {step.d}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MANAGED */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200" data-testid="why-managed">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <div className="eyebrow mb-3">{t("servicesPage.whyEyebrow")}</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
              {t("servicesPage.whyTitle")}
            </h2>
            <p className="mt-4 text-slate-600">{t("servicesPage.whySubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {whyItems.map((item, i) => {
              const Icon = WHY_ICONS[i] || Check;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  data-testid={`why-item-${i}`}
                  className="bg-white border border-slate-200 p-6 hover:border-[#0F4C81] transition"
                >
                  <div className="w-10 h-10 bg-[#0F4C81]/5 flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 text-[#0F4C81]" />
                  </div>
                  <h3 className="font-display font-semibold text-base text-slate-900 mb-2 leading-tight">
                    {item.t}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.d}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-20 bg-white border-b border-slate-200 overflow-hidden" data-testid="services-tech-stack">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="eyebrow mb-3">{t("servicesPage.techEyebrow")}</div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 max-w-2xl">
            {t("servicesPage.techTitle")}
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl">{t("servicesPage.techSubtitle")}</p>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="marquee-track">
            {doubled.map((name, i) => (
              <div
                key={i}
                className="shrink-0 px-5 py-3 bg-slate-50 border border-slate-200 font-mono text-sm text-slate-700 whitespace-nowrap hover:border-[#0F4C81] hover:bg-white transition"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 sm:py-28 bg-[#0F172A] text-white relative overflow-hidden" data-testid="services-final-cta">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#0066FF]/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0F4C81]/40 blur-[140px] rounded-full" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tighter text-white leading-tight">
            {t("servicesPage.ctaTitle")}
          </h2>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
            {t("servicesPage.ctaSubtitle")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/contact" data-testid="services-cta-primary" className="btn-cta !py-4 !px-7">
              {t("servicesPage.ctaPrimary")} <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/pricing"
              data-testid="services-cta-secondary"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold border border-white/20 text-white hover:bg-white/5 transition"
            >
              {t("servicesPage.ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
