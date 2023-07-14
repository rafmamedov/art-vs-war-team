import style from "./page.module.scss";

import MasonryGallery from "./masonry-catalog/masonry-catalog";
import { getPaintings } from "@/utils/api";

const Gallery = async () => {
  const paintingsList = await getPaintings();

  return (
    <section className={style.gallery}>
      <h1 className={style.title}>Gallery</h1>

      <div className={style.cards}>
        <MasonryGallery paintingsList={paintingsList} />
      </div>
      <button className={style.button}>More Artworks</button>
    </section>
  );
};

export default Gallery;
