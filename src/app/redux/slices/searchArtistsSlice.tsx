import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Artist } from "@/types/Artist";

export interface SearchArtistsState {
  search: string;
  foundArtists: Artist[];
}

const initialState: SearchArtistsState = {
  search: "",
  foundArtists: [],
};

const artistsSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchArtists(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setFoundArtists(state, action: PayloadAction<Artist[]>) {
      state.foundArtists = action.payload;
    },
  },
});

export const { setSearchArtists, setFoundArtists } = artistsSlice.actions;

export default artistsSlice.reducer;
