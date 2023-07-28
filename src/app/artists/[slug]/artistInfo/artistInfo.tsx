import { FC } from "react";
import Image from "next/image";

import style from "./artistInfo.module.scss";
import { MapPoint } from "@/app/icons/map-point";
import { Add } from "@/app/icons/add";
import { Artist } from "@/types/Artist";

type Props = {
  artistInfo: Artist;
  isProfile?: boolean;
};

const ArtistInfo: FC<Props> = ({ artistInfo, isProfile = false }) => {
  const {
    fullName,
    country,
    city,
    aboutMe,
    imageUrl,
    styles = [],
  } = artistInfo;

  return (
    <section className={style.author}>
      <div className={style.container}>
        <div className={style.author__photo}>
          <Image
            className={style.image}
            src={imageUrl}
            alt="author"
            width={1000}
            height={1000}
          />
        </div>

        <div className={style.author__info}>
          <div className={style.author__name}>{fullName}</div>

          <div className={style.author__styles}>
            <span className={style.style__title}>Styles: </span>
            {styles.map((artistStyle: string, index: number) => (
              <span className={style.style} key={index}>
                <span>
                  {artistStyle}
                  {index !== styles.length - 1 && ", "}
                </span>
              </span>
            ))}
          </div>

          <div className={style.author__location}>
            <MapPoint />
            {`${country}, ${city}`}
          </div>
          <div className={style.author__about}>{aboutMe}</div>

          {isProfile && (
            <>
              <button className={style.button__edit} type="button">
                Edit profile
              </button>
              <button className={style.button__add} type="button">
                <Add className={style.button__icon} />
                Add Arts
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArtistInfo;
