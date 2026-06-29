import { baseApi } from "@/redux/baseApi";

export const typesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTypes: builder.mutation({
      query: (typeData) => ({
        url: "/type/create",
        method: "POST",
        data: typeData,
      }),
      invalidatesTags: ["TYPE"],
    }),
    getAllTypes: builder.query({
      query: (params) => ({
        url: "/type",
        method: "GET",
        params,
      }),
      providesTags: ["TYPE"],
    }),
    getSingleType: builder.query({
      query: (id) => ({
        url: `/type/${id}`,
        method: "GET",
      }),
      providesTags: ["TYPE"],
    }),
    updateType: builder.mutation({
      query: ({ id, typeData }) => ({
        url: `/type/${id}`,
        method: "PATCH",
        data: typeData,
      }),
      invalidatesTags: ["TYPE"],
    }),
    deleteType: builder.mutation({
      query: (id) => ({
        url: `/type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TYPE"],
    }),
  }),
});

export const {
  useAddTypesMutation,
  useGetAllTypesQuery,
  useGetSingleTypeQuery,
  useUpdateTypeMutation,
  useDeleteTypeMutation
} = typesApi;