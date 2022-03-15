import { useEffect, useState } from "react";

import useSWR from "swr";

import { ProductsService } from "../services/ProductsService";

import { Search } from "../types/Search";

export const useProducts = (params: Search) => {
  const [pagesCount, setPagesCount] = useState(0);

  const { data, error } = useSWR(
    ["/api/products", JSON.stringify(params)],
    (_, paramsStr) => {
      const parsedParams = JSON.parse(paramsStr);
      return ProductsService.getProducts({ ...parsedParams });
    }
  );

  const isLoading = !data && !error;

  const products = data?.products || [];
  const total = data?.total || 0;

  useEffect(() => {
    setPagesCount(Math.ceil(total / params.limit));
  }, [params, total]);

  return {
    products,
    total,
    error,
    isLoading,
    pagesCount,
    setPagesCount,
  };
};
