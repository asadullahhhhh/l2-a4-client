import RootMealPage from "@/modules/meals/RootMealPage";
import { menuService } from "@/service/menu.service";

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

  const meals = mealData.data

  return (
   <RootMealPage categoryData={categoryData} meals={meals}></RootMealPage>
  );
};

export default MenuPage;
