"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { CloseIcon } from "@/app/icons/icon-close";
import { MapPoint } from "@/app/icons/icon-map-point";
import { removeItem } from "@/app/redux/slices/cartSlice";
import { CartItem } from "@/types/CartItem";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import MightLike from "../might-like/might-like";

import style from "./order-list.module.scss";

const OrderList = () => {
  const { paintings, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleRemovePainting = (id: string) => {
    dispatch(removeItem(id));
  };

  const selectedPaintings = paintings.map((painting) => painting.id).join(",");

  return (
    <>
      {paintings.length > 0 && (
        <div>
          {paintings.map((painting: CartItem) => (
            <Fragment key={painting.id}>
              <div className={style.paintingWrapper}>
                <div className={style.imageWrapper}>
                  <Link href={`/gallery/${painting.id}`}>
                    <Image
                      className={style.image}
                      src={painting.image}
                      alt="author"
                      width={600}
                      height={600}
                      objectFit="cover"
                    />
                  </Link>
                  <div
                    className={style.closeIcon}
                    onClick={() => handleRemovePainting(painting.id)}
                  >
                    <CloseIcon />
                  </div>
                </div>
                <div className={style.paintingInfo}>
                  <div className={style.paintingInfo}>
                    <Link href={`/gallery/${painting.id}`}>
                      <p className={style.title}>{painting.title}</p>
                    </Link>
                    <Link href={`/artists/${painting.authorId}`}>
                      <p className={style.author}>{`by ${painting.author}`}</p>
                    </Link>
                    <div className={style.country}>
                      <MapPoint />
                      {`${painting.country}`}
                    </div>
                    <p
                      className={style.size}
                    >{`${painting.width} W x ${painting.height} H x ${painting.depth} D cm`}</p>
                  </div>
                  <p className={style.price}>{`${painting.price} €`}</p>
                </div>
              </div>
              <hr className={style.line} />
            </Fragment>
          ))}
          <div className={style.totalInfo}>
            <p className={style.totalPrice}>{`Total: ${totalPrice} €`}</p>
            <button className={style.button}>Checkout</button>
          </div>
          <MightLike selectedPaintings={selectedPaintings} />
        </div>
      )}
    </>
  );
};

export default OrderList;
