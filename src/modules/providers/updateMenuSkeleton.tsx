"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function UpdateMealFormSkeleton() {
  return (
    <div className="max-w-7xl mx-auto border p-6 rounded-md space-y-6">
      {/* HEADER */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* CATEGORY */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* NAME */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-[200px] w-full" />
      </div>

      {/* PRICE */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* IMAGE URL */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* CHECKBOXES */}
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded-sm" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
