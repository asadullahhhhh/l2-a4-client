import env from "@/env";
import { cookies } from "next/headers";

const getSession = async () => {
  try {
    const cookieStore = await cookies();

    const sessionData = await fetch(`${env.NEXT_PUBLIC_AUTH_URL}/get-session`, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const session = await sessionData.json();

    if (!session) {
      return {
        data: null,
        error: "No active session",
      };
    }

    return {
      data: session,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: "Failed to fetch session",
    };
  }
};

export const userService = {
  getSession,
};
