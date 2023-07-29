"use client";

import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import style from "./more-paintings-button.module.scss";
import { useRouter, usePathname } from "next/navigation";
import { getPaintings } from "@/utils/api";
import {
  addMorePaintings,
  increaseGalleryPage,
} from "@/app/redux/slices/paintingsSlice";

const MorePaintingsButton = () => {
  const { totalSize, paintings, pagesCount } = useAppSelector(
    (state) => state.paintingsSlice
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const isEndPaintingList = totalSize <= paintings.length;

  const handleGetNewPage = async () => {
    const params = new URLSearchParams(window.location.search);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    const currentPage = pagesCount + 1;
    const paintings = await getPaintings(
      `${params.toString()}&page=${currentPage}`
    );

    dispatch(addMorePaintings(paintings));
    dispatch(increaseGalleryPage());
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
