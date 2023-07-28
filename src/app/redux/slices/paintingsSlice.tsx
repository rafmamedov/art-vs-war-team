import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ArtCollection, Painting } from "@/types/Painting";

export interface PaintingsState {
  paintings: Painting[];
  totalSize: number;
  pagesCount: number;
}

const initialState: PaintingsState = {
  paintings: [],
  totalSize: 0,
  pagesCount: 0,
};

const paintingsSlice = createSlice({
  name: "sortPaintings",
  initialState,
  reducers: {
    setPaintings(state, action: PayloadAction<ArtCollection>) {
      state.paintings = action.payload.content;
      state.totalSize = action.payload.total;
    },

    addMorePaintings(state, action: PayloadAction<ArtCollection>) {
      state.paintings.push(...action.payload.content);
    },

    increasePageNumber(state) {
      state.pagesCount++;
    },

    resetPageNumber(state) {
      state.pagesCount = 0;
    },
  },
});

export const {
  setPaintings,
  addMorePaintings,
  increasePageNumber,
  resetPageNumber,
} = paintingsSlice.actions;

export default paintingsSlice.reducer;
