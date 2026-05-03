import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, Clock, Send } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { services } from "@/data/services";

const API = "/api";

export default function Contact() {
  const { t, lang } = useLang();
  const location = useLocation();
  const preselectedPlan = location.state?.plan;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: preselectedPlan ? `Plan: ${preselectedPlan}` : "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        company: form.company || null,
        service: form.service || null,
        message: form.message,
      });
      toast.success(t("contactPage.form.success"));
      setForm({ name: "", email: "", phone: "", company: "", service: "", message: "" });
    } catch (err) {
      toast.error(t("contactPage.form.error"));
    } finally {
      setLoading(false);
    }
  };

  const info = t("contactPage.info");

  return (
    <div data-testid="page-contact">
      <section className="border-b border-slate-200 bg-white relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-bg opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="eyebrow mb-4">{t("contactPage.eyebrow")}</div>
          <h1 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tighter max-w-4xl">
            {t("contactPage.title")}
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-2xl">{t("contactPage.subtitle")}</p>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white border border-slate-200 p-8 sm:p-10">
            <h2 className="font-display text-2xl font-semibold mb-6">
              {lang === "el" ? "Στείλτε μας μήνυμα" : "Send us a message"}
            </h2>
            <form onSubmit={submit} className="space-y-4" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={t("contactPage.form.name")} required>
                  <input
                    required
                    value={form.name}
                    onChange={update("name")}
                    data-testid="contact-name"
                    className="input-tech"
                  />
                </Field>
                <Field label={t("contactPage.form.email")} required>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    data-testid="contact-email"
                    className="input-tech"
                  />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={t("contactPage.form.phone")}>
                  <input
                    value={form.phone}
                    onChange={update("phone")}
                    data-testid="contact-phone"
                    className="input-tech"
                  />
                </Field>
                <Field label={t("contactPage.form.company")}>
                  <input
                    value={form.company}
                    onChange={update("company")}
                    data-testid="contact-company"
                    className="input-tech"
                  />
                </Field>
              </div>
              <Field label={t("contactPage.form.service")}>
                <select
                  value={form.service}
                  onChange={update("service")}
                  data-testid="contact-service"
                  className="input-tech"
                >
                  <option value="">{t("contactPage.form.serviceDefault")}</option>
                  {services.map((s) => {
                    const data = s[lang] || s.el;
                    return (
                      <option key={s.slug} value={data.name}>
                        {data.name}
                      </option>
                    );
                  })}
                  {preselectedPlan && (
                    <option value={`Plan: ${preselectedPlan}`}>
                      Plan: {preselectedPlan}
                    </option>
                  )}
                </select>
              </Field>
              <Field label={t("contactPage.form.message")} required>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  data-testid="contact-message"
                  className="input-tech resize-none"
                />
              </Field>
              <button
                type="submit"
                disabled={loading}
                data-testid="contact-submit"
                className="btn-cta w-full sm:w-auto disabled:opacity-60"
              >
                {loading ? "..." : t("contactPage.form.submit")} <Send className="w-4 h-4" />
              </button>
            </form>
            <style>{`
              .input-tech {
                width: 100%;
                padding: 0.75rem 0.875rem;
                border: 1px solid #E2E8F0;
                background: #FFFFFF;
                font-size: 0.9rem;
                color: #0F172A;
                transition: all 0.15s ease;
                border-radius: 2px;
              }
              .input-tech:focus {
                outline: none;
                border-color: #0066FF;
                box-shadow: 0 0 0 3px rgba(0,102,255,0.15);
              }
            `}</style>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <InfoCard icon={Phone} title={info.phoneTitle} value={info.phone} />
            <InfoCard icon={Mail} title={info.emailTitle} value={info.email} />
            <InfoCard icon={Clock} title={info.hoursTitle} value={info.hours} />

            <div className="aspect-square w-full border border-slate-200 overflow-hidden bg-slate-100">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50330.25018164267!2d23.72751697910156!3d37.98380809792064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd1f067043f1%3A0x2736354576668ddd!2sAthens!5e0!3m2!1sen!2sgr!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                data-testid="contact-map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-700 mb-1.5 block">
        {label}
        {required && <span className="text-[#0066FF] ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}

function InfoCard({ icon: Icon, title, value }) {
  return (
    <div className="p-5 bg-white border border-slate-200 flex gap-4">
      <div className="w-10 h-10 bg-[#0F4C81]/5 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-[#0F4C81]" />
      </div>
      <div>
        <div className="text-xs font-bold tracking-widest uppercase text-slate-500">{title}</div>
        <div className="text-slate-900 mt-0.5">{value}</div>
      </div>
    </div>
  );
}
