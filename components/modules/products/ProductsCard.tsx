/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Layers3,
  Package,
  Tag,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import RequestQuotaDialog from "./RequestQuotaDialog";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition-all hover:shadow-2xl"
    >
      {/* Image */}

      <div className="relative h-56 overflow-hidden bg-linear-to-br from-sky-100 to-slate-100">
        {product.image ? (
          <motion.img
            whileHover={{
              scale: 1.08,
            }}
            transition={{
              duration: 0.4,
            }}
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Package className="h-20 w-20 text-sky-300" />
          </div>
        )}

        <Badge className="absolute left-4 top-4 rounded-full bg-sky-600">
          {product.brand?.name}
        </Badge>
      </div>

      {/* Content */}

      <div className="space-y-5 p-6">
        <div>
          <h3 className="line-clamp-1 text-2xl font-bold">
            {product.name}
          </h3>

          <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <Building2 className="h-4 w-4 text-orange-500" />

            {product.section?.name}
          </p>
        </div>

        {/* Type */}

        <div className="flex items-center gap-2">
          <Layers3 className="h-4 w-4 text-sky-600" />

          <span className="text-sm font-medium">
            {product.type?.name}
          </span>
        </div>

        {/* Categories */}

        <div className="flex flex-wrap gap-2">
          {product.categories?.map((category: any) => (
            <Badge
              key={category._id}
              variant="secondary"
              className="rounded-full"
            >
              <Tag className="mr-1 h-3 w-3" />

              {category.name}
            </Badge>
          ))}
        </div>

        {/* Buttons */}

        <div className="flex gap-3 pt-3">
          <RequestQuotaDialog product={product} />

          <Button
            variant="outline"
            className="group flex-1 rounded-xl"
          >
            Details

            <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}