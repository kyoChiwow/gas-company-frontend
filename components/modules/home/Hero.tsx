"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  Factory,
  Flame,
  HeartPulse,
  Sparkles,
} from "lucide-react";

import FloatingCard from "./FloatingCard";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-b-md">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/Background.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#061B42]/95 via-[#0B6BCB]/80 to-[#38BDF8]/60" />

      {/* Decorative Blur */}
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-sky-400/20 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-125 w-125 rounded-full bg-orange-500/20 blur-[150px]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto min-h-[90vh] px-6 py-16 flex flex-col-reverse items-center gap-14 lg:grid lg:grid-cols-2">
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-semibold uppercase tracking-[0.3em] text-sky-200">
            Trusted Since 2004
          </p>

          <h1 className="mt-5 text-5xl font-extrabold leading-tight text-white lg:text-7xl">
            <TypeAnimation
              sequence={[
                "Dhaka's Premier Gas Distributor",
                2000,
                "Industrial Gas Solutions",
                2000,
                "Medical Oxygen Supplier",
                2000,
              ]}
              wrapper="span"
              speed={45}
              repeat={Infinity}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 max-w-xl text-lg leading-8 text-sky-100"
          >
            Reliable LPG, Industrial Gas, and Medical Oxygen
            solutions for hospitals, factories, restaurants,
            and homes across Bangladesh.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <Link
              href="/products"
              className="rounded-xl bg-orange-500 px-7 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600"
            >
              Order Now
            </Link>

            <Link
              href="/about"
              className="rounded-xl border border-white/40 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white/20"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex h-155 w-full items-center justify-center"
        >
          {/* Main Image */}

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative h-125 w-125 max-w-full"
          >
            <Image
              src="/gascylinder.jpg"
              alt="Gas Cylinders"
              fill
              priority
              className="rounded-md object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Floating Cards */}

          <FloatingCard
            icon={Flame}
            title="LPG"
            description="Domestic & Commercial"
            className="left-10 top-48"
            delay={0}
          />

          <FloatingCard
            icon={Factory}
            title="Industrial"
            description="Manufacturing Grade"
            className="right-4 top-32"
            delay={0.5}
          />

          <FloatingCard
            icon={HeartPulse}
            title="Medical Gas"
            description="Hospital Oxygen"
            className="bottom-36 right-2"
            delay={1}
          />

          <FloatingCard
            icon={Sparkles}
            title="Specialty"
            description="High Purity Gases"
            className="bottom-20 left-10"
            delay={1.5}
          />
        </motion.div>
      </div>
    </section>
  );
}