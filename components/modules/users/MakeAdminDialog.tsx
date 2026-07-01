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
import { useMakeAdminMutation } from "@/redux/features/auth/auth.api";
import { Shield } from "lucide-react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    _id: string;
    name: string;
  } | null;
};

export default function MakeAdminDialog({ open, onOpenChange, user }: Props) {
  const [makeAdmin, { isLoading }] = useMakeAdminMutation();

  const handleMakeAdmin = async () => {
    if (!user) return;

    try {
      await makeAdmin({
        userId: user._id,
      }).unwrap();

      toast.success(`${user.name} is now an Admin.`);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to make user Admin.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-sky-100">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-sky-600">
            <Shield className="h-5 w-5" />
            Make Admin
          </AlertDialogTitle>

          <AlertDialogDescription>
            Promote{" "}
            <span className="font-semibold text-slate-800">{user?.name}</span>{" "}
            to <strong>Admin</strong>?
            <br />
            They will gain administrator privileges.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={isLoading}
            onClick={handleMakeAdmin}
            className="bg-sky-500 hover:bg-sky-600"
          >
            {isLoading ? "Updating..." : "Make Admin"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
