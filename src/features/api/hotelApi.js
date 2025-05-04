import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './apiSlice';

export const hotelApi = createApi({
  reducerPath: 'hotelApi',
  baseQuery,
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: ({ location }) =>
        `/results/hotels?location=${location}`,
    }),

    getHotelsAll: builder.query({
      query: ()=> '/results/hotels/hotelList'
  }),

  getHotelInfo:builder.query({
    query:(hotelId)=>
      `/results/hotels/hotel?hotelId=${hotelId}`,
  }),
  }),
});

export const { useGetHotelsQuery, useGetHotelsAllQuery, useGetHotelInfoQuery } = hotelApi;
