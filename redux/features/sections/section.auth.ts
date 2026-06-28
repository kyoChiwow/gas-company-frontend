import { baseApi } from "@/redux/baseApi";

export const sectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSection: builder.mutation({
      query: (sectionData) => ({
        url: "/section/create",
        method: "POST",
        data: sectionData,
      }),
      invalidatesTags: ["SECTION"],
    }),
    getAllSections: builder.query({
      query: (params) => ({
        url: "/section",
        method: "GET",
        params,
      }),
      providesTags: ["SECTION"],
    }),
    getSingleSection: builder.query({
      query: (id) => ({
        url: `/section/${id}`,
        method: "GET",
      }),
      providesTags: ["SECTION"],
    }),
    updateSection: builder.mutation({
      query: ({ id, sectionData }) => ({
        url: `/section/${id}`,
        method: "PATCH",
        data: sectionData,
      }),
      invalidatesTags: ["SECTION"],
    }),
    deleteSection: builder.mutation({
      query: (id) => ({
        url: `/section/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SECTION"],
    }),
  }),
});

export const {
  useAddSectionMutation,
  useGetAllSectionsQuery,
  useGetSingleSectionQuery,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} = sectionApi;