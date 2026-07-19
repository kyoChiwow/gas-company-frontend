/* eslint-disable @typescript-eslint/no-explicit-any */
// app/products/[id]/page.tsx
"use client";

import RequestQuotaDialog from "@/components/modules/products/RequestQuotaDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSingleProductQuery } from "@/redux/features/products/products.auth";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Boxes,
  ChevronRight,
  Clock,
  Flame,
  ImageOff,
  Layers,
  ShieldCheck,
  Tag,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const trustBadges = [
  { icon: ShieldCheck, label: "Genuine & Certified" },
  { icon: Truck, label: "Fast Doorstep Delivery" },
  { icon: Clock, label: "Same-Day Dispatch" },
];

function formatPrice(price?: string | number) {
  const num = Number(price);
  if (Number.isNaN(num)) return price ?? "—";
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(num);
}

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const product = data?.data;

  // ---------- Loading state ----------
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
          <Skeleton className="mb-6 h-4 w-48" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <Skeleton className="aspect-square w-full rounded-3xl" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Error / not found state ----------
  if (isError || !product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-50 text-sky-300">
          <ImageOff className="h-7 w-7" />
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-700">
            Product not found
          </p>
          <p className="mt-1 text-sm text-slate-400">
            This product may have been removed or the link is incorrect.
          </p>
        </div>
        <Button
          onClick={() => router.push("/products")}
          className="bg-orange-500 text-white hover:bg-orange-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </div>
    );
  }

  const specs = [
    { label: "Brand", value: product.brand?.name, icon: Tag },
    { label: "Type", value: product.type?.name, icon: Layers },
    { label: "Section", value: product.section?.name, icon: Boxes },
  ].filter((s) => s.value);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex items-center gap-1.5 overflow-x-auto px-4 py-3 text-xs text-slate-500 sm:px-6 sm:text-sm">
          <button
            onClick={() => router.push("/")}
            className="shrink-0 whitespace-nowrap hover:text-sky-600"
          >
            Home
          </button>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <button
            onClick={() => router.push("/products")}
            className="shrink-0 whitespace-nowrap hover:text-sky-600"
          >
            Products
          </button>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate font-medium text-slate-700">
            {product.name}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-sky-600 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* ---------- Image ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-6 lg:self-start"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
              {product.photo ? (
                <Image
                  src={product.photo}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-6 mix-blend-multiply sm:p-10"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-300">
                  <ImageOff className="h-16 w-16" />
                </div>
              )}

              {product.section?.name && (
                <Badge className="absolute left-3 top-3 border-none bg-slate-900/80 text-white backdrop-blur-sm sm:left-4 sm:top-4">
                  {product.section.name}
                </Badge>
              )}
            </div>

            {/* Trust badges under image on desktop */}
            <div className="mt-6 hidden grid-cols-3 gap-3 lg:grid">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-xs"
                >
                  <Icon className="h-5 w-5 text-orange-500" />
                  <span className="text-xs font-medium text-slate-600">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ---------- Info ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            {product.type?.name && (
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
                <Flame className="h-3 w-3" />
                {product.type.name}
              </span>
            )}

            <h1 className="mt-4 text-2xl font-extrabold leading-tight text-slate-800 sm:text-3xl md:text-4xl">
              {product.name}
            </h1>

            {product.brand?.name && (
              <p className="mt-2 text-sm text-slate-500">
                by{" "}
                <span className="font-semibold text-slate-700">
                  {product.brand.name}
                </span>
              </p>
            )}

            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm font-medium text-slate-400">/ unit</span>
            </div>

            {product.description && (
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {product.description}
              </p>
            )}

            {/* Categories */}
            {Array.isArray(product.categories) &&
              product.categories.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.categories.map((cat: any) => (
                    <Badge
                      key={cat._id}
                      variant="outline"
                      className="border-sky-200 bg-sky-50 text-sky-700"
                    >
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              )}

            {/* Specs card */}
            {specs.length > 0 && (
              <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-3 sm:p-5">
                {specs.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        {label}
                      </p>
                      <p className="truncate text-sm font-semibold text-slate-700">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity + CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <RequestQuotaDialog
                productId={product._id}
                productName={product.name}
                productPrice={product.price}
                trigger={
                  <Button className="flex-1 rounded-xl bg-orange-500 font-medium text-white hover:bg-orange-600 shadow-sm transition-all cursor-pointer">
                    Order Now
                  </Button>
                }
              />
            </div>

            {/* Trust badges on mobile */}
            <div className="mt-6 grid grid-cols-1 gap-2.5 xs:grid-cols-3 lg:hidden">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-3 py-2.5 shadow-xs xs:flex-col xs:text-center"
                >
                  <Icon className="h-4 w-4 shrink-0 text-orange-500" />
                  <span className="text-xs font-medium text-slate-600">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-slate-400">
              Product ID:{" "}
              <span className="font-mono text-slate-500">{product._id}</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
