"use client";

import { useCallback, useEffect, useState } from "react";

import style from "./inputSearch.module.scss";

import {
  setSearchArtists,
  setFoundArtists,
} from "@/app/redux/slices/searchArtistsSlice";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import { Search } from "@/app/icons/icon-search";
import { CloseIcon } from "@/app/icons/icon-close";
import { getFindArtistFromServer } from "@/utils/api";

const InputArtistSearch = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const { search } = useAppSelector((state) => state.searchArtistsSlice);
  const searchParams = search ? `/searchByWord/${search}` : "";

  const getFindArtists = useCallback(
    async (searchWord: string) => {
      const artists = await getFindArtistFromServer(searchWord);

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
    getFindArtists(searchParams);
  }, [search, searchParams, getFindArtists]);

  const handleSearchArtist = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClearQuery = () => {
    setQuery("");
    getFindArtists(searchParams);
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
