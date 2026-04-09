import { MealCardSkeleton } from "@/modules/meals/mealCartSkeleton";

const MealLoading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto px-5 max-w-6xl">
      {Array.from({ length: 6 }, (_, i) => (
        <MealCardSkeleton key={i}></MealCardSkeleton>
      ))}
    </div>
  );
};

export default MealLoading;
