export interface Painting {
  prettyId: string;
  image: string;
  title: string;
  author: string;
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
