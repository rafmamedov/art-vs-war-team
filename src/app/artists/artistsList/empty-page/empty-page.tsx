"use client";

import Image from "next/image";

import style from "./empty-page.module.scss";

const EmptyArtistsPage = () => {

  return (
    <div className={style.noArtists}>
      <p className={style.noArtists__title}>No such artist was found</p>
      <a className={style.noArtists__button} href="/artists">
        View All Artists
      </a>
      <Image
        src="/assets/emptyGallery.webp"
        alt="Ukrainian gallery ornament"
        width={800}
        height={1000}
        className={`${style.image} imageOpacityEffect`}
        onLoadingComplete={(img) => (img.style.opacity = "1")}
      />
    </div>
  );
};

export default EmptyArtistsPage;
