import { Dispatch, FC, SetStateAction, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import Select from "react-select";
import { useAuthenticator } from "@aws-amplify/ui-react";
import jwt_decode from 'jwt-decode';
import toast from "react-hot-toast";
import axios from "axios";

import style from "./editProfile.module.scss";

import { Add } from "@/app/icons/icon-add";
import { CountryType, countries } from "./countries";
import { ArrowLeft } from "@/app/icons/arrowLeft";
import { Artist } from "@/types/Artist";
import { ArtistTabOptions } from "@/types/ArtistTabOptions";
import { Action, CustomJwtPayload, ProfileForm, UserData, UserDataToSave } from "@/types/Profile";
import { uploadImageToServer, validateDataOnServer } from "@/utils/profile";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const URL = 'authors/checkInputAndGet';

type Props = {
  author: Artist | null;
  setOpenForm: Dispatch<SetStateAction<ArtistTabOptions | null>>;
  setAuthor: Dispatch<SetStateAction<Artist | null>>;
};

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
  } = useForm<ProfileForm>({
    values: {
      fullName: author?.fullName || '',
      city: author?.city || '',
      country: author?.country || '',
      aboutMe: author?.aboutMe || '',
      image: [],
    },
    mode: "onBlur",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { user, route } = useAuthenticator((context) => [context.route]);
  const accessToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
  const idToken = user.getSignInUserSession()?.getIdToken().getJwtToken();
  const refreshToken = user.getSignInUserSession()?.getRefreshToken();
  const decoded = idToken ? (jwt_decode(idToken) as CustomJwtPayload) : '';
  const userEmail = decoded && decoded.email;
  const isAuthenticated = route === 'authenticated';
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
  };

  const getValue = (value: string) => (
    value ? countries.find(county => county.value === value) : ''
  );

  const refreshAccessToken = () => {
    if (refreshToken) {
      user.refreshSession(refreshToken, (err, session) => {});
    }
  };

  const createProfile = async (userData: UserDataToSave) => {
    await axios.post(BASE_URL + 'authors/', userData, { headers })
    .then(response => {
      refreshAccessToken();
      setAuthor(response.data);
    })
  };

  const updateProfile = async (userData: UserDataToSave) => {
    await axios.put(BASE_URL + 'authors/', userData, { headers })
    .then(response => {
      setAuthor(response.data);
    })
  };

  const handleEditProfile = async (action: Action, data: UserData) => {
    let authorData: UserDataToSave;

    if (data.image instanceof File) {
      const {
        publicId,
        version,
        signature,
        moderationStatus,
      } = await uploadImageToServer(data, URL, headers, userEmail);

      const profileImage = {
        publicId,
        version,
        signature,
        moderationStatus,
      };

      authorData = {
        ...data,
        email: userEmail,
        image: profileImage,
      };

      action === 'create' ? createProfile(authorData) : updateProfile(authorData);
    } else {
      await validateDataOnServer(data, URL, headers, userEmail)
      .then(() => {
        authorData = {
          ...data,
          email: userEmail,
          image: { publicId: author?.imagePublicId || '' },
        };

        action === 'create' ? createProfile(authorData) : updateProfile(authorData);
      });
    }
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
  };

  const onReset = () => {
    reset();
    setValue('country', '');
    setImagePreview(null);
  };

  const onSubmit = async (data: ProfileForm) => {
    if (!isAuthenticated || !data) {
      return;
    };

    const dataToUpload: UserData = {
      ...data,
      image: data.image[0],
    };

    author
      ? await toast.promise(
        handleEditProfile('update', dataToUpload),
        {
          loading: 'Saving...',
          success: <b>Profile edited!</b>,
          error: <b>Could not edit.</b>,
        }, {
          style: {
            borderRadius: '10px',
            background: '#1c1d1d',
            color: '#b3b4b5',
          }
        }
      )
      : await toast.promise(
        handleEditProfile('create', dataToUpload),
        {
          loading: 'Creating...',
          success: <b>Profile created!</b>,
          error: <b>Could not create.</b>,
        }, {
          style: {
            borderRadius: '10px',
            background: '#1c1d1d',
            color: '#b3b4b5',
          }
        }
      );
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
                {...register("image", author
                  ? { onChange: handleFileChange }
                  : {
                      onChange: handleFileChange,
                      required: "Image is required!"
                    }
                )}
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
                typeof errors?.image?.message === 'string' ? (
                  <div className={`${style.error} ${style.error__file}`}>
                    {errors.image.message}
                  </div>
                ) : (
                  <>
                    <Add className={style.file__icon}/>
                    <span className={style.file__label}>Choose a file</span>
                  </>
                )
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