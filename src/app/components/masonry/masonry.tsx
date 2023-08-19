"use client";

import Masonry from "react-masonry-css";

import { PaintingData } from "@/types/Painting";
import CardPreview from "../card-preview/card-preview";

import "@styles/masonry.scss";

type Props = {
  paintingsList: PaintingData[];
};

const MasonryGallery: React.FC<Props> = ({ paintingsList }) => {
  const breakpointColumnsObj = {
    639: 2,
    1365: 3,
    5000: 4,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {paintingsList.map((painting: PaintingData) => (
        <CardPreview paintingDetails={painting} key={painting.id} />
      ))}
    </Masonry>
  );
};

export default MasonryGallery;