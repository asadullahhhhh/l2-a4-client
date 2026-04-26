// app/loading.tsx

import { Skeleton } from "@/components/ui/skeleton";

export default function SuspenseLoginLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
          
          {/* Logo / Header */}
          <div className="mb-8 flex flex-col items-center space-y-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            
            <div className="space-y-2 text-center">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="mx-auto h-4 w-64" />
            </div>
          </div>

          {/* Form */}
          <div className="space-y-5">
            
            {/* Email */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>

            {/* Button */}
            <Skeleton className="h-11 w-full rounded-md" />

            {/* Footer */}
            <div className="flex justify-center pt-2">
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}