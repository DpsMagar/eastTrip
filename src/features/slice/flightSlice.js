import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  from: 'KTM',
  to: 'PKR',
  dayOfWeek: 'Friday',
  travellers:1,
  flightDate: "21 Mar 2025",
  fromLocationFlight: 'Kathmandu',
  toLocationFlight: 'Pokhara',
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
    },
    setflightDate:(state, action)=> {
      state.flightDate= action.payload;
    },
    setFromFlightLocation: (state, action) => {
      state.fromLocationFlight = action.payload;
    },
    setToFlightLocation: (state, action) => {
      state.toLocationFlight = action.payload;
    },
  }
});

export const { setFrom, setTo, setDayOfWeek, resetFlightSearch, setTravellers, setflightDate, setFromFlightLocation, setToFlightLocation } = flightSlice.actions;

export default flightSlice.reducer;