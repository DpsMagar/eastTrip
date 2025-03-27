import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentUrlState{
    currentUrl: string;
}

const initialState: CurrentUrlState={
    currentUrl:"/",
};

const CurrentUrlSlice= createSlice({
    name:'currentUrl',
    initialState,
    reducers: {
        setCurrentUrl: (state, action: PayloadAction<string>)=> {
            state.currentUrl= action.payload;
        },
    },
})

export const {setCurrentUrl}= CurrentUrlSlice.actions;
export default CurrentUrlSlice.reducer;

