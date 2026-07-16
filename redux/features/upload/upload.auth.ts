import { baseApi } from "@/redux/baseApi";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSignature: builder.query({
      query: () => ({
        url: "/upload/signature",
        method: "GET",
      }),
      providesTags: ["IMAGES"],
    }),
  }),
});

export const { useGetSignatureQuery } = categoriesApi;
