import env from "@/env"
import { cookies } from "next/headers"

const getFeaturedMeals = async () => {
    try {
        const cookieStore = await cookies()
        const response = await fetch(`${env.BACKEND_URL}/api/v1/home/featured-meals`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                data: null,
                error: {
                    message: data.message || "Failed to fetch featured meals.",
                }
            }
        }

        return {
            data: data,
            error: null,
        }
    } catch (error : any) {
        return {
            data: null,
            error: {
                message: error.message || "An error occurred while fetching featured meals.",
            }
        }
    }
}



export const homeService = {
    getFeaturedMeals,
}