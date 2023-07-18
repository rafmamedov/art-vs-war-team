"use client";

import ArtistCard from "../artistCard/artistCard";
import { Artist } from "@/types/Artist";

import style from "./artistsList.module.scss";
import { useAppSelector } from "@/types/ReduxHooks";
import InputArtistSearch from "./inputSearch/inputSearch";

const ArtistsList = () => {
  const { foundArtists, search } = useAppSelector(
    (state) => state.searchArtistsSlice
  );

  return (
    <section className={style.artists}>
      <div className={style.inputWrapper}>
        <h1 className={style.title}>Artists</h1>
        <InputArtistSearch />
      </div>

      <div className={style.artistsCards}>
        {foundArtists.map((artist: Artist, index: number) => (
          <ArtistCard
            artist={artist}
            key={artist.cognitoUsername}
            className={
              index % 2 === 0
                ? `${style.artistsCardOdd}`
                : `${style.artistsCardEven}`
            }
          />
        ))}
      </div>
      {/* {!search && <button className={style.button}>More Artists</button>} */}
    </section>
  );
};

export default ArtistsList;
