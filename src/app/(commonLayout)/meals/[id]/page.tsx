
import MealDetails from "@/modules/meals/mealDetails";
import { menuService } from "@/service/menu.service";
import { orderService } from "@/service/order.service";
import { userService } from "@/service/user.service";

const MealDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const mealPromise =  menuService.getMealById(id);
  const {data: session} = await userService.getSession()
  const bookmarkPromise = await menuService.isBookMark(id)

  const orderData = await orderService.getUserPersonalOrders()
  const ownOrders = orderData?.data?.data || []

  const exist = ownOrders.some((order: any) => 
    order.orderItems.some((item: any) => item.meal_id === id)
  )
 

  const [{data}, bookMark] = await Promise.all([mealPromise, bookmarkPromise])

  const isBookMark = bookMark?.data?.data;

  const meal = data || [];

  return (
    <MealDetails meal={meal} session={session} isBookMark={isBookMark} exist={exist}></MealDetails>
  );
};

export default MealDetailsPage;