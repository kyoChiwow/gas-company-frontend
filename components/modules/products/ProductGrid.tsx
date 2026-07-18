/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";
import ProductCard from "./ProductsCard";

interface ProductGridProps {
  products?: any[];
  isLoading?: boolean;
  layout?: "grid" | "list";
}

function ProductSkeleton({ layout }: { layout: "grid" | "list" }) {
  if (layout === "list") {
    return (
      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm flex flex-col sm:flex-row gap-6 p-6">
        <div className="h-48 w-full sm:w-64 shrink-0 animate-pulse rounded-2xl bg-slate-200" />
        <div className="flex-1 space-y-4 py-2">
          <div className="h-7 w-3/4 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-1/4 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
          <div className="flex gap-3 mt-6 max-w-sm">
            <div className="h-11 flex-1 animate-pulse rounded-xl bg-slate-200" />
            <div className="h-11 flex-1 animate-pulse rounded-xl bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

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
  layout = "grid",
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className={layout === "list" ? "space-y-6" : "grid gap-8 md:grid-cols-2 xl:grid-cols-3"}>
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductSkeleton key={index} layout={layout} />
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
        <h3 className="mt-6 text-2xl font-semibold">No Products Found</h3>
        <p className="mt-2 text-slate-500">There are no products available at the moment.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout // Framer Motion fluid animations handle grid switches nicely
      className={layout === "list" ? "space-y-6" : "grid gap-8 md:grid-cols-2 xl:grid-cols-3"}
    >
      {products.map((product, index) => (
        <motion.div
          key={product._id}
          layout
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.04 }}
        >
          <ProductCard product={product} layout={layout} />
        </motion.div>
      ))}
    </motion.div>
  );
}