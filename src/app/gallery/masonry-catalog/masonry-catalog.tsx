"use client";

import Masonry from "react-masonry-css";

import "./masonry-catalog.scss";

import CardPreview from "../card-preview/card-preview";
import { Card } from "@/types/Card";
import { Painting } from "@/types/Painting";

type Props = {
  paintingsList: Card[];
};

const MasonryGallery: React.FC<Props> = ({ paintingsList }) => {
  const breakpointColumnsObj = {
    default: 4,
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
      {paintingsList.map((painting: Card) => {
        const paintingDetails: Painting = {
          prettyId: painting.prettyId,
          image: painting.image.url,
          title: painting.title,
          author: painting.author.fullName,
          price: painting.price,
        };

        return (
          <CardPreview paintingDetails={paintingDetails} key={painting.id} />
        );
      })}
    </Masonry>
  );
};

export default MasonryGallery;
