"use client";

import ArtistCard from "../artistCard/artistCard";
import { Artist } from "@/types/Artist";

import style from "./artistsList.module.scss";
import { useAppSelector } from "@/types/ReduxHooks";
import InputArtistSearch from "./inputSearch/inputSearch";
import MoreArtistsButton from "./more-artists-button/more-artists-button";

const ArtistsList = () => {
  const { foundArtists } = useAppSelector((state) => state.searchArtistsSlice);


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
    </section>
  );
};

export default ArtistsList;
