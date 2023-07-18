import MasonryGallery from "@components/masonry-catalog/masonry-catalog";
import style from "./page.module.scss";

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
