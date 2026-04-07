import env from "@/env"
import { cookies } from "next/headers"

const getUserOrders = async () => {
    try {
        const cookieStore = await cookies()

        const response = await fetch(`${env.BACKEND_URL}/api/v1/order`, {
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            }
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                data: null,
                error: {
                    message: data.message || "Failed to fetch user orders.",
                }
            }
        }

        return {
            data,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error: {
                message: "An error occurred while fetching user orders.",
            }
        }
    }
}

export const orderService = {
    getUserOrders,
}