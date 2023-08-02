"use client";

import { DataFromLocalStorage } from "@/types/CartItem";
import getTotalPrice from "./calcTotalPrice";

const getDataFromLocalStorage = (): DataFromLocalStorage => {
  const data = localStorage.getItem("cart");
  const paintingsFromLocalStorage = data ? JSON.parse(data) : [];
  const totalPriceFromLocalStorage = getTotalPrice(paintingsFromLocalStorage);

  return {
    paintingsFromLocalStorage,
    totalPriceFromLocalStorage,
  };
};

export default getDataFromLocalStorage;
