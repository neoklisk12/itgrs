import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, CalendarCheck, Zap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLang } from "@/context/LanguageContext";
import { bookingSystem } from "@/data/industries";

export default function BookingSystem() {
  const { lang } = useLang();
  const data = bookingSystem[lang] || bookingSystem.el;

  return (
    <div data-testid="page-booking-system">
      {/* HERO — Dark premium */}
      <section className="relative overflow-hidden bg-[#070B1A] text-white border-b border-[#0066FF]/20">
        <div className="absolute inset-0 tech-grid-bg opacity-25" style={{ backgroundSize: "48px 48px" }} />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#0066FF]/25 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#0F4C81]/40 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#0066FF]/40 bg-[#0066FF]/10 text-[10px] font-bold tracking-[0.2em] uppercase text-[#66A6FF] mb-6">
              <Zap className="w-3 h-3" />
              {lang === "el" ? "Custom Solution" : "Custom Solution"}
            </div>
            <h1 className="font-display font-black text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] tracking-tighter text-white">
              {data.hero}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
              {data.lead}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/contact"
                state={{ plan: data.name }}
                data-testid="booking-hero-cta"
                className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-7 py-4 text-sm font-semibold shadow-[0_0_40px_-5px_rgba(0,102,255,0.6)] transition"
              >
                {lang === "el" ? "Ζητήστε Προσφορά" : "Get a Quote"}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/industries"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold border border-white/20 text-white hover:bg-white/5 transition"
              >
                {lang === "el" ? "Όλοι οι κλάδοι" : "All industries"}
              </Link>
            </div>
            <div className="mt-8 text-xs text-[#66A6FF] uppercase tracking-widest">
              {lang === "el" ? "Από" : "From"} €{bookingSystem.priceFrom}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="eyebrow mb-3">{lang === "el" ? "Γιατί custom" : "Why custom"}</div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              {data.whyTitle}
            </h2>
          </div>
          <div className="lg:col-span-3">
            <ul className="space-y-3">
              {data.why.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 p-5 bg-slate-50 border border-slate-200"
                  data-testid={`booking-why-${i}`}
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
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <div className="eyebrow mb-3 flex items-center gap-2">
              <CalendarCheck className="w-3.5 h-3.5" />
              {lang === "el" ? "Δυνατότητες" : "Capabilities"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              {lang === "el" ? "Όλα όσα χρειάζεται ένα σοβαρό booking system" : "Everything a serious booking system needs"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-slate-200 bg-white">
            {data.features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="p-6 border-r border-b border-slate-200 flex items-start gap-3"
                data-testid={`booking-feature-${i}`}
              >
                <Check className="w-4 h-4 text-[#0066FF] shrink-0 mt-1" />
                <span className="text-sm text-slate-700 leading-snug">{f}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">{lang === "el" ? "Διαδικασία" : "Process"}</div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              {lang === "el" ? "Από την ιδέα στο production σε 5 βήματα" : "From idea to production in 5 steps"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {data.process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-testid={`booking-step-${i}`}
                className="bg-white border border-slate-200 p-6 hover:border-[#0F4C81] transition group"
              >
                <div className="w-10 h-10 bg-[#0F4C81] text-white flex items-center justify-center font-display font-black text-sm mb-4 group-hover:bg-[#0066FF] transition">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display font-semibold text-base text-slate-900 mb-2">{step.t}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.d}</p>
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
                value={`b-${i}`}
                className="border-b border-slate-200 last:border-0"
                data-testid={`booking-faq-${i}`}
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
      <section className="py-20 bg-[#070B1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#0066FF]/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0F4C81]/40 blur-[140px] rounded-full" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tighter text-white">
            {lang === "el"
              ? "Ας μειώσουμε τις προμήθειές σας αυτό το καλοκαίρι"
              : "Let's cut your commissions this summer"}
          </h2>
          <p className="mt-5 text-slate-300">
            {lang === "el"
              ? "Δωρεάν ανάλυση ROI — δείτε σε πόσο καιρό θα αποδώσει το σύστημά σας."
              : "Free ROI analysis — see when your system will pay off."}
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              state={{ plan: data.name }}
              data-testid="booking-final-cta"
              className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white px-7 py-4 text-sm font-semibold shadow-[0_0_40px_-5px_rgba(0,102,255,0.6)] transition"
            >
              {lang === "el" ? "Κλείστε ROI call" : "Book ROI call"}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
