/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight, Hash, MoreVertical } from "lucide-react";

interface PaymentDesktopTableProps {
  onViewDetails: (payment: any) => void;
  payments: any[];
  STATUS_OPTIONS: string[];
  getRef: (payment: any) => string;
  getProductLabel: (payment: any) => string;
  getCustomerLabel: (payment: any) => string;
  currency: (val: number) => string;
  dateFormatter: { format: (date: Date) => string };
  StatusBadge: React.ComponentType<{ status?: string }>;
  MethodBadge: React.ComponentType<{ method?: string }>;
  getStatusConfig: (status?: string) => any;
  onSelectUpdate: (updateData: { id: string; ref: string; nextStatus: string }) => void;
}

export function PaymentDesktopTable({
  onViewDetails,
  payments,
  STATUS_OPTIONS,
  getRef,
  getProductLabel,
  getCustomerLabel,
  currency,
  dateFormatter,
  StatusBadge,
  MethodBadge,
  getStatusConfig,
  onSelectUpdate,
}: PaymentDesktopTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-xl border border-sky-100 shadow-sm md:block">
      <Table>
        <TableHeader>
          <TableRow className="bg-sky-50 hover:bg-sky-50">
            <TableHead className="font-semibold text-sky-700">Reference</TableHead>
            <TableHead className="font-semibold text-sky-700 lg:table-cell hidden">
              Transaction Id
            </TableHead>
            <TableHead className="font-semibold text-sky-700">Product / Order</TableHead>
            <TableHead className="font-semibold text-sky-700 lg:table-cell hidden">
              Delivery Address
            </TableHead>
            <TableHead className="font-semibold text-sky-700">Method</TableHead>
            <TableHead className="font-semibold text-sky-700">Amount</TableHead>
            <TableHead className="font-semibold text-sky-700">Status</TableHead>
            <TableHead className="font-semibold text-sky-700 lg:table-cell hidden">
              Date
            </TableHead>
            <TableHead className="w-12 text-right font-semibold text-sky-700">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {payments.map((payment: any) => (
            <TableRow
              key={payment._id}
              className="group cursor-pointer transition-colors hover:bg-orange-50/50"
              onClick={() => onViewDetails(payment)}
            >
              <TableCell className="font-mono text-xs font-semibold text-slate-700">
                <span className="inline-flex items-center gap-1.5">
                  <Hash className="h-3 w-3 text-sky-400" />
                  {getRef(payment)}
                </span>
              </TableCell>

              <TableCell className="max-w-40 truncate text-xs text-slate-500 lg:table-cell hidden">
                {payment.transactionId || "—"}
              </TableCell>

              <TableCell className="max-w-45 truncate font-medium text-slate-800">
                {getProductLabel(payment)}
              </TableCell>

              <TableCell className="max-w-50 truncate text-slate-500 lg:table-cell hidden">
                {getCustomerLabel(payment)}
              </TableCell>

              <TableCell>
                <MethodBadge method={payment.paymentMethod} />
              </TableCell>

              <TableCell className="font-semibold text-slate-800">
                {currency(parseFloat(payment.amount) || 0)}
              </TableCell>

              <TableCell>
                <StatusBadge status={payment.status} />
              </TableCell>

              <TableCell className="text-xs text-slate-500 lg:table-cell hidden">
                {payment.createdAt
                  ? dateFormatter.format(new Date(payment.createdAt))
                  : "—"}
              </TableCell>

              <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-end gap-1">
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:bg-sky-50 hover:text-sky-600"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      {STATUS_OPTIONS.filter(
                        (s) => s !== (payment.status ?? "pending"),
                      ).map((s) => {
                        const cfg = getStatusConfig(s);
                        const Icon = cfg.icon;
                        return (
                          <DropdownMenuItem
                            key={s}
                            onClick={() =>
                              onSelectUpdate({
                                id: payment._id,
                                ref: getRef(payment),
                                nextStatus: s,
                              })
                            }
                            className="cursor-pointer text-slate-700 focus:bg-sky-50 focus:text-sky-700"
                          >
                            <Icon className="mr-2 h-3.5 w-3.5" />
                            Mark as {cfg.label}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}