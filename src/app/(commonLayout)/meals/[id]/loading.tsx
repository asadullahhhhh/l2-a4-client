import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function MealDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 animate-pulse">
      {/* ================= PROVIDER ================= */}
      <Card className="p-6 flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-muted" />

        <div className="flex-1 space-y-2">
          <div className="h-5 w-1/3 bg-muted rounded" />
          <div className="h-3 w-1/2 bg-muted rounded" />
          <div className="h-3 w-1/4 bg-muted rounded" />
        </div>
      </Card>

      {/* ================= MEAL HERO ================= */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* IMAGE */}
        <div className="h-[320px] w-full bg-muted rounded-xl" />

        {/* INFO */}
        <div className="space-y-4">
          <div className="h-8 w-2/3 bg-muted rounded" />

          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-4/6 bg-muted rounded" />
          </div>

          <div className="h-6 w-24 bg-muted rounded" />

          {/* BADGES */}
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-20 bg-muted rounded-full" />
            <div className="h-6 w-16 bg-muted rounded-full" />
            <div className="h-6 w-18 bg-muted rounded-full" />
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-3 pt-4">
            <div className="h-10 w-full bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded" />
          </div>
        </div>
      </div>

      <Separator />

      {/* ================= DETAILS ================= */}
      <Card className="p-6 space-y-3">
        <div className="h-6 w-40 bg-muted rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-5/6 bg-muted rounded" />
          <div className="h-4 w-4/6 bg-muted rounded" />
        </div>
      </Card>

      {/* ================= REVIEWS ================= */}
      <div className="space-y-4">
        <div className="h-6 w-32 bg-muted rounded" />

        {[1, 2].map((i) => (
          <Card key={i} className="p-4 space-y-2">
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-4 w-16 bg-muted rounded" />
            </div>

            <div className="h-3 w-full bg-muted rounded" />
            <div className="h-3 w-5/6 bg-muted rounded" />
          </Card>
        ))}
      </div>
    </div>
  );
}