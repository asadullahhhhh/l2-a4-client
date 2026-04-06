import env from "@/env";
import { GetBlogsOptions, GetBlogsParams, OrderPayload } from "@/types/meal.type";
import { cookies } from "next/headers";



const getMenus = async (params: GetBlogsParams, options?: GetBlogsOptions) => {
  try {
    const url = new URL(`${env.BACKEND_URL}/api/v1/meals`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, value);
        }
      });
    }

    const config: RequestInit = {};

    if (options?.cache) {
      config.cache = options.cache;
    }

    if(options?.revalidate) {
        config.next = {
            revalidate: options.revalidate
        }
    }

    const response = await fetch(url.toString(), config);

    const data = await response.json();

    if (!data.success) {
      return {
        data: null,
        error: {
          message: data.message || "Failed to fetch the meals.",
        },
      };
    }

    return {
      data: data.data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: "An error occurred while fetching the menu.",
      },
    };
  }
};

const getCategories = async () => {
    try {
        const response = await fetch(`${env.BACKEND_URL}/api/v1/category`)

        const data = await response.json();

        if(!data.success) {
            return {
                data: null,
                error: {
                    message: data.message || "Failed to fetch the categories."
                }
            }
        }

        return {
            data: data.data,
            error: null
        }
    }catch(error) {
        return {
            data: null,
            error: {
                message: "An error occurred while fetching the categories."
            }
        }
    }
}

const getMealById = async (id: string) => {
  try {
    const response = await fetch(`${env.BACKEND_URL}/api/v1/meals/${id}`)

    const data = await response.json();

    if(!data.success) {
        return {
            data: null,
            error: {
                message: data.message || "Failed to fetch the meal details."
            }
        }
    }

    return {
        data: data.data,
        error: null
    }
  } catch (error) {
    return {
      data: null,
      error: {
        message: "An error occurred while fetching the meal details.",
      },
    };
  }
}

const createOrder = async (payload: OrderPayload) => {
  const cookieStore = await cookies();
  try {
    const response = await fetch(`${env.BACKEND_URL}/api/v1/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString()
      },
      body: JSON.stringify(payload),
    })

    return {
      data: await response.json(),
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error: {
        message: "An error occurred while creating the order.",
      },
    };
  }
}

export const menuService = {
  getMenus,
  getCategories,
  getMealById,
  createOrder
};
