import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './apiSlice';

export const homeStayApi = createApi({
  reducerPath: 'homeStayApi',
  baseQuery,
  endpoints: (builder) => ({
    getHomeStay: builder.query({
      query: ({ city }) =>
        `/results/homeStay?cityName=${city}`,
    }),
  }),
});

export const { useGetHomeStaysQuery } = homeStayApi;
