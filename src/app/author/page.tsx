"use client"

import { useState } from "react";
import Image from "next/image";

import style from "./page.module.scss";

import { Add } from "../icons/add";
import { Location } from "../icons/location";
import AuthorPhoto from './assets/author.png';
import MasonryGallery from "../gallery/masonry-catalog/masonry-catalog";
import ArtProcess from "../components/artProcess/artProcess";

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

const Author = () => {
  const [isArtworksVisible, setIsArtworksVisible] = useState(true);
  const [isProcessVisible, setIsProcessVisible] = useState(false);

  const handleShowArtWorks = () => {
    setIsProcessVisible(false);
    setIsArtworksVisible(true);
  };

  const handleShowProcess = () => {
    setIsArtworksVisible(false);
    setIsProcessVisible(true);
  };

  return (
    <section className={style.author}>
      <div className={style.container}>
        <div className={style.author__photo}>
          <Image
            className={style.image}
            src={AuthorPhoto}
            alt="author"
          />
        </div>

        <div className={style.author__info}>
          <div className={style.author__name}>
            Margarita Dudinska
          </div>
          <div className={style.author__styles}>
            Style: Primitivism / Native
          </div>
          <div className={style.author__location}>
            <Location />
            Poland, Warsaw
          </div>
          <div className={style.author__about}>
            Margarita Dudinska is an acclaimed artist known for her captivating and innovative artwork.
            Born in an artistic family in [place of birth] on [date of birth], Dudinska displayed a
            passion for creativity from an early age.
            With a strong determination to pursue her artistic dreams, Dudinska attended
            [name of art school/university] where she honed her skills and developed a unique style.
            Her works often showcase a harmonious blend of vibrant colors, intricate details,
            and thought-provoking themes.
          </div>
        </div>
      </div>

      <div className={style.tabs}>
        <div
          className={isArtworksVisible ? style.isActive : style.tab}
          onClick={handleShowArtWorks}
        >
          Artworks
        </div>

        <div className={style.tab}>Collections</div>

        <div
          className={isProcessVisible ? style.isActive : style.tab}
          onClick={handleShowProcess}
        >
          Art Process
        </div>
      </div>

      <div className={style.gallery}>
        {isArtworksVisible && <MasonryGallery images={arr} />}
        {isProcessVisible && <ArtProcess />}
      </div>
    </section>
  );
};

export default Author;
