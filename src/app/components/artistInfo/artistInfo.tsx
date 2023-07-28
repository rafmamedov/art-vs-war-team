import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";

import style from "./artistInfo.module.scss";

import { Add } from "../../icons/add";
import { Location } from "../../icons/location";
import ArtistTabs from "../artistTabs/artistTabs";
import { Form } from "@/app/profile/page";
import { getPaintingsByArtist } from "@/utils/api";
import { Author } from "../editProfile/editProfile";
import { Painting } from "@/types/Painting";

type Props = {
data: Author;
isProfile?: boolean;
setOpenForm: Dispatch<SetStateAction<Form>>;
};

const ArtistInfo: FC<Props> = ({
  data,
  setOpenForm,
  isProfile = false,
}) => {
  const [paintings, setPaintings] = useState<Painting[]>([]);

  const getPaintings = async () => {
    try {
      const response = await getPaintingsByArtist(data.prettyId);
      setPaintings(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaintings();
  }, []);

  return (
    <section className={style.author}>
      <div className={style.container}>
        <div className={style.author__photo}>
          <Image
            className={style.image}
            src={data.imageUrl}
            alt="author"
            fill
          />
        </div>

        <div className={style.author__info}>
          <div className={style.author__name}>
            {data.fullName}
          </div>

          <div className={style.author__styles}>
            <div className={style.style}>
              <span className={style.style__title}>Styles: </span>
              Conceptual
            </div>
          </div>

          <div className={style.author__location}>
            <Location />
            {`${data?.country}, ${data?.city}`}
          </div>
          <div className={style.author__about}>
            {data?.aboutMe}
          </div>

          {isProfile && (
            <>
              <button
                className={style.button__edit}
                type="button"
                onClick={() => setOpenForm('profile')}
              >
                Edit profile
              </button>
              <button
                className={style.button__add}
                type="button"
                onClick={() => setOpenForm('painting')}
              >
                <Add className={style.button__icon} />
                Add Arts
              </button>
            </>
          )}
        </div>
      </div>

      <ArtistTabs
        setOpenForm={setOpenForm}
        paintings={paintings}
      />
    </section>
  );
};

export default ArtistInfo;
