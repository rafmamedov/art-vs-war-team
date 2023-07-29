"use client";

import { useEffect, useState } from "react";
import { FaGift, FaShoppingCart } from "react-icons/fa";

import { CheckIcon } from "@/app/icons/icon-check";
import { addPainting } from "@/app/redux/slices/cartSlice";
import { CartItem } from "@/types/CartItem";
import { useAppDispatch } from "@/types/ReduxHooks";
import "./button-style.scss";

type Props = {
  orderData: CartItem;
};

const AddToCartButton: React.FC<Props> = ({ orderData }) => {
  const dispatch = useAppDispatch();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsAdded(false);
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, [isAdded]);

  const handleAddPaintingToCart = () => {
    setIsAdded(true);
    dispatch(addPainting(orderData));
  };

  return (
    <>
      <button
        className={`cart-button ${isAdded ? "clicked" : ""}`}
        onClick={handleAddPaintingToCart}
        disabled={isAdded}
        aria-label="Add to cart"
      >
        <span className="add-to-cart">Add to cart</span>
        <span className="added">
          Added
          <div className="fill-themeCaramel">
            <CheckIcon />
          </div>
        </span>
        <i className="fas fa-shopping-cart">
          <FaShoppingCart />
        </i>
        <i className="fas fa-box">
          <FaGift />
        </i>
      </button>
    </>
  );
};

export default AddToCartButton;
