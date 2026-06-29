import { baseApi } from "@/redux/baseApi";

export const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBrand: builder.mutation({
      query: (brandData) => ({
        url: "/brand/create",
        method: "POST",
        data: brandData,
      }),
      invalidatesTags: ["BRAND"],
    }),
    getAllBrands: builder.query({
      query: (params) => ({
        url: "/brand",
        method: "GET",
        params,
      }),
      providesTags: ["BRAND"],
    }),
    getSingleBrand: builder.query({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "GET",
      }),
      providesTags: ["BRAND"],
    }),
    updateBrand: builder.mutation({
      query: ({ id, brandData }) => ({
        url: `/brand/${id}`,
        method: "PATCH",
        data: brandData,
      }),
      invalidatesTags: ["BRAND"],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BRAND"],
    }),
  }),
});

export const {
  useAddBrandMutation,
  useGetAllBrandsQuery,
  useGetSingleBrandQuery,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;