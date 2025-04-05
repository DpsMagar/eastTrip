import { createApi } from "@reduxjs/toolkit/query";

export const listHomeStayApi = createApi({
    reducerPath: 'listHomeStayApi',
    baseQuery,
    endpoints: (builder) => ({
        getHomeStay: builder.query({
            query: ()=> '/results/homeStay/homeStayList'
        })
    })
})

export const { usegetHomeStayQuery} = listHomeStayApi;