import { MealCard } from "@/components/shared/meal-card";
import Banner from "@/modules/home/bannerSlider";
import WhyChooseUs from "@/modules/home/chooseUsSection";
import { ProviderCard } from "@/modules/providers/providerCard";
import { homeService } from "@/service/home.service";
import { Meal } from "@/types/meal.type";
import { Provider } from "@/types/provider.type";
import Image from "next/image";

export default async function Home() {

  const {data: meals, error} = await homeService.getFeaturedMeals()
  const {data: providers, error: providerError} = await homeService.getFeaturedProviders()
  
  const featuredMeals = meals?.data || []
  const featuredProviders = providers?.data || []


  return (
    <div className="max-w-6xl mx-auto px-5">
      {/* Banner Section */}
      <div>
        <Banner></Banner>
      </div>

      {/* Featured Meals Section */}
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

      {/* Featured Providers Section */}
      <div className="mt-30">
        <div className="mb-5">
          <h2 className="font-semibold text-4xl">Featured Providers</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl">
          {
          featuredProviders.map((provider: Provider) => (
            <ProviderCard provider={provider}></ProviderCard>
          ))
        }
        </div>
      </div>

      {/*  */}
      <div className="my-30">
        <WhyChooseUs></WhyChooseUs>
      </div>
    </div>
  
  );
}
