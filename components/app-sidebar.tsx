"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { getSidebarItems } from "@/utils/getSidebarItems";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Added to dynamically track active route
import * as React from "react";
import Logo from "./miscellaneous/Logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { data: userData } = useUserInfoQuery(undefined);

  const data = {
    navMain: getSidebarItems(userData?.data?.role || []),
  };

  return (
    <Sidebar
      {...props}
      className="border-r border-sky-100 bg-linear-to-b from-slate-50 to-sky-50/30"
    >
      {/* Brand Header */}
      <SidebarHeader className="p-4 border-b border-sky-100/50">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl p-2 transition-all duration-300 hover:bg-sky-50 active:scale-95"
        >
          <div className="transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <Logo />
          </div>
          <span className="font-bold">
            Taher <span className="text-orange-500">Enterprise</span>
          </span>
        </Link>
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent className="px-3 py-4 gap-6">
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title} className="p-0">
            {/* Group Label */}
            <SidebarGroupLabel className="px-3 mb-2 text-xs font-bold tracking-wider text-sky-700/70 uppercase">
              {group.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item) => {
                  // Checks if current item URL matches the browser path
                  const isCurrentActive =
                    pathname === item.url || item.isActive;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isCurrentActive}
                        className={`
                          w-full justify-start rounded-lg px-3 py-2.5 font-medium transition-all duration-200 group relative
                          ${
                            isCurrentActive
                              ? "bg-linear-to-r from-sky-500 to-sky-600 text-white shadow-md shadow-sky-500/20 font-semibold"
                              : "text-slate-600 hover:bg-sky-50 hover:text-sky-600"
                          }
                        `}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center w-full gap-3"
                        >
                          {/* Active Indicator bar */}
                          {isCurrentActive && (
                            <span className="absolute left-0 top-1/4 h-1/2 w-1 rounded-r-full bg-orange-500" />
                          )}

                          <span className="truncate">{item.title}</span>

                          {/* Subtle decorative dot for active item */}
                          {isCurrentActive && (
                            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail className="hover:after:bg-orange-400" />
    </Sidebar>
  );
}
