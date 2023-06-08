import style from "./page.module.scss";

import MasonryGallery from "./masonry-catalog/masonry-catalog";

const arr = [
  "/assets/images/Rectangle 2.png",
  "/assets/images/Rectangle 3.png",
  "/assets/images/Rectangle 4.png",
  "/assets/images/Rectangle 5.png",
  "/assets/images/Rectangle 6.png",
  "/assets/images/Rectangle 7.png",
  "/assets/images/Rectangle 2.png",
  "/assets/images/Rectangle 3.png",
  "/assets/images/Rectangle 4.png",
  "/assets/images/Rectangle 5.png",
  "/assets/images/Rectangle 6.png",
  "/assets/images/Rectangle 7.png",
];

const Gallery = () => {
  return (
    <section className={style.gallery}>
      <h1 className={style.title}>Gallery</h1>
      <div className={style.cards}>
        <MasonryGallery images={arr} />
      </div>
      <button className={style.button}>More Artworks</button>
    </section>
  );
};

export default Gallery;
