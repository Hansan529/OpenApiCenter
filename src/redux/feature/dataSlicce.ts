import { createSlice } from '@reduxjs/toolkit';

interface MovieState {
  value: {
    [key: string]: string;
  };
}

const initialState: MovieState = {
  value: {},
};

const dataSlice = createSlice({
  name: 'fetchData',
  initialState,
  reducers: {
    data: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { data } = dataSlice.actions;
export default dataSlice.reducer;
