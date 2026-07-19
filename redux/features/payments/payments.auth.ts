import { baseApi } from "@/redux/baseApi";

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: (params) => ({
        url: "/payment",
        method: "GET",
        params,
      }),
      providesTags: ["PAYMENT"],
    }),
    getSinglePayment: builder.query({
      query: (id) => ({
        url: `/payment/${id}`,
        method: "GET",
      }),
      providesTags: ["PAYMENT"],
    }),
    getMyPayments: builder.query({
      query: (params) => ({
        url: "/payment/my-payments",
        method: "GET",
        params,
      }),
      providesTags: ["PAYMENT"],
    }),
    updatePayment: builder.mutation({
      query: ({ id, paymentData }) => ({
        url: `/payment/${id}`,
        method: "PATCH",
        data: paymentData,
      }),
      invalidatesTags: ["PAYMENT"],
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetSinglePaymentQuery,
  useUpdatePaymentMutation,
  useGetMyPaymentsQuery,
} = paymentsApi;
