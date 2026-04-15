import env from "@/env"
import { MenuDetails } from "@/types/provider.type"
import { cookies } from "next/headers"

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

const getProviderById = async (id: string) => {
    try {
        const response = await fetch(`${env.BACKEND_URL}/api/v1/provider/all-providers/${id}`)

        const data = await response.json()

        if (!response.ok) {
            return {
                data: null,
                error: {
                    message: data.message || "Failed to fetch provider details",
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
                message: "Failed to fetch provider details",
            }
        }
    }
}

const createMenu = async (menuData: MenuDetails) => {
    const cookieStore = await cookies()
    try {
        const response = await fetch(`${env.BACKEND_URL}/api/v1/meals`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString()
            },
            body: JSON.stringify(menuData)
        })

        const data = await response.json()
        console.log(data);

        if (!response.ok) {
            return {
                data: null,
                error: {
                    message: data.message || "Failed to create menu",
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
                message: "Failed to create menu",
            }
        }
    }
}

const updateOrderStatus = async (orderId: string, status: {status: string}) => {
    const cookieStore = await cookies()
    try {
        const response = await fetch(`${env.BACKEND_URL}/api/v1/order/${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString()
            },
            body: JSON.stringify(status)
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                data: null,
                error: {
                    message: data.message || "Failed to update order status",
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
                message: "Failed to update order status",
            }
        }
    }
}

const getProviderData = async () => {
    const cookieStore = await cookies()

    try {
        const response = await fetch(`${env.BACKEND_URL}/api/v1/provider/my-provider`, {
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString()
            }
        })

        const data = await response.json()

        if(!response.ok) {
            return {
                data: null,
                error: {
                    message: data.message || "Failed to fetch provider data",
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
                message: "Failed to fetch provider data",
            }
        }
    }
}

const createProviderProfile = async (payload: any) => {
    const cookieStore = await cookies()
    try {
        const response = await fetch(`${env.BACKEND_URL}/api/v1/provider`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString()
            },
            body: JSON.stringify(payload)
        })

        const data = await response.json()

        if(!response.ok) {
            return {
                data: null,
                error: {
                    message: data.message || "Failed to create provider profile",
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
                message: "Failed to create provider profile",
            }
        }
    }
}

export const providerService = {
    getAllProviders,
    getProviderById,
    createMenu,
    updateOrderStatus,
    getProviderData,
    createProviderProfile
}