import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://easttrip.onrender.com',
});
