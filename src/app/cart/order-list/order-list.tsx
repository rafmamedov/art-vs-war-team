"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { CloseIcon } from "@/app/icons/icon-close";
import { MapPoint } from "@/app/icons/icon-map-point";
import { removePaintingFromCart } from "@/app/redux/slices/cartSlice";
import { CartItem } from "@/types/CartItem";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import { removeOrderPaintingFromServer } from "@/utils/api";
import createHeaders from "@/utils/getAccessToken";
import MightLike from "../might-like/might-like";
import EmptyCartPage from "./empty-cart/empty-cart";

import style from "./order-list.module.scss";

const OrderList = () => {
  const dispatch = useAppDispatch();
  const { paintings, totalPrice } = useAppSelector((state) => state.cart);
  const { user } = useAuthenticator((context) => [context.route]);
  const headers = createHeaders(user);

  const handleRemovePainting = (id: number) => {
    dispatch(removePaintingFromCart(id));

    if (user) {
      removeOrderPaintingFromServer(id, headers);
    }
  };

  const selectedPaintings = paintings
    .map((painting) => painting.prettyId)
    .join(",");

  return (
    <>
      {paintings.length > 0 && totalPrice > 0 ? (
        <>
          {paintings.map((painting: CartItem) => (
            <Fragment key={painting.id}>
              <div className={style.paintingWrapper}>
                <div className={style.imageWrapper}>
                  <Link href={`/gallery/${painting.prettyId}`}>
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
                    <Link href={`/gallery/${painting.prettyId}`}>
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
        </>
      ) : (
        <EmptyCartPage />
      )}
    </>
  );
};

export default OrderList;
