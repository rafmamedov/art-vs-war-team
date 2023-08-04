"use client";

import { useState } from "react";
import { FaGift, FaShoppingCart } from "react-icons/fa";

import { CheckIcon } from "@/app/icons/icon-check";
import { addPainting } from "@/app/redux/slices/cartSlice";
import { CartItem } from "@/types/CartItem";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";

import "./button-style.scss";

type Props = {
  orderData: CartItem;
};

const AddToCartButton: React.FC<Props> = ({ orderData }) => {
  const dispatch = useAppDispatch();
  const [animation, setAnimation] = useState(false);
  const { paintings } = useAppSelector((state) => state.cart);

  const isPaintingSelected = paintings.some(
    (painting) => painting.id === orderData.id
  );


  const handleAddPaintingToCart = () => {
    setAnimation(true);

    setTimeout(() => {
      dispatch(addPainting(orderData));
    }, 1500);
  };

  return (
    <>
      {isPaintingSelected ? (
        <button
          className="cart-button clicked"
          aria-label="Add to cart"
          disabled={isPaintingSelected}
        >
          <span className="added">
            Added
            <div className="fill-themeCaramel">
              <CheckIcon />
            </div>
          </span>
        </button>
      ) : (
        <button
          className={`cart-button ${animation ? "clicked" : ""}`}
          onClick={handleAddPaintingToCart}
          aria-label="Add to cart"
        >
          <span className="add-to-cart">Add to cart</span>
          <i className="fas fa-shopping-cart">
            <FaShoppingCart />
          </i>
          <i className="fas fa-box">
            <FaGift />
          </i>
        </button>
      )}
    </>
  );
};

export default AddToCartButton;
