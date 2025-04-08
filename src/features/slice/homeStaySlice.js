import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: "Kathmandu"
};

const homeStaySlice = createSlice({
  name: 'homeStay',
  initialState,
  reducers: {
    setHomeStayLocation: (state, action) => {
        state.location= action.payload;
    }
  }
});

export const { setHomeStayLocation } = homeStaySlice.actions;

export default homeStaySlice.reducer;
