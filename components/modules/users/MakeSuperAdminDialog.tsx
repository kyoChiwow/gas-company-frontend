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
import { Crown } from "lucide-react";
import { toast } from "sonner";
import { useMakeSuperAdminMutation } from "@/redux/features/auth/auth.api";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    _id: string;
    name: string;
  } | null;
};

export default function MakeSuperAdminDialog({
  open,
  onOpenChange,
  user,
}: Props) {
  const [makeSuperAdmin, { isLoading }] =
    useMakeSuperAdminMutation();

  const handleMakeSuperAdmin = async () => {
    if (!user) return;

    try {
      await makeSuperAdmin({
        userId: user._id,
      }).unwrap();

      toast.success(`${user.name} is now a Super Admin.`);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(
        error?.data?.message ??
          "Failed to make user Super Admin."
      );
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-orange-100">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-orange-600">
            <Crown className="h-5 w-5" />
            Make Super Admin
          </AlertDialogTitle>

          <AlertDialogDescription>
            Promote{" "}
            <span className="font-semibold text-slate-800">
              {user?.name}
            </span>{" "}
            to <strong>Super Admin</strong>?
            <br />
            This grants full access to every administrative feature.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isLoading}
            onClick={handleMakeSuperAdmin}
            className="bg-orange-500 hover:bg-orange-600"
          >
            {isLoading ? "Updating..." : "Make Super Admin"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}