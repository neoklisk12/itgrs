import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, Crown, Zap } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

function TierCard({ tier, t, index }) {
  const {
    name,
    tagline,
    price,
    renewalPrice,
    unit,
    includesPrev,
    popular,
    highlight,
    features,
    cta,
    key,
  } = tier;

  // Determine styling by highlight variant
  const isGlow = highlight === "glow";
  const isPremium = highlight === "premium";
  const isSubtle = highlight === "subtle";

  const wrapperClasses = [
    "relative bg-white p-7 sm:p-8 flex flex-col h-full transition-all duration-300",
    isGlow
      ? "border-2 border-[#0066FF] shadow-[0_0_40px_-5px_rgba(0,102,255,0.35)] hover:shadow-[0_0_60px_-5px_rgba(0,102,255,0.55)]"
      : isPremium
      ? "border-2 border-[#0F4C81] bg-gradient-to-b from-white to-[#0F4C81]/[0.02]"
      : isSubtle
      ? "border border-[#0F4C81]/30 bg-[#0F4C81]/[0.015]"
      : "border border-slate-200",
  ].join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      data-testid={`pricing-tier-${key}`}
      className={wrapperClasses}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0066FF] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 shadow-lg shadow-[#0066FF]/40 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          {t("pricing.popular")}
        </div>
      )}
      {isPremium && !popular && (
        <div className="absolute top-5 right-5">
          <Crown className="w-4 h-4 text-[#0F4C81]" />
        </div>
      )}

      <div className="font-display font-bold text-xl text-slate-900">{name}</div>
      <p className="text-xs text-slate-500 mt-2 leading-relaxed min-h-[3rem]">{tagline}</p>

      <div className="mt-6 min-h-[4.5rem]">
        <div className="flex items-baseline gap-1">
          <span className="text-base text-slate-500">€</span>
          <span className="font-display font-black text-4xl tracking-tighter text-slate-900">
            {price}
          </span>
          <span className="text-xs text-slate-500 ml-1">{unit}</span>
        </div>
        {renewalPrice && (
          <div className="text-xs text-slate-500 mt-1.5">
            <span className="text-[#0066FF] font-semibold">€{renewalPrice}</span>{" "}
            {t("pricing.renewal")}
          </div>
        )}
      </div>

      {includesPrev && (
        <div className="text-[11px] font-semibold text-[#0F4C81] mt-1 mb-3 leading-snug">
          ✓ {t("pricing.includesPrev")}
        </div>
      )}

      <ul className="mt-3 space-y-2.5 flex-1">
        {features.map((f, k) => (
          <li key={k} className="flex gap-2 text-sm text-slate-700">
            <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isGlow || isPremium ? "text-[#0066FF]" : "text-[#10B981]"}`} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/contact"
        state={{ plan: name }}
        data-testid={`pricing-cta-${key}`}
        className={`mt-7 inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold transition ${
          isGlow
            ? "bg-[#0066FF] text-white hover:bg-[#0052CC] shadow-lg shadow-[#0066FF]/30"
            : isPremium
            ? "bg-[#0F4C81] text-white hover:bg-[#0A3B66]"
            : "border border-[#0F4C81] text-[#0F4C81] hover:bg-[#0F4C81] hover:text-white"
        }`}
      >
        {cta} <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}

function EnterpriseCard({ tier, t }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      data-testid="pricing-tier-enterprise"
      className="relative overflow-hidden bg-[#070B1A] text-white border border-[#0066FF]/20"
    >
      {/* Glow layers */}
      <div className="absolute inset-0 tech-grid-bg opacity-20" style={{ backgroundSize: "48px 48px" }} />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#0066FF]/25 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#0F4C81]/35 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative grid lg:grid-cols-2 gap-10 p-8 sm:p-12 lg:p-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#0066FF]/40 bg-[#0066FF]/10 text-[10px] font-bold tracking-[0.2em] uppercase text-[#66A6FF] mb-6">
            <Zap className="w-3 h-3" /> {t("pricing.enterpriseTierLabel")}
          </div>
          <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tighter text-white leading-[1.05]">
            {tier.name}
          </h3>
          <p className="mt-4 text-slate-400 leading-relaxed max-w-md">{tier.tagline}</p>

          <div className="mt-8 flex items-baseline gap-3">
            <span className="font-display font-black text-5xl tracking-tighter bg-gradient-to-r from-white to-[#66A6FF] bg-clip-text text-transparent">
              {t("pricing.custom")}
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-2 uppercase tracking-widest">
            {t("pricing.enterpriseSubtitle")}
          </div>

          <Link
            to="/contact"
            state={{ plan: tier.name }}
            data-testid={`pricing-cta-${tier.key}`}
            className="mt-10 inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-6 py-3.5 text-sm font-semibold shadow-[0_0_40px_-5px_rgba(0,102,255,0.6)] transition"
          >
            {tier.cta} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative">
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#66A6FF] mb-5">
            ✓ {t("pricing.includesPrev")}
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {tier.features.map((f, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-300">
                <Check className="w-4 h-4 text-[#66A6FF] shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const { t } = useLang();
  const tiers = t("pricing.tiers");
  const standard = tiers.slice(0, 4);
  const enterprise = tiers[4];

  return (
    <div data-testid="page-pricing">
      <section className="border-b border-slate-200 bg-white relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-bg opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="eyebrow mb-4">{t("pricing.eyebrow")}</div>
          <h1 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tighter max-w-4xl mx-auto">
            {t("pricing.title")}
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">{t("pricing.subtitle")}</p>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {standard.map((tier, i) => (
              <TierCard key={tier.key} tier={tier} t={t} index={i} />
            ))}
          </div>

          {/* Enterprise */}
          <div className="mt-10">
            <EnterpriseCard tier={enterprise} t={t} />
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              {t("pricing.includesAll")}{" "}
              <Link to="/contact" className="text-[#0066FF] font-semibold hover:underline">
                {t("cta.button")}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
