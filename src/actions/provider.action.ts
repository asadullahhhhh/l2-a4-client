"use server";

import { menuService } from "@/service/menu.service";
import { providerService } from "@/service/provider.service";
import { MenuDetails } from "@/types/provider.type";

export const getCategories = async () => {
    const response = await menuService.getCategories()

    return response;
}

export const createMenu = async (menuData: MenuDetails) => {
    const response = await providerService.createMenu(menuData)
    return response;
}

export const updateMenuProvider = async (menuId: string, menuData: any) => {
    const response = await menuService.updateMenu(menuId, menuData)
    return response;
}


export const deleteMenuProvider = async (menuId: string) => {
    const response = await menuService.deleteMenu(menuId)
    return response;
}

export const updateOrderStatus = async (orderId: string, status: {status: string}) => {
    const response = await providerService.updateOrderStatus(orderId, status)
    return response;
}