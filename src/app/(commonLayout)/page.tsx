import { MealCard } from "@/components/shared/meal-card";
import Banner from "@/modules/home/bannerSlider";
import { homeService } from "@/service/home.service";
import { Meal } from "@/types/meal.type";
import Image from "next/image";

export default async function Home() {

  const {data, error} = await homeService.getFeaturedMeals()
  
  const featuredMeals = data?.data || []

  console.log(featuredMeals);

  return (
    <div className="max-w-6xl mx-auto px-5">
      <div>
        <Banner></Banner>
      </div>
      <div className="mt-30">
        <div className="mb-5">
          <h2 className="font-semibold text-4xl">Featured Meals</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl">
          {
          featuredMeals.map((meal: Meal) => {
            return(
              <MealCard meal={meal}></MealCard>
            )
          })
        }
        </div>
      </div>
    </div>
  
  );
}
