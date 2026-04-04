import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

const env = createEnv({
    server: {
        BACKEND_URL: z.url(),
        FRONTEND_URL: z.url(),
    },

    client: {
        NEXT_PUBLIC_AUTH_URL: z.url(),
    },

    runtimeEnv: {
        NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
        BACKEND_URL: process.env.BACKEND_URL,
        FRONTEND_URL: process.env.FRONTEND_URL,
    }
})

export default env;