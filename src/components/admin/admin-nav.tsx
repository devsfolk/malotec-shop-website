
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, LayoutGrid, Home } from "lucide-react";
import { cn } from "@/lib/utils";

// This component is now deprecated as navigation logic has been moved
// into the new dynamic dashboard layout.
// You can safely delete this file.

const links = [
  { href: "/dmalo/dashboard", label: "Dashboard", icon: Home },
  { href: "/dmalo/dashboard/products", label: "Products", icon: Package },
  { href: "/dmalo/dashboard/categories", label: "Categories", icon: LayoutGrid },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {links.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href}>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname.startsWith(href) && href !== '/dmalo/dashboard' || pathname === href ? "bg-accent" : "transparent"
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span>{label}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
