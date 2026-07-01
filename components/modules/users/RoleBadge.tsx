"use client";

import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Shield,
  User,
} from "lucide-react";

type Props = {
  role: string;
};

export default function RoleBadge({
  role,
}: Props) {
  switch (role) {
    case "SUPER_ADMIN":
      return (
        <Badge className="border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-50">
          <Crown className="mr-1 h-3.5 w-3.5" />
          Super Admin
        </Badge>
      );

    case "ADMIN":
      return (
        <Badge className="border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-50">
          <Shield className="mr-1 h-3.5 w-3.5" />
          Admin
        </Badge>
      );

    default:
      return (
        <Badge
          variant="secondary"
          className="border-slate-200 bg-slate-100 text-slate-700"
        >
          <User className="mr-1 h-3.5 w-3.5" />
          User
        </Badge>
      );
  }
}