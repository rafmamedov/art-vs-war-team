import Link from "next/link";
import Image from "next/image";

import style from "./card-preview.module.scss";
import "@styles/globals.scss";

import { Cart } from "@/app/icons/cart";
import { Painting } from "@/types/Painting";

type Props = {
  paintingDetails: Painting;
  className?: string;
};

const CardPreview: React.FC<Props> = ({ paintingDetails, className }) => {
  const { prettyId, image, title, author, price } = paintingDetails;

  return (
    <Link href={`/gallery/${prettyId}`}>
      <div className={`${style.card} ${className}`}>
        <Image
          src={image}
          alt={`${author} - ${title}`}
          width={1368}
          height={1500}
          className={`${style.image} imageOpacityEffect`}
          onLoadingComplete={(img) => (img.style.opacity = "1")}
        />
        <p className={style.title}>{title}</p>
        <p className={style.artist}>{author}</p>
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
