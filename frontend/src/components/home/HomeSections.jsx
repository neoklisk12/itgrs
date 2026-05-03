import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Scale,
  Stethoscope,
  ShoppingBag,
  UtensilsCrossed,
  Rocket,
  Users,
  Check,
  X,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLang } from "@/context/LanguageContext";

const INDUSTRY_ICONS = [Scale, Stethoscope, ShoppingBag, UtensilsCrossed, Rocket, Users];

export function TrustBar() {
  const { t } = useLang();
  const logos = [
    "Delos Gourmet",
    "Aegean Law",
    "Helios Consulting",
    "OlivArt",
    "Nikolaou Clinic",
    "CargoTrack",
    "Thalassa Hotels",
    "Attica Foods",
    "Byzantine Tours",
  ];
  const doubled = [...logos, ...logos];
  return (
    <section className="py-12 bg-white border-b border-slate-200 overflow-hidden" data-testid="trust-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <div className="eyebrow">{t("trustBar.eyebrow")}</div>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="marquee-track">
          {doubled.map((name, i) => (
            <div
              key={i}
              className="shrink-0 font-display font-bold text-2xl text-slate-400 hover:text-[#0F4C81] transition whitespace-nowrap tracking-tight"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Industries() {
  const { t } = useLang();
  const items = t("industries.items");
  // map home industry items to deep industries slugs
  const slugs = ["lawyers", "doctors", "corporate", "rentals", "corporate", "corporate"];
  return (
    <section className="py-20 sm:py-28 bg-white" data-testid="industries-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="eyebrow mb-3">{t("industries.eyebrow")}</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
              {t("industries.title")}
            </h2>
            <p className="mt-4 text-slate-600">{t("industries.subtitle")}</p>
          </div>
          <Link
            to="/solutions/booking-system"
            data-testid="industries-view-all"
            className="btn-outline !py-2 !px-4 !text-sm shrink-0"
          >
            {t("nav.bookingSystem")} →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-slate-200">
          {items.map((item, i) => {
            const Icon = INDUSTRY_ICONS[i] || Rocket;
            const slug = slugs[i] || "corporate";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                data-testid={`industry-${i}`}
              >
                <Link
                  to={`/industries/${slug}`}
                  className="block p-8 border-r border-b border-slate-200 bg-white group hover:bg-slate-50 transition h-full"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-[#0F4C81]/5 flex items-center justify-center shrink-0 group-hover:bg-[#0F4C81] transition">
                      <Icon className="w-5 h-5 text-[#0F4C81] group-hover:text-white transition" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-slate-900">{item.name}</h3>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const { t } = useLang();
  const steps = t("process.steps");
  return (
    <section className="py-20 sm:py-28 bg-slate-50 border-y border-slate-200" data-testid="process-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow mb-3">{t("process.eyebrow")}</div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
            {t("process.title")}
          </h2>
          <p className="mt-4 text-slate-600">{t("process.subtitle")}</p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-[#0F4C81]/30 to-transparent" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-testid={`process-step-${i}`}
                className="relative bg-white border border-slate-200 p-8 hover:border-[#0F4C81] transition group"
              >
                <div className="w-14 h-14 bg-[#0F4C81] text-white flex items-center justify-center font-display font-black text-lg mb-6 group-hover:bg-[#0066FF] transition">
                  {step.n}
                </div>
                <h3 className="font-display font-semibold text-lg text-slate-900 mb-2">{step.t}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Comparison() {
  const { t } = useLang();
  const rows = t("comparison.rows");
  return (
    <section className="py-20 sm:py-28 bg-white" data-testid="comparison-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow mb-3">{t("comparison.eyebrow")}</div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
            {t("comparison.title")}
          </h2>
          <p className="mt-4 text-slate-600">{t("comparison.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-0 border-t border-l border-slate-200">
          {/* Headers */}
          <div className="p-6 bg-[#0F4C81] text-white border-r border-b border-[#0F4C81]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <div className="font-display font-semibold text-lg">{t("comparison.withUs")}</div>
            </div>
          </div>
          <div className="p-6 bg-slate-100 border-r border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-200 flex items-center justify-center">
                <X className="w-4 h-4 text-slate-500" />
              </div>
              <div className="font-display font-semibold text-lg text-slate-500">{t("comparison.without")}</div>
            </div>
          </div>
          {rows.map((row, i) => (
            <React.Fragment key={i}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="p-5 sm:p-6 border-r border-b border-slate-200 bg-[#0F4C81]/[0.02] flex items-start gap-3"
              >
                <Check className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                <span className="text-slate-800 font-medium">{row.with}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 + 0.02 }}
                className="p-5 sm:p-6 border-r border-b border-slate-200 flex items-start gap-3"
              >
                <X className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-500">{row.without}</span>
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechStack() {
  const { t } = useLang();
  const stack = [
    "React", "Next.js", "Node.js", "WordPress", "Shopify", "WooCommerce",
    "PostgreSQL", "MongoDB", "AWS", "Cloudflare", "Docker", "Figma",
    "Tailwind", "Stripe", "Google Workspace", "Microsoft 365",
  ];
  const doubled = [...stack, ...stack];
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200 overflow-hidden" data-testid="tech-stack">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="eyebrow mb-3">{t("techStack.eyebrow")}</div>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 max-w-2xl">
          {t("techStack.title")}
        </h2>
        <p className="mt-4 text-slate-600 max-w-2xl">{t("techStack.subtitle")}</p>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="marquee-track">
          {doubled.map((name, i) => (
            <div
              key={i}
              className="shrink-0 px-5 py-3 bg-white border border-slate-200 font-mono text-sm text-slate-700 whitespace-nowrap hover:border-[#0F4C81] transition"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqPreview() {
  const { t } = useLang();
  const allItems = t("faqPage.items");
  const items = allItems.slice(0, 4);
  return (
    <section className="py-20 sm:py-28 bg-white" data-testid="faq-preview-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <div className="eyebrow mb-3">{t("faqPreview.eyebrow")}</div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
            {t("faqPreview.title")}
          </h2>
          <Link
            to="/faq"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#0F4C81] hover:text-[#0066FF] transition"
            data-testid="faq-preview-link"
          >
            {t("faqPreview.viewAll")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="lg:col-span-3">
          <Accordion type="single" collapsible className="bg-white border border-slate-200">
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-slate-200 last:border-0"
                data-testid={`faq-preview-${i}`}
              >
                <AccordionTrigger className="px-6 py-5 font-display font-semibold text-base text-left hover:no-underline hover:bg-slate-50">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-slate-600 leading-relaxed text-sm">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
