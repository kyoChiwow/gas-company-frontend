"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
  CheckCircle2,
  Zap,
} from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1713 013032",
    href: "tel:+8801713013032",
    description: "Available during business hours",
  },
  {
    icon: Mail,
    label: "Email",
    value: "taherenterprise2010@yahoo.com",
    href: "mailto:taherenterprise2010@yahoo.com",
    description: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Professional Energy Logistics Lab",
    href: "https://maps.google.com/?q=Dhaka,Bangladesh",
    description: "Dhaka, Bangladesh",
  },
];

const hours = [
  { day: "Saturday – Thursday", time: "9:00 AM – 6:00 PM" },
  { day: "Friday", time: "Closed" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const isValid =
    form.name.trim() &&
    form.email.trim() &&
    form.subject.trim() &&
    form.message.trim();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950">
        {/* Background texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 39px,#0ea5e9 39px,#0ea5e9 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#0ea5e9 39px,#0ea5e9 40px)",
          }}
        />

        {/* Glow accents */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-100 w-100 rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-500/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 h-75 w-75 rounded-full bg-orange-400/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            {/* Eyebrow */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 dark:border-sky-900 dark:bg-sky-950/50">
              <Zap className="h-3.5 w-3.5 text-orange-500" />
              <span className="text-xs font-semibold tracking-wide text-sky-700 dark:text-sky-400">
                TAHER ENTERPRISE
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl md:text-6xl">
              Let&apos;s{" "}
              <span className="relative inline-block text-sky-600 dark:text-sky-400">
                connect
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-orange-500"
                />
              </span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg">
              Have a question about energy logistics, a bulk order, or a
              partnership proposal? Reach out — our team in Dhaka is ready
              to help.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main content ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-6 pt-10">
        {/* Negative top margin to overlap hero slightly */}
        <div className="-mt-6 grid gap-6 lg:grid-cols-5 lg:gap-8">

          {/* ── Left: Contact info ──────────────────────────────────── */}
          <div className="space-y-5 lg:col-span-2">

            {/* Contact cards */}
            {contactDetails.map(({ icon: Icon, label, value, href, description }) => (
              <a
                key={label}
                href={href}
                target={label === "Address" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
              >
                {/* Icon badge */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm shadow-sky-200 transition-transform duration-200 group-hover:scale-105 dark:shadow-sky-900">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    {label}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {value}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {description}
                  </p>
                </div>

                {/* Hover arrow */}
                <span className="ml-auto shrink-0 text-sky-400 opacity-0 transition-opacity group-hover:opacity-100">
                  ↗
                </span>
              </a>
            ))}

            {/* Business hours card */}
            <div className="rounded-2xl border border-orange-100 bg-linear-to-br from-orange-50 to-white p-5 dark:border-orange-900/30 dark:from-orange-950/20 dark:to-slate-900">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400">
                  <Clock className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Business Hours
                </p>
              </div>

              <div className="space-y-2.5">
                {hours.map(({ day, time }) => (
                  <div
                    key={day}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {day}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        time === "Closed"
                          ? "text-slate-400 dark:text-slate-600"
                          : "text-orange-600 dark:text-orange-400"
                      }`}
                    >
                      {time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Live indicator */}
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 dark:border-emerald-900/30 dark:bg-emerald-950/20">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  Currently open
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: Form ─────────────────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              {submitted ? (
                /* Success state */
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-800 dark:text-slate-100">
                    Message sent!
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                    Thanks for reaching out. Someone from our Dhaka team will
                    get back to you within 24 hours.
                  </p>
                  <Button
                    className="mt-6 bg-sky-600 text-white hover:bg-sky-500"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                      Send us a message
                    </h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Fill in the form and we&apos;ll get back to you shortly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name + Email row */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Full Name
                        </Label>
                        <Input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Rahim Uddin"
                          required
                          className="border-sky-100 focus-visible:border-sky-400 focus-visible:ring-sky-200 dark:border-slate-700"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Email Address
                        </Label>
                        <Input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          className="border-sky-100 focus-visible:border-sky-400 focus-visible:ring-sky-200 dark:border-slate-700"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Subject
                      </Label>
                      <Input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="e.g. Bulk order enquiry"
                        required
                        className="border-sky-100 focus-visible:border-sky-400 focus-visible:ring-sky-200 dark:border-slate-700"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Message
                      </Label>
                      <Textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you…"
                        required
                        rows={6}
                        className="resize-none border-sky-100 focus-visible:border-sky-400 focus-visible:ring-sky-200 dark:border-slate-700"
                      />
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-100 dark:border-slate-800" />

                    {/* Submit */}
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        We never share your information with third parties.
                      </p>
                      <Button
                        type="submit"
                        disabled={!isValid || loading}
                        className="shrink-0 bg-orange-500 text-white shadow-sm shadow-orange-200 hover:bg-orange-600 focus-visible:ring-orange-300 active:scale-95 disabled:opacity-50 dark:shadow-none"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Sending…
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="h-3.5 w-3.5" />
                            Send message
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── Map strip ───────────────────────────────────────────────── */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-sky-100 shadow-sm dark:border-slate-800">
          {/* Map header */}
          <div className="flex items-center gap-3 border-b border-sky-100 bg-white px-5 py-3.5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500 text-white">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Professional Energy Logistics Lab
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dhaka, Bangladesh
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Dhaka,Bangladesh"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-xs font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400"
            >
              Open in Maps ↗
            </a>
          </div>

          <iframe
            title="Taher Enterprise location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.45732780433!2d90.27923778320312!3d23.780573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1719000000000"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block"
          />
        </div>
      </section>
    </div>
  );
}