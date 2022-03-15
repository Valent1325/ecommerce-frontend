import api from "../utils/api";

import { catchError } from "../utils/catchError";

import { Filter } from "../types/Filter";

const getFilters = async (): Promise<Filter[]> => {
  try {
    const url = "/filters";
    const { data } = await api.get(url);
    return data.data;
  } catch (e: any) {
    throw new Error(catchError(e, "[getFilters]"));
  }
};

export const FiltersService = {
  getFilters
};
