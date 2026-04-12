import { Skeleton } from "@/components/ui/skeleton";

export default function AdminOrdersTableSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* HEADER */}
      <Skeleton className="h-8 w-48" />

      <div className="border rounded-lg overflow-hidden">
        {/* TABLE HEADER */}
        <div className="grid grid-cols-7 gap-4 p-4 border-b">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-10 ml-auto" />
        </div>

        {/* TABLE ROWS */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-7 gap-4 p-4 items-center border-b"
          >
            {/* Order ID */}
            <Skeleton className="h-4 w-20" />

            {/* Status */}
            <Skeleton className="h-6 w-24 rounded-full" />

            {/* Total */}
            <Skeleton className="h-4 w-16" />

            {/* Payment */}
            <Skeleton className="h-4 w-28" />

            {/* Address */}
            <Skeleton className="h-4 w-full max-w-[150px]" />

            {/* Date */}
            <Skeleton className="h-4 w-24" />

            {/* Action */}
            <Skeleton className="h-8 w-8 ml-auto rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}