export type Product = {
  id: string;
  name: string;
  photo: string;
  price: number;
  properties: Record<string, string>;
};

export type ProductData = {
  products: Product[];
  total: number;
};
