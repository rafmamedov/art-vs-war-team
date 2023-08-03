"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

import style from './page.module.scss';

import { Artist } from "@/types/Artist";
import { Painting } from "@/types/Painting";
import { ArtistTabOptions } from "@/types/ArtistTabOptions";
import EditProfile from "../components/editProfile/editProfile";
import CreatePainting from "../components/createPainting/createPainting";
import ArtistInfo from "../artists/[slug]/artistInfo/artistInfo";
import ArtistTabs from "../artists/[slug]/artistTabs/artistTabs";
import { getAllPaintingsByArtist, getProfile } from "@/utils/api";
import Loading from "../loading";

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

      const fetchedAuthor = await getProfile(headers);
      setAuthor(fetchedAuthor);

      const paintingsData = await getAllPaintingsByArtist(headers);
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
                <CreatePainting
                  setPaintings={setPaintings}
                  setOpenForm={setOpenForm}
                />
              )}
            </Authenticator>
          )}
    </section>
  );
};

export default Profile;