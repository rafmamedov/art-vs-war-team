import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ArtCollection, PaintingData } from "@/types/Painting";

export interface PaintingsState {
  paintings: PaintingData[];
  totalSize: number;
  pagesCount: number;
}

const initialState: PaintingsState = {
  paintings: [],
  totalSize: 0,
  pagesCount: 0,
};

const paintingsSlice = createSlice({
  name: "paintings",
  initialState,
  reducers: {
    setPaintings(state, action: PayloadAction<ArtCollection>) {
      state.paintings = action.payload.content;
      state.totalSize = action.payload.total;
    },

    addMorePaintings(state, action: PayloadAction<ArtCollection>) {
      state.paintings.push(...action.payload.content);
    },

    increaseGalleryPage(state) {
      state.pagesCount++;
    },

    resetGalleryPageCount(state) {
      state.pagesCount = 0;
    },
  },
});

export const {
  setPaintings,
  addMorePaintings,
  increaseGalleryPage,
  resetGalleryPageCount,
} = paintingsSlice.actions;

export default paintingsSlice.reducer;
