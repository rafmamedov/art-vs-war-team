export interface Card {
  id?: string;
  prettyId: string;
  title: string;
  image: {
    url: string;
  };
  author: {
    id: string;
    fullName: string;
  };
  price: number;
}
