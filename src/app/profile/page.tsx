"use client";

import { useState, useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

import style from "./page.module.scss";

import { Artist } from "@/types/Artist";
import { ArtistTabOptions } from "@/types/ArtistTabOptions";
import EditProfile from "../components/editProfile/editProfile";
import ArtistInfo from "../artists/[slug]/artistInfo/artistInfo";
import ArtistTabs from "../artists/[slug]/artistTabs/artistTabs";
import { getAllPaintingsByArtist, getProfile } from "@/utils/api";
import Loading from "../loading";
import { useAppDispatch } from "@/types/ReduxHooks";
import {
  resetArtistGalleryPageCount,
  setArtistId,
  setArtistPaintings,
} from "../redux/slices/artistPaintingsSlice";

const Profile = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [author, setAuthor] = useState<Artist | null>(null);
  const [openForm, setOpenForm] = useState<ArtistTabOptions | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsFetching(true);

    const fetchData = async () => {
      const accessToken = user
        .getSignInUserSession()
        ?.getAccessToken()
        .getJwtToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const fetchedAuthor = await getProfile(headers);
      setAuthor(fetchedAuthor);

      const paintingsData = await getAllPaintingsByArtist(headers);

      dispatch(resetArtistGalleryPageCount());
      dispatch(setArtistPaintings(paintingsData));
    };

    if (user?.username) {
      fetchData();
    }

    setIsFetching(false);
  }, [user, dispatch]);

  useEffect(() => {
    if (author) {
      dispatch(setArtistId(author.prettyId));
    }
  }, [author, dispatch]);

  return (
    <section className={style.profile}>
      {isFetching ? (
        <Loading />
      ) : (
        <Authenticator className={style.auth}>
          {author ? (
            <>
              <ArtistInfo isProfile artistInfo={author} signOut={signOut} />
              <ArtistTabs setOpenForm={setOpenForm} />
            </>
          ) : (
            <EditProfile author={author} setAuthor={setAuthor} />
          )}
        </Authenticator>
      )}
    </section>
  );
};

export default Profile;
