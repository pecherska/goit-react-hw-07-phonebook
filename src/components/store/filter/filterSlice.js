import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: '',
  },
  reducers: {
    filterAction: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { filterAction } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
