"use client";

import {
  BadgeCheck,
  CheckCircle2,
  Rocket,
  Building2,
  ShieldCheck,
} from "lucide-react";

const journey = [
  {
    title: "Founded 20+ Years Ago",
    year: "2004",
    description:
      "Started as a small industrial gas supplier in Dhaka, focusing on oxygen and acetylene.",
    icon: Rocket,
  },
  {
    title: "Expansion into Medical Oxygen",
    year: "2012",
    description:
      "Pivoted to support critical healthcare infrastructure with high-purity medical oxygen.",
    icon: Building2,
  },
  {
    title: "Leading Industrial Supplier",
    year: "Present",
    description:
      "Trusted partner for major manufacturing plants and hospitals nationwide.",
    icon: BadgeCheck,
  },
];

const safetyPoints = [
  "Strict compliance with Explosives Department standards.",
  "Regular safety audits and technician training.",
  "State-of-the-art testing for every cylinder.",
];

export default function Journey() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.9fr] items-start">
        {/* Timeline */}
        <div>
          <h2 className="mb-10 text-4xl font-bold tracking-tight text-slate-900">Our Journey</h2>

          <div className="relative ml-5 border-l-2 border-sky-200">
            {journey.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index} className="relative pb-12 pl-10 last:pb-0">
                  {/* Sky Blue Marker Hub */}
                  <div className="absolute -left-4.25 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-sky-500 bg-white shadow-sm">
                    <Icon className="h-4 w-4 text-sky-500" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>

                  <p className="text-sm font-bold text-sky-600 mt-1">
                    {item.year}
                  </p>

                  <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Orange Accent Safety Block */}
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm ring-1 ring-orange-500/5">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <h2 className="text-3xl font-bold text-slate-900">
            Our Mission & Safety Focus
          </h2>

          <p className="mt-5 leading-8 text-muted-foreground">
            Our mission is to provide the most reliable and safe gas solutions
            to Bangladeshs growing industrial and healthcare sectors through
            innovative engineering and uncompromising safety standards.
          </p>

          <div className="mt-8 space-y-5">
            {safetyPoints.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-orange-500" />

                <p className="text-sm leading-6 text-muted-foreground">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
