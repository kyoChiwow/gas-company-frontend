"use client";

import { ArrowRight, CheckCircle2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const values = [
  "Experienced engineers and certified technicians",
  "Customer-first approach in every project",
  "Reliable support before and after delivery",
  "Modern equipment with strict quality control",
];

export default function TeamSection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        {/* Image Card Grid Layout */}
        <div className="relative overflow-hidden rounded-3xl shadow-lg group">
          <Image
            src="/teamsection.jpg"
            alt="Corporate Team Collaboration"
            width={1470}
            height={980}
            className="rounded-3xl object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-slate-900/10 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-6 backdrop-blur-sm border border-white/20 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <Users className="h-6 w-6" />
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800">
                  Dedicated Professionals
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Working together to deliver safe and dependable gas solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout Column */}
        <div>
          <p className="text-sky-600 text-sm font-semibold uppercase tracking-[0.25em]">
            Our Team
          </p>

          <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-slate-900">
            Powered by Experience,
            <br />
            Driven by Trust
          </h2>

          <p className="mt-6 leading-8 text-muted-foreground">
            Behind every successful delivery is a passionate team of engineers,
            technicians, logistics specialists, and customer support
            professionals committed to maintaining the highest standards of
            quality and safety.
          </p>

          <p className="mt-5 leading-8 text-muted-foreground">
            We believe that long-term relationships are built through honesty,
            technical excellence, and reliable service. Our people are the
            foundation of everything we do.
          </p>

          <div className="mt-8 space-y-4">
            {values.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-orange-500" />
                <p className="text-slate-700 font-medium text-sm leading-6">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-600/20"
            >
              Contact Us
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
