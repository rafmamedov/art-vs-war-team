import { getArtists } from "@/utils/api";
import ArtistsList from "./artistsList/artistsList";
import Preloader from "./preloader";
import { Artist } from "@/types/Artist";

const Artists = async () => {
  const artistsList: Artist[] = await getArtists();

  return (
    <>
      <Preloader artistsList={artistsList} />
      <ArtistsList />
    </>
  );
};

export default Artists;
