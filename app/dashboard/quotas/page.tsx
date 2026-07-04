/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PaginationComp from "@/components/general/PaginationComp";
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
import { ClipboardList, Search, Trash2, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type DialogTarget = {
  id: string;
  label: string;
} | null;

export default function QuotasPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Separate confirm dialogs for each action
  const [quotaToClose, setQuotaToClose] = useState<DialogTarget>(null);
  const [quotaToDelete, setQuotaToDelete] = useState<DialogTarget>(null);

  const [updateQuota, { isLoading: isClosing }] = useUpdateQuotaMutation();
  const [deleteQuota, { isLoading: isDeleting }] = useDeleteQuotaMutation();

  const { data, isLoading } = useGetAllQuotasQuery({
    searchTerm: search,
    page,
    limit: 10,
  });

  const quotas = data?.data ?? [];
  const meta = data?.meta;

  // ── Handlers ────────────────────────────────────────────────────────

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

  const handleDeleteQuota = async () => {
    if (!quotaToDelete) return;
    try {
      await deleteQuota(quotaToDelete.id).unwrap();
      toast.success("Quota deleted successfully!");
    } catch (error: any) {
      toast.error(
        error?.data?.message ?? "An error occurred while deleting the quota.",
      );
    } finally {
      setQuotaToDelete(null);
    }
  };

  // ── Status badge helper ──────────────────────────────────────────────

  const StatusBadge = ({ status }: { status: string }) => {
    const map: Record<
      string,
      { label: string; className: string }
    > = {
      open: {
        label: "Open",
        className:
          "bg-emerald-50 text-emerald-700 border-emerald-200",
      },
      closed: {
        label: "Closed",
        className: "bg-slate-100 text-slate-500 border-slate-200",
      },
      pending: {
        label: "Pending",
        className:
          "bg-orange-50 text-orange-700 border-orange-200",
      },
    };

    const cfg = map[status?.toLowerCase()] ?? map["pending"];

    return (
      <Badge
        variant="outline"
        className={`text-xs font-semibold ${cfg.className}`}
      >
        {cfg.label}
      </Badge>
    );
  };

  // ── Render ───────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-sky-100 bg-linear-to-r from-sky-50 via-white to-orange-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm shadow-sky-200">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Quotas</h2>
            <p className="text-sm text-slate-500">
              View and manage all customer quota requests.
            </p>
          </div>
        </div>

        {/* Summary pills */}
        {meta && (
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 font-semibold text-sky-700">
              {meta.total ?? "—"} total
            </span>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
        <Input
          placeholder="Search quotas..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border-sky-200 pl-9 focus-visible:border-sky-400 focus-visible:ring-sky-200"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-sky-100 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-sky-50 hover:bg-sky-50">
              <TableHead className="w-14 font-semibold text-sky-700">#</TableHead>
              <TableHead className="font-semibold text-sky-700">Customer</TableHead>
              <TableHead className="font-semibold text-sky-700">Product</TableHead>
              <TableHead className="font-semibold text-sky-700">Quantity</TableHead>
              <TableHead className="font-semibold text-sky-700">Status</TableHead>
              <TableHead className="font-semibold text-sky-700">Created At</TableHead>
              <TableHead className="text-right font-semibold text-sky-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center">
                  <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400" />
                    <span
                      className="h-2 w-2 animate-pulse rounded-full bg-sky-400"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="h-2 w-2 animate-pulse rounded-full bg-orange-400"
                      style={{ animationDelay: "300ms" }}
                    />
                    Loading quotas...
                  </span>
                </TableCell>
              </TableRow>
            ) : quotas.length ? (
              quotas.map((quota: any, index: number) => {
                const isClosed =
                  quota.status?.toLowerCase() === "closed";
                const customerName =
                  quota.userId?.name ?? quota.userId?.email ?? "—";
                const productName =
                  quota.productId?.name ?? quota.productId?.title ?? "—";

                return (
                  <TableRow
                    key={quota._id}
                    className="transition-colors hover:bg-orange-50/50"
                  >
                    <TableCell className="text-slate-400">
                      {(page - 1) * 10 + index + 1}
                    </TableCell>

                    {/* Customer */}
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-800">
                          {customerName}
                        </span>
                        {quota.userId?.email && quota.userId?.name && (
                          <span className="text-xs text-slate-400">
                            {quota.userId.email}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Product */}
                    <TableCell>
                      <span className="inline-flex items-center gap-2 font-medium text-slate-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                        {productName}
                      </span>
                    </TableCell>

                    {/* Quantity */}
                    <TableCell className="text-slate-600">
                      {quota.quantity ?? "—"}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <StatusBadge status={quota.status ?? "pending"} />
                    </TableCell>

                    {/* Created at */}
                    <TableCell className="text-slate-500">
                      {new Date(quota.createdAt).toLocaleDateString()}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-2">
                        {/* Close — only if not already closed */}
                        {!isClosed && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-sky-200 text-sky-600 hover:bg-sky-50 hover:text-sky-700"
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

                        {/* Delete */}
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
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center">
                  <div className="flex flex-col items-center gap-1.5 text-slate-400">
                    <ClipboardList className="h-6 w-6 text-sky-300" />
                    <span className="text-sm">No quotas found.</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
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

      {/* ── Close confirmation ─────────────────────────────────────── */}
      <AlertDialog
        open={!!quotaToClose}
        onOpenChange={(open) => { if (!open) setQuotaToClose(null); }}
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
              The customer will no longer be able to act on it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isClosing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isClosing}
              onClick={handleCloseQuota}
              className="bg-sky-500 text-white hover:bg-sky-600 focus-visible:ring-sky-300"
            >
              {isClosing ? "Closing..." : "Close quota"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Delete confirmation ────────────────────────────────────── */}
      <AlertDialog
        open={!!quotaToDelete}
        onOpenChange={(open) => { if (!open) setQuotaToDelete(null); }}
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
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={handleDeleteQuota}
              className="bg-orange-500 text-white hover:bg-orange-600 focus-visible:ring-orange-300"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}