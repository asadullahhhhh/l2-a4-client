"use server";

import { menuService, OrderPayload } from "@/service/menu.service";

export const createOrder = async (payload: OrderPayload) => {
    const response = await menuService.createOrder(payload);
    
    return response;
}