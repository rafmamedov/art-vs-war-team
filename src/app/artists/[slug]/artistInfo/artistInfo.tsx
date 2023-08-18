import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import style from "./artistInfo.module.scss";
import { MapPoint } from "@/app/icons/icon-map-point";
import { Add } from "@/app/icons/icon-add";
import { Artist } from "@/types/Artist";

type Props = {
  artistInfo: Artist;
  isProfile?: boolean;
  signOut?: () => void;
};

const ArtistInfo: FC<Props> = ({
  isProfile = false,
  artistInfo,
  signOut,
}) => {
  const {
    fullName,
    country,
    city,
    aboutMe,
    imageUrl,
    styles,
  } = artistInfo;

  return (
    <div className={style.author}>
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
          <div className={style.author__name}>
            {fullName}
          </div>

          <div className={style.author__styles}>
            <span className={style.style__title}>Styles: </span>
            {styles.map((artistStyle: string, index: number) => (
              <span className={style.style} key={index}>
                <span className={style.style__mobile}>
                  {artistStyle}
                  {index !== styles.length - 1 && ", "}
                </span>

                <span className={style.style__laptop}>
                  {artistStyle}
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
            <div className={style.button__container}>
              <Link
                className={style.button__add}
                href="/profile/createPainting"
              >
                <Add className={style.button__icon} />
                Add Arts
              </Link>
              <Link
                className={style.button__edit}
                href="/profile/edit"
              >
                Edit profile
              </Link>
              <button
                type="button"
                className={style.signout}
                onClick={signOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistInfo;
