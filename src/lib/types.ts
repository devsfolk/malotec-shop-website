export type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  imageHint?: string;
  parentId?: string | null;
};

export type Product = {
  id: string;
  name:string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint?: string;
  categoryId: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
