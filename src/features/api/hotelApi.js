import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './apiSlice';

export const hotelApi = createApi({
  reducerPath: 'hotelApi',
  baseQuery,
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: ({ location }) =>
        `/results/hotels?cityName=${location}`,
    }),
  }),
});

export const { useGetHotelsQuery } = hotelApi;
