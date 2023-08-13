"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import { ArrowUpIcon } from "@/app/icons/icon-arrow-up";
import { CloseIcon } from "@/app/icons/icon-close";
import { MapPoint } from "@/app/icons/icon-map-point";
import { removePaintingFromCart } from "@/app/redux/slices/cartSlice";
import { CartItem } from "@/types/CartItem";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import { CartSteps } from "@/types/cartSteps";
import { removeOrderPaintingFromServer } from "@/utils/api";
import createHeaders from "@/utils/getAccessToken";
import EmptyCartPage from "../../order-list/empty-cart/empty-cart";
import ShippingForm from "./shipping-form/shipping-form";

import style from "./order-info.module.scss";

const OrderInfo = () => {
  const [activeSection, setActiveSection] = useState<CartSteps | null>(
    CartSteps.secondStep
  );
  const dispatch = useAppDispatch();
  const { paintings, totalPrice } = useAppSelector((state) => state.cart);
  const { user } = useAuthenticator((context) => [context.route]);
  const headers = createHeaders(user);
  const router = useRouter();

  const handleRemovePainting = (id: number) => {
    dispatch(removePaintingFromCart(id));

    if (user) {
      removeOrderPaintingFromServer(id, headers);
    }
  };

  useEffect(() => {
    if (paintings.length === 0) {
      router.push("/cart");
    }
  }, [paintings, router]);

  const handleSectionClick = (step: CartSteps) => {
    setActiveSection(activeSection === step ? null : step);
  };

  const isVisibleShippingForm = activeSection === CartSteps.secondStep;

  return (
    <>
      {paintings.length > 0 && totalPrice > 0 ? (
        <div className={style.wrapper}>
          <div className={style.orderInfo}>
            <div
              className={style.headerStep}
              onClick={() => handleSectionClick(CartSteps.firstStep)}
            >
              <p className={style.headerStep__text}>In my Cart</p>
              <div
                className={`${style.arrow} ${
                  activeSection !== CartSteps.firstStep &&
                  `${style.arrow__close}`
                }`}
              >
                <ArrowUpIcon />
              </div>
            </div>
            {activeSection === CartSteps.firstStep && (
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
                            <p
                              className={style.author}
                            >{`by ${painting.author}`}</p>
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
                </div>
              </>
            )}
            <div
              className={style.headerStep}
              onClick={() => handleSectionClick(CartSteps.secondStep)}
            >
              <p className={style.headerStep__text}>Shipping Address</p>
              <div
                className={`${style.arrow} ${
                  activeSection !== CartSteps.secondStep &&
                  `${style.arrow__close}`
                }`}
              >
                <ArrowUpIcon />
              </div>
            </div>
            <ShippingForm
              headers={headers}
              isVisible={isVisibleShippingForm}
              handleSectionClick={handleSectionClick}
            />
          </div>
          <div className={style.asidePanel}>
            <div>
              <p className={style.asidePanel__title}>Order Summary</p>
            </div>
            <div className={style.orderItem}>
              {paintings.map((painting: CartItem) => (
                <Fragment key={painting.id}>
                  <div className={style.orderItem__paintingWrapper}>
                    <div className={style.orderItem__imageWrapper}>
                      <Image
                        className={style.orderItem__image}
                        src={painting.image}
                        alt={`art ${painting.title}`}
                        fill
                        objectFit="cover"
                      />
                    </div>
                    <div className={style.orderItem__paintingInfo}>
                      <div className={style.orderItem__paintingInfo__wrapper}>
                        <p className={style.orderItem__title}>
                          {painting.title}
                        </p>
                        <p
                          className={style.orderItem__author}
                        >{`by ${painting.author}`}</p>
                      </div>
                      <div className={style.orderItem__price}>
                        <p>Price</p>
                        <p>{`${painting.price} €`}</p>
                      </div>
                    </div>
                  </div>
                  <hr className={style.line} />
                </Fragment>
              ))}
            </div>
            <p
              className={style.asidePanel__totalPrice}
            >{`Total: ${totalPrice} €`}</p>
          </div>
        </div>
      ) : (
        <EmptyCartPage />
      )}
    </>
  );
};

export default OrderInfo;
