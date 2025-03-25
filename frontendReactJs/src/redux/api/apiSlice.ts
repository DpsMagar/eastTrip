import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface AuthResponse {
token: string;
userId: number;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/auth' }), 
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/login', 
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, {
        fullName:string;
        email: string;
        password: string;
        confirmPassword: string;
        }>({
      query: (userDetails) => ({
        url: '/register', 
        method: 'POST',
        body: userDetails,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = apiSlice;
