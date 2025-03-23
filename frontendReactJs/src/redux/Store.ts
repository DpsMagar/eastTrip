import { configureStore } from "@reduxjs/toolkit";
import toggleLoginReducer from "./slices/ToggleSlice"

export const Store= configureStore({
    reducer:{
        toggleLogin: toggleLoginReducer,
    }
})

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;