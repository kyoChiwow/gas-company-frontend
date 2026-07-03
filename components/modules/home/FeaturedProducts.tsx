"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Factory,
  Flame,
  HeartPulse,
  Sparkles,
} from "lucide-react";

const products = [
  {
    title: "Industrial Gas",
    description:
      "High-quality industrial gases for manufacturing, welding, and fabrication.",
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=900&auto=format&fit=crop",
    icon: Factory,
    color: "bg-sky-500",
  },
  {
    title: "Medical Gas",
    description:
      "Certified medical oxygen and healthcare gas solutions for hospitals.",
    image:
      "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=900&auto=format&fit=crop",
    icon: HeartPulse,
    color: "bg-orange-500",
  },
  {
    title: "LPG",
    description:
      "Reliable LPG cylinders for homes, restaurants, and commercial kitchens.",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=900&auto=format&fit=crop",
    icon: Flame,
    color: "bg-sky-500",
  },
  {
    title: "Specialty Gas",
    description:
      "High-purity specialty gas mixtures for laboratories and research.",
    image:
      "https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=900&auto=format&fit=crop",
    icon: Sparkles,
    color: "bg-orange-500",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="uppercase tracking-[0.3em] text-sky-600 font-semibold">
            Our Products
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">
            Gas Solutions For Every Industry
          </h2>

          <p className="mt-6 text-slate-600 leading-8">
            Whether you are running a hospital, factory, restaurant,
            or laboratory, we provide dependable gas solutions tailored
            to your needs.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => {
            const Icon = product.icon;

            return (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: .5,
                  delay: index * .15,
                }}
                whileHover={{
                  y: -12,
                }}
                className="group overflow-hidden rounded-3xl border bg-white shadow-sm hover:shadow-2xl transition-all"
              >
                {/* Image */}

                <div className="relative overflow-hidden h-56">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: .4 }}
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />

                  <div
                    className={`absolute left-5 top-5 h-14 w-14 rounded-2xl ${product.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="text-white h-7 w-7" />
                  </div>
                </div>

                {/* Content */}

                <div className="p-6">
                  <h3 className="text-xl font-bold">
                    {product.title}
                  </h3>

                  <p className="mt-4 text-slate-600 leading-7">
                    {product.description}
                  </p>

                  <Link
                    href="/products"
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-sky-600 transition group-hover:gap-3"
                  >
                    Learn More

                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}