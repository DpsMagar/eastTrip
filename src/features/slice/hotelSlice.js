import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: "Kathmandu"
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setHotelLocation: (state, action) => {
        state.location= action.payload;
    }
  }
});

export const { setHotelLocation } = hotelSlice.actions;

export default hotelSlice.reducer;
