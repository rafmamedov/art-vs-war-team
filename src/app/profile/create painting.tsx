"use client"

import { NextPage } from "next";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import axios from "axios";

import './profile.scss';
import 'bulma/css/bulma.css';

import Select from "./select";
import { ImageData } from "./profile edit";

const URL = 'https://www.albedosunrise.com/paintings';
const SIGNATURE = 'https://www.albedosunrise.com/images/getSignature';

type Props = {
  setIsFetching: Dispatch<SetStateAction<boolean>>;
}

const CreatePainting: NextPage<Props> = ({ setIsFetching }) => {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState<number | ''>('');
  const [price, setPrice] = useState<number | ''>('');
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [styleIds, setStyleIds] = useState<number[]>([]);
  const [mediumIds, setMediumIds] = useState<number[]>([]);
  const [supportIds, setSupportIds] = useState<number[]>([]);
  const [subjectIds, setSubjectIds] = useState<number[]>([]);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedMedium, setSelectedMedium] = useState('');
  const [selectedSupport, setSelectedSupport] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { user, route } = useAuthenticator((context) => [context.route]);
  const accessToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
  const isAuthenticated = route === 'authenticated';
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
  };

  const folder = `art-app/${user.username}/paintings`;
  const cloudinaryApiKey = '587219262524673';
  const uploadPreset = 'signed-image';
  const cloudName = 'dq415fvzp';
  const isNumber = /^\d+$/;

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<SetStateAction<string>>
  ) => {
    setState(event.target.value);
  }

  const handleNumberInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<SetStateAction<number | ''>>
  ) => {
    if (isNumber.test(event.target.value)
      || event.target.value === '') {
      setState(+event.target.value);
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImage(event.target.files[0]);
    }
  };

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

    const data = new FormData();
    
    data.append("file", image);
    data.append("folder", folder);
    data.append('signature', signature);
    data.append('timestamp', timestamp);
    data.append("upload_preset", uploadPreset);
    data.append('api_key', cloudinaryApiKey);

    try {

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
  };

  const onCancelEditing = () => {
    setYear('');
    setTitle('');
    setWidth('');
    setPrice('');
    setHeight('');
    setStyleIds([]);
    setMediumIds([]);
    setSupportIds([]);
    setSubjectIds([]);
    setDescription('');
    setSelectedStyle('');
    setSelectedMedium('');
    setSelectedSupport('');
    setSelectedSubject('');
    setSelectedImage(null);
  };

  const onCreatePainting = async () => {
    if (selectedImage) {
      setIsFetching(true);

      const { imageData } = await uploadImage(selectedImage);

      const paintingData = {
        title,
        price,
        height,
        width,
        styleIds,
        mediumIds,
        supportIds,
        subjectIds,
        description,
        image: imageData,
        yearOfCreation: year,
      };

      await axios.post(URL, paintingData, { headers })
        .finally(() => {
          onCancelEditing();
          setIsFetching(false);
        })
    }
  };

  const onSubmit = async () => {
    if (!isAuthenticated) {
      return;
    };

    onCreatePainting();
  };

  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className="field profile-item">
          <label className="label required-field">Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="painting title"
              value={title}
              onChange={(event) => handleInputChange(event, setTitle)}
            />
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
                onChange={handleFileChange}
              />
              <span className="file-cta">
                <span className="file-label">
                  Choose a file
                </span>
              </span>
              <span className="file-name">
                {selectedImage ? selectedImage.name : 'upload'}
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="profile-info">
        <div className="field profile-item">
          <label className="label required-field">Year</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="year of creation"
              value={year}
              onChange={(event) => handleNumberInputChange(event, setYear)}
            />
          </div>
        </div>

        <div className="field profile-item">
          <label className="label required-field">Price</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="price €"
              value={price}
              onChange={(event) => handleNumberInputChange(event, setPrice)}
            />
          </div>
        </div>
      </div>

      <div className="profile-info">
        <div className="field profile-item">
          <label className="label required-field">Width</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="width cm"
              value={width}
              onChange={(event) => handleNumberInputChange(event, setWidth)}
            />
          </div>
        </div>

        <div className="field profile-item">
          <label className="label required-field">Height</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="height cm"
              value={height}
              onChange={(event) => handleNumberInputChange(event, setHeight)}
            />
          </div>
        </div>
      </div>

      <div className="profile-info">
        <Select
          checkboxItem='styles'
          selectedIds={styleIds}
          onSelect={setStyleIds}
          selectedItem={selectedStyle}
          setSelectedItem={setSelectedStyle}
        />

        <Select
          checkboxItem='mediums'
          selectedIds={mediumIds}
          onSelect={setMediumIds}
          selectedItem={selectedMedium}
          setSelectedItem={setSelectedMedium}
        />
      </div>

      <div className="profile-info">
        <Select
          checkboxItem='supports'
          selectedIds={supportIds}
          onSelect={setSupportIds}
          selectedItem={selectedSupport}
          setSelectedItem={setSelectedSupport}
        />

        <Select
          checkboxItem='subjects'
          selectedIds={subjectIds}
          onSelect={setSubjectIds}
          selectedItem={selectedSubject}
          setSelectedItem={setSelectedSubject}
        />
      </div>

      <div className="field profile-item-about">
        <label className="label">Description</label>
        <div className="control">
          <textarea
            className="textarea profile-item"
            placeholder="write a short description about painting"
            value={description}
            onChange={(event) => handleInputChange(event, setDescription)}
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
            className="button is-danger"
            onClick={onCancelEditing}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePainting;
