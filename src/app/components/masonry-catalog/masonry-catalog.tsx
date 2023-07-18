"use client";

import Masonry from "react-masonry-css";

import "@styles/masonry-catalog.scss";

import CardPreview from "../../gallery/card-preview/card-preview";
import { Painting } from "@/types/Painting";

type Props = {
  paintingsList: Painting[];
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
      {paintingsList.map((painting: Painting) => (
        <CardPreview paintingDetails={painting} key={painting.id} />
      ))}
    </Masonry>
  );
};

export default MasonryGallery;
