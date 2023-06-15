import Link from "next/link";
import Image from "next/image";

import style from "./card-preview.module.scss";

import { Cart } from "@/app/icons/cart";

type Props = {
  image: string;
};

const CardPreview: React.FC<Props> = ({ image }) => {
  return (
    <>
      <div className={style.card}>
        <Image
          src={image}
          alt={`image`}
          width={368}
          height={500}
          className={style.image}
        />
        <p className={style.title}>Roses</p>
        <p className={style.artist}>Margarita Dudinska</p>
        <div className={style.buy}>
          <p className={style.buy__price}>$ 2,464</p>
          <div className={style.buy__icon}>
            <Cart />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPreview;