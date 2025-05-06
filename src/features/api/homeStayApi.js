import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './apiSlice';

export const homeStayApi = createApi({
  reducerPath: 'homeStayApi',
  baseQuery,
  endpoints: (builder) => ({
    getHomeStay: builder.query({
      query: ({ location }) =>
        `/results/homeStay?location=${location}`,
    }),
    getHomeStayAll: builder.query({
      query: ()=> '/results/homeStay/homeStayList'
  }),
  getHomeStayInfo: builder.query({
    query: (homeStayId)=> 
      `/results/homeStay/homeStay?homeStayId=${ homeStayId}`
}),
  }),
});

export const { useGetHomeStayQuery, useGetHomeStayAllQuery, useGetHomeStayInfoQuery } = homeStayApi;
