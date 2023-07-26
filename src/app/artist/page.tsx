import axios from "axios";
import ArtistInfo from "../components/artistInfo/artistInfo";

const AUTHOR = 'https://www.albedosunrise.com/authors/v2/';

const Artist = async () => {
  const response = await axios.get(AUTHOR + 'rafael');
  const { data } = response;

  return (
    <ArtistInfo data={data} />
  );
};

export default Artist;
