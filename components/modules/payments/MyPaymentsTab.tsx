/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import PaginationComp from "@/components/general/PaginationComp";
import {
  Banknote,
  Calendar,
  ChevronRight,
  CreditCard,
  Hash,
  ImageOff,
  Receipt,
  Wallet,
} from "lucide-react";
import { useGetMyPaymentsQuery } from "@/redux/features/payments/payments.auth";
import { PaymentDetailsDialog } from "./PaymentDetailsDialog";

const currency = (val: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(val || 0);

const dateFormatter = {
  format: (date: Date) =>
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
};

const paymentStatusStyles: Record<string, string> = {
  PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
  UNPAID: "bg-orange-50 text-orange-700 border-orange-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  FAILED: "bg-rose-50 text-rose-700 border-rose-200",
  REFUNDED: "bg-slate-100 text-slate-500 border-slate-200",
};

export function StatusBadge({ status }: { status?: string }) {
  const key = (status ?? "").toUpperCase();
  const className =
    paymentStatusStyles[key] ?? "bg-slate-100 text-slate-500 border-slate-200";
  return (
    <Badge variant="outline" className={`text-xs font-semibold ${className}`}>
      {status ?? "Unknown"}
    </Badge>
  );
}

const methodMeta: Record<string, { label: string; icon: any }> = {
  cash_on_delivery: { label: "Cash on Delivery", icon: Banknote },
  online: { label: "Online Payment", icon: CreditCard },
  card: { label: "Card Payment", icon: CreditCard },
};

export function MethodBadge({ method }: { method?: string }) {
  const meta = methodMeta[method ?? ""] ?? {
    label: (method ?? "Unknown").replace(/_/g, " "),
    icon: Wallet,
  };
  const Icon = meta.icon;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-semibold capitalize text-sky-700">
      <Icon className="h-3 w-3" />
      {meta.label}
    </span>
  );
}

export function getProductLabel(payment: any) {
  return (
    payment?.quota?.productId?.name ??
    payment?.productId?.name ??
    "—"
  );
}

export function MyPaymentsTab() {
  const [page, setPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);

  const { data, isLoading } = useGetMyPaymentsQuery({ page, limit: 9 });

  const payments = data?.data ?? [];
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

  if (!payments.length) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-sky-200 bg-white py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-sky-300">
          <Receipt className="h-6 w-6" />
        </div>
        <div>
          <p className="text-base font-semibold text-slate-700">
            No payments yet
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Your payment history will show up here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {payments.map((payment: any) => {
          const productName = getProductLabel(payment);
          const photo =
            payment?.quota?.productId?.photo ?? payment?.productId?.photo;

          return (
            <button
              key={payment._id}
              onClick={() => setSelectedPayment(payment)}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-xs transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                  {photo ? (
                    <Image
                      src={photo}
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
                  <p className="mt-0.5 flex items-center gap-1 truncate font-mono text-[11px] text-slate-400">
                    <Hash className="h-3 w-3 shrink-0" />
                    {payment.transactionId}
                  </p>
                </div>

                <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-sky-500" />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-black tracking-tight text-slate-900">
                  {currency(parseFloat(payment.amount) || 0)}
                </span>
                <StatusBadge status={payment.status} />
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                <MethodBadge method={payment.paymentMethod} />
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Calendar className="h-3 w-3" />
                  {payment.createdAt
                    ? dateFormatter.format(new Date(payment.createdAt))
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

      <PaymentDetailsDialog
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
        currency={currency}
        dateFormatter={dateFormatter}
        StatusBadge={StatusBadge}
        MethodBadge={MethodBadge}
        getProductLabel={getProductLabel}
      />
    </div>
  );
}