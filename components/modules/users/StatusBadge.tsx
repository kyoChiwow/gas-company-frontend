"use client";

import { Badge } from "@/components/ui/badge";
import {
  BadgeCheck,
  Ban,
  CheckCircle2,
  XCircle,
} from "lucide-react";

type StatusBadgeProps = {
  type: "active" | "deleted" | "verified";
  value: boolean | string;
};

export default function StatusBadge({
  type,
  value,
}: StatusBadgeProps) {
  switch (type) {
    case "active": {
      const active =
        value === true ||
        value === "active";

      return active ? (
        <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
          <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
          Active
        </Badge>
      ) : (
        <Badge
          variant="secondary"
          className="border-slate-200 bg-slate-100 text-slate-600"
        >
          <Ban className="mr-1 h-3.5 w-3.5" />
          Inactive
        </Badge>
      );
    }

    case "verified": {
      return value ? (
        <Badge className="border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-50">
          <BadgeCheck className="mr-1 h-3.5 w-3.5" />
          Verified
        </Badge>
      ) : (
        <Badge
          variant="secondary"
          className="border-slate-200 bg-slate-100 text-slate-600"
        >
          <XCircle className="mr-1 h-3.5 w-3.5" />
          Not Verified
        </Badge>
      );
    }

    case "deleted": {
      return value ? (
        <Badge className="border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-50">
          <XCircle className="mr-1 h-3.5 w-3.5" />
          Deleted
        </Badge>
      ) : (
        <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
          <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
          Available
        </Badge>
      );
    }
  }
}