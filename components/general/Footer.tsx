"use client"

import { Bird, Globe, Globe2, LogsIcon, LucideXOctagon, Send } from "lucide-react";
import Logo from "../miscellaneous/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    platform: [
      { name: "Shipment Tracking", href: "#" },
      { name: "Fleet Dashboard", href: "#" },
      { name: "Pricing & Plans", href: "#" },
      { name: "API Reference", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press Kit", href: "#" },
      { name: "Contact Support", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Security Protocols", href: "#" },
    ],
  };

  return (
    <footer className="relative bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 border-t border-neutral-200/60 dark:border-neutral-900 overflow-hidden ">
      {/* Subtle bottom gradient bloom */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-125 h-50 bg-orange-500/5 dark:bg-orange-500/3 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 pb-12 border-b border-neutral-200/60 dark:border-neutral-900">
          
          {/* Brand & Newsletter Block */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <div>
                <Logo />
              </div>
              <span className="text-xl font-bold tracking-tight bg-linear-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
                Taher <span className="text-orange-500">Enterprise</span>
              </span>
            </div>
            
            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 max-w-sm">
              Automating logistics with real-time tracking, role-based infrastructure, and friction-free delivery operations worldwide.
            </p>

            {/* Newsletter Input */}
            <div className="space-y-2 max-w-md">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Stay Updated
              </label>
              <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="w-full h-11 px-4 pr-12 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 text-sm focus:outline-hidden focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 h-8 w-8 rounded-lg bg-neutral-900 text-white dark:bg-orange-500 dark:text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Nav Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
                Platform
              </h4>
              <ul className="space-y-3">
                {links.platform.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm text-neutral-500 hover:text-orange-600 dark:text-neutral-400 dark:hover:text-orange-400 transition-colors inline-flex items-center group">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                {links.company.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm text-neutral-500 hover:text-orange-600 dark:text-neutral-400 dark:hover:text-orange-400 transition-colors inline-flex items-center group">
                      {link.name}
                      {link.name === "Careers" && (
                        <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 rounded-md border border-orange-100 dark:border-orange-900/30">
                          Hiring
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
                Legal
              </h4>
              <ul className="space-y-3">
                {links.legal.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm text-neutral-500 hover:text-orange-600 dark:text-neutral-400 dark:hover:text-orange-400 transition-colors inline-flex items-center group">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
            <span>&copy; {currentYear} ParcelSync Inc.</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" /> Global Operations
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: Bird, href: "#" },
              { icon: LucideXOctagon, href: "#" },
              { icon: LogsIcon, href: "#" },
              { icon: Globe2, href: "#" },
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  className="h-8 w-8 rounded-lg border border-neutral-200 dark:border-neutral-800/80 flex items-center justify-center text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-950 transition-all hover:scale-105"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
