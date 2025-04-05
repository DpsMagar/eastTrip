import { createApi } from "@reduxjs/toolkit/query";

export const listAirportsApi = createApi({
    reducerPath: 'listAirportsApi',
    baseQuery,
    endpoints: (builder) => ({
        getAirports: builder.query({
            query: ()=> '/results/flight/flightsList'
        })
    })
})

export const { useGetAirportaQuery} = listAirportsApi;