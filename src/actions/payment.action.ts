"use server"

import { paymentService } from "@/service/payment.service"

export const paymentIntent = async (amount: number) => {
    const response  = await paymentService.createPaymentIntent(amount);
    return response;
}