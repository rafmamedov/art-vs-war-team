export interface CartItem {
  id: string;
  title: string;
  price: number;
  author: string;
  authorId: string;
  country: string;
  image: string;
  width: number;
  height: number;
  depth: number;
}

export interface DataFromLocalStorage {
  paintingsFromLocalStorage: CartItem[];
  totalPriceFromLocalStorage: number;
}
