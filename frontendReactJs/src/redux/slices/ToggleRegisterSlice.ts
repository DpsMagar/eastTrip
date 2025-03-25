import { createSlice } from "@reduxjs/toolkit";

interface ToggleRegisterState{
    isRegisterToggled: boolean;
}

const initialState: ToggleRegisterState= {
    isRegisterToggled: false,
}

const ToggleSlice= createSlice({
    name:" toggleRegister",
    initialState,
    reducers:{
        toggleRegisterButton: (state)=> {
            state.isRegisterToggled= !state.isRegisterToggled;
        },
        offRegisterButton: (state) => {
            state.isRegisterToggled= false;
        }
    }
});

export const {toggleRegisterButton, offRegisterButton} = ToggleSlice.actions;
export default ToggleSlice.reducer