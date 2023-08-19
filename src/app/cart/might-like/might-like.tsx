"use client";

import { useEffect, useState } from "react";

import { PaintingData } from "@/types/Painting";
import { getMightLikePaintings } from "@/utils/api";
import CardPreview from "@components/card-preview/card-preview";

import style from "./might-like.module.scss";

type Props = {
  selectedPaintings: string;
};

const MightLike: React.FC<Props> = ({ selectedPaintings }) => {
  const [paintings, setPaintings] = useState<PaintingData[]>([]);
  const [paintingsQuantity, setPaintingsQuantity] = useState<number | null>(
    null
  );

  const getMorePaintingsFromArtist = async (id: string, size: number) => {
    const paintings = await getMightLikePaintings(id, size);
    setPaintings(paintings);
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
      getMorePaintingsFromArtist(selectedPaintings, paintingsQuantity);
    }
  }, [selectedPaintings, paintingsQuantity]);

  return (
    <div className={style.mightLike}>
      <hr className={style.line} />

      <div className={style.title}>YOU ALSO MIGHT LIKE</div>
      <div className={style.more__painting}>
        {paintings.map((painting: PaintingData) => (
          <CardPreview
            paintingDetails={painting}
            key={painting.id}
            className={style.cardPreview}
          />
        ))}
      </div>
    </div>
  );
};

export default MightLike;
