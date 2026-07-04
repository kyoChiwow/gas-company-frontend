import {
  ArrowRight,
  Building2,
  FolderTree,
  Package,
  Package2,
  Tags,
  User,
  Wrench,
} from "lucide-react";
import Link from "next/link";

const actions = [
  {
    title: "Products",
    description: "Manage all products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Categories",
    description: "Create and organize categories",
    href: "/dashboard/categories",
    icon: FolderTree,
  },
  {
    title: "Brands",
    description: "Manage available brands",
    href: "/dashboard/brands",
    icon: Building2,
  },
  {
    title: "Types",
    description: "Manage product types",
    href: "/dashboard/types",
    icon: Tags,
  },
  {
    title: "Sections",
    description: "Homepage sections",
    href: "/dashboard/sections",
    icon: Wrench,
  },
  {
    title: "Users",
    description: "Manage user accounts",
    href: "/dashboard/users",
    icon: User,
  },
  {
    title: "Quotas",
    description: "Manage customer quotas",
    href: "/dashboard/quotas",
    icon: Package2,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* Hero */}
      <section className="overflow-hidden rounded-3xl border bg-linear-to-r from-sky-500 via-sky-600 to-cyan-600 text-white">
        <div className="flex flex-col gap-6 p-10 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-widest text-sky-100">
              Dashboard
            </p>

            <h1 className="text-4xl font-bold">
              Welcome Back 👋
            </h1>

            <p className="max-w-xl text-sky-100">
              Manage your products, categories, brands and website content from
              one place.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
            <p className="text-sm text-sky-100">
              Everything you need is only a few clicks away.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}

      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-bold">
            Quick Actions
          </h2>

          <p className="text-muted-foreground">
            Frequently used management tools
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-2xl border bg-card p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-900/40">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-lg font-semibold">
                  {action.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {action.description}
                </p>

                <div className="mt-6 flex items-center text-sky-600 font-medium">
                  Open
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

    </div>
  );
}