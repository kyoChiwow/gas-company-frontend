/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useChangePasswordMutation,
  useEditProfileMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import {
  BadgeCheck,
  Check,
  CircleDot,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  Pencil,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: myData, isLoading } = useUserInfoQuery(undefined);
  const [editProfile, { isLoading: isSavingProfile }] =
    useEditProfileMutation();
  const [changePassword, { isLoading: isSavingPassword }] =
    useChangePasswordMutation();

  const user = myData?.data;

  // ── Edit profile state ──────────────────────────────────────────────
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState("");

  const startEditing = () => {
    setEditedName(user?.name ?? "");
    setIsEditingProfile(true);
  };

  const cancelEditing = () => {
    setIsEditingProfile(false);
    setEditedName("");
  };

  const handleSaveProfile = async () => {
    try {
      await editProfile({
        userId: user._id,
        data: {
          name: editedName,
        },
      }).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditingProfile(false);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to update profile.");
    }
  };

  // ── Change password state ───────────────────────────────────────────
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (passwords.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    try {
      await changePassword({
        oldPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      }).unwrap();
      toast.success("Password changed successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to change password.");
    }
  };

  // ── Helpers ─────────────────────────────────────────────────────────
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getRoleBadge = (role: string) => {
    const label = role
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return label;
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
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
          Loading profile...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-10">
      {/* ── Page header ────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 rounded-2xl border border-sky-100 bg-linear-to-r from-sky-50 via-white to-orange-50 p-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm shadow-sky-200">
          <User className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Profile</h2>
          <p className="text-sm text-slate-500">
            View and manage your account details.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Avatar + summary card ───────────────────────────────── */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-sky-100 bg-white p-6 shadow-sm lg:col-span-1">
          {/* Avatar */}
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-sky-400 to-sky-600 text-3xl font-bold text-white shadow-md shadow-sky-200">
              {user?.name?.[0]?.toUpperCase() ?? "?"}
            </div>
            {/* Active indicator */}
            <span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-emerald-400" />
          </div>

          {/* Name + email */}
          <div className="text-center">
            <p className="text-lg font-bold text-slate-800">{user?.name}</p>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>

          {/* Role badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {user?.role?.map((r: string) => (
              <span
                key={r}
                className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-0.5 text-xs font-semibold text-orange-700"
              >
                <ShieldCheck className="h-3 w-3" />
                {getRoleBadge(r)}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full border-t border-slate-100" />

          {/* Meta info */}
          <div className="w-full space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-500">
                <CircleDot className="h-3.5 w-3.5 text-sky-400" />
                Status
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  user?.isActive === "active"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {user?.isActive === "active" ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-500">
                <BadgeCheck className="h-3.5 w-3.5 text-sky-400" />
                Verified
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  user?.isVerified
                    ? "bg-sky-50 text-sky-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {user?.isVerified ? "Yes" : "No"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Mail className="h-3.5 w-3.5 text-sky-400" />
                Provider
              </span>
              <span className="font-medium capitalize text-slate-700">
                {user?.auths?.[0]?.provider ?? "—"}
              </span>
            </div>
          </div>

          {/* Joined date */}
          <p className="text-xs text-slate-400">
            Joined {user?.createdAt ? formatDate(user.createdAt) : "—"}
          </p>
        </div>

        {/* ── Right column ────────────────────────────────────────── */}
        <div className="space-y-6 lg:col-span-2">
          {/* Edit profile card */}
          <div className="rounded-xl border border-sky-100 bg-white shadow-sm">
            {/* Card header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-sky-500" />
                <h3 className="font-semibold text-slate-800">
                  Personal Information
                </h3>
              </div>
              {!isEditingProfile ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={startEditing}
                  className="border-sky-200 text-sky-600 hover:bg-sky-50 hover:text-sky-700"
                >
                  <Pencil className="mr-1 h-3.5 w-3.5" />
                  Edit
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={cancelEditing}
                    className="border-slate-200 text-slate-500 hover:bg-slate-50"
                  >
                    <X className="mr-1 h-3.5 w-3.5" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveProfile}
                    disabled={isSavingProfile}
                    className="bg-orange-500 text-white hover:bg-orange-600 focus-visible:ring-orange-300"
                  >
                    <Check className="mr-1 h-3.5 w-3.5" />
                    {isSavingProfile ? "Saving..." : "Save"}
                  </Button>
                </div>
              )}
            </div>

            {/* Card body */}
            <div className="grid gap-5 p-6 sm:grid-cols-2">
              {/* Name */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Full name
                </Label>
                {isEditingProfile ? (
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="border-sky-200 focus-visible:border-sky-400 focus-visible:ring-sky-200"
                    placeholder="Enter your name"
                  />
                ) : (
                  <p className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800">
                    {user?.name ?? "—"}
                  </p>
                )}
              </div>

              {/* Email — always read-only */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Email address
                </Label>
                <p className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-500">
                  {user?.email ?? "—"}
                </p>
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Role
                </Label>
                <p className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800">
                  {user?.role?.map(getRoleBadge).join(", ") ?? "—"}
                </p>
              </div>

              {/* Member since */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Member since
                </Label>
                <p className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800">
                  {user?.createdAt ? formatDate(user.createdAt) : "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Change password card */}
          <div className="rounded-xl border border-sky-100 bg-white shadow-sm">
            {/* Card header */}
            <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
              <KeyRound className="h-4 w-4 text-sky-500" />
              <h3 className="font-semibold text-slate-800">Change Password</h3>
            </div>

            {/* Card body */}
            <div className="space-y-4 p-6">
              {(
                [
                  {
                    id: "currentPassword" as const,
                    label: "Current password",
                    show: showPasswords.current,
                    toggle: () =>
                      setShowPasswords((p) => ({
                        ...p,
                        current: !p.current,
                      })),
                  },
                  {
                    id: "newPassword" as const,
                    label: "New password",
                    show: showPasswords.new,
                    toggle: () =>
                      setShowPasswords((p) => ({ ...p, new: !p.new })),
                  },
                  {
                    id: "confirmPassword" as const,
                    label: "Confirm new password",
                    show: showPasswords.confirm,
                    toggle: () =>
                      setShowPasswords((p) => ({
                        ...p,
                        confirm: !p.confirm,
                      })),
                  },
                ] as const
              ).map(({ id, label, show, toggle }) => (
                <div key={id} className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {label}
                  </Label>
                  <div className="relative">
                    <Input
                      type={show ? "text" : "password"}
                      value={passwords[id]}
                      onChange={(e) =>
                        setPasswords((p) => ({
                          ...p,
                          [id]: e.target.value,
                        }))
                      }
                      className="border-sky-200 pr-10 focus-visible:border-sky-400 focus-visible:ring-sky-200"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={toggle}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {show ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-1">
                <Button
                  onClick={handlePasswordChange}
                  disabled={
                    isSavingPassword ||
                    !passwords.currentPassword ||
                    !passwords.newPassword ||
                    !passwords.confirmPassword
                  }
                  className="bg-orange-500 text-white shadow-sm shadow-orange-200 hover:bg-orange-600 focus-visible:ring-orange-300"
                >
                  <KeyRound className="mr-1.5 h-4 w-4" />
                  {isSavingPassword ? "Updating..." : "Update password"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
