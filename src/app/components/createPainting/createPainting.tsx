import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import Image from "next/image";
import axios from 'axios';

import style from './createPainting.module.scss'

import { Form } from '@/app/profile/page';
import { Add } from '@/app/icons/add';
import { ArrowLeft } from "@/app/icons/arrowLeft";
import { SubjectType, mediums, styles, subjects, supports } from './subjects';

const VALIDATE = 'https://www.albedosunrise.com/paintings/checkInputAndGet';
const SIGNATURE = 'https://www.albedosunrise.com/images/getSignature';
const URL = ' https://www.albedosunrise.com/paintings';

type Props = {
  setOpenForm: Dispatch<SetStateAction<Form>>;
};

export type ImageData = {
  publicId: string;
  width?: number;
  height?: number;
  version: number;
  signature: string;
}

export type PaintingData = {
  image: File;
  year: number;
  title: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  price: number;
  styles: number[];
  mediums: number[];
  supports: number[];
  subjects: number[];
  description: string;
};

const CreatePainting: FC<Props> = ({ setOpenForm }) => {
  const {
    handleSubmit,
    setValue,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<PaintingData>({
    defaultValues: {
      styles: [],
      mediums: [],
      supports: [],
      subjects: [],
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<SubjectType[]>([]);
  const [selectedMediums, setSelectedMediums] = useState<SubjectType[]>([]);
  const [selectedSupports, setSelectedSupports] = useState<SubjectType[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectType[]>([]);

  const { user, route } = useAuthenticator((context) => [context.route]);
  const accessToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
  const isAuthenticated = route === 'authenticated';
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
  };

  const upload_preset = process.env.NEXT_APP_CLOUDINARY_UPLOAD_PRESET!;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const cloudinaryApiKey = process.env.NEXT_APP_CLOUDINARY_API_KEY!;

  const checkOptions = (options: SubjectType[]) => {
    if (options.length === 3) {
      return true;
    }

    return false;
  };

  const onReset = () => {
    reset();
    setImagePreview(null);
    setSelectedStyles([]);
    setSelectedMediums([]);
    setSelectedSubjects([]);
    setSelectedSupports([]);
  };

  const validateInputs = async (data: PaintingData): Promise<any> => {
    const dataToValidate = {
      title: data.title,
      width: +data.width,
      depth: +data.depth,
      price: +data.price,
      weight: +data.weight,
      height: +data.height,
      styleIds: data.styles,
      mediumIds: data.mediums,
      supportIds: data.supports,
      subjectIds: data.subjects,
      yearOfCreation: +data.year,
      description: data.description,
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

  const getSignature = async (data: PaintingData): Promise<any> => {
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

  const uploadImage = async (data: PaintingData): Promise<any> => {
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
  };

  const onCreatePainting = async (data: PaintingData) => {
    if (data.image instanceof File) {

      const { imageData } = await uploadImage(data);

      const paintingData = {
        title: data.title,
        yearOfCreation: +data.year,
        weight: +data.weight,
        width: +data.width,
        height: +data.height,
        depth: +data.depth,
        price: +data.price,
        styleIds: data.styles,
        mediumIds: data.mediums,
        supportIds: data.supports,
        subjectIds: data.subjects,
        description: data.description,
        image: imageData,
      };

      await axios.post(URL, paintingData, { headers })
        .finally(() => {
          onReset();
        })
    }
  };

  const onSubmit = (data: PaintingData | any) => {
    if (!data || !isAuthenticated) {
      return;
    }

    onCreatePainting(data);
    setImagePreview(null);
    reset();
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

  return (
    <section className={style.createPainting}>
      <div className={style.navigationContainer}>
        <button
          type="button"
          className={style.arrow}
          onClick={() => setOpenForm(null)}
        >
          <ArrowLeft />
        </button>

        <div className={`${style.page} ${style.current}`}>
          General Information
        </div>

        <div className={style.page}>
          Additional information
        </div>
      </div>

      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={style.topContainer}>
          <label className={style.file}>
            <input
              type="file"
              className={style.file__input}
              {...register("image", { required: 'Image is required!' })}
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
          <div className={style.desktopContainer}>
            <label className={style.label}>
              <div>
                Title
                <span className={style.star}>*</span>
              </div>
              <div className={style.input}>
                <input
                  type="text"
                  className={style.text}
                  placeholder="Painting title"
                  {...register("title", { required: 'This field is required!' })}
                />

                {typeof errors?.title?.message === 'string' && (
                  <div className={style.error}>{errors.title.message}</div>
                )}
              </div>
            </label>

            <div className={style.container}>
              <div className={style.container__left}>
                <label className={style.label}>
                  <div>
                    Year
                    <span className={style.star}>*</span>
                  </div>
                  <div className={style.input}>
                    <input
                      type="number"
                      className={style.text}
                      placeholder="Year of creation"
                      onWheel={e => e.currentTarget.blur()}
                      {...register("year", { required: 'This field is required!' })}
                    />

                    {typeof errors?.year?.message === 'string' && (
                      <p className={style.error}>{errors.year.message}</p>
                    )}
                  </div>
                </label>

                <label className={style.label}>
                  <div>
                    Weight
                    <span className={style.star}>*</span>
                  </div>
                  <div className={style.input}>
                    <input
                      type="number"
                      className={style.text}
                      placeholder="Weight grm"
                      onWheel={e => e.currentTarget.blur()}
                      {...register("weight", { required: 'This field is required!' })}
                    />

                    {typeof errors?.weight?.message === 'string' && (
                      <p className={style.error}>{errors.weight.message}</p>
                    )}
                  </div>
                </label>

                <label className={style.label}>
                  <div>
                    Width
                    <span className={style.star}>*</span>
                  </div>
                  <div className={style.input}>
                    <input
                      type="number"
                      className={style.text}
                      placeholder="Width cm"
                      onWheel={e => e.currentTarget.blur()}
                      {...register("width", { required: 'This field is required!' })}
                    />

                    {typeof errors?.width?.message === 'string' && (
                      <p className={style.error}>{errors.width.message}</p>
                    )}
                  </div>
                </label>

                <label className={style.label}>
                  <div>
                    Height
                    <span className={style.star}>*</span>
                  </div>
                  <div className={style.input}>
                    <input
                      type="number"
                      className={style.text}
                      placeholder="Height cm"
                      onWheel={e => e.currentTarget.blur()}
                      {...register("height", { required: 'This field is required!' })}
                    />

                    {typeof errors?.height?.message === 'string' && (
                      <p className={style.error}>{errors.height.message}</p>
                    )}
                  </div>
                </label>

                <label className={style.label}>
                  <div>
                    Depth
                    <span className={style.star}>*</span>
                  </div>
                  <div className={style.input}>
                    <input
                      type="number"
                      className={style.text}
                      placeholder="Depth cm"
                      step="0.1"
                      onWheel={e => e.currentTarget.blur()}
                      {...register("depth", { required: 'This field is required!' })}
                    />

                    {typeof errors?.depth?.message === 'string' && (
                      <p className={style.error}>{errors.depth.message}</p>
                    )}
                  </div>
                </label>
              </div>

              <div className={style.container__right}>
                <label className={style.label}>
                  <div>
                    Styles
                    <span className={style.star}>*</span>
                  </div>
                  <div className={style.input}>
                    <Controller
                      name="styles"
                      control={control}
                      rules={{ required: 'This field is required!' }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          options={styles}
                          isMulti
                          isOptionDisabled={() => checkOptions(selectedStyles)}
                          value={styles.filter(option => value.includes(option.value))}
                          onChange={newValues => {
                            setSelectedStyles(newValues as SubjectType[]);

                            return onChange(newValues.map(newValue => newValue.value));
                          }}
                          closeMenuOnSelect={false}
                          className={style.select}
                          placeholder="Choose styles"
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              width: '100%',
                              minHeight: '48px',
                              height: 'auto',
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
                            multiValue: (provided) => ({
                              ...provided,
                              backgroundColor: 'transparent',
                            }),
                            multiValueLabel: (provided) => ({
                              ...provided,
                              color: '#eff0f1',
                              fontSize: '12px',
                            }),
                            multiValueRemove: (provided) => ({
                              ...provided,
                              padding: 0,
                              ":hover": {
                                color: '#eff0f1',
                              },
                            }),
                            indicatorSeparator: () => ({
                              display: 'none',
                            }),
                          }}
                        />
                      )}
                    />

                    {typeof errors?.styles?.message === 'string' && (
                      <p className={style.error}>{errors.styles.message}</p>
                    )}
                  </div>
                </label>
                  <label className={style.label}>
                    <div>
                      Mediums
                      <span className={style.star}>*</span>
                    </div>
                    <div className={style.input}>
                      <Controller
                        name="mediums"
                        control={control}
                        rules={{ required: 'This field is required!' }}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            options={mediums}
                            isOptionDisabled={() => checkOptions(selectedMediums)}
                            value={mediums.filter(option => value.includes(option.value))}
                            onChange={newValues => {
                              setSelectedMediums(newValues as SubjectType[]);
                              return onChange(newValues.map(newValue => newValue.value));
                            }}
                            isMulti
                            closeMenuOnSelect={false}
                            className={style.select}
                            placeholder="Choose mediums"
                            styles={{
                              control: (provided) => ({
                                ...provided,
                                width: '100%',
                                minHeight: '48px',
                                height: 'auto',
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
                              multiValue: (provided) => ({
                                ...provided,
                                backgroundColor: 'transparent',
                              }),
                              multiValueLabel: (provided) => ({
                                ...provided,
                                color: '#eff0f1',
                                fontSize: '12px',
                              }),
                              multiValueRemove: (provided) => ({
                                ...provided,
                                ":hover": {
                                  color: '#eff0f1',
                                },
                              }),
                              indicatorSeparator: () => ({
                                display: 'none',
                              }),
                            }}
                          />
                        )}
                      />

                      {typeof errors?.mediums?.message === 'string' && (
                        <p className={style.error}>{errors.mediums.message}</p>
                      )}
                    </div>
                  </label>
                  <label className={style.label}>
                    <div>
                      Supports
                      <span className={style.star}>*</span>
                    </div>
                    <div className={style.input}>
                      <Controller
                        name="supports"
                        control={control}
                        rules={{ required: 'This field is required!' }}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            options={supports}
                            isOptionDisabled={() => checkOptions(selectedSupports)}
                            value={supports.filter(option => value.includes(option.value))}
                            onChange={newValues => {
                              setSelectedSupports(newValues as SubjectType[]);
                              return onChange(newValues.map(newValue => newValue.value));
                            }}
                            isMulti
                            closeMenuOnSelect={false}
                            className={style.select}
                            placeholder="Choose supports"
                            styles={{
                              control: (provided) => ({
                                ...provided,
                                width: '100%',
                                minHeight: '48px',
                                height: 'auto',
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
                              multiValue: (provided) => ({
                                ...provided,
                                backgroundColor: 'transparent',
                              }),
                              multiValueLabel: (provided) => ({
                                ...provided,
                                color: '#eff0f1',
                                fontSize: '12px',
                              }),
                              multiValueRemove: (provided) => ({
                                ...provided,
                                ":hover": {
                                  color: '#eff0f1',
                                },
                              }),
                              indicatorSeparator: () => ({
                                display: 'none',
                              }),
                            }}
                          />
                        )}
                      />

                      {typeof errors?.supports?.message === 'string' && (
                        <p className={style.error}>{errors.supports.message}</p>
                      )}
                    </div>
                  </label>
                  <label className={style.label}>
                    <div>
                      Subjects
                      <span className={style.star}>*</span>
                    </div>
                    <div className={style.input}>
                      <Controller
                        name="subjects"
                        control={control}
                        rules={{ validate: value => value.length > 0 || 'This field is required!'}}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            options={subjects}
                            isOptionDisabled={() => checkOptions(selectedSubjects)}
                            value={subjects.filter(option => value.includes(option.value))}
                            onChange={newValues => {
                              setSelectedSubjects(newValues as SubjectType[]);
                              return onChange(newValues.map(newValue => newValue.value));
                            }}
                            isMulti
                            closeMenuOnSelect={false}
                            className={style.select}
                            placeholder="Choose subjects"
                            styles={{
                              control: (provided) => ({
                                ...provided,
                                width: '100%',
                                minHeight: '48px',
                                height: 'auto',
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
                              multiValue: (provided) => ({
                                ...provided,
                                backgroundColor: 'transparent',
                              }),
                              multiValueLabel: (provided) => ({
                                ...provided,
                                color: '#eff0f1',
                                fontSize: '12px',
                              }),
                              multiValueRemove: (provided) => ({
                                ...provided,
                                ":hover": {
                                  color: '#eff0f1',
                                },
                              }),
                              indicatorSeparator: () => ({
                                display: 'none',
                              }),
                            }}
                          />
                        )}
                      />

                      {typeof errors?.subjects?.message === 'string' && (
                        <p className={style.error}>{errors.subjects.message}</p>
                      )}
                    </div>
                  </label>
                  <label className={style.label}>
                    <div>
                      Price
                      <span className={style.star}>*</span>
                    </div>
                    <div className={style.input}>
                      <input
                        type="number"
                        className={style.text}
                        placeholder="Price €"
                        onWheel={e => e.currentTarget.blur()}
                        {...register("price", { required: 'This field is required!' })}
                      />

                      {typeof errors?.price?.message === 'string' && (
                        <p className={style.error}>{errors.price.message}</p>
                      )}
                    </div>
                  </label>
              </div>
            </div>
          </div>
        </div>
        <div className={style.devider}/>
          <label className={style.about}>
            <div className={style.about__label}>
              About

              <span className={style.star}>*</span>

              {typeof errors?.description?.message === 'string' && (
                <p className={style.error}>{errors.description.message}</p>
              )}
            </div>

            <textarea
              className={style.about__input}
              placeholder="Write some description about the painting"
              {...register("description", { required: 'This field is required!' })}
            />
          </label>
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
            className={style.forward}
          >
            Forward
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePainting;
