import { configureStore } from "@reduxjs/toolkit";

import showUp from "./slices/showUpSlice";
import artists from "./slices/searchArtistsSlice";
import paintings from "./slices/paintingsSlice";
import cart from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    showUp,
    artists,
    paintings,
    cart,
  },
  devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
