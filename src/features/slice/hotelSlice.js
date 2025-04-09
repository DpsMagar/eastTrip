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
      setRooms:(state, action)=> {
        state.rooms= action.payload;
      },
      setGuests:(state, action)=> {
        state.rooms= action.payload;
      }}
});

export const { setHotelLocation, setGuests,setRooms } = hotelSlice.actions;

export default hotelSlice.reducer;
