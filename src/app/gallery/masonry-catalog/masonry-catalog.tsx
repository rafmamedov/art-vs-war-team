"use client";

import Masonry from "react-masonry-css";

import "./masonry-catalog.scss";
import CardPreview from "../card-preview/card-preview";

type Props = {
  images: string[];
};

const MasonryGallery: React.FC<Props> = ({ images }) => {
  const breakpointColumnsObj = {
    default: 2,
    639: 2,
    1365: 3,
    4000: 4,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {images.map((card, index) => (
        <CardPreview image={card} key={index} />
      ))}
    </Masonry>
  );
};

export default MasonryGallery;
