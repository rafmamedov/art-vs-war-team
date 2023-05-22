import { configureStore } from "@reduxjs/toolkit";

import showUp from "./slices/showUpSlice";

export const store = configureStore({
  reducer: {
    showUp,
  },
  devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
