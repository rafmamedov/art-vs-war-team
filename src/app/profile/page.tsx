"use client"

import { useState, useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import axios from "axios";

import style from './page.module.scss';

import ArtistInfo from "../components/artistInfo/artistInfo";
import EditProfile, { Author } from "../components/editProfile/editProfile";
import CreatePainting from "../components/createPainting/createPainting";

const PROFILE = 'https://www.albedosunrise.com/authors/profile';

export type Form = 'profile' | 'painting' | null;

const Profile = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [author, setAuthor] = useState<Author | null>(null);
  const [openForm, setOpenForm] = useState<Form>(null);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
      };

      const response = await axios.get(PROFILE, { headers });
      setAuthor(response.data);
    };

    if (user?.username) {
      fetchData();
    }
  }, [user]);

  return (
    <Authenticator className={style.auth}>
      {(!openForm && author) && (
        <ArtistInfo
          isProfile
          data={author}
          setOpenForm={setOpenForm}
        />
      )}

      {(openForm === 'profile' || !author) && (
        <EditProfile
          author={author}
          setAuthor={setAuthor}
          setOpenForm={setOpenForm}
        />
      )}

      {openForm === 'painting' && <CreatePainting setOpenForm={setOpenForm} />}
    </Authenticator>
  );
};

export default Profile;