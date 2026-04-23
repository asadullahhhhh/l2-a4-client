import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

const env = createEnv({
    server: {
        BACKEND_URL: z.url(),
        FRONTEND_URL: z.url(),
    },

    client: {
        NEXT_PUBLIC_AUTH_URL: z.url(),
        NEXT_PUBLIC_BACKEND_URL: z.url(),
        NEXT_PUBLIC_PAYMENT_PUBLISHER_KEY: z.string(),
    },

    runtimeEnv: {
        NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
        NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
        FRONTEND_URL: process.env.FRONTEND_URL,
        BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
        NEXT_PUBLIC_PAYMENT_PUBLISHER_KEY: process.env.NEXT_PUBLIC_PAYMENT_PUBLISHER_KEY,
    }
})

export default env;