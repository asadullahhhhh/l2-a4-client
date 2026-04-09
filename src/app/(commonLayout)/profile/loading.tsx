import { Card } from "@/components/ui/card";

export default function UserProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 animate-pulse">

      {/* ================= PROFILE CARD ================= */}
      <Card className="p-6 flex items-center gap-6">
        
        {/* Avatar */}
        <div className="h-20 w-20 rounded-full bg-muted" />

        {/* INFO */}
        <div className="flex-1 space-y-3 text-center">
          <div className="h-5 w-40 bg-muted rounded mx-auto" />
          <div className="h-4 w-56 bg-muted rounded mx-auto" />

          <div className="flex gap-2 justify-center mt-2">
            <div className="h-5 w-16 bg-muted rounded-full" />
            <div className="h-5 w-14 bg-muted rounded-full" />
          </div>
        </div>

        {/* BUTTON */}
        <div className="h-9 w-28 bg-muted rounded" />
      </Card>

      {/* ================= EXTRA INFO ================= */}
      <Card className="p-6 space-y-3">
        <div className="h-5 w-32 bg-muted rounded" />

        <div className="h-4 w-64 bg-muted rounded" />
        <div className="h-4 w-56 bg-muted rounded" />
      </Card>

    </div>
  );
}