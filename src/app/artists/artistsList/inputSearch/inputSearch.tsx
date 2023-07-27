"use client";

import { useCallback, useEffect, useState } from "react";

import {
  setSearchArtists,
  setFoundArtists,
  resetArtistsPageNumber,
} from "@/app/redux/slices/searchArtistsSlice";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import { Search } from "@/app/icons/icon-search";
import { CloseIcon } from "@/app/icons/icon-close";
import { getArtists } from "@/utils/api";
import style from "./inputSearch.module.scss";

const InputArtistSearch = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const { search } = useAppSelector((state) => state.searchArtistsSlice);

  const getFindArtists = useCallback(
    async (searchQuery?: string) => {
      const artists = await getArtists(searchQuery);

      dispatch(resetArtistsPageNumber());
      dispatch(setFoundArtists(artists));
    },
    [dispatch]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setSearchArtists(query.trim()));
    }, 700);

    return () => {
      clearTimeout(timeout);
    };
  }, [query, dispatch]);

  useEffect(() => {
    getFindArtists(`/searchByWord?word=${search}`);
  }, [search, getFindArtists]);

  const handleSearchArtist = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClearQuery = () => {
    setQuery("");
    getFindArtists();
  };

  return (
    <div className={style.input}>
      <input
        type="text"
        className={style.inputField}
        value={query}
        placeholder="Find Artist"
        onChange={handleSearchArtist}
      />
      {!query ? (
        <div className={style.searchIcon}>
          <Search />
        </div>
      ) : (
        <div
          className={`${style.searchIcon} ${style.closeIcon}`}
          onClick={handleClearQuery}
        >
          <CloseIcon />
        </div>
      )}
    </div>
  );
};

export default InputArtistSearch;
