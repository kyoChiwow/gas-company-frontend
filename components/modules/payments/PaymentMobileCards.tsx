/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { ChevronRight, Hash } from "lucide-react";

interface PaymentMobileCardsProps {
  payments: any[];
  STATUS_OPTIONS: string[];
  getRef: (payment: any) => string;
  getProductLabel: (payment: any) => string;
  currency: (val: number) => string;
  dateFormatter: { format: (date: Date) => string };
  StatusBadge: React.ComponentType<{ status?: string }>;
  MethodBadge: React.ComponentType<{ method?: string }>;
  getStatusConfig: (status?: string) => any;
  onSelectUpdate: (updateData: { id: string; ref: string; nextStatus: string }) => void;
  onViewDetails: (payment: any) => void;
}

export function PaymentMobileCards({
  payments,
  STATUS_OPTIONS,
  getRef,
  getProductLabel,
  currency,
  dateFormatter,
  StatusBadge,
  MethodBadge,
  getStatusConfig,
  onSelectUpdate,
  onViewDetails,
}: PaymentMobileCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
      {payments.map((payment: any) => (
        <div
          key={payment._id}
          onClick={() => onViewDetails(payment)}
          className="group relative cursor-pointer overflow-hidden rounded-2xl border border-sky-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md active:translate-y-0 active:shadow-sm"
        >
          {/* Accent bar */}
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-sky-400 to-orange-400 opacity-0 transition-opacity group-hover:opacity-100" />

          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wide text-slate-400">
                <Hash className="h-3 w-3 text-sky-400" />
                {getRef(payment)}
              </p>
              <p className="mt-1 truncate text-[15px] font-semibold text-slate-800">
                {getProductLabel(payment)}
              </p>
            </div>
            <StatusBadge status={payment.status} />
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50/70 px-3 py-2">
            <MethodBadge method={payment.paymentMethod} />
            <span className="text-base font-bold text-orange-600">
              {currency(parseFloat(payment.amount) || 0)}
            </span>
          </div>

          <div className="mt-2.5 flex items-center justify-between">
            {payment.createdAt ? (
              <p className="text-xs text-slate-400">
                {dateFormatter.format(new Date(payment.createdAt))}
              </p>
            ) : (
              <span />
            )}
            <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-sky-500 opacity-0 transition-opacity group-hover:opacity-100">
              View details
              <ChevronRight className="h-3 w-3" />
            </span>
          </div>

          {STATUS_OPTIONS.filter((s) => s !== (payment.status ?? "pending")).length > 0 && (
            <div
              className="mt-3 flex flex-wrap gap-1.5 border-t border-sky-50 pt-3"
              onClick={(e) => e.stopPropagation()}
            >
              {STATUS_OPTIONS.filter((s) => s !== (payment.status ?? "pending")).map((s) => {
                const cfg = getStatusConfig(s);
                const Icon = cfg.icon;
                return (
                  <Button
                    key={s}
                    variant="outline"
                    size="sm"
                    className="h-8 flex-1 min-w-fit border-sky-200 text-xs text-sky-600 hover:border-sky-300 hover:bg-sky-50"
                    onClick={() =>
                      onSelectUpdate({
                        id: payment._id,
                        ref: getRef(payment),
                        nextStatus: s,
                      })
                    }
                  >
                    <Icon className="mr-1 h-3.5 w-3.5" />
                    {cfg.label}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}