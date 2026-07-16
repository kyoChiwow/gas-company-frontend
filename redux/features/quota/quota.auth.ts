import { baseApi } from "@/redux/baseApi";

export const quotaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addQuota: builder.mutation({
      query: (quotaData) => ({
        url: "/quota/create",
        method: "POST",
        data: quotaData,
      }),
      invalidatesTags: ["QUOTA"],
    }),
    initPayment: builder.mutation({
      query: ({ quotaId, paymentMethod, amount }) => ({
        url: `/payment/init-payment/${quotaId}`,
        method: "POST",
        data: { paymentMethod, amount },
      }),
    }),
    getAllQuotas: builder.query({
      query: (params) => ({
        url: "/quota",
        method: "GET",
        params,
      }),
      providesTags: ["QUOTA"],
    }),
    getSingleQuota: builder.query({
      query: (id) => ({
        url: `/quota/${id}`,
        method: "GET",
      }),
      providesTags: ["QUOTA"],
    }),
    updateQuota: builder.mutation({
      query: ({ id, quotaData }) => ({
        url: `/quota/${id}`,
        method: "PATCH",
        data: quotaData,
      }),
      invalidatesTags: ["QUOTA"],
    }),
    deleteQuota: builder.mutation({
      query: (id) => ({
        url: `/quota/delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["QUOTA"],
    }),
  }),
});

export const {
  useAddQuotaMutation,
  useGetAllQuotasQuery,
  useGetSingleQuotaQuery,
  useUpdateQuotaMutation,
  useDeleteQuotaMutation,
  useInitPaymentMutation,
} = quotaApi;
