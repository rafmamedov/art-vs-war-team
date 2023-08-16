import Link from "next/link";

import { ArrowBackIcon } from "@/app/icons/icon-arrow-back";

import style from "./page.module.scss";
import OrderInfo from "./order-info/order-info";

const Checkout = () => {
  return (
    <section className={style.cart}>
      <div className={style.titleWrapper}>
        <Link href={`/cart`}>
          <div className={style.arrowBack}>
            <ArrowBackIcon />
          </div>
        </Link>
        <h1 className={style.title}>Checkout</h1>
      </div>

      <div className={style.paintingWrapper}>
        <OrderInfo />
      </div>
    </section>
  );
};

export default Checkout;
