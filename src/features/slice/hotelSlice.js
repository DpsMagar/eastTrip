import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: "Kathmandu",
  rooms: 1,
  guests: 2,
  hotelCheckInDate:"12 Apr 2025",
  hotelCheckOutDate:"13 Apr 2025",
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setHotelLocation: (state, action) => {
        state.location= action.payload;
    },
      setGlobalRooms:(state, action)=> {
        state.rooms= action.payload;
      },
      setGlobalGuests:(state, action)=> {
        state.guests= action.payload;
      },
      setHotelCheckInDate:(state, action)=> {
        state.hotelCheckInDate= action.payload;
      },
      setHotelCheckOutDate:(state, action)=> {
        state.hotelCheckOutDate= action.payload;
      },
    }, 
      
});

export const { setHotelLocation, setGlobalGuests, setGlobalRooms, setHotelCheckInDate, setHotelCheckOutDate } = hotelSlice.actions;

export default hotelSlice.reducer;
