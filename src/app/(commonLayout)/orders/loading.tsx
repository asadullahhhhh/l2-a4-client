import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import React from "react";

export default function OrdersSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 animate-pulse">

      {/* HEADER */}
      <div className="h-7 w-40 bg-muted rounded" />

      {/* TABLE CARD */}
      <Card className="p-4">

        <Table>
          {/* HEADER ROW */}
          <TableHeader>
            <TableRow>
              {[1,2,3,4,5,6,7].map((i) => (
                <TableHead key={i}>
                  <div className="h-4 w-20 bg-muted rounded" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>

            {/* MAIN ROWS */}
            {[1, 2, 3, 4].map((row) => (
              <React.Fragment key={row}>

                {/* ORDER ROW */}
                <TableRow>
                  {/* toggle */}
                  <TableCell>
                    <div className="h-8 w-8 bg-muted rounded" />
                  </TableCell>

                  {/* order id */}
                  <TableCell>
                    <div className="h-4 w-24 bg-muted rounded" />
                  </TableCell>

                  {/* status */}
                  <TableCell>
                    <div className="h-5 w-16 bg-muted rounded-full" />
                  </TableCell>

                  {/* total */}
                  <TableCell>
                    <div className="h-4 w-16 bg-muted rounded" />
                  </TableCell>

                  {/* payment */}
                  <TableCell>
                    <div className="h-5 w-28 bg-muted rounded-full" />
                  </TableCell>

                  {/* address */}
                  <TableCell>
                    <div className="h-4 w-40 bg-muted rounded" />
                  </TableCell>

                  {/* date */}
                  <TableCell>
                    <div className="h-4 w-24 bg-muted rounded" />
                  </TableCell>
                </TableRow>

                {/* EXPANDED ROW (fake skeleton preview) */}
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className="bg-muted/40 p-4 rounded-lg space-y-3">

                      {/* TITLE */}
                      <div className="h-5 w-32 bg-muted rounded" />

                      {/* ITEMS */}
                      {[1, 2].map((item) => (
                        <div
                          key={item}
                          className="flex justify-between items-center border-b pb-3"
                        >
                          {/* LEFT */}
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-md bg-muted" />

                            <div className="space-y-2">
                              <div className="h-4 w-28 bg-muted rounded" />
                              <div className="h-3 w-16 bg-muted rounded" />
                            </div>
                          </div>

                          {/* RIGHT */}
                          <div className="h-4 w-12 bg-muted rounded" />
                        </div>
                      ))}

                    </div>
                  </TableCell>
                </TableRow>

              </React.Fragment>
            ))}

          </TableBody>
        </Table>
      </Card>
    </div>
  );
}