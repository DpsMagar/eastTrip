import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  from: '',
  to: '',
  dayOfWeek: '',
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
    resetFlightSearch: (state) => {
      state.from = '';
      state.to = '';
      state.dayOfWeek = '';
    }
  }
});

export const { setFrom, setTo, setDayOfWeek, resetFlightSearch } = flightSlice.actions;

export default flightSlice.reducer;
