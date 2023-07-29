import style from './page.module.scss'
import ArtistInfo from "./artistInfo/artistInfo";
import { getArtist, getPaintingsByArtist } from "@/utils/api";
import ArtistTabs from "./artistTabs/artistTabs";

const Artist = async ({ params }: { params: { slug: string } }) => {
  const artistData = getArtist(params.slug);
  const paintingsData = getPaintingsByArtist(params.slug);

  const [artistInfo, paintingsList] = await Promise.all([
    artistData,
    paintingsData,
  ]);

  return (
      <section className={style.artist}>
        <ArtistInfo artistInfo={artistInfo} />
        <ArtistTabs paintingsList={paintingsList} />
      </section>
  );
};

export default Artist;
