import env from "@/env"

const createPaymentIntent = async (amount: number) => {
    try {
        const response = await fetch(`${env.BACKEND_URL}/api/v1/payment/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount }),
        })

        if (!response.ok) {
            return {
                data: null,
                error: {
                    message: "Failed to create payment intent.",
                }
            }
        }

        const data = await response.json();

        return {
            data,
            error: null,
        }
    } catch (error: any) {
        return {
            data: null,
            error: {
                message: error.message || "Failed to create payment intent.",
            }
        }
    }
}

export const paymentService = {
    createPaymentIntent,
}