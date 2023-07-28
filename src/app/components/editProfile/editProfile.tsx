import { Dispatch, FC, SetStateAction, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import Select from "react-select";
import { useAuthenticator } from "@aws-amplify/ui-react";
import jwt_decode, { JwtPayload } from 'jwt-decode';
import toast from "react-hot-toast";
import axios from "axios";

import style from "./editProfile.module.scss";

import { Add } from "@/app/icons/add";
import { Form } from "@/app/profile/page";
import { CountryType, countries } from "./countries";
import { ArrowLeft } from "@/app/icons/arrowLeft";

const AUTHOR = 'https://www.albedosunrise.com/authors/';
const PROFILE = 'https://www.albedosunrise.com/authors/profile';
const SIGNATURE = 'https://www.albedosunrise.com/images/getSignature';
const VALIDATE = 'https://www.albedosunrise.com/authors/checkInputAndGet';

export interface UserData {
  fullName: string;
  country: string;
  city: string;
  aboutMe: string;
  image: File | {};
}

export interface ImageData {
  publicId: string;
  version: number;
  signature: string;
  moderationStatus: string;
}

export interface Author {
  id: string;
  fullName: string;
  country: string;
  city: string;
  aboutMe: string;
  prettyId: string;
  imageUrl: string;
  imagePublicId: string;
};

type Props = {
  author: Author | null;
  setOpenForm: Dispatch<SetStateAction<Form>>;
  setAuthor: Dispatch<SetStateAction<Author | null>>;
};

type Action = 'create' | 'update';

type CustomJwtPayload = JwtPayload & { email: string };

const getValue = (value: string) => (
  value ? countries.find(county => county.value === value) : ''
);

const EditProfile: FC<Props> = ({
  author,
  setAuthor,
  setOpenForm,
}) => {
  const {
    handleSubmit,
    setValue,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm({
    values: {
      fullName: author?.fullName || '',
      city: author?.city || '',
      country: author?.country || '',
      aboutMe: author?.aboutMe || '',
      image: {},
    },
    mode: "onBlur",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { user, route, signOut } = useAuthenticator((context) => [context.route]);
  const accessToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
  const idToken = user.getSignInUserSession()?.getIdToken().getJwtToken();
  const refreshToken = user.getSignInUserSession()?.getRefreshToken();
  const isAuthenticated = route === 'authenticated';
  const decoded = idToken ? (jwt_decode(idToken) as CustomJwtPayload) : '';
  const userEmail = decoded && decoded.email;

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
  };

  const upload_preset = process.env.NEXT_APP_CLOUDINARY_UPLOAD_PRESET!;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const cloudinaryApiKey = process.env.NEXT_APP_CLOUDINARY_API_KEY!;

  const validateInputs = async (data: UserData): Promise<any> => {
    const dataToValidate = {
      fullName: data.fullName,
      country: data.country,
      city: data.city,
      aboutMe: data.aboutMe,
      email: userEmail,
    };

    try {
      const {
        folder
      } = (await axios.post(VALIDATE, dataToValidate, { headers })).data;

      return {
        folder,
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getSignature = async (data: UserData): Promise<any> => {
    const { folder } = await validateInputs(data);

    try {
      const requestParams = {
        upload_preset,
        folder,
      };

      const {
        signature,
        timestamp,
      } = (await axios.post(SIGNATURE, requestParams)).data;

      return {
        signature,
        timestamp,
        folder,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (data: UserData): Promise<any> => {
    if (data.image instanceof File) {

      const { signature, timestamp, folder } = await getSignature(data);
  
      const formData = new FormData();
  
      formData.append("file", data.image);
      formData.append("folder", folder);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append("upload_preset", upload_preset);
      formData.append('api_key', cloudinaryApiKey);
  
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
          { headers: {"Content-Type": "multipart/form-data"} },
        );

        const imageData: ImageData = {
          publicId: response.data.public_id,
          moderationStatus: 'APPROVED',
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
  };

  const refreshAccessToken = () => {
    if (refreshToken) {
      user.refreshSession(refreshToken, (err, session) => {});
    }
  };

  const onUpdateProfile = async (action: Action, data: UserData) => {
    let image;

    if (data.image && data.image instanceof File) {
      const { imageData } = await uploadImage(data);
      image = imageData;
    }

    const authorData = {
      fullName: data.fullName,
      country: data.country,
      city: data.city,
      aboutMe: data.aboutMe,
      email: userEmail,
      image: image || { publicId: author?.imagePublicId },
    };

    console.log(image);
    console.log(authorData);

    action === 'create'
      ? (
        await axios.post(AUTHOR, authorData, { headers })
        .then(response => {
          refreshAccessToken();
          setAuthor(response.data);
        })
      ) : (
        await axios.put(AUTHOR, authorData, { headers })
        .then(response => {
          setAuthor(response.data);
        })
      )
  };

  const onReset = () => {
    reset();
    setValue('country', '');
    setImagePreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImagePreview(reader.result as string);
    };

    reader.readAsDataURL(file);

    setValue('image', file);
  };

  const onSubmit = (data: UserData | null) => {
    if (!isAuthenticated || !data) {
      return;
    };

    author
      ? toast.promise(
        onUpdateProfile('update', data),
        {
          loading: 'Saving...',
          success: <b>Settings saved!</b>,
          error: <b>Could not save.</b>,
        }, {
          style: {
            borderRadius: '10px',
            background: '#1c1d1d',
            color: '#b3b4b5',
          }
        }
      )
      : toast.promise(
        onUpdateProfile('create', data),
        {
          loading: 'Saving...',
          success: <b>Settings saved!</b>,
          error: <b>Could not save.</b>,
        }, {
          style: {
            borderRadius: '10px',
            background: '#1c1d1d',
            color: '#b3b4b5',
          }
        }
      );

    setImagePreview(null);
    reset();
  };

  return (
    <section className={style.editProfile}>
      <div className={style.titleContainer}>
        <button
          type="button"
          className={style.arrow}
          onClick={() => setOpenForm(null)}
        >
          <ArrowLeft />
        </button>

        <h2 className={style.title}>
          {author
            ? 'Edit your profile'
            : 'Welcome to Art Vs War'
          }
        </h2>
      </div>

      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={style.container}>
          <div className={style.fileContainer}>
            <label className={style.file}>
              <input
                type="file"
                className={style.file__input}
                {...register("image")}
                onChange={handleFileChange}
              />
              {imagePreview ? (
                <div className={style.preview}>
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className={style.image}
                    fill
                  />
                </div>
              ) : (
                <>
                  <Add className={style.file__icon}/>
                  <span className={style.file__label}>Choose a file</span>
                </>
              )}
            </label>
            <div className={style.recomendations}>
              **Please add a photo with a large resolution (!!!!!!!!!!!!!)
              and proportions close to 3:4. we want art connoisseurs to be closer
              to artists and we are sure that people who create masterpieces deserve
              to be shown vividly. Don’t be shy!
            </div>
          </div>
          <div className={style.inputsContainer}>
            <label className={style.label}>
              <div>
                Full Name
                <span className={style.star}>*</span>
              </div>
              <div className={style.input}>
                <input
                  type="text"
                  className={style.text}
                  placeholder="Enter your full name"
                  {...register("fullName", { required: 'This field is required!' })}
                />

                {typeof errors?.fullName?.message === 'string' && (
                  <div className={style.error}>{errors.fullName.message}</div>
                )}
              </div>
            </label>
            <label className={style.label}>
              <div>
                City
                <span className={style.star}>*</span>
              </div>
              <div className={style.input}>
                <input
                  type="text"
                  className={style.text}
                  placeholder="Enter a city of your current stay"
                  {...register("city", { required: 'This field is required!' })}
                />

                {typeof errors?.city?.message === 'string' && (
                  <div className={style.error}>{errors.city.message}</div>
                )}
              </div>
            </label>
            <label className={style.label}>
              <div>
                Country
                <span className={style.star}>*</span>
              </div>
              <div className={style.input}>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: 'This field is required!' }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={countries}
                      value={getValue(value)}
                      onChange={newValue => onChange((newValue as CountryType).value)}
                      isSearchable={false}
                      className={style.select}
                      placeholder="A country of your current stay"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          width: '100%',
                          height: '48px',
                          padding: '0 8px',
                          border: 'none',
                          borderRadius: '0',
                          backgroundColor: '#1c1d1d',
                          color: '#78797a',
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: '400',
                          ":hover": {
                            cursor: 'pointer',
                          },
                        }),
                        menu: (provided) => ({
                          ...provided,
                          backgroundColor: '#161717',
                          color: '#78797a',
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: '400',
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected ? '#1c1d1d' : '#3d3e3f',
                          color: state.isSelected ? '#fff' : '#eff0f1',
                          ":hover": {
                            backgroundColor: '#1c1d1d',
                            color: '#fff',
                            cursor: 'pointer',
                          },
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          backgroundColor: '#1c1d1d',
                          color: '#78797a',
                        }),
                        indicatorSeparator: () => ({
                          display: 'none',
                        }),
                      }}
                    />
                  )}
                />

                {typeof errors?.country?.message === 'string' && (
                  <div className={style.error}>{errors.country.message}</div>
                )}
              </div>
            </label>
            <label className={style.label}>
              <div>
                About Me
                <span className={style.star}>*</span>
              </div>
              <div className={style.input}>
                <textarea
                  className={style.about}
                  placeholder="Tell us about yourself. Don't be shy!"
                  {...register("aboutMe", { required: 'This field is required!' })}
                />

                {typeof errors?.aboutMe?.message === 'string' && (
                  <div className={style.error__about}>{errors.aboutMe.message}</div>
                )}
              </div>
            </label>
            <div className={style.buttonContainerLaptop}>
              <button
                type="reset"
                className={style.cancel}
                onClick={onReset}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={style.submit}
              >
                Submit
              </button>
              <button
                type="reset"
                className={style.signout}
                onClick={signOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
        <div className={style.buttonContainer}>
          <button
            type="reset"
            className={style.cancel}
            onClick={onReset}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={style.submit}
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditProfile;