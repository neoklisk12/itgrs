import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, User } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { blogPosts } from "@/data/content";

export default function Blog() {
  const { t, lang } = useLang();

  return (
    <div data-testid="page-blog">
      <section className="border-b border-slate-200 bg-white relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-bg opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="eyebrow mb-4">{t("blogPage.eyebrow")}</div>
          <h1 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tighter max-w-4xl">
            {t("blogPage.title")}
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-2xl">{t("blogPage.subtitle")}</p>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.map((post, i) => {
              const data = post[lang] || post.el;
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  data-testid={`blog-card-${post.id}`}
                  className="bg-white border border-slate-200 group hover:border-[#0F4C81] transition overflow-hidden flex flex-col"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={data.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString(lang === "el" ? "el-GR" : "en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </div>
                    </div>
                    <h3 className="font-display font-semibold text-xl text-slate-900 leading-snug group-hover:text-[#0F4C81] transition">
                      {data.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed flex-1">{data.excerpt}</p>
                    <button
                      type="button"
                      data-testid={`blog-read-${post.id}`}
                      className="mt-5 text-xs font-bold tracking-widest uppercase text-[#0F4C81] inline-flex items-center gap-1 self-start"
                    >
                      {t("blogPage.readMore")} <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
