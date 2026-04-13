export type Provider = {
  id: string;
  resturent_name: string;
  description: string;
  address: string;
  phone: string;
  logo_url: string;
};

export type MenuDetails = {
  category_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_feature: boolean;
  is_gluten_free: boolean;
  is_halal: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
};
