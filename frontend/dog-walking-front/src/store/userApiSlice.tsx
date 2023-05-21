import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterUserFields {
  UserName: string;
  LastName: string;
  FirstName: string;
  Age: number;
  Email: string;
  UserPassword: string;
  ImageUrl: string;
  PhoneNumber: string;
  Description: string;
  Gender: 0 | 1;
  RatePerHour: number;
  Dogs: [];
  OwnerWalks: [];
  WalkerWalks: [];
  Availabilities: [];
}

interface UserData {
  userName: string;
  lastName: string;
  firstName: string;
  age: number;
  email: string;
  userPassword: string;
  imageUrl: string;
  phoneNumber: string;
  description: string;
  gender: 0 | 1;
  ratePerHour: number;
  dogs: [];
  ownerWalks: [];
  walkerWalks: [];
  availabilities: [];
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
});

const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginCredentials>({
      query: (params) => ({
        url: `/api/Users/Login?username=${params.username}&password=${params.password}`,
        method: "POST",
      }),
    }),
    register: builder.mutation<void, RegisterUserFields>({
      query: (params) => ({
        url: "/api/Users/Register",
        method: "Post",
        body: params,
      }),
    }),
    getUser: builder.query<UserData, string>({
      query: (params) => ({
        url: `/api/Users/${params}`
      })
    })
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetUserQuery } = userApiSlice;
export default userApiSlice;
