"use server";

import { menuService } from "@/service/menu.service";
import { OrderPayload } from "@/types/meal.type";

export const createOrder = async (payload: OrderPayload) => {
  const response = await menuService.createOrder(payload);

  return response;
};

export const createBookMark = async (
  mealId: string,
  price: string,
  provider_id: string,
  image_url: string,
  name: string,
) => {
  const response = await menuService.addCart(
    mealId,
    price,
    provider_id,
    image_url,
    name,
  );

  return response;
};

export const createReview = async (
  mealId: string,
  rating: number,
  comment: string,
) => {
  const response = await menuService.createReview(mealId, rating, comment);
  return response;
};
