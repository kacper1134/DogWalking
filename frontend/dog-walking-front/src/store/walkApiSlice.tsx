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
        url: `/api/Walks/?walkId=${params.walkId}?lat=${params.lat}?lng=${params.lng}`,
        method: "Delete",
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
} = walkApiSlice;
export default walkApiSlice;
