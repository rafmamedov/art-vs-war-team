export interface Painting {
  id: number;
  prettyId: string;
  imageUrl: string;
  title: string;
  authorFullName: string;
  price: number;
}

export interface ArtCollection {
  total: number;
  content: Painting[];
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
