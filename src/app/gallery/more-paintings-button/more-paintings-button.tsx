"use client";

import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import style from "./more-paintings-button.module.scss";
import { useRouter, usePathname } from "next/navigation";
import { getPaintings } from "@/utils/api";
import {
  addMorePaintings,
  increasePageNumber,
} from "@/app/redux/slices/paintingsSlice";

const MorePaintingsButton = () => {
  const { totalSize, paintings, pagesCount } = useAppSelector(
    (state) => state.paintingsSlice
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const isEndPaintingList = totalSize <= paintings.length;

  const getAdditionalPaintings = async (searchParams: string) => {
    const paintings = await getPaintings(searchParams);
    dispatch(addMorePaintings(paintings));
  };

  const handleGetNewPage = () => {
    dispatch(increasePageNumber());
    const currentPage = pagesCount + 1;
    const params = new URLSearchParams(window.location.search);
    params.set("page", currentPage.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    getAdditionalPaintings(params.toString());
  };

  return (
    <>
      {!isEndPaintingList && (
        <button className={style.button} onClick={handleGetNewPage}>
          More Artworks
        </button>
      )}
    </>
  );
};

export default MorePaintingsButton;
