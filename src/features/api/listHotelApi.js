import { createApi } from "@reduxjs/toolkit/query";

export const listHotelApi = createApi({
    reducerPath: 'listHotelApi',
    baseQuery,
    endpoints: (builder) => ({
        getHotels: builder.query({
            query: ()=> '/results/hotels/hotelList'
        })
    })
})

export const { useGetHotelsQuery} = listHotelApi;