"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

import style from './page.module.scss';

import EditProfile, { Author } from "../components/editProfile/editProfile";
import CreatePainting from "../components/createPainting/createPainting";
import { Painting } from "@/types/Painting";
import { getPaintingsByArtist } from "@/utils/api";
import ArtistInfo from "../artists/[slug]/artistInfo/artistInfo";
import { Artist } from "@/types/Artist";
import ArtistTabs from "../artists/[slug]/artistTabs/artistTabs";
import Loading from "../loading";
import { ArtistTabOptions } from "@/types/ArtistTabOptions";

const PROFILE = 'https://www.albedosunrise.com/authors/profile';

const Profile = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [author, setAuthor] = useState<Artist | null>(null);
  const [openForm, setOpenForm] = useState<ArtistTabOptions | null>(null);
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
      };

      const fetchedAuthor = await axios.get(PROFILE, { headers });
      setAuthor(fetchedAuthor.data);

      const paintingsData = await getPaintingsByArtist(fetchedAuthor.data.prettyId);
        setPaintings(paintingsData);

        setIsFetching(false);
    };

    if (user?.username) {
      fetchData();
    }
  }, [user]);

  return (
    <section className={style.profile}>
      {isFetching
          ? <Loading />
          : (
            <Authenticator className={style.auth}>
              {(!openForm && author) && (
                <>
                  <ArtistInfo
                    isProfile
                    artistInfo={author}
                    setOpenForm={setOpenForm}
                  />
                  <ArtistTabs
                    paintingsList={paintings}
                    setOpenForm={setOpenForm}
                  />
                </>
              )}
              {(openForm === ArtistTabOptions.profile || !author) && (
                <EditProfile
                  author={author}
                  setAuthor={setAuthor}
                  setOpenForm={setOpenForm}
                />
              )}
              {openForm === ArtistTabOptions.artworks && (
                <CreatePainting setOpenForm={setOpenForm} />
              )}
            </Authenticator>
          )}
    </section>
  );
};

export default Profile;