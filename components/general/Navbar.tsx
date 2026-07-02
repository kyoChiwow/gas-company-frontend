"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { role } from "@/constants/Role";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { LayoutDashboard, LogOut, Menu, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Logo from "../miscellaneous/Logo";
import { ModeToggle } from "./ModeToggler";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  {
    href: "/dashboard",
    label: "Dashboard",
    role: [role.admin, role.superAdmin],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: getMe } = useUserInfoQuery(undefined);
  const [logOut] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);

  const userRoles = getMe?.data?.role ?? [];

  const visibleLinks = navigationLinks.filter((link) => {
    if (!link.role) return true;
    return link.role.some((allowedRole) => userRoles.includes(allowedRole));
  });

  const linksWithActiveState = visibleLinks.map((link) => ({
    ...link,
    isActive: pathname === link.href,
  }));

  const handleLogout = async () => {
    try {
      await logOut(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const isLoggedIn = !!getMe?.data?.email;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-100/80 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* ── Left: Logo + desktop nav ─────────────────────────── */}
        <div className="flex min-w-0 items-center gap-6 xl:gap-8">
          {/* Logo — always visible */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2 transition-opacity hover:opacity-90"
          >
            <div className="transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              <Logo />
            </div>
            <span className="text-base font-bold tracking-tight text-slate-800 dark:text-slate-100">
              Taher{" "}
              <span className="font-extrabold text-orange-500">Enterprise</span>
            </span>
          </Link>

          {/* Desktop nav — visible from lg (1024px) up */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-2">
              {linksWithActiveState.map((link) => (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuLink asChild active={link.isActive}>
                    <Link
                      href={link.href}
                      className={`
                        relative flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium
                        transition-colors duration-200
                        ${
                          link.isActive
                            ? "text-sky-600 dark:text-sky-400"
                            : "text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
                        }
                      `}
                    >
                      {link.label}
                      {link.isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-orange-500" />
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* ── Right: Actions ───────────────────────────────────── */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="transition-transform hover:scale-105">
            <ModeToggle />
          </div>

          {/* Logged-out: Login button — always visible */}
          {!isLoggedIn && (
            <Button
              asChild
              size="sm"
              className="bg-sky-600 text-white shadow-sm shadow-sky-200 hover:bg-sky-500 active:scale-95 dark:shadow-none"
            >
              <Link href="/login">Login</Link>
            </Button>
          )}

          {/* Logged-in desktop actions — visible lg+ only */}
          {isLoggedIn && (
            <div className="hidden lg:flex items-center gap-2">
              {/* Avatar pill */}
              <div className="flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50/60 px-2.5 py-1 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-sky-400 to-sky-600 text-xs font-bold text-white shadow-sm shrink-0">
                  {getMe?.data?.name?.[0]?.toUpperCase() ?? "U"}
                </div>
                <span className="hidden xl:block max-w-25 truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {getMe?.data?.name}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="gap-1.5 text-slate-500 hover:bg-orange-50 hover:text-orange-600 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-orange-400"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">Logout</span>
              </Button>

              <Button
                asChild
                size="sm"
                className="bg-linear-to-r from-sky-500 to-sky-600 text-white shadow-sm shadow-sky-200 hover:from-sky-600 hover:to-sky-700 active:scale-95 dark:shadow-none"
              >
                <Link href="/me" className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  <span className="hidden xl:inline">Profile</span>
                </Link>
              </Button>
            </div>
          )}

          {/* Hamburger — visible below lg (1024px) */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 shrink-0 border border-sky-100 bg-sky-50/50 text-sky-700 hover:bg-sky-100/70 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 lg:hidden"
              >
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-72 border-r border-sky-100 p-0 dark:border-slate-800"
            >
              <SheetHeader className="border-b border-sky-100 px-5 py-4 dark:border-slate-800">
                <SheetTitle asChild>
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5"
                  >
                    <Logo />
                    <span className="text-base font-bold tracking-tight text-slate-800 dark:text-slate-100">
                      Taher{" "}
                      <span className="font-extrabold text-orange-500">
                        Enterprise
                      </span>
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              {/* User info strip (mobile, logged in) */}
              {isLoggedIn && (
                <div className="mx-4 mt-4 flex items-center gap-3 rounded-xl border border-sky-100 bg-sky-50/60 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-400 to-sky-600 text-sm font-bold text-white shadow-sm">
                    {getMe?.data?.name?.[0]?.toUpperCase() ?? "U"}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {getMe?.data?.name}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {getMe?.data?.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Nav links */}
              <nav className="mt-4 space-y-0.5 px-3">
                <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600">
                  Navigation
                </p>
                {linksWithActiveState.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                      ${
                        link.isActive
                          ? "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400"
                          : "text-slate-600 hover:bg-slate-50 hover:text-sky-600 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-sky-400"
                      }
                    `}
                  >
                    {link.href === "/dashboard" && (
                      <LayoutDashboard className="h-4 w-4 shrink-0 opacity-70" />
                    )}
                    {link.label}
                    {link.isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-orange-500" />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Mobile action buttons — pinned to bottom */}
              <div className="absolute bottom-0 left-0 right-0 space-y-2 border-t border-sky-100 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950">
                {!isLoggedIn ? (
                  <Button
                    asChild
                    className="w-full bg-sky-600 text-white hover:bg-sky-500"
                  >
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      Login
                    </Link>
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      asChild
                      className="w-full bg-linear-to-r from-sky-500 to-sky-600 text-white hover:from-sky-600 hover:to-sky-700"
                    >
                      <Link href="/me" onClick={() => setMobileOpen(false)}>
                        <User className="mr-1.5 h-4 w-4" />
                        Go to Profile
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700 dark:border-slate-800 dark:text-orange-400 dark:hover:bg-slate-900"
                      onClick={() => {
                        setMobileOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut className="mr-1.5 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
