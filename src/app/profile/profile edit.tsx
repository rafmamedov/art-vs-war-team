"use client"

import { NextPage } from "next";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { useAuthenticator } from "@aws-amplify/ui-react";
import axios from "axios";
import jwt_decode, { JwtPayload } from 'jwt-decode';

import './profile.scss';
import 'bulma/css/bulma.css';

import { Author } from "./page";

const AUTHOR = 'https://www.albedosunrise.com/authors/';
const SIGNATURE = 'https://www.albedosunrise.com/images/getSignature';

type customJwtPayload = JwtPayload & { email: string };

export type ImageData = {
  publicId: string;
  width: number;
  height: number;
  version: number;
  signature: string;
}

type Props = {
  author: Author | null;
  setAuthor: Dispatch<SetStateAction<Author | null>>;
  setIsFetching: Dispatch<SetStateAction<boolean>>;
};

type Action = 'create' | 'update';

const ProfileEdit: NextPage<Props> = ({
  author,
  setAuthor,
  setIsFetching,
}) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const { user, route, signOut } = useAuthenticator((context) => [context.route]);

  const accessToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
  const idToken = user.getSignInUserSession()?.getIdToken().getJwtToken();
  const refreshToken = user.getSignInUserSession()?.getRefreshToken();
  const isAuthenticated = route === 'authenticated';

  const decoded = idToken ? (jwt_decode(idToken) as customJwtPayload) : '';
  const userEmail = decoded && decoded.email;

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
  };

  const folder = `art-app/${user.username}/author-photo`;
  const uploadPreset = 'signed-image';
  const cloudName = 'dq415fvzp';
  const cloudinaryApiKey = '587219262524673';

  useEffect(() => {
    if (author) {
      setName(author.fullName);
      setCountry(author.country);
      setCity(author.city);
      setAboutMe(author.aboutMe);
    }
  }, []);

  const getSignature = async (): Promise<any> => {
    try {
      const requestParams = {
        uploadPreset,
        folder,
      };

      const {
        signature,
        timestamp,
      } = (await axios.post(SIGNATURE, requestParams)).data;

      return {
        signature,
        timestamp,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (image: File): Promise<any> => {
    const { signature, timestamp } = await getSignature();

    console.log('signature', signature);
    console.log('timestamp', timestamp);

    const data = new FormData();
    
    data.append("file", image);
    data.append("folder", folder);
    data.append('signature', signature);
    data.append('timestamp', timestamp);
    data.append("upload_preset", uploadPreset);
    data.append('api_key', cloudinaryApiKey);

    try {
      console.log('data', data);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
         data,
        { headers: {"Content-Type": "multipart/form-data"} },
      );

      const imageData: ImageData = {
        publicId: response.data.public_id,
        width: response.data.width,
        height: response.data.height,
        version: response.data.version,
        signature: response.data.signature,
      }

      return {
        imageData,
      };

    } catch (error) {
      console.log(error);
    }
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setImage(file);
    }
  };

  const refreshAccessToken = async () => {
    if (refreshToken) {
      user.refreshSession(refreshToken, (err, session) => {});
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<SetStateAction<string>>,
  ) => {
    setState(event.target.value);
  };

  const onUpdateProfile = async (action: Action) => {
    if (image) {
      setIsFetching(true);

      const { imageData } = await uploadImage(image);

      const authorData = {
        fullName: name,
        country,
        city,
        aboutMe,
        email: userEmail,
        image: imageData,
      };

      action === 'create'
        ? (
          await axios.post(AUTHOR, authorData, { headers })
          .then(response => {
            refreshAccessToken();
            setAuthor(response.data);
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            setIsFetching(false);
          })
        ) : (
          await axios.put(AUTHOR, authorData, { headers: headers })
          .then(response => {
            setAuthor(response.data);
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            setIsFetching(false);
          })
        )
    }
  };

  const onSubmit = async () => {
    if (!isAuthenticated) {
      return;
    };

    author ? onUpdateProfile('update') : onUpdateProfile('create');
  };

  const onCancelEditing = () => {
    setName('');
    setCity('');
    setCountry('');
    setAboutMe('');
    setImage(null)
  }

  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className="field profile-item">
          <label className="label required-field">Full Name</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="text"
              placeholder="full name"
              value={name}
              onChange={(event) => handleInputChange(event, setName)}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
            <span className="icon is-small is-left">
            </span>
          </div>
        </div>

        <div className="field profile-item">
          <label className="label">Add painting image</label>

          <div className="file has-name is-right is-fullwidth">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="painting image file"
                onChange={handleImageChange}
              />

              <span className="file-cta">
                <span className="file-label">
                  Choose a file
                </span>
              </span>
              <span className="file-name">
                {image ? image.name : 'upload'}
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="profile-info">
        <div className="field profile-item">
          <label className="label required-field">Country</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="text"
              placeholder="country of current stay"
              value={country}
              onChange={(event) => handleInputChange(event, setCountry)}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
          </div>
        </div>

        <div className="field profile-item">
          <label className="label required-field">City</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="text"
              placeholder="city of current stay"
              value={city}
              onChange={(event) => handleInputChange(event, setCity)}
              required
            />
          </div>
        </div>
      </div>

      <div className="field profile-item-about">
        <label className="label required-field">About me:</label>
        <div className="control">
          <textarea
            className="input"
            placeholder="write a short story about you"
            value={aboutMe}
            onChange={(event) => handleInputChange(event, setAboutMe)}
          />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            className="button is-dark"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
        <div className="control">
          <button
            className="button is-light"
            onClick={onCancelEditing}
          >
            Cancel
          </button>
        </div>

        <div className="control">
          <button
            className="button is-danger"
            onClick={signOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;
