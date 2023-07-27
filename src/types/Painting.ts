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
