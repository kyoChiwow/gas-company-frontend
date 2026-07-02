"use client";

import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="container mx-auto px-4 pt-10">
      <div
        className="relative overflow-hidden rounded-2xl min-h-125 flex items-center"
        style={{
          backgroundImage: "url('/abouthero.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Sky Blue tinted overlay for matching industrial aesthetic */}
        <div className="absolute inset-0 bg-slate-900/65 backdrop-blur-[1px]" />

        {/* Content */}
        <div className="relative z-10 max-w-2xl px-8 py-16 md:px-12">
          <span className="inline-flex rounded-full bg-sky-500/20 border border-sky-400/40 px-4 py-1 text-sm font-semibold text-sky-300 backdrop-blur">
            Since 2004
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            Two Decades of Excellence in Gas Solutions
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
            Built on trust, safety, and a commitment to Bangladeshs industrial
            and healthcare sectors. We deliver reliable gas solutions backed by
            years of expertise.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-600/20"
            >
              View Our Services
            </Link>

            <Link
              href="/contact"
              className="rounded-lg border border-sky-400/40 bg-sky-500/10 px-6 py-3 font-semibold text-sky-200 backdrop-blur transition-all duration-200 hover:bg-sky-500/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
