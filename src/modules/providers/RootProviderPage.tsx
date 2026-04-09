"use client";

import { PaginationDemo } from "@/components/shared/pagination";
import { ProviderCard } from "./providerCard";
import { Provider } from "@/types/provider.type";
import { useTransition } from "react";
import { MealCardSkeleton } from "../meals/mealCartSkeleton";

const RootProviderPage = ({
  providerService,
  meta,
}: {
  providerService: Provider[];
  meta: any;
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="max-w-6xl mx-auto px-5">
      <div>
        <div>
          {isPending ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto px-5 max-w-6xl">
              {Array.from({ length: 6 }, (_, i) => (
                <MealCardSkeleton key={i}></MealCardSkeleton>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto px-5 max-w-6xl">
              {providerService.map((provider: Provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          )}
        </div>
        <div>
          {meta.totalPages > 1 && (
            <PaginationDemo startTransition={startTransition} meta={meta} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RootProviderPage;
