export interface Painting {
  id: number;
  prettyId: string;
  imageUrl: string;
  title: string;
  authorFullName: string;
  price: number;
}

export interface Subject {
  id: number;
  name: string;
}

export interface Style {
  id: number;
  name: string;
}

export interface Medium {
  id: number;
  name: string;
}

export interface Support {
  id: number;
  name: string;
}
