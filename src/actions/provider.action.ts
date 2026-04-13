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
