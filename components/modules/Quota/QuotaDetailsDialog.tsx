/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  ClipboardList,
  Hash,
  Layers,
  ShoppingBag,
  User,
} from "lucide-react";
import Image from "next/image";

interface QuotaDetailsDialogProps {
  quota: any | null;
  onClose: () => void;
  StatusBadge: React.ComponentType<{ isClosed: boolean }>;
}

export function QuotaDetailsDialog({
  quota,
  onClose,
  StatusBadge,
}: QuotaDetailsDialogProps) {
  if (!quota) return null;

  const customerName = quota.userId?.name ?? "—";
  const productName = quota.productId?.name ?? "—";
  const cylinderTypeLabel = quota.cylinderOrRefill
    ? "Cylinder Exchange / Refill"
    : "New Package Acquisition";

  return (
    <Dialog open={!!quota} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex h-dvh w-screen max-w-none flex-col overflow-hidden rounded-none p-0 sm:h-[92vh] sm:w-[95vw] sm:max-w-2xl sm:rounded-2xl md:h-[88vh] lg:max-w-4xl">
        {/* Header Banner */}
        <DialogHeader className="shrink-0 border-b border-slate-100 bg-linear-to-r from-sky-600 via-sky-500 to-orange-400 px-4 py-3 sm:rounded-t-2xl sm:px-6 sm:py-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm sm:h-9 sm:w-9">
              <ClipboardList className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </div>
            <div className="min-w-0">
              <DialogTitle className="truncate text-sm font-bold text-white sm:text-base lg:text-lg">
                Quota Request Allocation
              </DialogTitle>
              <DialogDescription className="truncate text-[11px] text-sky-50/90 sm:text-xs lg:text-sm">
                Reference ID {quota._id?.slice(-8)?.toUpperCase()}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Unified Vertical Scrolling Main Container */}
        <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-3 sm:space-y-6 sm:p-6">
          {/* Top Row: User & Quota Logistics Split */}
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            {/* Box 1: Customer Record Profile */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs sm:p-4">
              <div>
                <h4 className="mb-2.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:mb-3 sm:text-xs">
                  <User className="h-3 w-3 shrink-0" /> Customer Information
                </h4>
                <div className="space-y-2">
                  <div className="wrap-break-word text-sm font-semibold text-slate-800">
                    {customerName}
                  </div>
                  {quota.userId?.email && (
                    <div className="break-all font-mono text-xs text-slate-500 select-all">
                      {quota.userId.email}
                    </div>
                  )}
                  {quota.address && (
                    <div className="mt-2 rounded-lg border border-slate-100 bg-slate-50 p-2 text-xs wrap-break-word text-slate-600">
                      <span className="mb-0.5 block text-[10px] font-semibold uppercase text-slate-400">
                        Shipping Address
                      </span>
                      {quota.address}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Box 2: System Status Matrix */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs sm:p-4">
              <h4 className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:mb-3 sm:text-xs">
                Tracking Details
              </h4>
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-between gap-2 text-sm sm:gap-3">
                  <span className="flex shrink-0 items-center gap-1 text-slate-500">
                    <Hash className="h-3.5 w-3.5" /> Quota ID
                  </span>
                  <span className="truncate font-mono text-xs font-medium text-slate-700 select-all">
                    {quota._id}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 text-sm sm:gap-3">
                  <span className="flex shrink-0 items-center gap-1 text-slate-500">
                    <Layers className="h-3.5 w-3.5" /> Fulfillment Type
                  </span>
                  <span className="text-right text-xs font-semibold text-slate-700">
                    {cylinderTypeLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex shrink-0 items-center gap-1 text-sm text-slate-500">
                    <Calendar className="h-3.5 w-3.5" /> Opened On
                  </span>
                  <span className="text-right text-xs font-medium text-slate-600 sm:text-sm">
                    {quota.createdAt
                      ? new Date(quota.createdAt).toLocaleString()
                      : "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar Summary */}
          <div className="flex flex-col items-start gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-white shadow-sm xs:flex-row xs:items-center xs:justify-between sm:px-5 sm:py-4">
            <span className="flex items-center gap-2 text-xs font-medium text-slate-300 sm:text-sm">
              <ShoppingBag className="h-4 w-4 shrink-0 text-orange-400" />
              Allocated Batch Volume Request
            </span>
            <span className="text-lg font-black tracking-tight text-white sm:text-xl">
              {quota.volume ?? "0"} Units
            </span>
          </div>

          {/* Bottom Section: Connected Product Focus Card */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex flex-col gap-2 border-b border-slate-200/80 bg-slate-50/70 px-4 py-3 xs:flex-row xs:items-center xs:justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <ShoppingBag className="h-4 w-4 shrink-0 text-slate-500" />
                <span>Associated Product Specifications</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 sm:mr-2">
                  Status Flag:
                </span>
                <StatusBadge isClosed={quota.isClosed} />
              </div>
            </div>

            {/* Product Meta Body Flex Panel */}
            <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-5 md:flex-row md:items-start">
              {quota.productId?.photo && (
                <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 shadow-inner sm:h-48 md:w-48">
                  <Image
                    fill
                    src={quota.productId.photo}
                    alt={productName}
                    className="object-contain mix-blend-multiply p-2"
                  />
                </div>
              )}

              <div className="w-full flex-1 space-y-3 sm:space-y-4">
                <div>
                  <h3 className="wrap-break-word text-base font-bold text-slate-800 sm:text-lg">
                    {productName}
                  </h3>
                  <p className="mt-0.5 break-all text-xs font-medium text-slate-400">
                    Base Catalogue Listing ID: {quota.productId?._id}
                  </p>
                </div>

                {quota.productId?.description && (
                  <div className="space-y-1">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Description Overview
                    </span>
                    <p className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm leading-relaxed wrap-break-word text-slate-600">
                      {quota.productId.description}
                    </p>
                  </div>
                )}

                {quota.requirements && (
                  <div className="space-y-1">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-orange-500">
                      Customer Custom Requirements / Notes
                    </span>
                    <p className="rounded-lg border border-orange-100/70 bg-orange-50/40 p-3 text-sm leading-relaxed font-medium wrap-break-word text-slate-700">
                      {quota.requirements}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Core Reference System Mapping Fields */}
            {quota.paymentId && (
              <div className="flex flex-col gap-2.5 border-t border-slate-100 bg-slate-50/60 px-4 py-3.5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-400">
                    Linked Payment Node ID:
                  </span>
                  <span className="break-all rounded border border-slate-200 bg-white px-2 py-0.5 font-mono text-slate-700 select-all">
                    {quota.paymentId}
                  </span>
                  <Badge
                    variant="outline"
                    className="origin-left scale-90 border-sky-200 bg-sky-50 font-bold text-sky-700"
                  >
                    {quota.paymentStatus || "UNKNOWN"}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
