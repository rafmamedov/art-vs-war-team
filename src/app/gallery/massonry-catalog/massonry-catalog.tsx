"use client";

import { useAppSelector } from "@/types/ReduxHooks";
import MasonryGallery from "@/app/components/masonry/masonry";

const MasonryCatalog = () => {
  const { paintings } = useAppSelector((state) => state.paintings);

  return <MasonryGallery paintingsList={paintings} />;
};

export default MasonryCatalog;
