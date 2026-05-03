import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLang } from "@/context/LanguageContext";
import { industries } from "@/data/industries";

export default function IndustryPage() {
  const { slug } = useParams();
  const { lang } = useLang();
  const ind = industries.find((i) => i.slug === slug);

  if (!ind) {
    return (
      <div className="py-40 text-center" data-testid="industry-not-found">
        <p className="text-slate-500">Industry not found.</p>
        <Link to="/industries" className="btn-outline mt-6 inline-flex">
          All industries
        </Link>
      </div>
    );
  }

  const data = ind[lang] || ind.el;
  const Icon = ind.icon;

  return (
    <div data-testid={`industry-page-${ind.slug}`}>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 tech-grid-bg opacity-40" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#0066FF]/10 blur-[120px] rounded-full" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <Link
            to="/industries"
            className="text-xs uppercase tracking-widest text-[#0F4C81] font-bold mb-4 inline-block hover:underline"
          >
            ← {lang === "el" ? "Όλοι οι κλάδοι" : "All industries"}
          </Link>
          <div className="grid lg:grid-cols-2 gap-10 items-center mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#0F4C81] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="eyebrow">{data.name}</div>
              </div>
              <h1 className="font-display font-bold text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tighter text-slate-900">
                {data.hero}
              </h1>
              <p className="mt-5 text-lg text-slate-600 leading-relaxed">{data.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  state={{ plan: data.name }}
                  className="btn-cta"
                  data-testid="industry-cta-primary"
                >
                  {lang === "el" ? "Ζητήστε Προσφορά" : "Get a Quote"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/pricing" className="btn-outline" data-testid="industry-cta-secondary">
                  {lang === "el" ? "Δείτε πακέτα" : "See pricing"}
                </Link>
              </div>
              <div className="mt-8 text-xs text-slate-500 uppercase tracking-widest">
                {lang === "el" ? "Από" : "From"} €{ind.priceFrom}
              </div>
            </motion.div>
            <div className="aspect-[4/3] bg-slate-100 border border-slate-200 overflow-hidden">
              <img
                src={ind.image}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="eyebrow mb-3">{lang === "el" ? "Γιατί" : "Why"}</div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              {data.whyTitle}
            </h2>
          </div>
          <div className="lg:col-span-3">
            <ul className="space-y-3">
              {data.why.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 p-5 bg-white border border-slate-200"
                  data-testid={`industry-why-${i}`}
                >
                  <div className="w-7 h-7 bg-[#10B981]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[#10B981]" />
                  </div>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <div className="eyebrow mb-3">
              {lang === "el" ? "Τι περιλαμβάνεται" : "What's included"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              {lang === "el" ? "Εξειδικευμένα χαρακτηριστικά για τον κλάδο σας" : "Industry-specific features"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-slate-200">
            {data.features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="p-6 border-r border-b border-slate-200 flex items-start gap-3 bg-white"
                data-testid={`industry-feature-${i}`}
              >
                <Check className="w-4 h-4 text-[#0066FF] shrink-0 mt-1" />
                <span className="text-sm text-slate-700 leading-snug">{f}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-3">FAQ</div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-8">
            {lang === "el" ? "Συχνές ερωτήσεις" : "Common questions"}
          </h2>
          <Accordion type="single" collapsible className="bg-white border border-slate-200">
            {data.faq.map((item, i) => (
              <AccordionItem
                key={i}
                value={`f-${i}`}
                className="border-b border-slate-200 last:border-0"
                data-testid={`industry-faq-${i}`}
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
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-[#0F172A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#0066FF]/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0F4C81]/40 blur-[140px] rounded-full" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
            {lang === "el"
              ? "Έτοιμοι να ξεκινήσουμε το project σας;"
              : "Ready to start your project?"}
          </h2>
          <p className="mt-5 text-slate-300">
            {lang === "el"
              ? "30-λεπτη δωρεάν συζήτηση με έναν ειδικό του κλάδου σας."
              : "Free 30-minute call with a specialist for your industry."}
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              state={{ plan: data.name }}
              className="btn-cta !py-4 !px-7"
              data-testid="industry-final-cta"
            >
              {lang === "el" ? "Κλείστε συνάντηση" : "Book a call"}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
