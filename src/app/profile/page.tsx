"use client"

import { useState, useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import axios from "axios";

import './profile.scss'
import 'bulma/css/bulma.css';

import { NextComponentType } from "next";
import Image from "next/image";
import ProfileEdit from "./profile edit";
import CreatePainting from "./create painting";
import Loader from "./Loader/Loader";

const AUTHOR = 'https://www.albedosunrise.com/authors/';
const PAINTINGS = 'https://www.albedosunrise.com/paintings';

export interface Author {
  id: string;
  fullName: string;
  country: string;
  city: string;
  aboutMe: string;
  imageUrl: string;
};

const Profile: NextComponentType = () => {
  const [author, setAuthor] = useState<Author | null>(null);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const { user } = useAuthenticator((context) => [context.user]);

  const getAuthorById = async () => {
    await axios.get(AUTHOR + user.username)
      .then((response) => {
        setAuthor(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  };

  useEffect(() => {
    getAuthorById();
  }, []);

  return (
    <section className="profile">
      <div className="container sidebar-info">
        {author && (
          <div className="profile-header">
            {author.imageUrl
              ? (
                <Image
                  className="author-image"
                  src={author.imageUrl}
                  alt="author"
                  width={100}
                  height={100}
                />
              ) : (
                <Image
                  className="author-image"
                  src="https://i.etsystatic.com/17358183/r/il/7a5539/3875154600/il_794xN.3875154600_9zse.jpg"
                  alt="author"
                  width={100}
                  height={100}
                />
              )}

            <div className="author-info">
              <div className="author-subtitle"><strong>{author.fullName}</strong></div>
              <div className="author-subtitle">
                {author.country}, {author.city}
              </div>

              <div className="author-description">
                {author.aboutMe}
              </div>

              <button
                className={`button ${isCreateVisible ? 'is-info' : 'is-warning' }`}
                onClick={() => setIsCreateVisible(!isCreateVisible)}
              >
                {isCreateVisible ? 'Edit Profile Info' : 'Create Painting'}
              </button>
            </div>
          </div>
        )}

        {isFetching
        ? <Loader />
        : isCreateVisible
          ? <CreatePainting
              setIsFetching={setIsFetching}
            />
          : (
            <ProfileEdit
              author={author}
              setAuthor={setAuthor}
              setIsFetching={setIsFetching}
            />
        )}
      </div>
    </section>
  );
};

export default function ProfilePage() {
  return (
    <Authenticator className="auth">
      <Profile/>
    </Authenticator>
  );
};
