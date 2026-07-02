"use client";

import {
  BadgeCheck,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";

const features = [
  {
    title: "Unmatched Reliability",
    description:
      "Consistent supply chain management ensuring your operations never stop.",
    icon: BadgeCheck,
  },
  {
    title: "Safety First Culture",
    description:
      "Rigorous safety standards exceeding national and international requirements.",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Logistics",
    description:
      "Round-the-clock delivery service for emergency medical and industrial needs.",
    icon: Truck,
  },
  {
    title: "Expert Engineering",
    description:
      "In-house engineering team for pipeline setup and technical consultations.",
    icon: Users,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="container mx-auto px-4 py-12">
      {/* Header Container */}
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-sky-600 font-semibold uppercase tracking-[0.25em] text-sm">
          Why Choose Us
        </p>

        <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
          Why Choose Taher Enterprise?
        </h2>

        <p className="mt-5 text-muted-foreground leading-8">
          Providing unmatched value through two decades of industry-leading
          technical expertise, certified safety practices, and dependable
          customer service.
        </p>
      </div>

      {/* Interactive Feature Card Grid Layout */}
      <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group rounded-2xl border border-slate-100 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/30 hover:shadow-xl"
            >
              {/* Icon Container - Shifts from Sky Blue default to Orange on Hover */}
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-50 transition-colors duration-300 group-hover:bg-orange-600 text-sky-600 group-hover:text-white">
                <Icon className="h-7 w-7 transition-colors duration-300" />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-800 transition-colors duration-300 group-hover:text-orange-600">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
