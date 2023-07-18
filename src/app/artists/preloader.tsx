"use client";

import { useRef } from "react";

import { Artist } from "@/types/Artist";
import { setFoundArtists } from "../redux/slices/searchArtistsSlice";
import { store } from "../redux/store";

function Preloader({ artistsList }: { artistsList: Artist[] }) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setFoundArtists(artistsList));
    loaded.current = true;
  }

  return null;
}

export default Preloader;
