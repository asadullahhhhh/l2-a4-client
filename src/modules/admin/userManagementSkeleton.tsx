"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";

export function UserTableSkeleton() {
  return (
    <div className="rounded-xl border shadow-sm bg-background animate-pulse">
      <Table>
        {/* HEADER */}
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="h-4 w-20 bg-muted rounded" />
            </TableHead>
            <TableHead>
              <div className="h-4 w-16 bg-muted rounded" />
            </TableHead>
            <TableHead>
              <div className="h-4 w-16 bg-muted rounded" />
            </TableHead>
            <TableHead>
              <div className="h-4 w-20 bg-muted rounded" />
            </TableHead>
            <TableHead className="text-right">
              <div className="h-4 w-16 bg-muted rounded ml-auto" />
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <TableRow key={i}>
              {/* USER */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted" />

                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-muted rounded" />
                    <div className="h-3 w-40 bg-muted rounded" />
                  </div>
                </div>
              </TableCell>

              {/* ROLE */}
              <TableCell>
                <div className="h-5 w-16 bg-muted rounded-full" />
              </TableCell>

              {/* STATUS */}
              <TableCell>
                <div className="h-5 w-20 bg-muted rounded-full" />
              </TableCell>

              {/* CREATED */}
              <TableCell>
                <div className="h-4 w-24 bg-muted rounded" />
              </TableCell>

              {/* ACTION */}
              <TableCell className="text-right">
                <div className="h-8 w-20 bg-muted rounded ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}