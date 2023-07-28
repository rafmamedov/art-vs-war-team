import { configureStore } from "@reduxjs/toolkit";

import showUp from "./slices/showUpSlice";
import artistsSlice from "./slices/searchArtistsSlice";

export const store = configureStore({
  reducer: {
    showUp,
    searchArtistsSlice: artistsSlice,
  },
  devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
