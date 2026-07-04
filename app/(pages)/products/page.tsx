"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/features/products/products.auth";
import ProductGrid from "@/components/modules/products/ProductGrid";
import ProductPagination from "@/components/modules/products/ProductPagination";

export default function ProductsPage() {
  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useGetAllProductsQuery({
    page,
    searchTerm,
  });

  const products = data?.data || [];

  const meta = data?.meta;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}

      <section className="relative overflow-hidden bg-linear-to-br from-[#0A2A66] via-[#0E65C9] to-[#38BDF8] py-28">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-sky-400/20 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-100 w-100 rounded-full bg-orange-500/20 blur-[120px]" />

        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="font-semibold uppercase tracking-[0.3em] text-sky-200">
              Product Catalogue
            </p>

            <h1 className="mt-6 text-5xl font-extrabold text-white md:text-7xl">
              Our Products
            </h1>

            <p className="mt-6 text-lg leading-8 text-sky-100">
              Browse our complete collection of gas
              products and submit quotation requests
              directly to our sales team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Card */}

      <div className="container mx-auto -mt-12 px-6 relative z-20">
        <div className="rounded-3xl border bg-white p-6 shadow-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <Input
              placeholder="Search products..."
              className="h-12 pl-12"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* Products */}

      <section className="container mx-auto px-6 py-16">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Available Products
            </h2>

            <p className="text-slate-500">
              {meta?.total || 0} products found
            </p>
          </div>
        </div>

        <ProductGrid
          products={products}
          isLoading={isLoading}
        />

        <ProductPagination
          currentPage={meta?.page || 1}
          totalPages={meta?.totalPage || 1}
          onPageChange={setPage}
        />
      </section>
    </div>
  );
}