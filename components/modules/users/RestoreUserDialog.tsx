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
import { useRestoreUserMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    _id: string;
    name: string;
  } | null;
};

export default function RestoreUserDialog({ open, onOpenChange, user }: Props) {
  const [restoreUser, { isLoading }] = useRestoreUserMutation();

  const handleRestoreUser = async () => {
    if (!user) return;

    try {
      await restoreUser({
        userId: user._id,
      }).unwrap();

      toast.success(`${user.name} has been restored.`);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to restore user.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-sky-100">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sky-700">
            Restore User
          </AlertDialogTitle>

          <AlertDialogDescription className="leading-6">
            This will restore{" "}
            <span className="font-semibold text-slate-700">{user?.name}</span>.
            The user will be able to access the system again.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={isLoading}
            onClick={handleRestoreUser}
            className="bg-sky-500 hover:bg-sky-600 text-white"
          >
            {isLoading ? "Restoring..." : "Restore User"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
