"use client";

import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import style from "./more-artists-button.module.scss";
import { getArtists } from "@/utils/api";
import {
  addMoreArtists,
  increaseArtistsPageNumber,
} from "@/app/redux/slices/searchArtistsSlice";

const MoreArtistsButton = () => {
  const { pagesCount, totalSize, foundArtists, search } = useAppSelector(
    (state) => state.searchArtistsSlice
  );
  const dispatch = useAppDispatch();
  const isEndArtistsList = totalSize <= foundArtists.length;

  const getAdditionalPaintings = async (searchQuery: string) => {
    const artists = await getArtists(searchQuery);
    dispatch(addMoreArtists(artists));
  };

  const handleGetNewPage = () => {
    dispatch(increaseArtistsPageNumber());
    const currentPage = pagesCount + 1;
    !search
      ? getAdditionalPaintings(`?page=${currentPage}`)
      : getAdditionalPaintings(
          `/searchByWord?word=${search}&page=${currentPage}`
        );
  };

  return (
    <>
      {!isEndArtistsList && (
        <button className={style.button} onClick={handleGetNewPage}>
          More Artists
        </button>
      )}
    </>
  );
};

export default MoreArtistsButton;
