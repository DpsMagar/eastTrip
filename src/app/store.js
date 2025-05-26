import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // default: localStorage
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { flightApi } from '../features/api/flightApi';
import { hotelApi } from '../features/api/hotelApi';
import { homeStayApi } from '../features/api/homeStayApi';
import { authApi } from '../features/api/authApi';
import { bookApi } from '../features/api/bookApi';

import flightReducer from '../features/slice/flightSlice';
import hotelReducer from '../features/slice/hotelSlice';
import homeStayReducer from '../features/slice/homeStaySlice';
import authReducer from '../features/slice/authSlice';
import propertyReducer from '../features/slice/propertySlice';
import activeReducer from '../features/slice/activeCardSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['hotel', 'homestay', 'active'],
};

const rootReducer = combineReducers({
  [flightApi.reducerPath]: flightApi.reducer,
  [hotelApi.reducerPath]: hotelApi.reducer,
  [homeStayApi.reducerPath]: homeStayApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
  flight: flightReducer,
  hotel: hotelReducer,
  homeStay: homeStayReducer,
  auth: authReducer,
  active: activeReducer,
  property: propertyReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    })
      .concat(flightApi.middleware)
      .concat(hotelApi.middleware)
      .concat(homeStayApi.middleware)
      .concat(authApi.middleware)
      .concat(bookApi.middleware),
});

export const persistor = persistStore(store);
