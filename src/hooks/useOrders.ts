import useSWR from "swr";

import { OrdersService } from "../services/OrdersService";

export const useOrders = () => {
  const { data, error } = useSWR("/api/orders", () => {
    return OrdersService.getOrders();
  });

  const isLoading = !data && !error;

  return {
    orders: data || [],
    error,
    isLoading,
  };
};
