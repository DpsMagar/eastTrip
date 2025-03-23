import { createSlice } from "@reduxjs/toolkit";

interface ToggleLoginState{
    isLoginToggled: boolean;
}

const initialState: ToggleLoginState= {
    isLoginToggled: false,
};

const ToggleSlice= createSlice({
    name: "toggleLogin",
    initialState,
    reducers:{
        toggleLoginButton: (state)=>{
            state.isLoginToggled= !state.isLoginToggled;
        },
    }

});

export const {toggleLoginButton} =ToggleSlice.actions;
export default ToggleSlice.reducer;
