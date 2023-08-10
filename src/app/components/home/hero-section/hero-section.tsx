"use client";

import Image from "next/image";
import Link from "next/link";

import style from "./hero-section.module.scss";

type Painting = {
  prettyId: string;
  url: string;
};

type PaintingsData = {
  "2.0": Painting[];
  "1.0": Painting[];
  "1.25": Painting[];
  "0.75": Painting[];
};

type HeroSectionProps = {
  paintings: PaintingsData;
};

const HeroSection = ({ paintings }: HeroSectionProps) => {
  const firstImage2_0 = paintings["2.0"][0];
  const secondImage2_0 = paintings["2.0"][1];
  const firstImage1_25 = paintings["1.25"][0];
  const firstImage1_0 = paintings["1.0"][0];
  const secondImage1_0 = paintings["1.0"][1];
  const firstImage0_75 = paintings["0.75"][0];
  const secondImage0_75 = paintings["0.75"][1];

  return (
    <section>
      <div className={style.mobile}>
        <h1 className={style.mobile__title}>
          Buy Art
          <br />
          Help Ukraine
        </h1>

        <Image
          src="/assets/hero_image.webp"
          className={style.mobile__background}
          alt="ukrainian art"
          fill
        />
        <Link href={"/gallery"} className={style.mobile__button}>
          Explore
        </Link>
      </div>
      <div className={style.hero}>
        <h1 className={style.title}>
          Buy Art
          <br /> Help Ukraine
        </h1>
        <div className={`${style.first__image} ${style.images}`}>
          <Link href={`/gallery/${firstImage2_0.prettyId}`}>
            <Image
              src={firstImage2_0.url}
              alt={`painting ${firstImage2_0.prettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <div className={`${style.second__image} ${style.images}`}>
          <Link href={`/gallery/${firstImage0_75.prettyId}`}>
            <Image
              src={firstImage0_75.url}
              alt={`painting ${firstImage0_75.prettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <div className={`${style.third__image} ${style.images}`}>
          <Link href={`/gallery/${firstImage1_25.prettyId}`}>
            <Image
              src={firstImage1_25.url}
              alt={`painting ${firstImage1_25.prettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <div className={`${style.fourth__image} ${style.images}`}>
          <Link href={`/gallery/${secondImage2_0.prettyId}`}>
            <Image
              src={secondImage2_0.url}
              alt={`painting ${secondImage2_0.prettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <div className={`${style.fifth__image} ${style.images}`}>
          <Link href={`/gallery/${secondImage0_75.prettyId}`}>
            <Image
              src={secondImage0_75.url}
              alt={`painting ${secondImage0_75.prettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <div className={`${style.sixth__image} ${style.images}`}>
          <Link href={`/gallery/${firstImage1_0.prettyId}`}>
            <Image
              src={firstImage1_0.url}
              alt={`painting ${firstImage1_0.prettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <div className={`${style.seventh__image} ${style.images}`}>
          <Link href={`/gallery/${secondImage1_0.prettyId}`}>
            <Image
              src={secondImage1_0.url}
              alt={`painting ${secondImage1_0.prettyId}`}
              fill
              style={{ objectFit: "cover" }}
              className={`${style.image} imageOpacityEffect`}
              onLoadingComplete={(img) => (img.style.opacity = "1")}
            />
          </Link>
        </div>
        <Link href={"/gallery"} className={style.additionalButton}>
          More artworks
        </Link>
        <Link href={"/gallery"} className={style.button}>
          Explore
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
