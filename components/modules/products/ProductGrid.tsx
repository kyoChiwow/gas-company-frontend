/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";
import ProductCard from "./ProductsCard";

interface ProductGridProps {
  products?: any[];
  isLoading?: boolean;
}

function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      <div className="h-56 animate-pulse bg-slate-200" />

      <div className="space-y-4 p-6">
        <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />

        <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />

        <div className="flex gap-2">
          <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
        </div>

        <div className="mt-6 flex gap-3">
          <div className="h-11 flex-1 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-11 flex-1 animate-pulse rounded-xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid({
  products = [],
  isLoading = false,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-100 flex-col items-center justify-center rounded-3xl border border-dashed"
      >
        <PackageSearch className="h-16 w-16 text-slate-300" />

        <h3 className="mt-6 text-2xl font-semibold">
          No Products Found
        </h3>

        <p className="mt-2 text-slate-500">
          There are no products available at the moment.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
    >
      {products.map((product, index) => (
        <motion.div
          key={product._id}
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: index * 0.08,
          }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}