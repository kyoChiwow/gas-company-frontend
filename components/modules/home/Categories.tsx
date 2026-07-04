/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  CheckCircle2,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import Image from "next/image";

const safetyPoints = [
  {
    icon: BadgeCheck,
    title: "ISO 9001:2015 Quality Management Certified",
  },
  {
    icon: Wrench,
    title: "Regular Pressure Testing & Cylinder Maintenance",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Emergency Response & Safety Monitoring",
  },
];

export default function Categories() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image Block Wrapper */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Added relative and an explicit height constraint here to prevent 0px element collapse */}
            <div className="relative h-125 w-full overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/Gas-Technician.jpg"
                alt="Gas Technician"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-500 hover:scale-105"
              />
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute -bottom-6 -right-6 rounded-2xl bg-white p-5 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-orange-100 p-3">
                  <ShieldCheck className="text-orange-500" />
                </div>

                <div>
                  <p className="font-bold text-lg">20+ Years</p>
                  <p className="text-sm text-slate-500">
                    Safety Experience
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Block Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="uppercase tracking-[0.3em] text-sky-600 font-semibold">
              Safety Standards
            </p>

            <h2 className="mt-4 text-5xl font-bold text-slate-900 leading-tight">
              Unmatched Safety Standards & Quality Assurance
            </h2>

            <p className="mt-6 text-slate-600 leading-8">
              Every cylinder that leaves our facility undergoes
              rigorous quality inspection, pressure testing, and
              compliance verification to ensure complete safety for
              industrial and medical applications.
            </p>

            <div className="mt-10 space-y-6">
              {safetyPoints.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.2,
                    }}
                    className="flex items-start gap-4"
                  >
                    <div className="rounded-xl bg-orange-500 p-3 shrink-0">
                      <CheckCircle2 className="text-white h-6 w-6" />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">
                        {item.title}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
