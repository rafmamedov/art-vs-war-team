import { configureStore } from "@reduxjs/toolkit";

import showUp from "./slices/showUpSlice";
import artistsSlice from "./slices/searchArtistsSlice";
import sortPaintings from "./slices/paintingsSlice";

export const store = configureStore({
  reducer: {
    showUp,
    searchArtistsSlice: artistsSlice,
    paintingsSlice: sortPaintings,
  },
  devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
