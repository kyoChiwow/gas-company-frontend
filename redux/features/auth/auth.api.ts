import { baseApi } from "@/redux/baseApi";
import type {
  ILogin,
  ILoginData,
  IRegister,
  IRegisterResponse,
  IResponse,
  ISendOtp,
  IVerifyOTP,
} from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<ILoginData>, ILogin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    register: builder.mutation<IResponse<IRegisterResponse>, IRegister>({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation<IResponse<null>, IVerifyOTP>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/user/get-me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/user/get-all",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),
    editProfile: builder.mutation({
      query: ({userId, data}) => ({
        url: `/user/${userId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER"],
    }),
    changePassword: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/change-password",
        method: "POST",
        data: userInfo,
      }),
    }),
    makeAdmin: builder.mutation({
      query: ({userId}) => ({
        url: `/user/${userId}/make-admin`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
    makeSuperAdmin: builder.mutation({
      query: ({userId}) => ({
        url: `/user/${userId}/make-super-admin`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
    makeUser: builder.mutation({
      query: ({userId}) => ({
        url: `/user/${userId}/make-user`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
    deleteUser: builder.mutation({
      query: ({userId}) => ({
        url: `/user/${userId}/delete`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
    restoreUser: builder.mutation({
      query: ({userId}) => ({
        url: `/user/${userId}/restore`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery,
  useLogoutMutation,
  useEditProfileMutation,
  useChangePasswordMutation,
  useGetAllUsersQuery,
  useMakeAdminMutation,
  useMakeSuperAdminMutation,
  useDeleteUserMutation,
  useRestoreUserMutation,
  useMakeUserMutation,
} = authApi;
