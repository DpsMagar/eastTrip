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
        offLoginButton: (state)=>{
            state.isLoginToggled= false;
        }
    }

});

export const {toggleLoginButton, offLoginButton} =ToggleSlice.actions;
export default ToggleSlice.reducer;
