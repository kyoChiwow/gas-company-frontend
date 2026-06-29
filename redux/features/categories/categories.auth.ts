import { baseApi } from "@/redux/baseApi";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCategories: builder.mutation({
      query: (categoryData) => ({
        url: "/categories/create",
        method: "POST",
        data: categoryData,
      }),
      invalidatesTags: ["CATEGORY"],
    }),
    getAllCategories: builder.query({
      query: (params) => ({
        url: "/categories",
        method: "GET",
        params,
      }),
      providesTags: ["CATEGORY"],
    }),
    getSingleCategory: builder.query({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
      providesTags: ["CATEGORY"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, categoryData }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        data: categoryData,
      }),
      invalidatesTags: ["CATEGORY"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CATEGORY"],
    }),
  }),
});

export const {
  useAddCategoriesMutation,
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;