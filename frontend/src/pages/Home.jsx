import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  HeartHandshake,
  Check,
  Star,
} from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { services } from "@/data/services";
import {
  TrustBar,
  Industries,
  Process,
  Comparison,
  TechStack,
  FaqPreview,
} from "@/components/home/HomeSections";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const PillarIcon = ({ idx }) => {
  const Icons = [ShieldCheck, Zap, HeartHandshake];
  const Icon = Icons[idx] || ShieldCheck;
  return <Icon className="w-6 h-6 text-[#0F4C81]" />;
};

export default function Home() {
  const { t, lang } = useLang();
  const pillars = t("pillars.items");
  const testimonials = t("testimonials.items");

  return (
    <div data-testid="page-home">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 tech-grid-bg opacity-60" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#0066FF]/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#0F4C81]/10 blur-[100px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} custom={0} className="eyebrow mb-6">
              {t("hero.eyebrow")}
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display font-bold text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] tracking-tighter text-slate-900"
            >
              {t("hero.title")}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" data-testid="hero-primary-cta" className="btn-cta">
                {t("hero.ctaPrimary")} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/services" data-testid="hero-secondary-cta" className="btn-outline">
                {t("hero.ctaSecondary")}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-l border-slate-200"
          >
            {[
              ["250+", t("hero.stat1")],
              ["99.9%", t("hero.stat2")],
              ["< 4h", t("hero.stat3")],
              ["180+", t("hero.stat4")],
            ].map(([num, label], i) => (
              <div
                key={i}
                className="p-6 sm:p-8 border-r border-b border-slate-200 bg-white/60 backdrop-blur"
              >
                <div className="font-display font-bold text-3xl sm:text-4xl text-[#0F4C81] tracking-tighter">
                  {num}
                </div>
                <div className="mt-1 text-xs text-slate-500 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <TrustBar />

      {/* PILLARS */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <div className="eyebrow mb-3">{t("pillars.title")}</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
              {t("pillars.subtitle")}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-0 border-t border-l border-slate-200">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                data-testid={`pillar-${i}`}
                className="p-8 sm:p-10 border-r border-b border-slate-200 group hover:bg-slate-50 transition"
              >
                <div className="w-12 h-12 bg-[#0F4C81]/5 border border-[#0F4C81]/10 flex items-center justify-center mb-6 group-hover:bg-[#0F4C81] group-hover:border-[#0F4C81] transition">
                  <span className="group-hover:hidden">
                    <PillarIcon idx={i} />
                  </span>
                  <span className="hidden group-hover:flex text-white">
                    <PillarIcon idx={i} />
                  </span>
                </div>
                <h3 className="font-display font-semibold text-xl text-slate-900 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <Industries />

      {/* SERVICES */}
      <section className="py-20 sm:py-28 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <div className="eyebrow mb-3">{t("servicesSection.eyebrow")}</div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
                {t("servicesSection.title")}
              </h2>
              <p className="mt-4 text-slate-600">{t("servicesSection.subtitle")}</p>
            </div>
            <Link to="/services" className="btn-outline !py-2 !px-4 !text-sm shrink-0" data-testid="services-view-all">
              {t("servicesSection.viewAll")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => {
              const Icon = s.icon;
              const data = s[lang] || s.el;
              return (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  data-testid={`home-service-${s.slug}`}
                >
                  <Link to="/services" className="card-tech p-8 h-full flex flex-col group block">
                    <div className="w-11 h-11 bg-[#0F4C81]/5 flex items-center justify-center mb-6 group-hover:bg-[#0F4C81] transition">
                      <Icon className="w-5 h-5 text-[#0F4C81] group-hover:text-white transition" />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-slate-900 mb-2">{data.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">{data.short}</p>
                    <div className="mt-6 text-xs font-bold tracking-widest uppercase text-[#0F4C81] flex items-center gap-1">
                      {lang === "el" ? "Περισσότερα" : "Learn more"} <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <Process />

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <div className="eyebrow mb-3">{t("testimonials.eyebrow")}</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
              {t("testimonials.title")}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t2, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                data-testid={`testimonial-${i}`}
                className="p-8 border border-slate-200 bg-slate-50"
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <blockquote className="text-slate-700 leading-relaxed">"{t2.quote}"</blockquote>
                <figcaption className="mt-6 pt-6 border-t border-slate-200">
                  <div className="font-semibold text-slate-900 text-sm">{t2.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{t2.role}</div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <Comparison />

      {/* TECH STACK */}
      <TechStack />

      {/* FAQ PREVIEW */}
      <FaqPreview />

      {/* FINAL CTA */}
      <section className="py-20 sm:py-28 bg-[#0F172A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#0066FF]/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0F4C81]/40 blur-[140px] rounded-full" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tighter text-white leading-tight"
          >
            {t("cta.title")}
          </motion.h2>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">{t("cta.subtitle")}</p>
          <div className="mt-10">
            <Link to="/contact" data-testid="home-final-cta" className="btn-cta !py-4 !px-7">
              {t("cta.button")} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-400">
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#10B981]" /> GDPR Compliant</div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#10B981]" /> 99.9% Uptime SLA</div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#10B981]" /> Ελληνική Υποστήριξη</div>
          </div>
        </div>
      </section>
    </div>
  );
}
