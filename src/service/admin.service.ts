import env from "@/env"
import { GetAllUsersParams, UserPayload } from "@/types/admin.types"
import { cookies } from "next/headers"

const cookieStore = await cookies()

const getAllUsers = async (params: GetAllUsersParams) => {
    try {

        const url = new URL(`${env.BACKEND_URL}/api/v1/admin/get-all-users`)

        if(params) {
            Object.entries(params).forEach(([key, value]) => {
                if(value !== undefined && value !== null && value !== "") {
                    url.searchParams.append(key, value)
                }
            })
        }

        const response = await fetch(url.toString(), {
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString()
            }, 
            cache: 'no-store'
        })

        if (!response.ok) {
            return {
                data: null,
                error: {
                    message: `Failed to fetch users: ${response.statusText}`,
                }
            }
        }

        const data = await response.json()
        return {
            data,
            error: null
        }
    } catch (error : any) {
        return {
            data: null,
            error: {
                message: error.message || 'An error occurred while fetching users.',
            }
        }
    }
}

const updateUserData = async (payload: UserPayload) => {
    try{
        const response = await fetch(`${env.BACKEND_URL}/api/v1/admin/update-user`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString()
            },
            body: JSON.stringify(payload),
            cache: 'no-store'
        })

        if (!response.ok) {
            return {
                data: null,
                error: {
                    message: `Failed to update user data: ${response.statusText}`,
                }
            }
        }

        const data = await response.json()
        return {
            data,
            error: null
        }
    }catch(error: any) {
        return {
            data: null,
            error: {
                message: error.message || 'An error occurred while updating user data.',
            }
        }
    }
}

export const AdminService = {
    getAllUsers,
    updateUserData
}