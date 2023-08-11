"use client";

import Image from "next/image";

import style from "./empty-gallery-page.module.scss";

const EmptyGalleryPage = () => {
  return (
    <div className={style.noArts}>
      <p className={style.title}>No arts match your filters</p>
      <a className={style.button} href="/gallery">
        View All Arts
      </a>
      <Image
        src="/assets/emptyArtist.webp"
        alt="Ukrainian gallery ornament"
        width={800}
        height={1000}
        className={`${style.image} imageOpacityEffect`}
        onLoadingComplete={(img) => (img.style.opacity = "1")}
      />
    </div>
  );
};

export default EmptyGalleryPage;
