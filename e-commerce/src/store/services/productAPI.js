import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: () => "products",
      providesTags: "products",
    }),
  }),
});

export const { useFetchProductsQuery } = productApi;

export default productApi;
