import axios from "axios";

import style from "./page.module.scss";

import MasonryGallery from "./masonry-catalog/masonry-catalog";

async function getDataFromServer() {

  const response = await axios.get(
    "https://www.albedosunrise.com/paintings/search?size=30&sort=entityCreatedAt,desc"
  );

  return response.data.content;
}

const Gallery = async () => {
  const paintingsList = await getDataFromServer();

  return (
    <section className={style.gallery}>
      <h1 className={style.title}>Gallery</h1>

      <div className={style.cards}>
        <MasonryGallery paintingsList={paintingsList} />
      </div>
      {/* <button className={style.button}>More Artworks</button> */}
    </section>
  );
};

export default Gallery;
