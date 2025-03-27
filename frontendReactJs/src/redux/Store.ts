import { configureStore } from "@reduxjs/toolkit";
import toggleLoginReducer from "./slices/ToggleLoginSlice"
import toggleRegisterReducer  from "./slices/ToggleRegisterSlice";
import { apiSlice } from "./api/apiSlice";
import currentUrlReducer from "./slices/CurrentUrlSlice";

export const Store= configureStore({
    reducer:{
        toggleLogin: toggleLoginReducer,
        toggleRegister: toggleRegisterReducer,
        [apiSlice.reducerPath] : apiSlice.reducer,
        currentUrl: currentUrlReducer,

    },
    middleware: ( getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;