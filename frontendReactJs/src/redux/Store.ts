import { configureStore } from "@reduxjs/toolkit";
import toggleLoginReducer from "./slices/ToggleLoginSlice"
import toggleRegisterReducer  from "./slices/ToggleRegisterSlice";

export const Store= configureStore({
    reducer:{
        toggleLogin: toggleLoginReducer,
        toggleRegister: toggleRegisterReducer,
        
    }
})

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;