"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function OrderManagementSkeleton() {
  return (
    <div className="p-6">
    
      {/* TABLE */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 8 }).map((_, i) => (
              <TableRow key={i}>
                {/* ORDER ID */}
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>

                {/* ITEMS */}
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </TableCell>

                {/* TOTAL */}
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>

                {/* STATUS */}
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>

                {/* ADDRESS */}
                <TableCell>
                  <Skeleton className="h-4 w-40" />
                </TableCell>

                {/* DATE */}
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>

                {/* ACTION */}
                <TableCell className="text-right">
                  <Skeleton className="h-8 w-28 inline-block" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
