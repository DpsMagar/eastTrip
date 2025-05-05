import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from './apiSlice';


export const bookApi= createApi({
    reducerPath: 'bookApi',
    baseQuery,
    endpoints: (builder) => ({
        bookNow: builder.mutation({
            query:(credentials) =>({
                url:'/api/inn-bookings',
                method: 'POST', 
                body: credentials,
            }),
        }),
    }),

})

export const { useBookNowMutation } = bookApi;