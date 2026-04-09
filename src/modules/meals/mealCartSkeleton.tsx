import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function MealCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-sm">
      {/* Image Skeleton */}
      <div className="relative h-48 w-full bg-muted animate-pulse" />

      {/* Content */}
      <CardContent className="p-4 space-y-3">
        {/* Title + Price */}
        <div className="flex justify-between items-start">
          <div className="h-5 w-2/3 bg-muted rounded animate-pulse" />
          <div className="h-5 w-16 bg-muted rounded animate-pulse" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-muted rounded animate-pulse" />
          <div className="h-3 w-5/6 bg-muted rounded animate-pulse" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
          <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
          <div className="h-6 w-24 bg-muted rounded-full animate-pulse" />
        </div>

        {/* Availability */}
        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4">
        <div className="h-10 w-full bg-muted rounded animate-pulse" />
      </CardFooter>
    </Card>
  );
}