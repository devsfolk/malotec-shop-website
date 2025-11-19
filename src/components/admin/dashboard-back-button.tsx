
"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// This component is no longer needed in the new single-page dashboard layout,
// as back navigation is handled within the layout itself.
// You can safely delete this file.

export function DashboardBackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // This logic is deprecated.
  const isDashboardHome = pathname === "/dmalo/dashboard";
  
  if (isDashboardHome) {
    return null;
  }

  return (
    <Button variant="outline" size="sm" onClick={() => router.back()} className="h-8">
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </Button>
  );
}
