/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  Check,
  Copy,
  CreditCard,
  ExternalLink,
  FileText,
  Hash,
  Receipt,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface PaymentDetailsDialogProps {
  payment: any | null;
  onClose: () => void;
  currency: (val: number) => string;
  dateFormatter: { format: (date: Date) => string };
  StatusBadge: React.ComponentType<{ status?: string }>;
  MethodBadge: React.ComponentType<{ method?: string }>;
  getProductLabel: (payment: any) => string;
}

function CopyableValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available — silently ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group inline-flex min-w-0 items-center gap-1.5 rounded-md px-1 py-0.5 transition-colors hover:bg-sky-50"
      title="Copy"
    >
      <span className="truncate">{value}</span>
      {copied ? (
        <Check className="h-3 w-3 shrink-0 text-emerald-500" />
      ) : (
        <Copy className="h-3 w-3 shrink-0 text-slate-300 group-hover:text-sky-500" />
      )}
    </button>
  );
}

export function PaymentDetailsDialog({
  payment,
  onClose,
  currency,
  dateFormatter,
  StatusBadge,
  MethodBadge,
  getProductLabel,
}: PaymentDetailsDialogProps) {
  if (!payment) return null;

  const isLegacyFormat = payment.invoiceUrl?.includes("/raw/upload/");

  return (
    <Dialog open={!!payment} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex h-[92vh] w-[95vw] md:w-[105vw] max-w-4xl flex-col overflow-hidden rounded-2xl p-0 md:h-[88vh]">
        {/* Header Banner */}
        <DialogHeader className="shrink-0 rounded-t-2xl border-b border-slate-100 bg-linear-to-r from-sky-600 via-sky-500 to-orange-400 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
              <Receipt className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-base font-bold text-white sm:text-lg">
                Transaction Details
              </DialogTitle>
              <DialogDescription className="truncate text-xs text-sky-50/90 sm:text-sm">
                Reference {payment._id?.slice(-8)?.toUpperCase()}
              </DialogDescription>
            </div>
            <StatusBadge status={payment.status} />
          </div>
        </DialogHeader>

        {/* Unified vertical scroll container */}
        <div className="flex-1 space-y-5 overflow-y-auto bg-sky-50/30 p-4 sm:space-y-6 sm:p-6">
          {/* Grand Total — moved to top since it's the most-scanned number */}
          <div className="flex flex-col gap-3 rounded-2xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <CreditCard className="h-4 w-4 text-orange-400" />
              Grand Total Paid
            </span>
            <span className="text-2xl font-black tracking-tight text-white">
              {currency(parseFloat(payment.amount) || 0)}
            </span>
          </div>

          {/* Core data grid */}
          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-xl border border-sky-100 bg-white p-4 shadow-sm">
              <h4 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-500">
                <Hash className="h-3.5 w-3.5" />
                Core Information
              </h4>
              <div className="space-y-3">
                <div className="flex items-start md:items-center justify-between flex-col gap-3 md:flex-row text-sm">
                  <span className="shrink-0 text-slate-500">System ID</span>
                  <span className="min-w-0 font-mono text-xs font-medium text-slate-700">
                    <CopyableValue value={payment._id} />
                  </span>
                </div>
                <div className="flex items-start md:items-center justify-between flex-col gap-3 md:flex-row text-sm">
                  <span className="shrink-0 text-slate-500">
                    Transaction ID
                  </span>
                  <span className="min-w-0 font-semibold text-slate-800">
                    {payment.transactionId ? (
                      <CopyableValue value={payment.transactionId} />
                    ) : (
                      "—"
                    )}
                  </span>
                </div>
                <div className="flex items-start md:items-center justify-between gap-3 flex-col md:flex-row text-sm">
                  <span className="shrink-0 text-slate-500">
                    Product / Item
                  </span>
                  <span className="truncate font-medium text-slate-800">
                    {getProductLabel(payment)}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-orange-100 bg-white p-4 shadow-sm">
              <h4 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-orange-500">
                <Calendar className="h-3.5 w-3.5" />
                Payment and Logistics
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="shrink-0 text-sm text-slate-500">
                    Status
                  </span>
                  <StatusBadge status={payment.status} />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="shrink-0 text-sm text-slate-500">
                    Method
                  </span>
                  <MethodBadge method={payment.paymentMethod} />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="shrink-0 text-sm text-slate-500">
                    Placed On
                  </span>
                  <span className="text-right text-sm font-medium text-slate-600">
                    {payment.createdAt
                      ? dateFormatter.format(new Date(payment.createdAt))
                      : "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice document viewer */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-sky-100 bg-sky-50/60 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FileText className="h-4 w-4 text-sky-500" />
                <span>Invoice Document</span>
              </div>
              {payment.invoiceUrl ? (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-lg border-sky-200 bg-white text-xs font-medium text-sky-700 shadow-sm hover:bg-sky-50"
                >
                  <Link
                    href={payment.invoiceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Open Fullscreen</span>
                    <span className="sm:hidden">Open</span>
                  </Link>
                </Button>
              ) : null}
            </div>

            {/* Responsive height: shorter on phones, taller on desktop, never
                a fixed value that fights small viewports. */}
            <div className="relative flex h-[45vh] min-h-70 w-full items-center justify-center bg-slate-100 sm:h-[50vh] md:h-125">
              {!payment.invoiceUrl ? (
                <div className="p-8 text-center text-slate-400">
                  <FileText className="mx-auto mb-2 h-12 w-12 opacity-30" />
                  <p className="text-sm">
                    No invoice attached to this transaction.
                  </p>
                </div>
              ) : isLegacyFormat ? (
                <div className="max-w-sm p-8 text-center">
                  <FileText className="mx-auto mb-3 h-11 w-11 text-slate-300" />
                  <h5 className="mb-1 text-sm font-semibold text-slate-700">
                    Legacy Format
                  </h5>
                  <p className="text-xs leading-relaxed text-slate-500">
                    This document uses an older backend structure. Inline
                    previews are unavailable, but you can view it safely using
                    the button above.
                  </p>
                </div>
              ) : (
                <object
                  data={`${payment.invoiceUrl}#view=FitH&toolbar=1`}
                  type="application/pdf"
                  className="block h-full w-full"
                >
                  {/* Fallback for browsers/webviews (many mobile browsers)
                      that can't render <object type="application/pdf">. */}
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                    <FileText className="h-11 w-11 text-slate-300" />
                    <p className="max-w-xs text-xs leading-relaxed text-slate-500">
                      Inline preview isn&apos;t supported on this device.
                    </p>
                    <Button
                      asChild
                      size="sm"
                      className="rounded-lg bg-linear-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500"
                    >
                      <a
                        href={payment.invoiceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open PDF
                      </a>
                    </Button>
                  </div>
                </object>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
