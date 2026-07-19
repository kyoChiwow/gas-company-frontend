/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PaginationComp from "@/components/general/PaginationComp";
import { QuotaDetailsDialog } from "@/components/modules/Quota/QuotaDetailsDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteQuotaMutation,
  useGetAllQuotasQuery,
  useUpdateQuotaMutation,
} from "@/redux/features/quota/quota.auth";
import {
  Calendar,
  CheckCircle2,
  ClipboardList,
  Eye,
  Layers,
  PackageOpen,
  Search,
  Sparkles,
  Trash2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type DialogTarget = {
  id: string;
  label: string;
} | null;

export default function QuotasPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Target states
  const [quotaToClose, setQuotaToClose] = useState<DialogTarget>(null);
  const [quotaToOpen, setQuotaToOpen] = useState<DialogTarget>(null);
  const [quotaToDelete, setQuotaToDelete] = useState<DialogTarget>(null);
  const [selectedQuota, setSelectedQuota] = useState<any | null>(null);

  const [updateQuota, { isLoading: isUpdating }] = useUpdateQuotaMutation();
  const [deleteQuota, { isLoading: isDeleting }] = useDeleteQuotaMutation();

  const { data, isLoading } = useGetAllQuotasQuery({
    searchTerm: search,
    page,
    limit: 10,
  });

  const quotas = data?.data ?? [];
  const meta = data?.meta;

  const openCount = quotas.filter((q: any) => !q.isClosed).length;
  const closedCount = quotas.filter((q: any) => q.isClosed).length;

  const handleCloseQuota = async () => {
    if (!quotaToClose) return;
    try {
      await updateQuota({
        id: quotaToClose.id,
        quotaData: { isClosed: "true" },
      }).unwrap();
      toast.success("Quota closed successfully!");
    } catch (error: any) {
      toast.error(
        error?.data?.message ?? "An error occurred while closing the quota.",
      );
    } finally {
      setQuotaToClose(null);
    }
  };

  const handleOpenQuota = async () => {
    if (!quotaToOpen) return;
    try {
      await updateQuota({
        id: quotaToOpen.id,
        quotaData: { isClosed: "false" },
      }).unwrap();
      toast.success("Quota opened successfully!");
    } catch (error: any) {
      toast.error(
        error?.data?.message ?? "An error occurred while opening the quota.",
      );
    } finally {
      setQuotaToOpen(null);
    }
  };

  const handleDeleteQuota = async () => {
    if (!quotaToDelete) return;
    try {
      await deleteQuota(quotaToDelete.id).unwrap();
      toast.success("Quota deleted successfully!");
      if (selectedQuota?._id === quotaToDelete.id) {
        setSelectedQuota(null);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ?? "An error occurred while deleting the quota.",
      );
    } finally {
      setQuotaToDelete(null);
    }
  };

  const StatusBadge = ({ isClosed }: { isClosed: boolean }) => {
    const label = isClosed ? "Closed" : "Open";
    const className = isClosed
      ? "bg-slate-100 text-slate-500 border-slate-200"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";

    return (
      <Badge
        variant="outline"
        className={`gap-1 text-xs font-semibold ${className}`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            isClosed ? "bg-slate-400" : "bg-emerald-500"
          }`}
        />
        {label}
      </Badge>
    );
  };

  const ActionButtons = ({ quota }: { quota: any }) => {
    const customerName = quota.userId?.name ?? quota.userId?.email ?? "—";
    const productName = quota.productId?.name ?? "—";

    return (
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-slate-200 text-slate-600 hover:bg-slate-50"
          onClick={() => setSelectedQuota(quota)}
        >
          <Eye className="mr-1 h-3.5 w-3.5" />
          View
        </Button>

        {quota.isClosed ? (
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
            onClick={() =>
              setQuotaToOpen({
                id: quota._id,
                label: `${customerName} — ${productName}`,
              })
            }
          >
            <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
            Open
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="border-sky-200 text-sky-600 hover:bg-sky-50"
            onClick={() =>
              setQuotaToClose({
                id: quota._id,
                label: `${customerName} — ${productName}`,
              })
            }
          >
            <XCircle className="mr-1 h-3.5 w-3.5" />
            Close
          </Button>
        )}

        <Button
          variant="destructive"
          size="sm"
          className="bg-orange-100 text-orange-700 shadow-none hover:bg-orange-200"
          onClick={() =>
            setQuotaToDelete({
              id: quota._id,
              label: `${customerName} — ${productName}`,
            })
          }
        >
          <Trash2 className="mr-1 h-3.5 w-3.5" />
          Delete
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-4">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-linear-to-r from-sky-600 via-sky-500 to-orange-400 p-5 shadow-sm sm:p-6">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-8 left-1/3 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                Quota Requests
              </h2>
              <p className="text-xs text-sky-50/90 sm:text-sm">
                Review, approve, and manage every customer quota.
              </p>
            </div>
          </div>

          {/* Mini stat pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              {meta?.total ?? 0} total
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              {openCount} open on page
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              {closedCount} closed on page
            </div>
          </div>
        </div>
      </div>

      {/* ── Search bar ─────────────────────────────────────────────── */}
      <div className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
        <Input
          placeholder="Search by customer, product..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border-sky-200 bg-white pl-9 shadow-xs focus-visible:border-sky-400 focus-visible:ring-sky-200"
        />
      </div>

      {/* ── Loading state ──────────────────────────────────────────── */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-sky-100 bg-white py-20">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-sky-400" />
            <span
              className="h-2.5 w-2.5 animate-pulse rounded-full bg-sky-400"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-2.5 w-2.5 animate-pulse rounded-full bg-orange-400"
              style={{ animationDelay: "300ms" }}
            />
          </span>
          <p className="text-sm font-medium text-slate-500">
            Loading quotas...
          </p>
        </div>
      )}

      {/* ── Empty state ────────────────────────────────────────────── */}
      {!isLoading && quotas.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-sky-200 bg-white py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-sky-300">
            <PackageOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-700">
              No quotas found
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {search
                ? `Nothing matches "${search}".`
                : "New requests will appear here."}
            </p>
          </div>
        </div>
      )}

      {/* ── Desktop table (lg and up) ──────────────────────────────── */}
      {!isLoading && quotas.length > 0 && (
        <div className="hidden overflow-hidden rounded-2xl border border-sky-100 shadow-sm lg:block">
          <Table>
            <TableHeader>
              <TableRow className="bg-sky-50 hover:bg-sky-50">
                <TableHead className="w-12 font-semibold text-sky-700">
                  #
                </TableHead>
                <TableHead className="font-semibold text-sky-700">
                  Customer
                </TableHead>
                <TableHead className="font-semibold text-sky-700">
                  Product
                </TableHead>
                <TableHead className="font-semibold text-sky-700">
                  Volume
                </TableHead>
                <TableHead className="font-semibold text-sky-700">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-sky-700">
                  Requested On
                </TableHead>
                <TableHead className="text-right font-semibold text-sky-700">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {quotas.map((quota: any, index: number) => {
                const customerName =
                  quota.userId?.name ?? quota.userId?.email ?? "—";
                const productName = quota.productId?.name ?? "—";
                const initial = customerName?.[0]?.toUpperCase() ?? "?";

                return (
                  <TableRow
                    key={quota._id}
                    className="transition-colors hover:bg-orange-50/40"
                  >
                    <TableCell className="text-slate-400">
                      {(page - 1) * 10 + index + 1}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-400 to-sky-600 text-xs font-bold text-white">
                          {initial}
                        </div>
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate font-medium text-slate-800">
                            {customerName}
                          </span>
                          {quota.userId?.email && quota.userId?.name && (
                            <span className="truncate text-xs text-slate-400">
                              {quota.userId.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="inline-flex items-center gap-2 font-medium text-slate-700">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                        <span className="truncate">{productName}</span>
                      </span>
                    </TableCell>

                    <TableCell className="font-medium text-slate-600">
                      {quota.volume ?? "—"}
                    </TableCell>

                    <TableCell>
                      <StatusBadge isClosed={quota.isClosed} />
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-slate-500">
                      {new Date(quota.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="inline-flex justify-end">
                        <ActionButtons quota={quota} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {meta && meta.totalPage > 1 && (
            <div className="flex justify-end border-t border-sky-50 px-4 py-3">
              <PaginationComp
                currentPage={page}
                totalPages={meta.totalPage}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      )}

      {/* ── Mobile / tablet card list (below lg) ───────────────────── */}
      {!isLoading && quotas.length > 0 && (
        <div className="space-y-3 lg:hidden">
          {quotas.map((quota: any, index: number) => {
            const customerName =
              quota.userId?.name ?? quota.userId?.email ?? "—";
            const productName = quota.productId?.name ?? "—";
            const initial = customerName?.[0]?.toUpperCase() ?? "?";

            return (
              <div
                key={quota._id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-400 to-sky-600 text-xs font-bold text-white">
                      {initial}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {customerName}
                      </p>
                      {quota.userId?.email && (
                        <p className="truncate text-xs text-slate-400">
                          {quota.userId.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <StatusBadge isClosed={quota.isClosed} />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-3 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Layers className="h-3.5 w-3.5 shrink-0 text-orange-400" />
                    <span className="truncate font-medium text-slate-700">
                      {productName}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-1.5 text-slate-500">
                    <span className="font-semibold text-slate-700">
                      {quota.volume ?? "—"}
                    </span>
                    units
                  </div>
                  <div className="col-span-2 flex items-center gap-1.5 text-slate-400">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    {new Date(quota.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    <span className="ml-auto text-slate-300">
                      #{(page - 1) * 10 + index + 1}
                    </span>
                  </div>
                </div>

                <div className="mt-3 border-t border-slate-100 pt-3">
                  <ActionButtons quota={quota} />
                </div>
              </div>
            );
          })}

          {meta && meta.totalPage > 1 && (
            <div className="flex justify-center pt-2">
              <PaginationComp
                currentPage={page}
                totalPages={meta.totalPage}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      )}

      {/* Quota Details Sheet Modal Injection */}
      <QuotaDetailsDialog
        quota={selectedQuota}
        onClose={() => setSelectedQuota(null)}
        StatusBadge={StatusBadge}
      />

      {/* Close confirmation */}
      <AlertDialog
        open={!!quotaToClose}
        onOpenChange={(open) => !open && setQuotaToClose(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Close quota</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark the quota for{" "}
              <span className="font-medium text-slate-700">
                {quotaToClose?.label}
              </span>{" "}
              as <span className="font-semibold text-slate-700">closed</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isUpdating}
              onClick={handleCloseQuota}
              className="bg-sky-500 text-white hover:bg-sky-600"
            >
              {isUpdating ? "Closing..." : "Close quota"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Open confirmation */}
      <AlertDialog
        open={!!quotaToOpen}
        onOpenChange={(open) => !open && setQuotaToOpen(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Open quota</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark the quota for{" "}
              <span className="font-medium text-slate-700">
                {quotaToOpen?.label}
              </span>{" "}
              as <span className="font-semibold text-slate-700">open</span>{" "}
              again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isUpdating}
              onClick={handleOpenQuota}
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {isUpdating ? "Opening..." : "Open quota"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!quotaToDelete}
        onOpenChange={(open) => !open && setQuotaToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete quota</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the quota for{" "}
              <span className="font-medium text-slate-700">
                {quotaToDelete?.label}
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={handleDeleteQuota}
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}