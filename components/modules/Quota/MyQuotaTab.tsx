/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import PaginationComp from "@/components/general/PaginationComp";
import { QuotaDetailsDialog } from "@/components/modules/Quota/QuotaDetailsDialog";
import { useGetMyQuotasQuery } from "@/redux/features/quota/quota.auth";
import {
  Calendar,
  ChevronRight,
  ClipboardList,
  ImageOff,
  Package,
} from "lucide-react";

export function StatusBadge({ isClosed }: { isClosed: boolean }) {
  const label = isClosed ? "Closed" : "Open";
  const className = isClosed
    ? "bg-slate-100 text-slate-500 border-slate-200"
    : "bg-emerald-50 text-emerald-700 border-emerald-200";

  return (
    <Badge variant="outline" className={`text-xs font-semibold ${className}`}>
      {label}
    </Badge>
  );
}

export function MyQuotasTab() {
  const [page, setPage] = useState(1);
  const [selectedQuota, setSelectedQuota] = useState<any | null>(null);

  const { data, isLoading } = useGetMyQuotasQuery({ page, limit: 9 });

  const quotas = data?.data ?? [];
  const meta = data?.meta;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-44 animate-pulse rounded-2xl border border-slate-100 bg-slate-100"
          />
        ))}
      </div>
    );
  }

  if (!quotas.length) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-sky-200 bg-white py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-sky-300">
          <ClipboardList className="h-6 w-6" />
        </div>
        <div>
          <p className="text-base font-semibold text-slate-700">
            No quota requests yet
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Requests you submit will show up here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {quotas.map((quota: any) => {
          const productName = quota.productId?.name ?? "—";
          const fulfillment = quota.cylinderOrRefill
            ? "Cylinder Exchange / Refill"
            : "New Package";

          return (
            <button
              key={quota._id}
              onClick={() => setSelectedQuota(quota)}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-xs transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                  {quota.productId?.photo ? (
                    <Image
                      src={quota.productId.photo}
                      alt={productName}
                      fill
                      sizes="56px"
                      className="object-contain p-1.5 mix-blend-multiply"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-300">
                      <ImageOff className="h-5 w-5" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {productName}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-slate-400">
                    <Package className="h-3 w-3 shrink-0" />
                    {fulfillment}
                  </p>
                </div>

                <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-sky-500" />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-black tracking-tight text-slate-900">
                  {quota.volume ?? "0"}{" "}
                  <span className="text-xs font-medium text-slate-400">
                    units
                  </span>
                </span>
                <StatusBadge isClosed={quota.isClosed} />
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    quota.paymentStatus === "PENDING"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {quota.paymentStatus ?? "—"}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Calendar className="h-3 w-3" />
                  {quota.createdAt
                    ? new Date(quota.createdAt).toLocaleDateString()
                    : "—"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {meta && meta.totalPage > 1 && (
        <div className="flex justify-center">
          <PaginationComp
            currentPage={page}
            totalPages={meta.totalPage}
            onPageChange={setPage}
          />
        </div>
      )}

      <QuotaDetailsDialog
        quota={selectedQuota}
        onClose={() => setSelectedQuota(null)}
        StatusBadge={StatusBadge}
      />
    </div>
  );
}