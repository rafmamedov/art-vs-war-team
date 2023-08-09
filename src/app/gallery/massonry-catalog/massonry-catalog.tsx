"use client";

import { useAppSelector } from "@/types/ReduxHooks";
import MasonryGallery from "@/app/components/masonry/masonry";

import style from "./massonry-catalog.module.scss";

const MasonryCatalog = () => {
  const { paintings } = useAppSelector((state) => state.paintings);

  return (
    <>
      {paintings.length !== 0 ? (
        <MasonryGallery paintingsList={paintings} />
      ) : (
        <div className={style.noArts}>
          <p className={style.title}>No arts match your filters</p>
          <a className={style.button} href="/gallery">
            View All Arts
          </a>
        </div>
      )}
    </>
  );
};

export default MasonryCatalog;
