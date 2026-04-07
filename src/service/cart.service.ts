import env from "@/env";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const getUserCart = async () => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${env.BACKEND_URL}/api/v1/cartItem`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      next: {
        tags: ["cart"],
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: {
          message:
            data.message || "Something went wrong while fetching cart items",
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
        message: "Failed to fetch cart items",
      },
    };
  }
};

const removeItem = async (cartItemId: string) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${env.BACKEND_URL}/api/v1/cartItem/${cartItemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },

      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: {
          message: data.message || "Failed to remove the item from cart.",
        },
      };
    }

    revalidateTag("cart", "max");

    return {
      data: true,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Failed to remove the item from cart.",
      },
    };
  }
};

export const cartService = {
  getUserCart,
  removeItem, 
};
