import env from "@/env";

type GetBlogsParams = {
  page?: string;
  limit?: string;
};

type GetBlogsOptions = {
  cache?: RequestCache;
  revalidate?: number;
};

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

export const menuService = {
  getMenus,
};
