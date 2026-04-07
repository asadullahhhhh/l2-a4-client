"use server";

import { cartService } from "@/service/cart.service";

export const removeCartItem = async (cartItemId: string) => {
    const response = await cartService.removeItem(cartItemId);

    return response;
}