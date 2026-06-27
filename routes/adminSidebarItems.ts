import { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Sections",
        url: "/dashboard/sections",
      },
      {
        title: "Brands",
        url: "/dashboard/brands",
      },
      {
        title: "Categories",
        url: "/dashboard/categories",
      },
      {
        title: "Types",
        url: "/dashboard/types",
      },
    ],
  },
];
