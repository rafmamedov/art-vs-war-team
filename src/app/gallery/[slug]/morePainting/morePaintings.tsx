"use client";

import { useEffect, useState } from "react";

import style from "./morePaintings.module.scss";

import CardPreview from "../../card-preview/card-preview";

export interface Painting {
  id: number;
  authorFullName: string;
  prettyId: string;
  imageUrl: string;
  title: string;
  price: number;
}

type Props = {
  prettyId: string;
};

const MorePaintings: React.FC<Props> = ({ prettyId }) => {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [paintingsQuantity, setPaintingsQuantity] = useState<number | null>(
    null
  );

  const getMorePaintingFromServer = async (id: string, size: number) => {
    const response = await fetch(
      `https://www.albedosunrise.com/paintings/additional?paintingPrettyId=${id}&size=${size}`
    ).then((data) => data.json());

    setPaintings(response);
  };

  const handleChangeCardQuantity = () => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 640) {
      setPaintingsQuantity(2);
    } else if (viewportWidth < 1366) {
      setPaintingsQuantity(3);
    } else {
      setPaintingsQuantity(5);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleChangeCardQuantity);

    return () => {
      window.removeEventListener("resize", handleChangeCardQuantity);
    };
  }, []);

  useEffect(() => {
    handleChangeCardQuantity();

    if (paintingsQuantity) {
      getMorePaintingFromServer(prettyId, paintingsQuantity);
    }
  }, [prettyId, paintingsQuantity]);

  return (
    <div className={style.more__painting}>
      {paintings.map((painting: Painting) => {
        const paintingDetails = {
          prettyId: painting.prettyId,
          image: painting.imageUrl,
          title: painting.title,
          author: painting.authorFullName,
          price: painting.price,
        };

        return (
          <CardPreview paintingDetails={paintingDetails} key={painting.id} />
        );
      })}
    </div>
  );
};

export default MorePaintings;
