export type Meal = {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string | null;
  is_available: boolean;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_halal: boolean;
  is_gluten_free: boolean;
  is_feature: boolean;
};

export type GetBlogsParams = {
  page?: string;
  limit?: string;
  category_id?: string;
  is_available?: string;
  is_vegetarian?: string;
  is_vegan?: string;
  is_halal?: string;
  is_gluten_free?: string;
  min_price?: string;
  max_price?: string;
};

export type GetBlogsOptions = {
  cache?: RequestCache;
  revalidate?: number;
};

export type OrderPayload = {
  items: {
    meal_id: string;
    provider_id: string;
    quantity: number;
  }[];
  delivery_address: string;
};