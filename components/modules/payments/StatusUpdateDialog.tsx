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
import { Loader2, RefreshCcw } from "lucide-react";

interface StatusUpdateDialogProps {
  paymentToUpdate: { ref: string; nextStatus: string } | null;
  onClose: () => void;
  onConfirm: () => void;
  isUpdating: boolean;
  getStatusLabel: (status?: string) => string;
}

export function StatusUpdateDialog({
  paymentToUpdate,
  onClose,
  onConfirm,
  isUpdating,
  getStatusLabel,
}: StatusUpdateDialogProps) {
  return (
    <AlertDialog open={!!paymentToUpdate} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="w-[92vw] max-w-sm rounded-2xl sm:max-w-md">
        <AlertDialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-sky-500 sm:mx-0">
            <RefreshCcw className="h-5 w-5" />
          </div>
          <AlertDialogTitle className="text-center sm:text-left">
            Update payment status
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center sm:text-left">
            Mark payment{" "}
            <span className="font-mono font-medium text-slate-700">
              {paymentToUpdate?.ref}
            </span>{" "}
            as{" "}
            <span className="font-semibold text-slate-700">
              {getStatusLabel(paymentToUpdate?.nextStatus)}
            </span>
            ? This will update the record immediately.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col-reverse gap-2 sm:flex-row">
          <AlertDialogCancel disabled={isUpdating} className="mt-0 w-full rounded-xl sm:w-auto">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isUpdating}
            onClick={onConfirm}
            className="w-full rounded-xl bg-linear-to-r from-sky-600 to-sky-500 text-white shadow-sm shadow-sky-200 hover:from-sky-700 hover:to-sky-600 focus-visible:ring-sky-300 sm:w-auto"
          >
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Confirm"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}