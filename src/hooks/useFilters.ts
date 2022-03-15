import useSWR from "swr";

import { FiltersService } from "../services/FiltersService";

export const useFilters = () => {
  const { data, error } = useSWR("/api/filters", FiltersService.getFilters);

  const isLoading = !data && !error;

  return {
    filters: data || [],
    error,
    isLoading,
  };
};
