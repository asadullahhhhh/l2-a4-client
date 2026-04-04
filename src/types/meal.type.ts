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