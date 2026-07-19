"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, ShieldCheck, Truck, Clock, Flame, Grid, LayoutList } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/features/products/products.auth";
import ProductGrid from "@/components/modules/products/ProductGrid";
import ProductPagination from "@/components/modules/products/ProductPagination";

const trustBadges = [
  { icon: ShieldCheck, label: "Genuine & Certified" },
  { icon: Truck, label: "Fast Doorstep Delivery" },
  { icon: Clock, label: "Same-Day Dispatch" },
];

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const { data, isLoading } = useGetAllProductsQuery({
    page,
    searchTerm,
  });

  const products = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section 
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat pb-32 pt-24 sm:pt-28"
        style={{ backgroundImage: "url('/product-banner.png')" }}
      >
        {/* Dark Tint Overlay to ensure high text legibility over any picture background */}
        <div className="absolute inset-0 bg-slate-900/65 backdrop-blur-xs" />

        {/* Ambient light glow decorators */}
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-100 w-100 rounded-full bg-orange-500/10 blur-[120px]" />

        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-orange-200 backdrop-blur-sm">
              <Flame className="h-3.5 w-3.5" />
              Product Catalogue
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl drop-shadow-md">
              Our Products
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-100 sm:text-lg drop-shadow-xs">
              Browse our complete collection of gas products and submit
              quotation requests directly to our sales team.
            </p>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
            >
              {trustBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm font-medium text-slate-100 drop-shadow-xs"
                >
                  <Icon className="h-4 w-4 text-orange-400" />
                  {label}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search Card */}
      <div className="container relative z-20 mx-auto -mt-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl border border-slate-100 bg-white p-5 shadow-xl shadow-sky-900/10 sm:p-6"
        >
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-400" />

            <Input
              placeholder="Search by product name, brand, or type..."
              className="h-13 rounded-2xl border-slate-200 pl-12 pr-11 text-base focus-visible:border-sky-400 focus-visible:ring-sky-200"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />

            <AnimatePresence>
              {searchTerm && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors hover:bg-orange-100 hover:text-orange-600"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {searchTerm && (
            <p className="mt-3 pl-1 text-sm text-slate-400">
              Searching for{" "}
              <span className="font-semibold text-slate-600">
                &ldquo;{searchTerm}&rdquo;
              </span>
            </p>
          )}
        </motion.div>
      </div>

      {/* Products Display Section */}
      <section className="container mx-auto px-6 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Available Products
            </h2>
            <p className="mt-1 flex items-center gap-2 text-slate-500">
              {!isLoading && (
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              )}
              {isLoading ? (
                "Loading catalogue..."
              ) : (
                <>
                  <span className="font-semibold text-slate-700">
                    {meta?.total || 0}
                  </span>{" "}
                  {meta?.total === 1 ? "product" : "products"} found
                  {searchTerm && (
                    <>
                      {" "}
                      for{" "}
                      <span className="font-semibold text-orange-600">
                        &ldquo;{searchTerm}&rdquo;
                      </span>
                    </>
                  )}
                </>
              )}
            </p>
          </div>

          {/* Controls: Search clear & layout switches */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {searchTerm && !isLoading && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchTerm("")}
                className="border-sky-200 text-sky-600 hover:bg-sky-50 hover:text-sky-700"
              >
                Clear search
              </Button>
            )}

            {/* Layout Switcher Toggles */}
            <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                onClick={() => setLayout("grid")}
                className={`p-2 rounded-lg transition-all ${
                  layout === "grid"
                    ? "bg-white text-sky-600 shadow-xs"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                aria-label="Grid View"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setLayout("list")}
                className={`p-2 rounded-lg transition-all ${
                  layout === "list"
                    ? "bg-white text-sky-600 shadow-xs"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                aria-label="List View"
              >
                <LayoutList className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {!isLoading && products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-sky-200 bg-white py-20 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-50 text-sky-300">
              <Search className="h-7 w-7" />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-700">
                No products found
              </p>
              <p className="mt-1 text-sm text-slate-400">
                {searchTerm
                  ? `We couldn't find anything matching "${searchTerm}".`
                  : "Check back soon for new arrivals."}
              </p>
            </div>
            {searchTerm && (
              <Button
                onClick={() => setSearchTerm("")}
                className="bg-orange-500 text-white hover:bg-orange-600"
              >
                Clear search
              </Button>
            )}
          </motion.div>
        ) : (
          /* Dynamic layout state injection */
          <ProductGrid products={products} isLoading={isLoading} layout={layout} />
        )}

        {!isLoading && products.length > 0 && (
          <div className="mt-12 flex justify-center">
            <ProductPagination
              currentPage={meta?.page || 1}
              totalPages={meta?.totalPage || 1}
              onPageChange={(newPage: number) => {
                setPage(newPage);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        )}
      </section>
    </div>
  );
}