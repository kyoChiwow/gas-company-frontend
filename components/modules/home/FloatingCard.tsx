"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FloatingCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

export default function FloatingCard({
  icon: Icon,
  title,
  description,
  className,
  delay = 0,
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        y: {
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.05,
        y: -10,
      }}
      className={`absolute rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-sky-100 p-4 w-48 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl bg-sky-100 flex items-center justify-center">
          <Icon className="text-sky-600 h-6 w-6" />
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            {title}
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}