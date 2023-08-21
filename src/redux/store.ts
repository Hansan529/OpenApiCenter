import { configureStore } from '@reduxjs/toolkit';
import DataSlice from './feature/dataSlicce';

export const store = configureStore({
  reducer: {
    data: DataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
