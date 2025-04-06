import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './apiSlice';

export const flightApi = createApi({
  reducerPath: 'flightApi',
  baseQuery,
  endpoints: (builder) => ({
    getFlights: builder.query({
      query: ({ from, to, dayOfWeek }) =>
        `/results/flights?fromCode=${from}&toCode=${to}&dayOfWeek=${dayOfWeek}`,
    }),
    getAirportsAll: builder.query({
      query: ()=> '/results/flight/flightsList'
  })
  }),
});

export const { useGetFlightsQuery, useGetAirportsAllQuery } = flightApi;
