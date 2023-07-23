import Image from "next/image";
import Link from "next/link";

import style from "./artistCard.module.scss";
import { Artist } from "@/types/Artist";
import { MapPoint } from "@/app/icons/icon-map-point";
import { ArrowRight } from "@/app/icons/icon-arrow-right";

type Props = {
  artist: Artist;
  className: string;
};

const ArtistCard: React.FC<Props> = ({ artist, className }) => {
  const {
    fullName,
    country,
    city,
    aboutMe,
    imageUrl,
    styles = [],
    prettyId,
  } = artist;

  return (
    <section className={`${style.artist} ${className}`}>
      <div className={style.images__wrapper}>
        <Image
          src={imageUrl}
          alt={`artist ${fullName}`}
          width={1000}
          height={1000}
          style={{
            objectFit: "cover",
          }}
          className={`${style.image} imageOpacityEffect`}
          onLoadingComplete={(img) => (img.style.opacity = "1")}
        />
        <Image
          src="/assets/artistsOrnament.webp"
          alt={`ukrainian ornament`}
          fill
          style={{
            objectFit: "contain",
            transitionDuration: "3s",
          }}
          className={`${style.ornament} imageOpacityEffect`}
          onLoadingComplete={(img) => (img.style.opacity = "1")}
        />
      </div>
      <div className={style.info}>
        <div className={style.info__wrapper}>
          <h2 className={style.name}>{fullName}</h2>
          <div className={style.location}>
            <MapPoint />
            <span>{`${country}, ${city}`}</span>
          </div>
          <div className={style.style}>
            {styles.map((style: string, index: number) => (
              <span key={index}>
                {style}
                {index !== styles.length - 1 && ", "}
              </span>
            ))}
          </div>
          <div className={style.description}>{aboutMe}</div>
        </div>

        <Link href={`/artists/${prettyId}`}>
          <button className={style.button}>
            <span>Explore</span>
            <ArrowRight />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ArtistCard;
