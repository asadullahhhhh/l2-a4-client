"use client";

import { MealCard } from "@/components/shared/meal-card";
import { SelectDemo } from "./selectCategory";
import { MealFilterSelect } from "./selectDietary ";
import { PriceFilterSelect } from "./selectPrice";
import { PaginationDemo } from "@/components/shared/pagination";
import { Meal } from "@/types/meal.type";
import { useTransition } from "react";
import { MealCardSkeleton } from "./mealCartSkeleton";

const RootMealPage = ({
  categoryData,
  meals,
}: {
  categoryData: any;
  meals: any;
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="p-4">
      <div className="flex gap-3 flex-col mx-auto md:flex-row justify-center items-center mb-10">
        <div className="flex gap-3 justify-center items-center">
          <SelectDemo startTransition={startTransition} categories={categoryData.data}  ctName="Select Category" paramName="category_id"></SelectDemo>
          <MealFilterSelect startTransition={startTransition}></MealFilterSelect>
        </div>
        <div>
          <PriceFilterSelect startTransition={startTransition}></PriceFilterSelect>
        </div>
      </div>
      <div>
        {isPending ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto px-5 max-w-6xl">
            {Array.from({ length: 6 }, (_, i) => (
              <MealCardSkeleton key={i}></MealCardSkeleton>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto px-5 max-w-6xl">
            {meals.data.map((meal: Meal) => (
              <MealCard key={meal.id} meal={meal}></MealCard>
            ))}
          </div>
        )}
      </div>
      <div className="my-10">
        <PaginationDemo
          meta={meals.meta}
          startTransition={startTransition}
        ></PaginationDemo>
      </div>
    </div>
  );
};

export default RootMealPage;
