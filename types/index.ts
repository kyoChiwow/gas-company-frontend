export {
  type ILogin,
  type IRegister,
  type ISendOtp,
  type IVerifyOTP,
} from "./auth.type";

// General Response Type
export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: IMeta;
}
// General Response Type

// Register Response Type Here
export interface IRegisterResponse {
  name: string;
  email: string;
  password: string;
  role: string;
  isDeleted: boolean;
  isActive: string;
  isVerified: boolean;
  auths: IAuth[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}
// Register Response Type Here

// Login Data Response Type
export interface ILoginData {
  accessToken: string;
  refreshToken: string;
  user: ILoginResponse;
}
// Login Data Response Type

// Login Response Type
export interface ILoginResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
  isDeleted: boolean;
  isActive: string;
  isVerified: boolean;
  auths: IAuth[];
  createdAt: string;
  updatedAt: string;
  phone: string;
  address: string;
}
// Login Response Type


// General Auth Type Here
export interface IAuth {
  provider: string;
  providerId: string;
}
// General Auth Type


// Meta Type
export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
// Meta Type

// Sidear Item Type
export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
  }[];
}
// Sidear Item Type


export type TRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "USER"
  | "COMPANY";