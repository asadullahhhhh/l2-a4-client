"use server"

import { AdminService } from "@/service/admin.service"
import { GetAllUsersParams, UserPayload } from "@/types/admin.types"

export const getAllUsers = async (params: GetAllUsersParams) => {
    const response = await AdminService.getAllUsers(params)

    return response
}

export const updateUserData = async (payload: UserPayload) => {
    const response = await AdminService.updateUserData(payload)

    return response
}