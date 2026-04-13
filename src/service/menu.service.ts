import env from "@/env";
import {
  GetBlogsOptions,
  GetBlogsParams,
  OrderPayload,
} from "@/types/meal.type";
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

    if (options?.revalidate) {
      config.next = {
        revalidate: options.revalidate,
      };
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
    const response = await fetch(`${env.BACKEND_URL}/api/v1/category`, {
      cache: "no-store",
    });

    const data = await response.json();

    if (!data.success) {
      return {
        data: null,
        error: {
          message: data.message || "Failed to fetch the categories.",
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
        message: "An error occurred while fetching the categories.",
      },
    };
  }
};

const getMealById = async (id: string) => {
  try {
    const response = await fetch(`${env.BACKEND_URL}/api/v1/meals/${id}`);

    const data = await response.json();

    if (!data.success) {
      return {
        data: null,
        error: {
          message: data.message || "Failed to fetch the meal details.",
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
        message: "An error occurred while fetching the meal details.",
      },
    };
  }
};

const createOrder = async (payload: OrderPayload) => {
  const cookieStore = await cookies();
  try {
    const response = await fetch(`${env.BACKEND_URL}/api/v1/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    return {
      data: await response.json(),
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: "An error occurred while creating the order.",
      },
    };
  }
};

const isBookMark = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${env.BACKEND_URL}/api/v1/cartItem/isAddCart/${id}`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    const data = await response.json();

    if (!data.success) {
      return {
        data: null,
        error: {
          message: data.message || "Failed to check the meal bookmark status.",
        },
      };
    }

    return {
      data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.message || "An error occurred while meal bookmarking.",
      },
    };
  }
};

const addCart = async (
  mealId: string,
  price: string,
  provider_id: string,
  image_url: string,
  name: string,
) => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(`${env.BACKEND_URL}/api/v1/cartItem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        meal_id: mealId,
        price,
        provider_id,
        image_url,
        name,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const data = await response.json();
      return {
        data: null,
        error: {
          message: data.message || "Failed to add the meal to cart.",
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
        message: "An error occurred while adding the meal to cart.",
      },
    };
  }
};

const getProviderMenus = async ({ page }: { page?: string }) => {
  try {
    const cookieStore = await cookies();

    const url = new URL(`${env.BACKEND_URL}/api/v1/meals/provider-meals`);

    if (page) {
      url.searchParams.set("page", page);
    }

    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        data: null,
        error: {
          message: data.message || "Failed to fetch the provider's menus.",
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
        message: "An error occurred while fetching the provider's menus.",
      },
    };
  }
};

const updateMenu = async (mealId: string, updateData: any) => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(`${env.BACKEND_URL}/api/v1/meals/${mealId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: {
          message: data.message || "Failed to update the menu.",
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
        message: "An error occurred while updating the menu.",
      },
    };
  }
};

const deleteMenu = async (mealId: string) => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(`${env.BACKEND_URL}/api/v1/meals/${mealId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      }
    })


    if(!response.ok) {
      return {
        data: null,
        error: {
          message: "Failed to delete the menu.",
        },
      }
    }

    const data = await response.json();

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: "An error occurred while deleting the menu.",
      },
    };
  }
}

const getProviderOrders = async ({page}: { page?: string }) => {
  try {
    const cookieStore = await cookies();

    const url = new URL(`${env.BACKEND_URL}/api/v1/provider/orders`)

    if(page) {
      url.searchParams.set("page", page);
    }

    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    })

    const data = await response.json();

    if(!response.ok) {
      return {
        data: null,
        error: {
          message: data.message || "Failed to fetch the provider's orders.",
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
        message: "An error occurred while fetching the provider's orders.",
      },
    };
  }
}

export const menuService = {
  getMenus,
  getCategories,
  getMealById,
  createOrder,
  isBookMark,
  addCart,
  getProviderMenus,
  updateMenu,
  deleteMenu,
  getProviderOrders,
};
