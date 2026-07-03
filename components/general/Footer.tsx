"use client";

import { Send, Phone, Mail, MapPin } from "lucide-react";
import Logo from "../miscellaneous/Logo";
import Link from "next/link";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "LPG Supply", href: "/products" },
    { name: "Industrial Gases", href: "/products" },
    { name: "Medical Oxygen", href: "/products" },
    { name: "Specialty Mixes", href: "/products" },
  ];

  const contact = [
    {
      icon: Phone,
      label: "+880 1713 013032",
      href: "tel:+8801713013032",
    },
    {
      icon: Mail,
      label: "taherenterprise2020@yahoo.com",
      href: "mailto:taherenterprise2020@yahoo.com",
    },
    {
      icon: MapPin,
      label: "Professional Energy Logistics Lab, Dhaka, Bangladesh",
      href: "https://maps.google.com/?q=Dhaka,Bangladesh",
    },
  ];

  const socials = [
    { icon: FacebookIcon, href: "#", label: "Facebook" },
    { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
    { icon: YoutubeIcon, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="relative border-t border-sky-100/80 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 overflow-hidden">

      {/* Subtle glow bloom */}
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-125 -translate-x-1/2 rounded-full bg-orange-500/5 blur-[100px] dark:bg-orange-500/3" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">

        {/* ── Main grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-10 border-b border-sky-100/80 py-14 dark:border-slate-800 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* Brand + newsletter — col 5 */}
          <div className="space-y-6 lg:col-span-5">
            {/* Logo */}
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <div className="transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                <Logo />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                Taher{" "}
                <span className="font-extrabold text-orange-500">Enterprise</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Dhaka&apos;s trusted supplier of LPG, industrial, and medical
              gases. Delivering reliability, safety, and quality to B2B and
              B2C clients since 2004.
            </p>

            {/* Contact mini-list */}
            <ul className="space-y-2.5">
              {contact.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2.5 text-sm text-slate-500 transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sky-500 transition-colors group-hover:text-sky-600 dark:text-sky-400" />
                    <span className="leading-snug">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav columns — col 7 */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4">
            {/* Quick links */}
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Our Services
              </h4>
              <ul className="space-y-3">
                {services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter — col 3 */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Stay Updated
            </h4>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Get the latest updates on gas supplies, safety news, and offers.
            </p>

            <form
              className="relative flex items-center"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 w-full rounded-xl border border-sky-100 bg-sky-50/50 px-4 pr-12 text-sm text-slate-800 placeholder:text-slate-400 transition-all focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-200 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder:text-slate-600 dark:focus:border-sky-600"
              />
              <button
                type="submit"
                className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white transition-all hover:bg-orange-600 active:scale-95"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>

            {/* Social icons */}
            <div className="pt-2">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Follow Us
              </p>
              <div className="flex items-center gap-2">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-sky-100 bg-white text-slate-400 transition-all hover:scale-105 hover:border-sky-200 hover:text-sky-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500 dark:hover:border-slate-700 dark:hover:text-sky-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────── */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-slate-400 dark:text-slate-500 sm:flex-row">
          <p>
            &copy; {currentYear}{" "}
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              Taher Enterprise
            </span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-orange-500 transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;