import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080',
  // baseUrl: 'https://rides-vault.onrender.com',
});
