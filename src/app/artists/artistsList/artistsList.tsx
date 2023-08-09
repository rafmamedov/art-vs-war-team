"use client";

import { Artist } from "@/types/Artist";
import { useAppSelector } from "@/types/ReduxHooks";
import ArtistCard from "../artistCard/artistCard";
import InputArtistSearch from "./inputSearch/inputSearch";
import MoreArtistsButton from "./more-artists-button/more-artists-button";

import style from "./artistsList.module.scss";

const ArtistsList = () => {
  const { foundArtists } = useAppSelector((state) => state.artists);

  return (
    <section className={style.artists}>
      <div className={style.inputWrapper}>
        <h1 className={style.title}>Artists</h1>
        <InputArtistSearch />
      </div>

      <>
        {foundArtists.length !== 0 ? (
          <>
            <div className={style.artistsCards}>
              {foundArtists.map((artist: Artist, index: number) => (
                <ArtistCard
                  artist={artist}
                  key={artist.cognitoSubject}
                  className={
                    index % 2 === 0
                      ? `${style.artistsCardOdd}`
                      : `${style.artistsCardEven}`
                  }
                />
              ))}
            </div>
            <MoreArtistsButton />
          </>
        ) : (
          <div className={style.noArtists}>
            <p className={style.noArtists__title}>No such artist was found</p>
            <a className={style.noArtists__button} href="/artists">
              View All Artists
            </a>
          </div>
        )}
      </>
    </section>
  );
};

export default ArtistsList;
