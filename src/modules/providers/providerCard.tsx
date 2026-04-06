"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Provider } from "@/types/provider.type";



export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition group">
      
      {/* Image */}
      <div className="relative h-40 w-full">
        <Image
          src={provider.logo_url}
          alt={provider.resturent_name}
          fill
          className="object-cover group-hover:scale-105 transition"
        />
      </div>

      {/* Content */}
      <CardContent className="p-4 space-y-2">
        <h3 className="text-lg font-semibold line-clamp-1">
          {provider.resturent_name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {provider.description}
        </p>

        <p className="text-xs text-muted-foreground">
          📍 {provider.address}
        </p>

        <p className="text-xs text-muted-foreground">
          📞 {provider.phone}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4">
        <Button asChild className="w-full">
          <Link href={`/providers/${provider.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}