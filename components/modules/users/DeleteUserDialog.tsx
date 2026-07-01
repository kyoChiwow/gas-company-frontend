/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { useDeleteUserMutation } from "@/redux/features/auth/auth.api";
import { AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    _id: string;
    name: string;
  } | null;
};

export default function DeleteUserDialog({ open, onOpenChange, user }: Props) {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDeleteUser = async (e: React.MouseEvent) => {
    if (!user) return;
    e.preventDefault(); 

    try {
      await deleteUser({
        userId: user._id,
      }).unwrap();

      toast.success(`${user.name} has been deleted successfully.`);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to complete account deletion.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md border border-orange-100 bg-white p-6 shadow-xl shadow-orange-100/20 rounded-2xl animate-in fade-in-50 zoom-in-95 duration-200">
        <AlertDialogHeader className="flex flex-col items-center text-center">
          {/* Animated Danger Icon Cluster */}
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 border border-orange-100 shadow-xs">
            <AlertTriangle className="h-7 w-7 text-orange-500 animate-pulse" />
          </div>

          {/* Heading */}
          <AlertDialogTitle className="text-xl font-bold tracking-tight text-slate-800">
            Confirm Account Deletion
          </AlertDialogTitle>

          {/* Body Context Block */}
          <AlertDialogDescription className="mt-2 text-sm leading-relaxed text-slate-500">
            You are initiating a permanent action to remove{" "}
            <span className="inline-block rounded-md bg-orange-50/70 px-2 py-0.5 font-semibold text-orange-700 border border-orange-100/50">
              {user?.name ?? "this system user"}
            </span>
            . This configuration structural change cannot be reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Dynamic Action Trigger Tray */}
        <AlertDialogFooter className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-center sm:gap-3">
          <AlertDialogCancel 
            disabled={isLoading}
            className="w-full sm:w-28 border-slate-200 text-slate-500 hover:bg-slate-50 font-medium h-10 transition-colors"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isLoading}
            onClick={handleDeleteUser}
            className="w-full sm:w-32 bg-orange-500 text-white font-medium h-10 shadow-sm shadow-orange-200 hover:bg-orange-600 active:bg-orange-700 transition-all focus:ring-2 focus:ring-orange-100 border-0 flex items-center justify-center gap-1.5"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete User</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
