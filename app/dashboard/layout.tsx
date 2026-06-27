"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import AdminRoute from "@/components/auth/AdminRoute";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";

const breadcrumbTitles: Record<string, string> = {
  dashboard: "Dashboard",
  products: "Products",
  categories: "Categories",
  brands: "Brands",
  sections: "Sections",
  types: "Types",
  users: "Users",
  settings: "Settings",
  profile: "Profile",
  "add-product": "Add Product",
  "edit-product": "Edit Product",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const pathnames = pathname!.split("/").filter(Boolean);

  const breadcrumbs = pathnames.map((segment, index) => ({
    href: "/" + pathnames.slice(0, index + 1).join("/"),
    label:
      breadcrumbTitles[segment] ??
      segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
  }));

  return (
    <AdminRoute>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <header className="flex h-16 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />

            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />

            <Breadcrumb>
              <BreadcrumbList>
                {[{ href: "/", label: "Home" }, ...breadcrumbs].map(
                  (crumb, index, arr) => (
                    <React.Fragment key={crumb.href}>
                      <BreadcrumbItem>
                        {index === arr.length - 1 ? (
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={crumb.href}>{crumb.label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>

                      {index < arr.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                  ),
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </AdminRoute>
  );
}
