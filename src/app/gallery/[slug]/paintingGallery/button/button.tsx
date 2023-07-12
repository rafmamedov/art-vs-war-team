"use client";

import { useEffect, useState } from "react";
import { FaShoppingCart, FaGift } from "react-icons/fa";

import "./button-style.scss";
import { CheckIcon } from "@/app/icons/check";

// type Props = {
//   handleAddProductToCart: () => void;
// };

const AddToCartButton = () => {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    // handleAddProductToCart();
    setIsAdded(true);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsAdded(false);
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, [isAdded]);

  return (
    <>
      <button
        className={`cart-button ${isAdded ? "clicked" : ""}`}
        onClick={handleClick}
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
