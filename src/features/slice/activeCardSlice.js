import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeItemIndex: 0,
  activeTypeIndex: 0,
};

const activeCardSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {
    setActiveItemIndex: (state, action) => {
      state.activeItemIndex = action.payload;
    },
    setActiveTypeIndex: (state, action) => {
      state.activeTypeIndex = action.payload;
    },
    setBothIndices: (state, action) => {
      state.activeItemIndex = action.payload.itemIndex;
      state.activeTypeIndex = action.payload.typeIndex;
    },
  },
});

export const {
  setActiveItemIndex,
  setActiveTypeIndex,
  setBothIndices,
} = activeCardSlice.actions;

export default activeCardSlice.reducer;
