
import MealDetails from "@/modules/meals/mealDetails";
import { menuService } from "@/service/menu.service";
import { userService } from "@/service/user.service";

const MealDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data } = await menuService.getMealById(id);
  const {data: session} = await userService.getSession()

  const meal = data;

  return (
    <MealDetails meal={meal} session={session}></MealDetails>
  );
};

export default MealDetailsPage;