import { configureStore } from '@reduxjs/toolkit';
import { flightApi } from '../features/api/flightApi';
import { hotelApi } from '../features/api/hotelApi';
import { homeStayApi } from '../features/api/homeStayApi';
import flightReducer from '../features/slice/flightSlice'
import hotelReducer from '../features/slice/hotelSlice'
import homeStayReducer from '../features/slice/homeStaySlice'
import authReducer from '../features/slice/authSlice'
import activeReducer from '../features/slice/activeCardSlice'
import { authApi } from '../features/api/authApi';

export const store = configureStore({
  reducer: {
    [flightApi.reducerPath]: flightApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [homeStayApi.reducerPath]: homeStayApi.reducer,
    flight: flightReducer,
    hotel: hotelReducer,
    homeStay: homeStayReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer, 
    active: activeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(flightApi.middleware)
      .concat(hotelApi.middleware)
      .concat(homeStayApi.middleware)
      .concat(authApi.middleware)
});
