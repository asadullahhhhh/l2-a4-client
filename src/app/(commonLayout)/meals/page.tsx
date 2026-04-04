import { MealCard } from "@/components/shared/meal-card";
import { PaginationDemo } from "@/components/shared/pagination";
import { menuService } from "@/service/menu.service";
import { Meal } from "@/types/meal.type";

const MenuPage = async ({searchParams}: {searchParams: Promise<{page: string}>}) => {

  const {page} = await searchParams

  const { data, error } = await menuService.getMenus({page})

  return (
    <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto px-5 max-w-6xl">
          {
            data.data.map((meal: Meal) => (
              <MealCard key={meal.id} meal={meal}></MealCard>
            ))
          }
        </div>
        <div className="my-10">
          <PaginationDemo meta={data.meta}></PaginationDemo>
        </div>
    </div>
  );
}

export default MenuPage;