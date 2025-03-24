import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

interface LoginRequest{
    email: string;
    password: string
}
interface RegisterRequest{
    name: string;
    email: string;
    password: string
}

interface AuthResponse{
   token: string;
   userId: number;
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/auth" }),
    endpoints: (builder) => ({
      login: builder.mutation<AuthResponse, LoginRequest>({
        query: (credentials) => ({
          url: "/login",
          method: "POST",
          body: credentials,
        }),
      }),
      register: builder.mutation<AuthResponse, RegisterRequest>({
        query: (userData) => ({
          url: "/register",
          method: "POST",
          body: userData,
        }),
      }),
    }),
  })

//   export const {useLoginMutation, useRegisterMutation }= authApi;