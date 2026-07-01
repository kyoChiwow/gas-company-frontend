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
import { useMakeUserMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    _id: string;
    name: string;
  } | null;
};

export default function MakeUserDialog({ open, onOpenChange, user }: Props) {
  const [makeUser, { isLoading }] = useMakeUserMutation();

  const handleMakeUser = async () => {
    if (!user) return;

    try {
      await makeUser({
        userId: user._id,
      }).unwrap();

      toast.success(`${user.name} is now a User.`);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to make user a User.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-sky-100">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sky-700">
            Change User Role
          </AlertDialogTitle>

          <AlertDialogDescription className="leading-6">
            This will change{" "}
            <span className="font-semibold text-slate-700">{user?.name}</span>s
            role to <span className="font-semibold text-orange-600">User</span>.
            <br />
            <br />
            Any existing Admin or Super Admin permissions will be removed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={isLoading}
            onClick={handleMakeUser}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            {isLoading ? "Updating..." : "Make User"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
