import env from "@/env"

const getAllProviders = async () => {
    try {
        const response = await fetch(`${env.BACKEND_URL}/api/v1/provider/all-providers`)

        const data = await response.json()

        if (!response.ok) {
            return {
                data: null,
                error: {
                    message: data.message || "Failed to fetch providers",
                }
            }
        }

        return {
            data,
            error: null
        }
    } catch (error) {
        return {
            data: null,
            error: {
                message: "Failed to fetch providers",
            }
        }
    }
}

export const providerService = {
    getAllProviders
}