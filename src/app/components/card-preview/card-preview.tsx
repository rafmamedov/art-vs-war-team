import Link from "next/link";
import Image from "next/image";

import style from "./card-preview.module.scss";
import "@styles/globals.scss";

import { Cart } from "@/app/icons/icon-cart";
import { Painting } from "@/types/Painting";

type Props = {
  paintingDetails: Painting;
  className?: string;
};

const CardPreview: React.FC<Props> = ({ paintingDetails, className }) => {
  const { prettyId, imageUrl, title, authorFullName, price } = paintingDetails;

  return (
    <Link href={`/gallery/${prettyId}`}>
      <div className={`${style.card}`}>
        <Image
          src={imageUrl}
          alt={`${authorFullName} - ${title}`}
          width={1368}
          height={1500}
          className={`${style.image} ${className} imageOpacityEffect`}
          onLoadingComplete={(img) => (img.style.opacity = "1")}
        />
        <p className={style.title}>{title}</p>
        <p className={style.artist}>{authorFullName}</p>
        <div className={style.buy}>
          <p className={style.buy__price}>{`€ ${price}`}</p>
          <div className={style.buy__icon}>
            <Cart />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardPreview;
