import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProviderPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10 animate-pulse">

      {/* ================= HERO SECTION ================= */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        
        {/* Avatar */}
        <div className="h-24 w-24 rounded-full bg-muted" />

        {/* Text */}
        <div className="space-y-3 text-center md:text-left">
          <div className="h-7 w-64 bg-muted rounded" />

          <div className="space-y-2">
            <div className="h-4 w-80 bg-muted rounded" />
            <div className="h-4 w-72 bg-muted rounded" />
          </div>

          <div className="flex gap-3 justify-center md:justify-start">
            <div className="h-4 w-40 bg-muted rounded" />
            <div className="h-4 w-32 bg-muted rounded" />
          </div>

          <div className="flex gap-2 justify-center md:justify-start">
            <div className="h-6 w-20 bg-muted rounded-full" />
            <div className="h-6 w-24 bg-muted rounded-full" />
          </div>
        </div>
      </div>

      <Separator />

      {/* ================= MEALS SECTION ================= */}
      <div className="space-y-4">
        <div className="h-7 w-48 bg-muted rounded" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i} className="overflow-hidden flex flex-col">
              
              {/* IMAGE */}
              <div className="h-40 w-full bg-muted" />

              {/* CONTENT */}
              <div className="p-4 flex flex-col flex-1 gap-3">

                {/* title */}
                <div className="h-5 w-3/4 bg-muted rounded" />

                {/* description */}
                <div className="space-y-2">
                  <div className="h-3 w-full bg-muted rounded" />
                  <div className="h-3 w-5/6 bg-muted rounded" />
                </div>

                {/* tags */}
                <div className="flex gap-2 flex-wrap">
                  <div className="h-5 w-12 bg-muted rounded-full" />
                  <div className="h-5 w-16 bg-muted rounded-full" />
                  <div className="h-5 w-14 bg-muted rounded-full" />
                </div>

                {/* price + status */}
                <div className="flex justify-between mt-auto pt-3">
                  <div className="h-5 w-16 bg-muted rounded" />
                  <div className="h-5 w-20 bg-muted rounded" />
                </div>

                {/* button */}
                <div className="h-9 w-full bg-muted rounded mt-3" />
              </div>
            </Card>
          ))}

        </div>
      </div>
    </div>
  );
}