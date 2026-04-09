import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CartSkeleton() {
  return (
    <div className="animate-pulse">
      {/* ================= EMPTY / LOADING WRAPPER ================= */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">

        {/* HEADER */}
        <div className="h-4 w-64 bg-muted rounded" />

        <Separator />

        {/* TABLE HEADER */}
        <div className="grid grid-cols-12 px-2">
          <div className="col-span-6 h-4 w-32 bg-muted rounded" />
          <div className="col-span-2 flex justify-center">
            <div className="h-4 w-16 bg-muted rounded" />
          </div>
          <div className="col-span-2 flex justify-center">
            <div className="h-4 w-20 bg-muted rounded" />
          </div>
          <div className="col-span-2 flex justify-end">
            <div className="h-4 w-16 bg-muted rounded" />
          </div>
        </div>

        <Separator />

        {/* ITEMS */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="grid grid-cols-12 items-center gap-4 py-4 border-b"
          >
            {/* PRODUCT */}
            <div className="col-span-6 flex gap-4 items-center">
              <div className="h-16 w-16 rounded-md bg-muted" />

              <div className="space-y-2">
                <div className="h-4 w-40 bg-muted rounded" />
                <div className="h-3 w-24 bg-muted rounded" />
                <div className="h-3 w-16 bg-muted rounded" />
              </div>
            </div>

            {/* PRICE */}
            <div className="col-span-2 flex justify-center">
              <div className="h-4 w-12 bg-muted rounded" />
            </div>

            {/* QUANTITY */}
            <div className="col-span-2 flex justify-center">
              <div className="h-6 w-20 bg-muted rounded-full" />
            </div>

            {/* TOTAL */}
            <div className="col-span-2 flex justify-end">
              <div className="h-4 w-14 bg-muted rounded" />
            </div>
          </div>
        ))}

        {/* SUMMARY */}
        <div className="flex justify-end">
          <div className="space-y-2 text-right">
            <div className="h-5 w-40 bg-muted rounded ml-auto" />
            <div className="h-3 w-52 bg-muted rounded ml-auto" />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-4">
          <div className="h-10 w-40 bg-muted rounded" />
          <div className="h-10 w-32 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}