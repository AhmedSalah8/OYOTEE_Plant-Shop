export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  rating: number;
  reviews: number;
  description?: string;
  category_name?: string;
};
export interface CartItem extends Product {
  quantity: number;
}
