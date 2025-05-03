import { createSlice } from '@reduxjs/toolkit';
// import PayloadAction from 

const tokenFromStorage = localStorage.getItem('token');
const userIdFromStorage= localStorage.getItem('userId');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: tokenFromStorage || null,
    userId: userIdFromStorage || null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token; 
      localStorage.setItem('token', action.payload.token);
      state.userId= action.payload.userId;
      localStorage.setItem('userId', action.payload.userId);
    },
    logout: (state) => {
      state.token = null; 
      localStorage.removeItem('token'); 
      state.userId = null; 
      localStorage.removeItem('userId'); 
    },
  },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;
