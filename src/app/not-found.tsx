"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      
      {/* 404 */}
      <h1 className="text-7xl font-extrabold tracking-tight text-primary">
        404
      </h1>

      {/* Title */}
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold">
        Page not found
      </h2>

      {/* Description */}
      <p className="mt-2 text-muted-foreground max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Emoji / Illustration */}
      <div className="text-6xl mt-6 animate-bounce">🍔</div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>

        <Button
          variant="outline"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}