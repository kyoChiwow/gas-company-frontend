/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PaginationComp from "@/components/general/PaginationComp";
import { PaymentDesktopTable } from "@/components/modules/payments/PaymentDesktopTable";
import { PaymentDetailsDialog } from "@/components/modules/payments/PaymentDetailsDialog";
import { PaymentMobileCards } from "@/components/modules/payments/PaymentMobileCards";
import { StatusUpdateDialog } from "@/components/modules/payments/StatusUpdateDialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetAllPaymentsQuery,
  useUpdatePaymentMutation,
} from "@/redux/features/payments/payments.auth";

import {
  BadgeCheck,
  CheckCircle2,
  Clock,
  CreditCard,
  Receipt,
  RefreshCcw,
  Search,
  Truck,
  Wallet,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const currency = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
}).format;

const dateFormatter = new Intl.DateTimeFormat("en-BD", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const STATUS_CONFIG: Record<string, { label: string; icon: any; className: string; dot: string }> = {
  pending: { label: "Pending", icon: Clock, className: "border-amber-200 bg-amber-50 text-amber-700", dot: "bg-amber-400" },
  paid: { label: "Paid", icon: CheckCircle2, className: "border-emerald-200 bg-emerald-50 text-emerald-700", dot: "bg-emerald-400" },
  completed: { label: "Completed", icon: CheckCircle2, className: "border-emerald-200 bg-emerald-50 text-emerald-700", dot: "bg-emerald-400" },
  failed: { label: "Failed", icon: XCircle, className: "border-red-200 bg-red-50 text-red-700", dot: "bg-red-400" },
  refunded: { label: "Refunded", icon: RefreshCcw, className: "border-slate-200 bg-slate-50 text-slate-600", dot: "bg-slate-400" },
};

const getStatusConfig = (status?: string) =>
  STATUS_CONFIG[(status ?? "pending").toLowerCase()] ?? STATUS_CONFIG.pending;

const STATUS_OPTIONS = ["UNPAID", "PAID", "FAILED", "REFUNDED"];

function StatusBadge({ status }: { status?: string }) {
  const cfg = getStatusConfig(status);
  const Icon = cfg.icon;
  return (
    <Badge variant="secondary" className={`gap-1.5 font-medium ${cfg.className}`}>
      <Icon className="h-3 w-3" />
      {cfg.label}
    </Badge>
  );
}

function MethodBadge({ method }: { method?: string }) {
  const isCod = method === "cash_on_delivery";
  const Icon = isCod ? Truck : CreditCard;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${isCod ? "text-orange-600" : "text-sky-600"}`}>
      <Icon className="h-3.5 w-3.5" />
      {isCod ? "Cash on Delivery" : "Online (SSLCommerz)"}
    </span>
  );
}

export default function PaymentPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);

  const [paymentToUpdate, setPaymentToUpdate] = useState<{ id: string; ref: string; nextStatus: string } | null>(null);

  const { data, isLoading } = useGetAllPaymentsQuery({
    searchTerm: search,
    status: statusFilter === "all" ? undefined : statusFilter,
    page,
    limit: 10,
  });

  const [updatePayment, { isLoading: isUpdating }] = useUpdatePaymentMutation();

  const payments = data?.data ?? [];
  const meta = data?.meta;

  const totalRevenue = payments.reduce((sum: number, p: any) => {
    const amt = parseFloat(p?.amount);
    const isSettled = ["paid", "completed"].includes((p?.status ?? "").toLowerCase());
    return isSettled && !isNaN(amt) ? sum + amt : sum;
  }, 0);

  const pendingCount = payments.filter((p: any) => (p?.status ?? "").toUpperCase() === "UNPAID").length;
  const codCount = payments.filter((p: any) => p?.paymentMethod === "cash_on_delivery").length;

  const handleConfirmUpdate = async () => {
    if (!paymentToUpdate) return;
    try {
      await updatePayment({
        id: paymentToUpdate.id,
        paymentData: { status: paymentToUpdate.nextStatus },
      }).unwrap();
      toast.success(`Payment marked as ${paymentToUpdate.nextStatus}.`);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to update payment status.");
    } finally {
      setPaymentToUpdate(null);
    }
  };

  const getRef = (payment: any) => payment?._id?.slice(-8)?.toUpperCase() ?? "—";
  const getCustomerLabel = (payment: any) => payment?.quotaId?.address || payment?.quota?.address || payment?.customerName || payment?.address || "—";
  const getProductLabel = (payment: any) => payment?.quotaId?.productId?.name || payment?.quota?.productId?.name || payment?.productName || "—";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-sky-100 bg-linear-to-r from-sky-50 via-white to-orange-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm shadow-sky-200">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">Payments</h2>
            <p className="text-sm text-slate-500">Track and manage all incoming transactions.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-500">
            <BadgeCheck className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">Revenue (page)</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-800 wrap-break-word">{currency(totalRevenue)}</p>
        </div>

        <div className="rounded-xl border border-amber-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-amber-500">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">Pending (page)</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-800">{pendingCount}</p>
        </div>

        <div className="rounded-xl border border-orange-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-orange-500">
            <Truck className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">COD Orders (page)</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-800">{codCount}</p>
        </div>

        <div className="rounded-xl border border-sky-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sky-500">
            <Receipt className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">Total Transactions</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-800">{meta?.total ?? payments.length}</p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative max-w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
            <Input
              placeholder="Search by ref, customer..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="border-sky-200 pl-9 focus-visible:border-sky-400 focus-visible:ring-sky-200"
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={(val) => {
              setStatusFilter(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full border-sky-200 sm:w-44">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {getStatusConfig(s).label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {!isLoading && (
          <p className="text-sm text-slate-400">
            Showing <span className="font-semibold text-slate-600">{payments.length}</span> of{" "}
            <span className="font-semibold text-slate-600">{meta?.total ?? payments.length}</span> payments
          </p>
        )}
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl border border-sky-100 bg-sky-50/60" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && payments.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-sky-200 bg-sky-50/40 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-sky-300 shadow-sm">
            <Wallet className="h-7 w-7" />
          </div>
          <div>
            <p className="font-semibold text-slate-700">
              {search || statusFilter !== "all" ? "No matching payments" : "No payments yet"}
            </p>
            <p className="text-sm text-slate-400">
              {search
                ? `Nothing found for "${search}".`
                : statusFilter !== "all"
                  ? `No payments with status "${getStatusConfig(statusFilter).label}".`
                  : "Transactions will appear here once orders come in."}
            </p>
          </div>
        </div>
      )}

      {/* Main Content Layout Blocks */}
      {!isLoading && payments.length > 0 && (
        <>
          <PaymentDesktopTable
            onViewDetails={setSelectedPayment}
            payments={payments}
            STATUS_OPTIONS={STATUS_OPTIONS}
            getRef={getRef}
            getProductLabel={getProductLabel}
            getCustomerLabel={getCustomerLabel}
            currency={currency}
            dateFormatter={dateFormatter}
            StatusBadge={StatusBadge}
            MethodBadge={MethodBadge}
            getStatusConfig={getStatusConfig}
            onSelectUpdate={setPaymentToUpdate}
          />

          <PaymentMobileCards
          onViewDetails={setSelectedPayment}
            payments={payments}
            STATUS_OPTIONS={STATUS_OPTIONS}
            getRef={getRef}
            getProductLabel={getProductLabel}
            currency={currency}
            dateFormatter={dateFormatter}
            StatusBadge={StatusBadge}
            MethodBadge={MethodBadge}
            getStatusConfig={getStatusConfig}
            onSelectUpdate={setPaymentToUpdate}
          />
        </>
      )}

      {meta && meta.totalPage > 1 && (
        <div className="flex justify-end">
          <PaginationComp currentPage={page} totalPages={meta.totalPage} onPageChange={setPage} />
        </div>
      )}

      <StatusUpdateDialog
        paymentToUpdate={paymentToUpdate}
        onClose={() => setPaymentToUpdate(null)}
        onConfirm={handleConfirmUpdate}
        isUpdating={isUpdating}
        getStatusLabel={(status) => getStatusConfig(status).label}
      />

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