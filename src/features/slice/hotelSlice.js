import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: "Kathmandu",
  rooms: 1,
  guests: 2,
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
      }}
});

export const { setHotelLocation, setGlobalGuests, setGlobalRooms } = hotelSlice.actions;

export default hotelSlice.reducer;
