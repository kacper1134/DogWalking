import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface AvailabilitiesData {
  walkerId: number;
  startTime: string;
  endTime: string;
  latitude: number;
  longitude: number;
  radius: number;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
});

const availabilitiesApiSlice = createApi({
  reducerPath: "availabilitiesApiSlice",
  baseQuery: baseQuery,
  tagTypes: ["Availabilities"],
  endpoints: (builder) => ({
    getAvailabilities: builder.query<AvailabilitiesData[], number>({
      query: (walkerId) => ({
        url: `/api/Availabilities?walkerId=${walkerId}`,
      }),
      providesTags: ["Availabilities"],
    }),
    createAvailabilities: builder.mutation<void, AvailabilitiesData[]>({
      query: (availabites) => ({
        url: `/api/Availabilities`,
        method: "Post",
        body: availabites,
      }),
      invalidatesTags: ["Availabilities"],
    }),
    deleteAvailabilitiesByWalkerId: builder.mutation<void, number>({
      query: (walkerId) => ({
        url: `/api/Availabilities?walkerId=${walkerId}`,
        method: "Delete",
      }),
      invalidatesTags: ["Availabilities"],
    }),
  }),
});

export const {
  useGetAvailabilitiesQuery,
  useCreateAvailabilitiesMutation,
  useDeleteAvailabilitiesByWalkerIdMutation,
} = availabilitiesApiSlice;

export default availabilitiesApiSlice;
