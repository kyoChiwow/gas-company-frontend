import { baseApi } from "@/redux/baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productData) => ({
        url: "/products/create",
        method: "POST",
        data: productData,
      }),
      invalidatesTags: ["PRODUCT"],
    }),
    addManyProducts: builder.mutation({
      query: (productData) => ({
        url: "/products/create-many/csv",
        method: "POST",
        data: productData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["PRODUCT"],
    }),
    getAllProducts: builder.query({
      query: (params) => ({
        url: "/products",
        method: "GET",
        params,
      }),
      providesTags: ["PRODUCT"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["PRODUCT"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, productData }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        data: productData,
      }),
      invalidatesTags: ["PRODUCT"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PRODUCT"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useAddManyProductsMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;