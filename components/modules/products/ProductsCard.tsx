/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, Layers3, Package, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RequestQuotaDialog from "./RequestQuotaDialog";

interface ProductCardProps {
  product: any;
  layout?: "grid" | "list";
}

export default function ProductCard({ product, layout = "grid" }: ProductCardProps) {
  const isList = layout === "list";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className={`group flex overflow-hidden rounded-3xl border bg-white shadow-sm transition-all hover:shadow-xl ${
        isList ? "flex-col sm:flex-row h-auto w-full" : "flex-col h-full"
      }`}
    >
      {/* Visual Thumbnail Media Block */}
      <div
        className={`relative overflow-hidden bg-linear-to-br from-sky-100 to-slate-100 shrink-0 ${
          isList ? "h-56 sm:h-auto sm:w-72" : "h-56"
        }`}
      >
        {product.photo ? (
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={product.photo}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center min-h-56">
            <Package className="h-16 w-16 text-sky-300" />
          </div>
        )}

        <Badge className="absolute left-4 top-4 rounded-full bg-sky-600 z-10">
          {product.brand?.name}
        </Badge>
      </div>

      {/* Content Meta Info Workspace Container */}
      <div className="flex-1 flex flex-col justify-between p-6 gap-5">
        <div className={`space-y-4 ${isList ? "md:grid md:grid-cols-2 md:gap-6 md:space-y-0" : ""}`}>
          
          {/* Main textual items info */}
          <div className="space-y-2">
            <h3 className={`font-bold text-slate-800 tracking-tight line-clamp-2 ${
              isList ? "text-xl sm:text-2xl" : "text-2xl min-h-16 flex items-start"
            }`}>
              {product.name}
            </h3>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
              <p className="flex items-center gap-1.5 text-sm text-slate-500">
                <Building2 className="h-4 w-4 text-orange-500" />
                {product.section?.name}
              </p>
              <div className="flex items-center gap-1.5 text-slate-500">
                <Layers3 className="h-4 w-4 text-sky-600" />
                <span className="text-sm font-medium">{product.type?.name}</span>
              </div>
            </div>
          </div>

          {/* Categorization chips and pricing parameters */}
          <div className="flex flex-col justify-center space-y-3">
            <div className="flex flex-wrap gap-1.5 max-h-14 overflow-hidden">
              {product.categories?.map((category: any) => (
                <Badge
                  key={category._id}
                  variant="secondary"
                  className="rounded-full text-[11px] font-normal tracking-wide px-2.5"
                >
                  <Tag className="mr-1 h-2.5 w-2.5 text-slate-400" />
                  {category.name}
                </Badge>
              ))}
            </div>

            <div className="text-2xl font-extrabold text-slate-800">
              {product.price.toLocaleString()}{" "}
              <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">TK</span>
            </div>
          </div>
        </div>

        {/* Action interactive CTA buttons */}
        <div className={`flex gap-3 pt-2 shrink-0 ${isList ? "sm:max-w-md sm:ml-auto w-full" : "w-full"}`}>
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

          <Link href={`/products/${product._id}`} className="flex-1">
            <Button
              variant="outline"
              className="group flex-1 w-full rounded-xl font-medium border-slate-200 transition-all cursor-pointer"
            >
              Details
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}