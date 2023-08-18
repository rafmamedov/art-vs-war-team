import { AuthorData, ImageData } from "./Profile";

export interface PaintingBaseUpload {
  id: number;
  title: string;
  price: number;
  prettyId: string;
  imageUrl: string;
  authorFullName: string;
  authorPrettyId: string;
  authorCountry?: string;
  width: number;
  height: number;
  depth: number;
}

export interface ArtCollection {
  content: PaintingBaseUpload[];
  total: number;
  artistId: string;
}

export interface PaintingFilterParams {
  minPrice: number;
  maxPrice: number;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  styles: string[];
  mediums: string[];
  supports: string[];
  subjects: string[];
}

export interface UploadedPainting extends PaintingBaseUpload {
  authorCountry: string;
}

export interface PaintingData extends PaintingBaseUpload {
  image?: File;
};

export interface PaintingForm extends PaintingBaseUpload {
  image: FileList;
};

export interface PaintingDataToSave extends PaintingBaseUpload {
  image: ImageData;
};

export interface ResponseImage {
  imageModerationStatus: string;
  imagePublicId: string;
  imageUrl: string;
}

export interface UploadedPaintingData {
  id: number;
  prettyId: string;
  image: ResponseImage;
  author: AuthorData;
  collection: object,
  yearOfCreation: number;
  title: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  price: number;
  styles: string[];
  mediums: string[];
  supports: string[];
  subjects: string[];
  description: string;
  addedToDataBase: { addedToDataBase: string };
};
