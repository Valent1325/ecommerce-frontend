import { useState } from "react";
import {
  Alert,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";

import styled from "@emotion/styled";

import { Filters } from "../../components/Filters";
import { Product } from "../../components/Product";
import { Wrapper } from "../../components/Wrapper";

import { useFilters } from "../../hooks/useFilters";
import { useProducts } from "../../hooks/useProducts";

import { PageProps } from "../../types/Page";

import "./styles.css";

const PaginationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Products = (props: PageProps): JSX.Element => {
  const { user } = props;

  const [sort, setSort] = useState("name");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [filter, setFilter] = useState({});
  const { filters } = useFilters();
  const { products, total, error, isLoading, pagesCount } = useProducts({
    page,
    limit,
    sort,
    keyword,
    ...filter,
  });

  const handleFiltersChange = (value: Record<string, string>) => {
    setFilter(value);
  };
  const handleSortChange = (event: any) => {
    setSort(event.target.value);
  };
  const handleKeywordChange = (event: any) => {
    setKeyword(event.target.value);
  };
  const handlePageChange = (event: any, value: number) => {
    setPage(value);
  };
  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
  };

  return (
    <Wrapper title={`Товары (${total} шт)`}>
      {isLoading && (
        <div className="app-progress">
          <CircularProgress />
        </div>
      )}

      {error && <Alert severity="error">{error?.message}</Alert>}

      {!error && !isLoading && (
        <Grid container spacing={2} columns={{ xs: 1, md: 4 }}>
          <Grid item xs={1} md={1}>
            <Filters
              filters={filters}
              filter={filter}
              onChange={handleFiltersChange}
            />
          </Grid>

          <Grid item xs={1} md={3}>
            <Grid
              container
              spacing={2}
              columns={{ xs: 1, md: 3 }}
              marginBottom={2}
            >
              <Grid item xs={1} md={1}>
                <FormControl fullWidth size="small" margin="dense">
                  <InputLabel id="sort">Сортировать по</InputLabel>
                  <Select
                    labelId="sort"
                    value={sort}
                    label="Сортировать по"
                    onChange={handleSortChange}
                  >
                    <MenuItem value="name">Наименование: А-Я</MenuItem>
                    <MenuItem value="-name">Наименование: Я-А</MenuItem>
                    <MenuItem value="price">Цена по возрастанию</MenuItem>
                    <MenuItem value="-price">Цена по убыванию</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={1} md={2}>
                <FormControl fullWidth margin="dense">
                  <TextField
                    size="small"
                    label="Поиск"
                    variant="outlined"
                    value={keyword}
                    onChange={handleKeywordChange}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              columns={{ xs: 1, md: 3 }}
              marginBottom={2}
            >
              {products.map((product, index) => (
                <Grid key={index} item xs={1} md={1}>
                  <Product
                    id={product.id}
                    name={product.name}
                    photo={product.photo}
                    price={product.price}
                    properties={product.properties}
                    showCartBtn={!!user}
                  />
                </Grid>
              ))}
            </Grid>

            <PaginationBar>
              <FormControl size="small" margin="dense">
                <InputLabel id="limit">Кол-во</InputLabel>
                <Select
                  labelId="limit"
                  value={limit}
                  label="Кол-во"
                  onChange={handleLimitChange}
                >
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
              <Pagination
                count={pagesCount}
                page={page}
                onChange={handlePageChange}
              />
            </PaginationBar>
          </Grid>
        </Grid>
      )}
    </Wrapper>
  );
};
