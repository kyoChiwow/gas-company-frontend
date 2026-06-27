"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { role } from "@/constants/Role";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  console.log(getMe);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-100/80 bg-white/80 backdrop-blur-md px-4 dark:border-slate-800 dark:bg-slate-950/80 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left side: Navigation Group */}
        <div className="flex items-center gap-2 md:gap-8">
          {/* Mobile Menu Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-9 md:hidden border border-sky-100 bg-sky-50/50 hover:bg-sky-100/70 text-sky-700 transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                size="icon"
                variant="ghost"
              >
                <svg
                  className="pointer-events-none stroke-current"
                  fill="none"
                  height={16}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="-translate-y-1.75 origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315"
                    d="M4 12L20 12"
                  />
                  <path
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    d="M4 12H20"
                  />
                  <path
                    className="origin-center -translate-y-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
                    d="M4 12H20"
                  />
                </svg>
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              className="w-48 p-1.5 md:hidden border-sky-100 dark:border-slate-800 rounded-xl shadow-xl shadow-sky-950/5"
            >
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-1">
                  {linksWithActiveState.map((link) => (
                    <NavigationMenuItem className="w-full" key={link.label}>
                      <NavigationMenuLink asChild active={link.isActive}>
                        <Link
                          href={link.href}
                          className={`
                          relative rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200 group
                            ${
                              link.isActive
                                ? "text-sky-600 font-semibold"
                                : "text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
                            }
                          `}
                        >
                          {link.label}

                          {link.isActive && (
                            <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 rounded-full bg-orange-500" />
                          )}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Logo & Desktop Nav Wrapper */}
          <div className="flex items-center gap-10">
            <Link
              className="group flex items-center gap-2.5 transition-opacity hover:opacity-95"
              href="/"
            >
              <div className="transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                <Logo />
              </div>
              <span className="font-bold tracking-tight text-slate-800 dark:text-slate-100 text-base md:text-lg">
                Taher{" "}
                <span className="text-orange-500 font-extrabold drop-shadow-[0_1px_1px_rgba(249,115,22,0.1)]">
                  Enterprise
                </span>
              </span>
            </Link>

            {/* Desktop Menu Link Design */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-1">
                {linksWithActiveState.map((link) => (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink asChild active={link.isActive}>
                      <Link
                        href={link.href}
                        className={`
                          relative rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200 group
                          ${
                            link.isActive
                              ? "text-sky-600 font-semibold"
                              : "text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
                          }
                        `}
                      >
                        {link.label}

                        {link.isActive && (
                          <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 rounded-full bg-orange-500" />
                        )}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side: Actions / Auth Toggle */}
        <div className="flex items-center gap-3">
          <div className="hover:scale-105 transition-transform">
            <ModeToggle />
          </div>

          {!getMe?.data?.email && (
            <Button
              asChild
              size="sm"
              className="bg-sky-600 hover:bg-sky-500 active:scale-98 shadow-sm text-sm rounded-lg px-4 font-medium transition-all"
            >
              <Link href="/login">Login</Link>
            </Button>
          )}

          {getMe?.data?.email && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-sm border-sky-100 text-slate-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 rounded-lg px-3.5"
              >
                Logout
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-linear-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-md shadow-sky-500/10 active:scale-98 transition-all rounded-lg px-4 font-medium"
              >
                <Link href="/me">Go To Profile</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
