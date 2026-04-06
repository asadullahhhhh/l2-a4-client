import { MealCard } from "@/components/shared/meal-card";
import { PaginationDemo } from "@/components/shared/pagination";
import { SelectDemo } from "@/modules/meals/selectCategory";
import { MealFilterSelect } from "@/modules/meals/selectDietary ";
import { PriceFilterSelect } from "@/modules/meals/selectPrice";
import { menuService } from "@/service/menu.service";
import { Meal } from "@/types/meal.type";

type GetBlogsParams = {
  page?: string;
  limit?: string;
  category_id?: string;
  is_available?: string;
  is_vegetarian?: string;
  is_vegan?: string;
  is_halal?: string;
  is_gluten_free?: string;
  min_price?: string;
  max_price?: string;
};

const MenuPage = async ({
  searchParams,
}: {
  searchParams: Promise<GetBlogsParams>;
}) => {
  const {
    page,
    category_id,
    is_available,
    is_vegetarian,
    is_vegan,
    is_halal,
    is_gluten_free,
    min_price,
    max_price,
  } = await searchParams;

  const mealPromise = menuService.getMenus({
    page,
    category_id,
    is_available,
    is_vegetarian,
    is_vegan,
    is_halal,
    is_gluten_free,
    min_price,
    max_price,
  });
  const categoryPromise = menuService.getCategories();

  const [mealData, categoryData] = await Promise.all([
    mealPromise,
    categoryPromise,
  ]);

  const meals = mealData.data;

  return (
    <div className="p-4">
      <div className="flex gap-3 flex-col mx-auto md:flex-row justify-center items-center mb-10">
        <div className="flex gap-3 justify-center items-center ">
          <SelectDemo categories={categoryData.data}></SelectDemo>
          <MealFilterSelect></MealFilterSelect>
        </div>
        <div >
          <PriceFilterSelect></PriceFilterSelect>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto px-5 max-w-6xl">
        {meals.data.map((meal: Meal) => (
          <MealCard key={meal.id} meal={meal}></MealCard>
        ))}
      </div>
      <div className="my-10">
        <PaginationDemo meta={meals.meta}></PaginationDemo>
      </div>
    </div>
  );
};

export default MenuPage;
