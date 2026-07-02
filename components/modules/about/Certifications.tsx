"use client";

import { Award, BadgeCheck, Download, FileCheck, Shield } from "lucide-react";
import Link from "next/link";

const certifications = [
  {
    title: "ISO 9001",
    description: "Quality Management System",
    icon: Award,
  },
  {
    title: "Safety Certified",
    description: "Industrial Safety Standards",
    icon: Shield,
  },
  {
    title: "Government Approved",
    description: "Licensed Gas Supplier",
    icon: BadgeCheck,
  },
  {
    title: "Medical Grade",
    description: "Certified Oxygen Supply",
    icon: FileCheck,
  },
];

const stats = [
  {
    value: "20+",
    label: "Years Experience",
  },
  {
    value: "500+",
    label: "Clients Served",
  },
  {
    value: "99.9%",
    label: "Delivery Reliability",
  },
];

export default function Certifications() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="rounded-3xl border border-slate-100 bg-linear-to-br from-slate-50 to-white p-8 shadow-sm md:p-12">
        {/* Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-semibold uppercase tracking-[0.25em] text-sky-600 text-sm">
              Certifications
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
              Certified Excellence & Industry Standards
            </h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              Our certifications demonstrate our commitment to quality,
              operational excellence, workplace safety, and customer
              satisfaction across every service we provide.
            </p>
          </div>

          <Link
            href="/company-profile.pdf"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-600/20"
          >
            <Download className="h-5 w-5" />
            Download Company Profile
          </Link>
        </div>

        {/* Certification Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {certifications.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-100 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-50 transition-colors group-hover:bg-sky-500 text-sky-600 group-hover:text-white">
                  <Icon className="h-7 w-7 transition-colors" />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-slate-800">{item.title}</h3>

                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* High-Contrast Orange Stats Panel */}
        <div className="mt-14 rounded-2xl bg-orange-600 px-8 py-10 text-white shadow-xl shadow-orange-600/10">
          <div className="grid gap-10 text-center md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <h3 className="text-4xl font-bold tracking-tight">{stat.value}</h3>
                <p className="mt-2 text-orange-100/90 font-medium text-sm tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
