import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  from: 'KTM',
  to: 'PKR',
  dayOfWeek: 'Friday',
  travellers:1,
};

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    setFrom: (state, action) => {
      state.from = action.payload;
    },
    setTo: (state, action) => {
      state.to = action.payload;
    },
    setDayOfWeek: (state, action) => {
      state.dayOfWeek = action.payload;
    },
    setTravellers: (state, action)=> {
      state.travellers= action.payload;
    },

    resetFlightSearch: (state) => {
      state.from = '';
      state.to = '';
      state.dayOfWeek = '';
    }
  }
});

export const { setFrom, setTo, setDayOfWeek, resetFlightSearch, setTravellers } = flightSlice.actions;

export default flightSlice.reducer;
