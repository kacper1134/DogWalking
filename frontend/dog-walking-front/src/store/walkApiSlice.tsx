import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DogData } from "./dogsApiSlice";
import { UserData } from "./userApiSlice";

interface NewWalkDetails {
  ownerUsername: string;
  day: string;
  hourRange: string;
  dogIds: number[];
  walkerId: number;
}

export interface WalkDetailsType {
  walkId: number;
  ownerId: number;
  walkerId: number;
  walker: UserData;
  owner: UserData;
  startTime: string;
  endTime: string;
  rating: number;
  content: string;
  dogs: DogData[];
  status: "Planned" | "In progress" | "Awaiting payment" | "Completed";
  isAwaitingPayment: boolean;
  isStarted: boolean;
  isDone: boolean;
  lat: number;
  lng: number;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
});

const walkApiSlice = createApi({
  reducerPath: "walkApiSlice",
  baseQuery: baseQuery,
  tagTypes: ["WalkDetails"],
  endpoints: (builder) => ({
    createWalk: builder.mutation<void, NewWalkDetails>({
      query: (params) => ({
        url: `/api/Walks/CreateWalk`,
        body: params,
        method: "POST",
      }),
      invalidatesTags: ["WalkDetails"],
    }),
    getOwnerWalks: builder.query<WalkDetailsType[], string>({
      query: (username) => ({
        url: `/api/Walks/GetAllOwnerWalks?username=${username}`,
      }),
      providesTags: ["WalkDetails"],
    }),
    getWalkerWalks: builder.query<WalkDetailsType[], string>({
      query: (username) => ({
        url: `/api/Walks/GetAllWalkerWalks?username=${username}`,
      }),
      providesTags: ["WalkDetails"],
    }),
    getWalk: builder.query<WalkDetailsType, string>({
      query: (walkId) => ({
        url: `/api/Walks/${walkId}`,
      }),
      providesTags: ["WalkDetails"],
    }),
    deleteWalk: builder.mutation<void, string>({
      query: (walkId) => ({
        url: `/api/Walks/${walkId}`,
        method: "Delete",
      }),
      invalidatesTags: ["WalkDetails"],
    }),
    startWalk: builder.mutation<void, {walkId: string, lat: number, lng: number}>({
      query: (params) => ({
        url: `/api/Walks/StartWalk?walkId=${params.walkId}&lat=${params.lat}&lng=${params.lng}`,
        method: "Post",
      }),
      invalidatesTags: ["WalkDetails"],
    }),
    stopWalk: builder.mutation<void, {walkId: string}>({
      query: (params) => ({
        url: `/api/Walks/StopWalk?walkId=${params.walkId}`,
        method: "Post",
      }),
      invalidatesTags: ["WalkDetails"],
    }),
    getCurrentWalkPosition: builder.query<{item1: number, item2: number}, number>({
      query: (walkId) => ({
        url: `/api/Walks/GetCurrentWalkPosition?walkId=${walkId}`
      })
    }),
    updateWalkPosition: builder.mutation<void, {walkId: number, lat: number, lng: number}>({
      query: (params) => ({
        url: `/api/Walks/UpdateWalkPosition?walkId=${params.walkId}&lat=${params.lat}&lng=${params.lng}`,
        method: "Patch"
      })
    }),
    getWalkers: builder.query<UserData[], {lat: number, lng: number, maximumRange: number, startDate: string, endDate: string }>({
      query: (params) => ({
        url: `api/Availabilities/GetWalkers?lat=${params.lat}&lng=${params.lng}&maximumRange=${params.maximumRange}&startDate=${params.startDate}&endDate=${params.endDate}`
      })
    }),
    getPaymentIntentSecret: builder.query<{client_secret: string}, string>({
      query: (walkId) => ({
        url: `api/Walks/CreatePaymentIntent?walkId=${walkId}`
      })
    }),
    addReview: builder.mutation<void, WalkDetailsType>({
      query: (params) => ({
        url: `/api/Walks/${params.walkId}`,
        body: params,
        method: "PUT",
      }),
      invalidatesTags: ["WalkDetails"],
    }),
  }),
});

export const {
  useCreateWalkMutation,
  useDeleteWalkMutation,
  useStartWalkMutation,
  useGetWalkerWalksQuery,
  useGetOwnerWalksQuery,
  useGetWalkQuery,
  useLazyGetCurrentWalkPositionQuery,
  useLazyGetWalkersQuery,
  useGetPaymentIntentSecretQuery,
  useAddReviewMutation,
  useUpdateWalkPositionMutation,
  useStopWalkMutation,
} = walkApiSlice;
export default walkApiSlice;
