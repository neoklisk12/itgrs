import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { industries, bookingSystem } from "@/data/industries";

export default function IndustriesIndex() {
  const { lang } = useLang();

  return (
    <div data-testid="page-industries">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 tech-grid-bg opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="eyebrow mb-4">
            {lang === "el" ? "Εξειδικεύσεις" : "Specializations"}
          </div>
          <h1 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tighter max-w-4xl">
            {lang === "el"
              ? "Ιστοσελίδες σχεδιασμένες για τον κλάδο σας"
              : "Websites designed for your industry"}
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-2xl">
            {lang === "el"
              ? "Κάθε κλάδος έχει τις δικές του ανάγκες. Χτίζουμε ιστοσελίδες με τα χαρακτηριστικά που θα ζητούσατε — χωρίς να χρειάζεται να μας εξηγήσετε τι κάνετε."
              : "Every industry has its own needs. We build websites with the features you'd ask for — without you having to explain your business to us."}
          </p>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              const data = ind[lang] || ind.el;
              return (
                <motion.div
                  key={ind.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  data-testid={`industry-card-${ind.slug}`}
                >
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="block group bg-white border border-slate-200 hover:border-[#0F4C81] transition overflow-hidden h-full"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={ind.image}
                        alt={data.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 bg-[#0F4C81]/5 flex items-center justify-center group-hover:bg-[#0F4C81] transition">
                          <Icon className="w-4 h-4 text-[#0F4C81] group-hover:text-white transition" />
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {lang === "el" ? "από" : "from"} €{ind.priceFrom}
                        </div>
                      </div>
                      <h3 className="font-display font-semibold text-lg text-slate-900 leading-snug group-hover:text-[#0F4C81] transition">
                        {data.name}
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">{data.short}</p>
                      <div className="mt-4 text-xs font-bold tracking-widest uppercase text-[#0F4C81] inline-flex items-center gap-1">
                        {lang === "el" ? "Περισσότερα" : "Learn more"}
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* BOOKING SYSTEM FEATURED CARD */}
          <div className="mt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              data-testid="booking-system-feature"
            >
              <Link
                to="/solutions/booking-system"
                className="block relative overflow-hidden bg-[#070B1A] border border-[#0066FF]/20 text-white hover:border-[#0066FF]/50 transition"
              >
                <div className="absolute inset-0 tech-grid-bg opacity-20" style={{ backgroundSize: "48px 48px" }} />
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#0066FF]/20 blur-[140px] rounded-full pointer-events-none" />
                <div className="relative grid lg:grid-cols-2 gap-8 p-8 sm:p-12">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#0066FF]/40 bg-[#0066FF]/10 text-[10px] font-bold tracking-[0.2em] uppercase text-[#66A6FF] mb-5">
                      <CalendarCheck className="w-3 h-3" />
                      {lang === "el" ? "Custom App" : "Custom App"}
                    </div>
                    <h3 className="font-display font-bold text-3xl sm:text-4xl tracking-tighter text-white leading-[1.1]">
                      {(bookingSystem[lang] || bookingSystem.el).name}
                    </h3>
                    <p className="mt-4 text-slate-400 leading-relaxed">
                      {(bookingSystem[lang] || bookingSystem.el).short}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#66A6FF]">
                      {lang === "el" ? "Εξερευνήστε" : "Explore"} <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="hidden lg:flex items-center justify-center">
                    <div className="aspect-video w-full bg-slate-900/50 border border-white/10 overflow-hidden">
                      <img
                        src={bookingSystem.image}
                        alt="Booking System"
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
