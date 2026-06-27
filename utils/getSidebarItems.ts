import { role } from "@/constants/Role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  const roles = (Array.isArray(userRole) ? userRole : [userRole]) as string[];

  if (roles.includes(role.superAdmin) || roles.includes(role.admin)) {
    return [...adminSidebarItems];
  }

  return [];
};
