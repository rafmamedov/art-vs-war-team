import style from "./page.module.scss";

import { getPaintings } from "@/utils/api";
import Sort from "./sort/sort";
import Preloader from "./preloader";
import MasonryCatalog from "./massonry-catalog/massonry-catalog";
import Filter from "./filter/filter";

const Gallery = async ({
  searchParams,
}: {
  searchParams: { sort: string };
}) => {
  const queryString = Object.keys(searchParams)
    .map(
      (key) =>
        `${key}=${encodeURIComponent(
          searchParams[key as keyof typeof searchParams]
        )}`
    )
    .join("&");

  const paintingsList = await getPaintings(
    queryString || "sort=entityCreatedAt,desc"
  );

  return (
    <section className={style.gallery}>
      <h1 className={style.title}>Gallery</h1>
      <Preloader paintingsList={paintingsList} />
      <div className={style.filters}>
        <Sort />
        <Filter />
      </div>

      <div className={style.cards}>
        <MasonryCatalog />
      </div>
      {/* <button className={style.button}>More Artworks</button> */}
    </section>
  );
};

export default Gallery;
