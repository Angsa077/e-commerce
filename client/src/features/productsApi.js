import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000"
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/api/products'
        }),
    }),
});

export const { useGetProductsQuery } = productsApi;