import { createSlice } from '@reduxjs/toolkit';
// import PayloadAction from 

const tokenFromStorage = sessionStorage.getItem('token');
const userIdFromStorage= sessionStorage.getItem('userId');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: tokenFromStorage || null,
    userId: userIdFromStorage || null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token; 
      sessionStorage.setItem('token', action.payload.token);
      state.userId= action.payload.userId;
      sessionStorage.setItem('userId', action.payload.userId);
    },
    logout: (state) => {
      state.token = null; 
      sessionStorage.removeItem('token'); 
      state.userId = null; 
      sessionStorage.removeItem('userId'); 
    },
  },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;
