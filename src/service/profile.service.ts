import env from "@/env";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const profileDetails = async () => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(`${env.BACKEND_URL}/api/v1/profile/details`, {
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        next: {
            tags: ["profile"],
        }
    })

    const data = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: {
          message: data.message || "Failed to fetch profile details",
        },
      };
    }

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Failed to fetch profile details",
      },
    };
  }
};

const updateProfile = async (value: {name?: string; image?: string}) => {
    try {
        const cookieStore = await cookies();

        const response = await fetch(`${env.BACKEND_URL}/api/v1/profile/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify(value),
        })

        const data = await response.json();

        if (!response.ok) {
            revalidateTag("profile", "max");
            return {
                data: null,
                error: {
                    message: data.message || "Failed to update profile",
                },
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
                message: "Failed to update profile",
            },
        }
    }
}

export const profileService = {
    profileDetails,
    updateProfile,
}