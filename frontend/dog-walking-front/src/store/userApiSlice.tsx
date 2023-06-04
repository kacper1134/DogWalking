import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DogData } from "./dogsApiSlice";

interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterUserFields {
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

export interface UserData {
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
  dogs: DogData[];
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
  tagTypes: ["UserDetails"],
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
        url: `/api/Users/${params}`,
      }),
      providesTags: ["UserDetails"],
    }),
    updateUserDetails: builder.mutation<void, RegisterUserFields>({
      query: (params) => ({
        url: `/api/Users/${params.UserName}`,
        method: "Put",
        body: params,
      }),
      invalidatesTags: ["UserDetails"],
    }),
    deleteDog: builder.mutation<void, number>({
      query: (dogId) => ({
        url: `/api/Dogs/${dogId}`,
        method: "Delete",
      }),
      invalidatesTags: ["UserDetails"],
    }),
    createDog: builder.mutation<DogData, { username: string; data: DogData }>({
      query: (dogData) => ({
        url: `/api/Dogs?username=${dogData.username}&dogName=${dogData.data.name}&birthday=${dogData.data.birthday}&description=${dogData.data.description}&imageUrl=${dogData.data.imageUrl}`,
        method: "Post",
      }),
      invalidatesTags: ["UserDetails"],
    }),
    updateDog: builder.mutation<void, DogData>({
      query: (dogData) => ({
        url: `/api/Dogs/${dogData.dogId}`,
        body: dogData,
        method: "Put",
      }),
      invalidatesTags: ["UserDetails"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCreateDogMutation,
  useDeleteDogMutation,
  useUpdateDogMutation,
  useGetUserQuery,
  useUpdateUserDetailsMutation,
} = userApiSlice;
export default userApiSlice;
