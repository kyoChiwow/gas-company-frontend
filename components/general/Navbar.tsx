"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */

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

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: getMe } = useUserInfoQuery(undefined);
  const [logOut] = useLogoutMutation();
  const dispatch = useAppDispatch();

  console.log(getMe);

  const linksWithActiveState = navigationLinks.map((link) => ({
    ...link,
    isActive: link.href === pathname,
  }));

  const handleLogout = async () => {
    try {
      await logOut(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      toast.success("Logged out successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                size="icon"
                variant="ghost"
              >
                <svg
                  className="pointer-events-none"
                  fill="none"
                  height={16}
                  stroke="currentColor"
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
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {linksWithActiveState.map((link, _index) => (
                    <NavigationMenuItem className="w-full" key={link.label}>
                      <NavigationMenuLink
                        active={link.isActive}
                        className={`py-1.5`}
                        href={link.href}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-16">
            <Link
              className="text-primary hover:text-primary/90 flex items-center gap-2"
              href="#"
            >
              <Logo />
              <span className="font-bold">
                Taher <span className="text-orange-500">Enterprise</span>
              </span>
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {linksWithActiveState.map((link, _index) => (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink
                      active={link.isActive}
                      className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                      href={link.href}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {!getMe?.data?.email && (
            <Button asChild className="text-sm">
              <Link href="/login">Login</Link>
            </Button>
          )}
          {getMe?.data?.email && (
            <div className="flex items-center gap-1">
              <Button
                variant={"outline"}
                onClick={handleLogout}
                className="text-sm"
              >
                Logout
              </Button>
              <Button asChild>
                <Link href={"/me"}>Go To Profile</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
