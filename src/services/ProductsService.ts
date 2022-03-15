import api from "../utils/api";

import { catchError } from "../utils/catchError";

import { Product, ProductData } from "../types/Product";
import { Search } from "../types/Search";

const getProducts = async (
  params: Search & Record<string, string>
): Promise<ProductData> => {
  try {
    const url = "/products";
    const { data } = await api.get(url, { params });
    return {
      products: data.data.products,
      total: data.data.total,
    };
  } catch (e: any) {
    throw new Error(catchError(e, "[getProducts]"));
  }
};

const getProduct = async (id: string): Promise<Product> => {
  try {
    const url = `/products/${id}`;
    const { data } = await api.get(url);
    return data.data.product;
  } catch (e: any) {
    throw new Error(catchError(e, "[getProduct]"));
  }
};

export const ProductsService = {
  getProducts,
  getProduct
};
