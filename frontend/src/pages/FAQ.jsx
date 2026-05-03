import React from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function FAQ() {
  const { t } = useLang();
  const items = t("faqPage.items");

  return (
    <div data-testid="page-faq">
      <section className="border-b border-slate-200 bg-white relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-bg opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="eyebrow mb-4">{t("faqPage.eyebrow")}</div>
          <h1 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tighter max-w-4xl">
            {t("faqPage.title")}
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-2xl">{t("faqPage.subtitle")}</p>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="bg-white border border-slate-200">
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-slate-200 last:border-0"
                data-testid={`faq-item-${i}`}
              >
                <AccordionTrigger className="px-6 py-5 font-display font-semibold text-base sm:text-lg text-left hover:no-underline hover:bg-slate-50">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-slate-600 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-4">
            {t("cta.title")}
          </h3>
          <Link to="/contact" className="btn-cta inline-flex" data-testid="faq-cta">
            {t("cta.button")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
