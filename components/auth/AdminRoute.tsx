"use client";

import { role } from "@/constants/Role";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { data, isLoading } = useUserInfoQuery(undefined);

  const userRoles = data?.data?.role ?? [];

  const isAuthorized =
    userRoles.includes(role.admin) ||
    userRoles.includes(role.superAdmin);

  useEffect(() => {
    if (!isLoading && !isAuthorized) {
      router.replace("/");
    }
  }, [isLoading, isAuthorized, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}