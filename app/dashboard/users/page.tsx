/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

import { useGetAllUsersQuery } from "@/redux/features/auth/auth.api";

import {
  LayoutGrid,
  MoreHorizontal,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  User,
} from "lucide-react";

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

import RoleBadge from "@/components/modules/users/RoleBadge";
import StatusBadge from "@/components/modules/users/StatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteUserDialog from "@/components/modules/users/DeleteUserDialog";
import RestoreUserDialog from "@/components/modules/users/RestoreUserDialog";
import MakeUserDialog from "@/components/modules/users/MakeUserDialog";
import MakeSuperAdminDialog from "@/components/modules/users/MakeSuperAdminDialog";
import MakeAdminDialog from "@/components/modules/users/MakeAdminDialog";

type UserAction =
  | "make-admin"
  | "make-super-admin"
  | "make-user"
  | "restore"
  | "delete";

type UserDialogData = {
  _id: string;
  name: string;
};

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const {
    data: users,
    isLoading,
    isFetching,
  } = useGetAllUsersQuery({
    searchTerm: search,
  });

  const allUsers = users?.data ?? [];

  const [dialog, setDialog] = useState<{
    type: UserAction;
    user: UserDialogData;
  } | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 rounded-2xl border border-sky-100 bg-linear-to-r from-sky-50 via-white to-orange-50 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500 text-white shadow-lg shadow-sky-200">
            <LayoutGrid className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">Users</h1>

            <p className="text-sm text-slate-500">
              Manage all users, their roles and account status.
            </p>
          </div>
        </div>

        <Badge className="bg-orange-100 px-4 py-1 text-orange-700 hover:bg-orange-100">
          {allUsers.length} Users
        </Badge>
      </div>

      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />

        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-sky-200 pl-10 focus-visible:border-sky-400 focus-visible:ring-sky-300"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-sky-50 hover:bg-sky-50">
                <TableHead>#</TableHead>

                <TableHead>Name</TableHead>

                <TableHead>Email</TableHead>

                <TableHead>Status</TableHead>

                <TableHead>Verified</TableHead>

                <TableHead>Deleted</TableHead>

                <TableHead>Role</TableHead>

                <TableHead>Created</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading || isFetching ? (
                <TableRow>
                  <TableCell colSpan={9} className="py-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-slate-500">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400" />
                      <span
                        className="h-2 w-2 animate-pulse rounded-full bg-sky-400"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="h-2 w-2 animate-pulse rounded-full bg-orange-400"
                        style={{ animationDelay: "300ms" }}
                      />
                      Loading users...
                    </div>
                  </TableCell>
                </TableRow>
              ) : allUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <LayoutGrid className="h-8 w-8 text-sky-300" />

                      <p>No users found.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                allUsers.map((user: any, index: number) => {
                  const isAdmin = user.role?.includes("ADMIN");
                  const isSuperAdmin = user.role?.includes("SUPER_ADMIN");

                  return (
                    <TableRow
                      key={user._id}
                      className="hover:bg-orange-50/40 transition-colors"
                    >
                      <TableCell className="text-slate-400">
                        {index + 1}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-sky-500 to-sky-600 font-semibold text-white">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <p className="font-medium text-slate-800">
                              {user.name}
                            </p>

                            <p className="text-xs text-slate-400">
                              {user._id.slice(-8)}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-slate-500">
                        {user.email}
                      </TableCell>

                      <TableCell>
                        <StatusBadge type="active" value={user.isActive} />
                      </TableCell>

                      <TableCell>
                        <StatusBadge type="verified" value={user.isVerified} />
                      </TableCell>

                      <TableCell>
                        <StatusBadge type="deleted" value={user.isDeleted} />
                      </TableCell>

                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {user.role?.map((role: string) => (
                            <RoleBadge key={role} role={role} />
                          ))}
                        </div>
                      </TableCell>

                      <TableCell className="text-slate-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>

                      <TableCell className="text-right">
                        <DropdownMenu>
                          {/* Dropdown Trigger Button */}
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 border border-slate-100 bg-white text-slate-500 shadow-2xs hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 focus-visible:ring-sky-100"
                            >
                              <span className="sr-only">Open actions menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          {/* Menu Overlay Panel */}
                          <DropdownMenuContent
                            align="end"
                            className="w-52 border-slate-100 p-1 shadow-md"
                          >
                            <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-slate-400">
                              Account Permissions
                            </DropdownMenuLabel>

                            {/* Action: Make Admin */}
                            <DropdownMenuItem
                              disabled={
                                isAdmin || isSuperAdmin || user.isDeleted
                              }
                              onSelect={() =>
                                setDialog({
                                  type: "make-admin",
                                  user,
                                })
                              }
                            >
                              <ShieldCheck className="h-4 w-4 text-sky-500" />
                              <span>Promote to Admin</span>
                            </DropdownMenuItem>

                            {/* Action: Make Super Admin */}
                            <DropdownMenuItem
                              disabled={isSuperAdmin || user.isDeleted}
                              onSelect={() =>
                                setDialog({
                                  type: "make-super-admin",
                                  user,
                                })
                              }
                            >
                              <ShieldAlert className="h-4 w-4 text-sky-600" />
                              <span>Promote to Super Admin</span>
                            </DropdownMenuItem>

                            {/* Action: Change To User */}
                            <DropdownMenuItem
                              disabled={
                                (!isAdmin && !isSuperAdmin) || user.isDeleted
                              }
                              onSelect={() =>
                                setDialog({
                                  type: "make-user",
                                  user,
                                })
                              }
                            >
                              <User className="h-4 w-4 text-slate-400" />
                              <span>Demote to Standard User</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="my-1 bg-slate-100" />

                            <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-slate-400">
                              Danger Management
                            </DropdownMenuLabel>

                            {/* Action: Restore User */}
                            <DropdownMenuItem
                              disabled={!user.isDeleted}
                              onSelect={() =>
                                setDialog({
                                  type: "restore",
                                  user,
                                })
                              }
                            >
                              <RefreshCw className="h-4 w-4 text-emerald-500" />
                              <span>Restore Account</span>
                            </DropdownMenuItem>

                            {/* Action: Delete User */}
                            <DropdownMenuItem
                              disabled={user.isDeleted}
                              onSelect={() =>
                                setDialog({
                                  type: "delete",
                                  user,
                                })
                              }
                            >
                              <Trash2 className="h-4 w-4 text-orange-500" />
                              <span>Suspend / Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
          {dialog?.type === "make-admin" && (
            <MakeAdminDialog
              open
              user={dialog.user}
              onOpenChange={() => setDialog(null)}
            />
          )}

          {dialog?.type === "make-super-admin" && (
            <MakeSuperAdminDialog
              open
              user={dialog.user}
              onOpenChange={() => setDialog(null)}
            />
          )}

          {dialog?.type === "make-user" && (
            <MakeUserDialog
              open
              user={dialog.user}
              onOpenChange={() => setDialog(null)}
            />
          )}

          {dialog?.type === "restore" && (
            <RestoreUserDialog
              open
              user={dialog.user}
              onOpenChange={() => setDialog(null)}
            />
          )}

          {dialog?.type === "delete" && (
            <DeleteUserDialog
              open
              user={dialog.user}
              onOpenChange={() => setDialog(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
